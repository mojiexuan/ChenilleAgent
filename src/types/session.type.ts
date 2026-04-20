import { SessionId } from "./ids.type";
import { Message } from "./message.type";

export interface SessionDataBase {
  sessionId: SessionId;
  parentSessionId?: SessionId | undefined; // 父会话ID
}

export interface SessionData extends SessionDataBase {
  title: string; // 会话标题
  timestamp: number; // 会话创建时间戳
  messages: Message[]; // 会话消息
}

export interface SessionOption extends SessionDataBase {
  /**
   * 加载会话数据
   */
  load?: (sessionId: SessionId) => Promise<SessionData>;
}
