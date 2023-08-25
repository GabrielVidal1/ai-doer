export type Command<T = string> = {
  name: string;
  exec?: (args: string[]) => T | Promise<T>;
};
