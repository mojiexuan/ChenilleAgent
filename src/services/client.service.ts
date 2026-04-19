import { OpenAiModel } from "@/models";
import { ChatModel, ChatRequest } from "@/types";

/**
 * 客户端服务
 */
class ClientService {

  /**
   * 聊天服务接口
   */
  async chat(model: ChatModel, request: ChatRequest,) {
    if (model.provider === "openai") {
      return await new OpenAiModel(model).generate(request);
    } else {
      throw new Error("不支持的 AI 提供商");
    }
  }

}

export { ClientService };
