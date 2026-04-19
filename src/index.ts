import "@/bootstrap";
import { openaiChatService } from "@/services";

async function main() {
  await openaiChatService({
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
        }
      }
    ],
    stream: true,
    onChunk(chunk) {
      console.log(chunk);
    },
  });
}

main();
