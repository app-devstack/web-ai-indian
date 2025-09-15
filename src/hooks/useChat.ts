import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { postChatMessage } from "@/_client/fetcher";
import { ChatRequest, ChatResponse } from "@/types/chat";

export interface UseChatMutationOptions {
  onSuccess?: (data: ChatResponse, variables: ChatRequest) => void;
  onError?: (error: Error, variables: ChatRequest) => void;
  onSettled?: (data: ChatResponse | undefined, error: Error | null, variables: ChatRequest) => void;
}

export const useChatMutation = (
  options?: UseChatMutationOptions
): UseMutationResult<ChatResponse, Error, ChatRequest> => {
  return useMutation({
    mutationFn: postChatMessage,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    onSettled: options?.onSettled,
  });
};

// より簡単に使える便利フック
export const useChat = () => {
  const mutation = useChatMutation();

  const sendMessage = (message: string, options?: { userId?: string; conversationId?: string }) => {
    return mutation.mutate({
      message,
      userId: options?.userId,
      conversationId: options?.conversationId,
    });
  };

  return {
    sendMessage,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
};
