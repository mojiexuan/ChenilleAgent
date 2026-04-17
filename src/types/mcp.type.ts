export interface MCP {
  name: string;
  description: string;
  // MCP 服务的传输协议
  transport: "http" | "sse" | "stdio";
  // MCP 服务的端点
  endpoint: string;
}
