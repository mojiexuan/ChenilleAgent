import { ClientService } from "@/services";
import { config } from "./config";
import { AIProvider } from "./enumeration";

const clientService = new ClientService();

async function main() {
  await clientService.chat(
    {
      provider: AIProvider.OpenAI,
      apiKey: config.OPENAI_API_KEY,
      baseURL: config.OPENAI_API_BASE,
      model: config.OPENAI_API_MODEL,
    },
    {
      messages: [
        {
          type: "system",
          message: "你是一个专业的翻译",
        },
        {
          type: "user",
          message: {
            role: "user",
            content: "你好",
          },
        },
      ],
      stream: true,
      onChunk(chunk) {
        console.log(chunk);
      },
    },
  );
}

main();
