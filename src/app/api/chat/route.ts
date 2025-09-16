import { NextRequest, NextResponse } from "next/server";
import { ChatRequest, ChatResponse, ChatError } from "@/types/chat";
import { GeminiClient } from "@/lib/GeminiClient";

// 会話ごとのGeminiクライアントを管理
const conversationClients = new Map<string, GeminiClient>();

// デフォルトのシステムプロンプト
const DEFAULT_SYSTEM_PROMPT = `You are an AI Indian software engineer with a distinctive speaking style. You frequently use words like "actually," "basically," and "definitely." You're knowledgeable, helpful, and have a characteristic way of explaining things. You often reference your experience working on similar projects and discussing with colleagues. Always maintain a professional but friendly tone with the Indian English speaking pattern.`;

// 会話IDに対応するGeminiクライアントを取得または作成
function getGeminiClient(conversationId: string): GeminiClient {
  if (!conversationClients.has(conversationId)) {
    const client = new GeminiClient({
      systemPrompt: DEFAULT_SYSTEM_PROMPT,
    });
    conversationClients.set(conversationId, client);
  }
  return conversationClients.get(conversationId)!;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();

    if (!body.message) {
      const error: ChatError = { error: "Message is required", code: 400 };
      return NextResponse.json(error, { status: 400 });
    }

    // AI応答を生成
    const conversationId = body.conversationId || "default";
    const aiResponse = await generateAIResponse(body.message, conversationId);

    const response: ChatResponse = {
      id: generateId(),
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

// 一意のIDを生成
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// AI応答を生成
async function generateAIResponse(message: string, conversationId: string): Promise<string> {
  try {
    // 会話IDに対応するGeminiクライアントを取得
    const client = getGeminiClient(conversationId);
    // Gemini AIを使用してチャット形式で応答生成（履歴を保持）
    const response = await client.chat(message);
    return response;
  } catch (error) {
    console.error("Gemini AI error:", error);
    // エラー時はフォールバック応答を使用
    return await generateFallbackResponse(message);
  }
}

// フォールバック応答を生成
async function generateFallbackResponse(message: string) {
  const responses = [
    `Actually, regarding "${message}", let me tell you the proper approach. This is quite straightforward, actually.`,
    `Very good question about "${message}"! I was working on similar issue just yesterday only.`,
    `Basically, what you are asking about "${message}" is very common requirement. Let me explain properly...`,
    `Actually, for "${message}", the best practice is to follow the standard approach. This will solve your problem definitely.`,
    `Yes yes, I understand your query about "${message}". Actually, I have implemented similar solution many times.`,
    `Actually, regarding "${message}", let me share my experience. This is exactly what we discussed in our team meeting.`,
    `Basically, for "${message}", you need to understand the core concept first. Then implementation becomes very simple.`,
    `Actually, "${message}" is very interesting topic. I have been working on this for many years, actually.`,
    `Very good point about "${message}"! Actually, this reminds me of one project where we had similar challenge.`,
    `Actually, for "${message}", the solution is quite elegant. Let me tell you the proper way to handle this.`,
  ];

  // ランダムな遅延を追加してリアルな応答時間をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  // メッセージに基づいてより具体的な応答を生成
  if (message.toLowerCase().includes("help")) {
    return randomResponse + " I will definitely help you with this!";
  } else if (message.toLowerCase().includes("error") || message.toLowerCase().includes("bug")) {
    return randomResponse + " Don't worry, we can debug this step by step.";
  } else if (message.toLowerCase().includes("how")) {
    return randomResponse + " Let me walk you through the process properly.";
  } else {
    return randomResponse + " This should work perfectly for your use case.";
  }
}
