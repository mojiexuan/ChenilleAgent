// import { ChatModel, ChatRequest, ChatResult } from "@/types";
// import { AiModel } from "./base.model";
// import Anthropic from "@anthropic-ai/sdk";

// /**
//  * Anthropic模型
//  */
// class AnthropicModel extends AiModel {

//     private client: Anthropic;
//     private config: ChatModel & { model: string; baseURL: string };

//     constructor(model: ChatModel) {
//         super(model);
//         this.config = {
//             baseURL: "https://api.anthropic.com",
//             model: "claude-opus-4-7",
//             ...model,
//         };
//         this.client = new Anthropic({
//             baseURL: this.config.baseURL,
//             apiKey: this.config.apiKey,
//         });
//     }

//     /**
//      * 生成模型回复
//      */
//     async generate(options: ChatRequest): Promise<ChatResult> {
//     }
// }

// export { AnthropicModel };