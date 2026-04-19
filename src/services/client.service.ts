import { config } from "@/config";
import { OpenAiModel } from "@/models";
import { ChatModel, ChatRequest } from "@/types";

/**
 * AI 聊天服务
 */
export async function aiChatService(
  model: ChatModel,
  request: ChatRequest,
) {
  if (model.provider === "openai") {
    return await new OpenAiModel(model).generate(request);
  } else {
    throw new Error("不支持的 AI 提供商");
  }
}

/**
 * OpenAI 聊天服务
 */
export async function openaiChatService(request: ChatRequest) {
  return await aiChatService(
    {
      provider: "openai",
      apiKey: config.OPENAI_API_KEY,
      baseURL: config.OPENAI_API_BASE,
      model: config.OPENAI_API_MODEL,
    },
    request,
  );
}
