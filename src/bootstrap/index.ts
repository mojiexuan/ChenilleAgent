import { SessionId, State } from "@/types";
import { randomUUID } from "@/utils";

/**
 * 获取初始状态
 */
function getInitialState(): State {
  const state: State = {
    sessionId: randomUUID() as SessionId,
    parentSessionId: undefined,
  };
  return state;
}

/**
 * 状态管理
 */
const STATE: State = getInitialState();

/**
 * 获取当前会话ID
 */
export function getSessionId(): SessionId {
  return STATE.sessionId;
}

/**
 * 获取父会话ID
 */
export function getParentSessionId(): SessionId | undefined {
  return STATE.parentSessionId;
}

/**
 * 切换会话
 * @param sessionId 会话ID
 * @param courseId 课程ID
 */
export function switchSession(sessionId: SessionId): void {
  STATE.sessionId = sessionId;
}
