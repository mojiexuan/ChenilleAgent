// import type { z } from "zod";

export type AIProvider = "openai" | "deepseek";
export type Role = "system" | "user" | "assistant" | "tool";

export interface ChatMessage {
  role: Role;
  content: string;
}

export interface OpenAiInit {
  apiKey: string;
  baseURL?: string;
  model?: string;
}

export interface OpenAiRequest {
  model?: string; // 模型名称
  messages: ChatMessage[]; // 对话内容
  temperature?: number; // 温度（可选）
  max_tokens?: number; // 最大token（可选）
  stream?: boolean; // 是否开启流式输出（可选）
  onChunk?: (chunk: ChatResult) => void; // 流式输出回调（可选）
}

/**
 * 聊天请求参数
 */
export interface ChatRequest extends OpenAiInit, OpenAiRequest {
  provider: AIProvider;
}

export interface ChatResult extends ChatMessage {
  reasoning?: string; // 思考过程
  usage?: ChatUsage; // 调用统计
  finished: boolean; // 是否完成对话
}

export interface ChatUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details: {
    cached_tokens: number;
  };
}

// export interface ChatTool<TSchema extends z.ZodTypeAny, TResult> {
//   name: string;
//   description: string;
//   schema: TSchema;
//   execute: (args: z.infer<TSchema>) => Promise<TResult>;
// }

// export interface ChatToolCall {
//   id: string;
//   name: string;
//   arguments: string; // 原始 JSON 字符串
// }

// export interface MCPClient {
//   call<T = unknown>(req: {
//     server: string;
//     action: string;
//     payload?: unknown;
//   }): Promise<T>;
// }
