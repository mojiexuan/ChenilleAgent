import { ChatResult, ChatModel, ChatRequest } from "@/types";
import OpenAI from "openai";
import { Stream } from "openai/core/streaming";

/**
 * OpenAI 模型
 */
class OpenAiModel {
  private client: OpenAI;
  private model: ChatModel & { model: string; baseURL: string };

  constructor(init: ChatModel) {
    this.model = {
      baseURL: "https://api.openai.com/v1",
      model: "gpt-5",
      ...init,
    };
    this.client = new OpenAI({
      baseURL: this.model.baseURL,
      apiKey: this.model.apiKey,
    });
  }

  async generate(options: ChatRequest) {
    const controller = new AbortController();
    let aborted = false;

    const abortSignal = () => {
      aborted = true;
      controller.abort();
    };
    const result: ChatResult = {
      role: "assistant",
      content: "",
      finished: false,
      abort: abortSignal,
    };
    return this.client.chat.completions
      .create(
        {
          model: this.model.model,
          messages: options.messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })) as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
          stream: options.stream ?? false,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.max_tokens ?? 1024,
        },
        { signal: controller.signal },
      )
      .then(async (stream) => {
        if (!options.stream) {
          result.content =
            (stream as OpenAI.Chat.Completions.ChatCompletion).choices?.[0]
              ?.message?.content || "";
          result.finished = true;
          return result;
        }

        let fullText = "";

        for await (const chunk of stream as Stream<OpenAI.Chat.Completions.ChatCompletionChunk>) {
          if (aborted) {
            break;
          }

          const content = chunk.choices?.[0]?.delta?.content || "";
          if (content || chunk.choices?.[0]?.finish_reason === "stop") {
            fullText += content;
            if (chunk.usage) {
              result.usage = {
                prompt_tokens: chunk.usage.prompt_tokens,
                completion_tokens: chunk.usage.completion_tokens,
                total_tokens: chunk.usage.total_tokens,
                prompt_tokens_details: {
                  cached_tokens:
                    chunk.usage.prompt_tokens_details?.cached_tokens ?? 0,
                },
              };
            }
            result.finished = chunk.choices?.[0]?.finish_reason === "stop";
            options.onChunk?.({
              ...result,
              content,
            });
          }
        }
        result.content = fullText;
        result.finished = true;
        return result;
      })
      .catch((err: Error) => {
        if (
          err.name === "AbortError" ||
          (typeof err.message === "string" && err.message.includes("aborted"))
        ) {
          result.abort = undefined;
          result.finished = true;
          return result;
        }
        throw err;
      });
  }
}

export { OpenAiModel };
