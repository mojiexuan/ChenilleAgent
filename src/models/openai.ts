import { ChatResult, OpenAiInit, OpenAiRequest } from "@/types";
import OpenAI from "openai";
import { Stream } from "openai/core/streaming";

/**
 * OpenAI 模型
 */
class OpenAiModel {
  private client: OpenAI;
  private model: string;
  private controller: AbortController;

  constructor(init: OpenAiInit) {
    this.client = new OpenAI({
      baseURL: init.baseURL ?? "https://api.openai.com/v1",
      apiKey: init.apiKey,
    });
    this.model = init.model ?? "gpt-5";
    this.controller = new AbortController();
  }

  async generate(options: OpenAiRequest) {
    const abortSignal = () => {
      this.controller.abort();
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
          model: options.model ?? this.model,
          messages: options.messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })) as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
          stream: options.stream ?? false,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.max_tokens ?? 1024,
        },
        { signal: this.controller.signal },
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
          const content = chunk.choices?.[0]?.delta?.content || "";
          if (content || chunk.choices?.[0]?.finish_reason === "stop") {
            fullText += content;
            result.content = content;
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
            options.onChunk?.(result);
          }
        }
        result.content = fullText;
        result.finished = true;
        return result;
      })
      .catch(() => {});
  }
}

export { OpenAiModel };
