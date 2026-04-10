/**
 * 消息来源
 */
export type MessageOrigin = {
  kind?: string;
  [key: string]: unknown;
};

/**
 * 基础消息
 */
export type MessageBase = {
  uuid?: string;
  parentUuid?: string;
  timestamp?: string;
  createdAt?: string;
  isMeta?: boolean;
  isVirtual?: boolean;
  isCompactSummary?: boolean;
  toolUseResult?: unknown;
  origin?: MessageOrigin;
  [key: string]: unknown;
};

/**
 * 附件消息
 */
export type AttachmentMessage = MessageBase & {
  type: "attachment";
  path?: string;
};

/**
 * 用户消息
 */
export type UserMessage = MessageBase & {
  type: "user";
  message: {
    content:
      | string
      | Array<{ type: string; text?: string; [key: string]: unknown }>;
    [key: string]: unknown;
  };
};

/**
 * 助手消息
 */
export type AssistantMessage = MessageBase & {
  type: "assistant";
  message?: {
    content?: unknown;
    [key: string]: unknown;
  };
};

/**
 * 进度消息
 */
export type ProgressMessage = MessageBase & {
  type: "progress";
  progress?: unknown;
};

/**
 * 系统消息等级
 */
export type SystemMessageLevel = "info" | "warning" | "error" | string;

/**
 * 系统消息
 */
export type SystemMessage = MessageBase & {
  type: "system";
  subtype?: string;
  level?: SystemMessageLevel;
  message?: string;
};

/**
 * 消息
 */
export type Message =
  | UserMessage
  | AssistantMessage
  | ProgressMessage
  | SystemMessage
  | AttachmentMessage;
