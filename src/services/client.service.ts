import { OpenAiModel } from "@/models";
import { ChatRequest } from "@/types";

/**
 * AI 聊天服务
 */
export async function aiChatService(request: ChatRequest) {
  if (request.provider === "deepseek") {
    return await new OpenAiModel(request).generate(request);
  } else {
    throw new Error("不支持的 AI 提供商");
  }
}
