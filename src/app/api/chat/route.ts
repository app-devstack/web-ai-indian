import { NextRequest, NextResponse } from "next/server";
import { ChatRequest, ChatResponse, ChatError } from "@/types/chat";
import { createGeminiClient } from "@/lib/GeminiClient";
import { uuidV7 } from "@/lib/uuid";

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();

    if (!body.message) {
      const error: ChatError = { error: "Message is required", code: 400 };
      return NextResponse.json(error, { status: 400 });
    }

    // AI応答を生成
    const conversationId = body.conversationId || "default";

    const client = createGeminiClient();
    const aiResponse = await client.generateResponse(body.message);

    console.log("AI Response:", aiResponse);

    const response: ChatResponse = {
      id: uuidV7(),
      message: aiResponse,
      timestamp: new Date().toISOString(),
      conversationId: conversationId,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat API error:", error);
    const errorResponse: ChatError = {
      error: "Internal server error",
      code: 500,
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
