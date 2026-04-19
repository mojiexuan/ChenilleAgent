import { ChatModel, ChatRequest, ChatResult } from "@/types";
import { GoogleGenAI } from "@google/genai";

/**
 * Google模型
 */
class GoogleModel {
    private client: GoogleGenAI;
    private model: ChatModel & { model: string; baseURL: string };

    constructor(init: ChatModel) {
        this.model = {
            baseURL: "https://api.openai.com/v1",
            model: "gpt-5",
            ...init,
        };
        this.client = new GoogleGenAI({
            apiKey: this.model.apiKey,
            httpOptions: {
                baseUrl: this.model.baseURL,
            }
        });
    }

    // async generate(options: ChatRequest): Promise<ChatResult> {
    //     const controller = new AbortController();
    //     let aborted = false;

    //     const abortSignal = () => {
    //         aborted = true;
    //         controller.abort();
    //     };
    //     const result: ChatResult = {
    //         type: "assistant",
    //         message: {
    //             role: "assistant",
    //             content: "",
    //         },
    //         finished: false,
    //     };
    //     // 立即把 abort 暴露给外层
    //     options.onAbort?.(abortSignal);
    //     return this.client.models.generateContent({
    //         model: this.model.model,

    //     })
    // }
}

export { GoogleModel };
