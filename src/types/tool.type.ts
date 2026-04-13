// import {
//   SystemMessage,
//   AttachmentMessage,
//   AssistantMessage,
//   UserMessage,
// } from "./message.type";
import type { AnyObject } from "./object.type";
import { z } from "zod/v4";

export type Tool<
  Input extends AnyObject = AnyObject,
  Output = unknown,
  P extends ToolProgressData = ToolProgressData,
> = {
  // 工具名称
  readonly name: string;
  // 工具别名
  readonly aliases?: string[];
  // 工具搜索关键词
  searchHint?: string;
  // 是否为MCP工具
  isMcp?: boolean;
  // 是否延迟加载（需 ToolSearch 发现）
  readonly shouldDefer?: boolean;
  // 是否严格模式
  readonly strict?: boolean;
  // 最大结果字符数
  maxResultSizeChars: number;
  // 是否启用
  isEnabled(): boolean;
  /**
   * 中断行为
   *
   * 当用户在此工具中提交新消息时
   *
   * `cancel` — 停止工具并丢弃其结果
   * `block` — 保持运行,新消息等待处理
   *
   * 未实现时默认为`block`
   */
  interruptBehavior?(): "cancel" | "block";
  call(
    args: z.infer<Input>,
    // parentMessage: AssistantMessage,
    onProgress?: ToolCallProgress<P>,
  ): Promise<ToolResult<Output>>;
  description(
    input: z.infer<Input>,
    options: {
      isNonInteractiveSession: boolean;
      tools: Tools;
    },
  ): Promise<string>;
  prompt(options: { tools: Tools }): Promise<string>;
  /**
   * 输入参数的Zod模式
   */
  readonly inputSchema: z.ZodType<Input>;
  // 是否只读
  isReadOnly(input: z.infer<Input>): boolean;
  // 是否为破坏性操作， 默认为假。仅当工具执行不可逆操作（删除、覆盖、发送）时才设置。
  isDestructive?(input: z.infer<Input>): boolean;
  // 是否并发安全
  isConcurrencySafe(input: z.infer<Input>): boolean;
};

/**
 * 工具列表
 */
export type Tools = readonly Tool[];

/**
 * 工具结果
 */
export type ToolResult<T> = {
  data: T;
  // newMessages?: (
  //   | UserMessage
  //   | AssistantMessage
  //   | AttachmentMessage
  //   | SystemMessage
  // )[];
  // 将MCP协议元数据传递给SDK用户
  mcpMeta?: {
    _meta?: Record<string, unknown>;
    structuredContent?: Record<string, unknown>;
  };
};

/**
 * 工具调用进度
 */
export type ToolCallProgress<P extends ToolProgressData = ToolProgressData> = (
  progress: ToolProgress<P>,
) => void;

/**
 * 工具调用进度数据
 */
export type ToolProgressData = {
  kind?: string;
  [key: string]: unknown;
};

/**
 * 工具调用进度
 */
export type ToolProgress<P extends ToolProgressData> = {
  toolUseID: string;
  data: P;
};
