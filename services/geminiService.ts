import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateFinancialAdvice = async (
  query: string, 
  contextData: string
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "请配置 API Key 以使用 AI 功能。";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User Query: ${query}\n\nCurrent Market Context (JSON): ${contextData}`,
      config: {
        systemInstruction: `You are "Zhangle AI", a professional financial assistant for Huatai Securities. 
        Analyze the user's question based on the provided market context if relevant.
        Keep answers concise, professional, and friendly. 
        Use formatting like lists or bold text for readability.
        Important: In the context of Chinese stocks, RED means UP (Positive), GREEN means DOWN (Negative).
        If the user asks for investment advice, provide analysis but add a disclaimer that this is not financial advice.
        Output in Chinese.`,
        temperature: 0.7,
      }
    });
    
    return response.text || "抱歉，我现在无法回答这个问题。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "网络繁忙，请稍后再试。";
  }
};
