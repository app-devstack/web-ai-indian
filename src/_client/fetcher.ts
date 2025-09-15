import { ChatRequest, ChatResponse, ChatError } from "@/types/chat";

export const postChatMessage = async (data: ChatRequest): Promise<ChatResponse> => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: ChatError = await response.json().catch(() => ({
      error: "Unknown error occurred",
      code: response.status,
    }));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};
