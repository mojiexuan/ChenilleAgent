import { CourseId, SessionId } from "./ids.type";

export interface State {
  sessionId: SessionId;
  parentSessionId?: SessionId | undefined;
  courseId?: CourseId | undefined;
}
