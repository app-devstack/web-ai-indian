export interface ChatRequest {
  message: string;
  userId?: string;
  conversationId?: string;
}

export interface ChatResponse {
  id: string;
  message: string;
  timestamp: string;
  conversationId: string;
}

export interface ChatError {
  error: string;
  code?: number;
}