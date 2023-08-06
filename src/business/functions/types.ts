import { CompletionCreateParams } from 'openai/resources/chat';

export type AiFunction = {
  name: string;
  exec: (args: string[]) => (args: any) => string;
  openaiFunction: CompletionCreateParams.Function;
};
