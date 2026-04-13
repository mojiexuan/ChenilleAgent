import { Tool, Tools, AnyToolDef, BuiltTool } from "@/types";

// 工具默认值
export const TOOL_DEFAULTS = {
  isEnabled: () => true,
  isConcurrencySafe: (_input?: unknown) => false,
  isReadOnly: (_input?: unknown) => false,
  isDestructive: (_input?: unknown) => false,
};

/**
 * 检查工具是否与给定名称（主要名称或别名）匹配
 * @param tool 工具
 * @param name 名称
 * @returns 是否匹配
 */
export function toolMatchesName(
  tool: { name: string; aliases?: string[] },
  name: string,
): boolean {
  return tool.name === name || (tool.aliases?.includes(name) ?? false);
}

/**
 * 从工具列表中按名称或别名查找工具
 * @param tools 工具列表
 * @param name 名称
 * @returns 工具
 */
export function findToolByName(tools: Tools, name: string): Tool | undefined {
  return tools.find((t) => toolMatchesName(t, name));
}

/**
 * 构建工具
 */
export function buildTool<D extends AnyToolDef>(def: D): BuiltTool<D> {
  return {
    ...TOOL_DEFAULTS,
    ...def,
  } as BuiltTool<D>;
}
