import "@/bootstrap";
import { config } from "@/config";
import { aiChatService } from "@/services";

async function main() {
  await aiChatService({
    provider: "deepseek",
    apiKey: config.OPENAI_API_KEY,
    baseURL: config.OPENAI_API_BASE,
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
