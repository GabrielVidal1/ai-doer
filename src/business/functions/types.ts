import { CompletionCreateParams } from 'openai/resources/chat';

export type PromptFunction = {
  name: string;
  prompt: string;
};

export type StandardFunction = {
  name: string;
  exec: (args: string[]) => (args: any) => string;
  openaiFunction: CompletionCreateParams.Function;
};

export type AiFunction = StandardFunction | PromptFunction;

export const isPromptFunction = (func: AiFunction): func is PromptFunction => {
  return 'prompt' in func;
};
