import { ChatResult, OpenAiInit, OpenAiRequest } from "@/types";
import OpenAI from "openai";
import { Stream } from "openai/core/streaming";

/**
 * OpenAI 模型
 */
class OpenAiModel {
  private client: OpenAI;
  private model: string;

  constructor(init: OpenAiInit) {
    this.client = new OpenAI({
      baseURL: init.baseURL ?? "https://api.openai.com/v1",
      apiKey: init.apiKey,
    });
    this.model = init.model ?? "gpt-5";
  }

  async generate(options: OpenAiRequest) {
    return this.client.chat.completions
      .create({
        model: options.model ?? this.model,
        messages: options.messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })) as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
        stream: options.stream ?? false,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens ?? 1024,
      })
      .then(async (stream) => {
        if (!options.stream) {
          return {
            role: "assistant",
            content:
              (stream as OpenAI.Chat.Completions.ChatCompletion).choices?.[0]
                ?.message?.content || "",
            finished: true,
          } as ChatResult;
        }

        let fullText = "";

        for await (const chunk of stream as Stream<OpenAI.Chat.Completions.ChatCompletionChunk>) {
          const content = chunk.choices?.[0]?.delta?.content || "";
          if (content || chunk.choices?.[0]?.finish_reason === "stop") {
            fullText += content;
            options.onChunk?.({
              role: "assistant",
              content: content,
              ...(chunk.usage
                ? {
                    usage: {
                      prompt_tokens: chunk.usage.prompt_tokens,
                      completion_tokens: chunk.usage.completion_tokens,
                      total_tokens: chunk.usage.total_tokens,
                      prompt_tokens_details: {
                        cached_tokens:
                          chunk.usage.prompt_tokens_details?.cached_tokens ?? 0,
                      },
                    },
                  }
                : {}),
              finished: chunk.choices?.[0]?.finish_reason === "stop",
            });
          }
        }
        return {
          role: "assistant",
          content: fullText,
          finished: true,
        } as ChatResult;
      });
  }
}

export { OpenAiModel };
