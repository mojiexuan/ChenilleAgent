import { ChatModel } from "./model.type";
import { Tools } from "./tool.type";

export interface Agent {
    name: string;
    description: string;
    model: ChatModel;
    tools?: Tools;
}