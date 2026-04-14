/**
 * 中断信号
 * 用于取消异步操作
 */
export interface AbortSignal {
  abort?: () => void;
}
