import { PromptFunction, StandardFunction } from '../functions/types';
import { ProcessedLine } from '../processor/types';

export interface AIClient {
  getCommandArgs?: (
    processedLines: ProcessedLine[],
    func: StandardFunction
  ) => Promise<any>;

  getResult: (
    processedLines: ProcessedLine[],
    func: PromptFunction
  ) => Promise<string>;
}
