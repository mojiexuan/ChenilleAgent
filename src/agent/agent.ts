import { AgentOption } from "@/types";

/**
 * 智能体
 */
class Agent {
  private state: AgentOption;
  constructor(options: AgentOption) {
    this.state = options;
  }
}

export { Agent };
