import {
  ContentListUnion,
  FunctionCallingConfigMode,
  GoogleGenAI,
  FunctionDeclaration,
  Content,
  GenerateContentConfig,
  GenerateContentResponse,
  FunctionCall,
  FunctionResponse,
} from "@google/genai";

export interface GeminiConfig {
  apiKey?: string;
  model?: string;
  systemPrompt?: string;
  functionDeclarations?: FunctionDeclaration[];
  functionCallingMode?: FunctionCallingConfigMode;
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export class GeminiClient {
  private ai: GoogleGenAI;
  private model: string;
  private systemPrompt?: string;
  private functionDeclarations?: FunctionDeclaration[];
  private functionCallingMode: FunctionCallingConfigMode;
  private chatHistory: Content[] = [];

  constructor(config: GeminiConfig = {}) {
    const apiKey = config.apiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "Gemini API key is required. Set GEMINI_API_KEY environment variable or pass apiKey in config."
      );
    }

    this.ai = new GoogleGenAI({ apiKey });
    this.model = config.model || "gemini-2.0-flash-001";
    this.systemPrompt = config.systemPrompt;
    this.functionDeclarations = config.functionDeclarations;
    this.functionCallingMode = config.functionCallingMode || FunctionCallingConfigMode.AUTO;
  }

  /**
   * システムプロンプトを設定
   */
  setSystemPrompt(prompt: string): void {
    this.systemPrompt = prompt;
  }

  /**
   * 関数宣言を設定
   */
  setFunctionDeclarations(declarations: FunctionDeclaration[]): void {
    this.functionDeclarations = declarations;
  }

  /**
   * チャット履歴をクリア
   */
  clearHistory(): void {
    this.chatHistory = [];
  }

  /**
   * チャット履歴を取得
   */
  getHistory(): Content[] {
    return this.chatHistory;
  }

  /**
   * 単発の質問応答
   */
  async ask(question: string): Promise<string> {
    try {
      const contents: Content[] = [];

      // システムプロンプトがあれば追加
      if (this.systemPrompt) {
        contents.push({
          role: "user",
          parts: [{ text: this.systemPrompt }],
        });
      }

      contents.push({
        role: "user",
        parts: [{ text: question }],
      });

      const config: GenerateContentConfig = {};

      // 関数宣言があれば設定
      if (this.functionDeclarations && this.functionDeclarations.length > 0) {
        config.tools = [{ functionDeclarations: this.functionDeclarations }];
        config.toolConfig = {
          functionCallingConfig: {
            mode: this.functionCallingMode,
          },
        };
      }

      const response = await this.ai.models.generateContent({
        model: this.model,
        contents,
        config,
      });

      return response.text || "";
    } catch (error) {
      console.error("Error in ask:", error);
      throw error;
    }
  }

  /**
   * チャット形式で会話（履歴を保持）
   */
  async chat(message: string): Promise<string> {
    try {
      // ユーザーメッセージを履歴に追加
      this.chatHistory.push({
        role: "user",
        parts: [{ text: message }],
      });

      const contents: Content[] = [...this.chatHistory];

      // システムプロンプトがあれば先頭に追加
      if (this.systemPrompt) {
        contents.unshift({
          role: "user",
          parts: [{ text: this.systemPrompt }],
        });
      }

      const config: GenerateContentConfig = {};

      // 関数宣言があれば設定
      if (this.functionDeclarations && this.functionDeclarations.length > 0) {
        config.tools = [{ functionDeclarations: this.functionDeclarations }];
        config.toolConfig = {
          functionCallingConfig: {
            mode: this.functionCallingMode,
          },
        };
      }

      const response = await this.ai.models.generateContent({
        model: this.model,
        contents,
        config,
      });

      const responseText = response.text || "";

      // レスポンスを履歴に追加
      this.chatHistory.push({
        role: "model",
        parts: [{ text: responseText }],
      });

      return responseText;
    } catch (error) {
      console.error("Error in chat:", error);
      throw error;
    }
  }

  /**
   * 関数呼び出しを含む高度な生成
   */
  async generateWithFunctions(
    message: string,
    functionHandler?: (functionCall: FunctionCall) => Promise<FunctionResponse>
  ): Promise<string> {
    try {
      const contents: Content[] = [];

      if (this.systemPrompt) {
        contents.push({
          role: "user",
          parts: [{ text: this.systemPrompt }],
        });
      }

      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const config: GenerateContentConfig = {};

      if (this.functionDeclarations && this.functionDeclarations.length > 0) {
        config.tools = [{ functionDeclarations: this.functionDeclarations }];
        config.toolConfig = {
          functionCallingConfig: {
            mode: this.functionCallingMode,
          },
        };
      }

      const response = await this.ai.models.generateContent({
        model: this.model,
        contents,
        config,
      });

      // 関数呼び出しがある場合
      if (response.functionCalls?.[0] && functionHandler) {
        const functionCall = response.functionCalls[0];
        const functionResponse = await functionHandler(functionCall);

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
      console.error("Error in generateWithFunctions:", error);
      throw error;
    }
  }

  /**
   * カスタム設定でコンテンツ生成
   */
  async generateContent(params: {
    model?: string;
    contents: ContentListUnion;
    config?: GenerateContentConfig;
  }): Promise<GenerateContentResponse> {
    try {
      const request = {
        model: params.model || this.model,
        contents: params.contents,
        config: params.config,
      };

      return await this.ai.models.generateContent(request);
    } catch (error) {
      console.error("Error in generateContent:", error);
      throw error;
    }
  }
}

// 便利な関数としてエクスポート
export function createGeminiClient(config?: GeminiConfig): GeminiClient {
  return new GeminiClient(config);
}

// デフォルトインスタンスを作成
export const gemini = createGeminiClient();
