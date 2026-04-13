import { config } from "@/config";
import OpenAiModel from "./models/openai";

async function main() {
  const openaiModel = new OpenAiModel({
    apiKey: config.OPENAI_API_KEY,
    baseURL: config.OPENAI_API_BASE,
  });

  await openaiModel.generate({
    model: "deepseek-chat",
    messages: [
      { role: "system", content: "你是一个专业的翻译" },
      { role: "user", content: "你好" },
    ],
    stream: true,
    onChunk(chunk) {
      console.log(chunk);
    },
  });
}

main();
