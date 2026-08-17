/** Read a structured message object or array. String lookups remain fully key-typed through next-intl. */
export function rawMessage<T>(translator: unknown, key: string): T {
  return (translator as { raw: (messageKey: string) => unknown }).raw(key) as T;
}
