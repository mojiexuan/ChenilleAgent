import { Message, SessionData, SessionId, SessionOption } from "@/types";
import { randomUUID } from "@/utils";

/**
 * 会话管理
 */
class Session {
  private state: SessionOption;
  private data: SessionData = {
    title: "",
    timestamp: Date.now(),
    messages: [],
    sessionId: randomUUID() as SessionId,
    parentSessionId: undefined,
  };

  constructor(options?: SessionOption) {
    if (options) {
      this.state = options;
      this.load();
    } else {
      this.state = {
        sessionId: this.data.sessionId,
        parentSessionId: this.data.parentSessionId,
      };
    }
  }

  /**
   * 添加消息
   * @param message 消息
   */
  addMessage(message: Message): void {
    this.data.messages.push(message);
  }

  /**
   * 获取消息
   */
  getMessages(): Message[] {
    return this.data.messages;
  }

  /**
   * 切换会话
   * @param sessionId 会话ID
   */
  switchSession(sessionId: SessionId): void {
    this.state.sessionId = sessionId;
  }

  /**
   * 获取会话ID
   */
  getSessionId(): SessionId {
    return this.state.sessionId;
  }

  /**
   * 获取父会话ID
   */
  getParentSessionId(): SessionId | undefined {
    return this.state.parentSessionId;
  }

  /**
   * 导出会话数据
   */
  export(): SessionData {
    return {
      ...this.data,
    };
  }

  /**
   * 加载会话数据
   */
  async load(): Promise<void> {
    try {
      if (this.state.load) {
        const data = await this.state.load(this.state.sessionId);
        if (data) {
          this.data = data;
        }
      }
    } catch (error) {
      console.error("加载会话数据异常", error);
    }
  }
}

export { Session };
