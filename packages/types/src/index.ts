export type Plan = 'free' | 'starter' | 'pro';
export type MessageRole = 'user' | 'assistant';

export interface Profile {
  id: string;
  email: string;
  name: string | null;
  plan: Plan;
  created_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: MessageRole;
  content: string;
  created_at: string;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  message: string;
}

export interface HealthResponse {
  status: 'ok';
}
