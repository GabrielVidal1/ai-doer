import { ProcessedLine } from '../processor/types';

export type Command<T = string> = {
  name: string;
  exec?: (args: string[]) => T | Promise<T>;
  processLines?: (history: ProcessedLine[]) => Promise<ProcessedLine[]>;
};
