import { z } from "zod/v4";
import { buildTool } from "../tools";
import { APP_FEEDBACK_TOOL_NAME } from "./prompt";

/**
 * 应用反馈工具
 */
export const AppFeedbackTool = buildTool({
  name: APP_FEEDBACK_TOOL_NAME,
  maxResultSizeChars: 100_000,
  prompt(options) {
    return Promise.resolve("请输入您的应用反馈");
  },
  inputSchema: z.object({
    description: z.string().trim().min(1),
  }),
  description(input, options) {
    return Promise.resolve("用于收集用户反馈的工具");
  },
  call(args, onProgress) {
    return Promise.resolve({
      data: args.description,
    });
  },
});
