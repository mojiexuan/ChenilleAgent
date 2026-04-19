import { SessionId } from "./ids.type";
import { ChatModel, ChatRequest } from "./model.type";
import { Session } from "./session.type";

export interface Agent {
    name: string;
    description: string;
    model: ChatModel;
    session?: AgentSession;
    options?: ChatRequest;
}

export interface AgentSession {
    onGetSession?: (sessionId: SessionId) => Promise<Session | null>;
    onAddSession?: (session: Session) => void;
    onRemoveSession?: (sessionId: SessionId) => void;
    onUpdateSession?: (session: Session) => void;
}