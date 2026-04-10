import OpenAI from "openai";

class OpenAiModel {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
}

export const openAiModel = new OpenAiModel();
