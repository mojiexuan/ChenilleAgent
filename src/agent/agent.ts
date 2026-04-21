import { createAiModel } from "@/models";
import { AgentOption, ChatRequest, ChatResult, UserMessage } from "@/types";

/**
 * 智能体
 */
class Agent {
  private options: AgentOption;
  constructor(options: AgentOption) {
    this.options = options;
  }

  /**
   * 执行智能体任务
   * @returns 智能体响应
   */
  async run(message: string | UserMessage): Promise<ChatResult> {
    const { model, session } = this.options;
    const result = await createAiModel(model).generate({
      ...this.options.options,
      messages: [
        this.buildUserMessage(message)
      ],
    } as ChatRequest);

    return result;
  }

  /**
   * 构建用户消息
   * @param message 用户消息
   * @returns 用户消息
   */
  private buildUserMessage(message: string | UserMessage): UserMessage {
    if (typeof message === 'string') {
      return {
        type: "user",
        message: {
          role: "user",
          content: message
        }
      };
    }
    return message;
  }

}

export { Agent };
