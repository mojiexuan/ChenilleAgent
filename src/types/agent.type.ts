import { Session } from "@/session";
import { ChatModel, ChatRequest } from "./model.type";

export interface AgentOption {
  name: string;
  description: string;
  model: ChatModel;
  session?: Session;
  options?: ChatRequest;
}
