import { config } from "@/config";
import { OpenAiModel } from "@/models";
import { ChatModel, ChatRequest } from "@/types";

/**
 * AI 聊天服务
 */
export async function aiChatService(model: ChatModel, request: ChatRequest) {
  if (model.provider === "deepseek") {
    return await new OpenAiModel(model).generate(request);
  } else {
    throw new Error("不支持的 AI 提供商");
  }
}

/**
 * Deepseek 聊天服务
 */
export async function deepseekChatService(request: ChatRequest) {
  return await new OpenAiModel({
    provider: "deepseek",
    apiKey: config.OPENAI_API_KEY,
    baseURL: config.OPENAI_API_BASE,
    model: "deepseek-chat",
  }).generate(request);
}
