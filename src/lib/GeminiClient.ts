import {
  GoogleGenAI,
  FunctionDeclaration,
  Content,
  FunctionCall,
  FunctionResponse,
  // FunctionCallingConfigMode,
  GenerateContentConfig,
  ToolListUnion,
} from "@google/genai";
import { SYSTEM_PROMPT } from "./ai/systemPrompts";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const AI_MODEL = "gemini-2.0-flash-001";

export interface GeminiConfig {
  apiKey?: string;
  model?: string;
  systemPrompt?: string;
}

export class GeminiClient {
  private ai: GoogleGenAI;
  private model: string;
  private systemPrompt?: string;

  // クライアント内で事前定義された関数設定
  private functionDeclarations: FunctionDeclaration[] = [
    // 例: 天気取得関数
    // {
    //   name: "getWeather",
    //   description: "指定した場所の天気情報を取得する",
    //   parameters: {
    //     type: "object",
    //     properties: {
    //       location: {
    //         type: "string",
    //         description: "天気を知りたい場所"
    //       }
    //     },
    //     required: ["location"]
    //   }
    // }
  ];

  // private functionCallingMode: FunctionCallingConfigMode = FunctionCallingConfigMode.AUTO;

  constructor(config: GeminiConfig = {}) {
    const apiKey = config.apiKey || GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "Gemini API key is required. Set GEMINI_API_KEY environment variable or pass apiKey in config."
      );
    }

    this.ai = new GoogleGenAI({ apiKey });
    this.model = config.model || AI_MODEL;
    this.systemPrompt = config.systemPrompt || SYSTEM_PROMPT
  }

  // ========================================================
  // Function Public Methods
  // ========================================================

  /**
   * メッセージを送信してAI応答を取得（関数呼び出し自動処理）
   */
  public async generateResponse(message: string, history?: Content[]): Promise<string> {
    try {
      const contents = [] as Content[];
      // const tools = [] as ToolListUnion;

      // if (this.systemPrompt) {
      //   contents.push({
      //     role: "user",
      //     parts: [{ text: this.systemPrompt }],
      //   });
      // }

      if (history && history.length > 0) {
        contents.push(...history);
      }

      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const config: GenerateContentConfig = {
        systemInstruction: this.systemPrompt,
      };

      // functionDeclarationsが存在する場合のみtoolsを設定
      if (this.functionDeclarations.length > 0) {
        const tools = [{ functionDeclarations: this.functionDeclarations }] satisfies ToolListUnion;
        config.tools = tools;
      }

      const response = await this.ai.models.generateContent({
        model: this.model,
        contents,
        config,
      });

      // 関数呼び出しがある場合は自動処理
      if (response.functionCalls?.[0]) {
        const functionCall = response.functionCalls[0];
        const functionResponse = await this.handleFunctionCall(functionCall);

        // 関数の結果を含めて最終応答を生成
        const finalResponse = await this.ai.models.generateContent({
          model: this.model,
          contents: [
            ...contents,
            { role: "model", parts: [{ functionCall }] },
            { role: "user", parts: [{ functionResponse }] },
          ],
          config,
        });

        return finalResponse.text || "";
      }

      return response.text || "";
    } catch (error) {
      console.error("Error generating response:", error);
      throw error;
    }
  }

  // ========================================================
  // Function Private Methods
  // ========================================================

  /**
   * 事前定義された関数ハンドラー
   */
  private async handleFunctionCall(functionCall: FunctionCall): Promise<FunctionResponse> {
    const { name } = functionCall;

    switch (name) {
      // case "getWeather":
      //   return {
      //     name: "getWeather",
      //     response: {
      //       weather: `${args.location}の天気は晴れです`
      //     }
      //   };

      default:
        throw new Error(`Unknown function: ${name}`);
    }
  }
}

// 便利な関数としてエクスポート
export function createGeminiClient(config?: GeminiConfig): GeminiClient {
  return new GeminiClient(config);
}

// デフォルトインスタンスを作成
export const gemini = createGeminiClient();
