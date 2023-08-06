export type Command = {
  name: string;
  exec: (args: string[]) => string | Promise<string>;
};
