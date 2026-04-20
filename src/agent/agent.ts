import { createAiModel } from "@/models";
import { AgentOption, ChatResult, UserMessage } from "@/types";

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
      messages: [
      ]
    });

    return result;
  }

}

export { Agent };
