import "@/bootstrap";
import { deepseekChatService } from "@/services";

async function main() {
  await deepseekChatService({
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
