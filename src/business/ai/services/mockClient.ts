import { PromptFunction, StandardFunction } from '../../functions/types';
import { ProcessedLine } from '../../processor/types';
import { AIClient } from '../types';

class MockAIClient implements AIClient {
  public getCommandArgs = async (
    processedLines: ProcessedLine[],
    func: StandardFunction
  ) => {
    return Promise.resolve({});
  };

  public getResult = (processedLines: ProcessedLine[], func: PromptFunction) =>
    Promise.resolve('qsdqsdqsd');
}

export default MockAIClient;
