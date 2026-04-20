import { Session } from "@/session";
import { ChatModel, ChatRequest } from "./model.type";

/**
 * 智能体选项
 */
export interface AgentOption {
  name: string;
  description: string;
  model: ChatModel;
  session?: Session;
}

/**
 * 智能体响应
 */
export interface AgentResult {
}
