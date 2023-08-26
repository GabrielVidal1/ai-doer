export type CommandLine = {
  type: 'command';
  name: string;
  args: string[];
};

export type StringBlock = {
  type: 'string';
  value: string;
};

export type FunctionLine = {
  type: 'function';
  name: string;
  args: string[];
};

export type Line = CommandLine | FunctionLine | StringBlock;
