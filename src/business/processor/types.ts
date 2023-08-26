import { StringBlock } from '../parser/types';

export type ProcessedCommand = {
  type: 'command';
  name: string;
  args: string[];
  result: string;
};

export type ProcessedFunction = {
  type: 'function';
  name: string;
  args: string[];
  generatedArgs?: any;
  result: string;
};

export type ProcessingError = {
  type: 'error';
  value: string;
};

export type ProcessedLine =
  | StringBlock
  | ProcessedCommand
  | ProcessedFunction
  | ProcessingError;
