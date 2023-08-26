import { aiClient } from '../ai';
import { FunctionLine } from '../parser/types';
import { ProcessedLine } from '../processor/types';
import bash from './services/bash';
import think from './services/think';
import writeFile from './services/writeFile';
import { AiFunction, isPromptFunction } from './types';

const FUNCTIONS: AiFunction[] = [writeFile, think, bash];

export const getFunction = (functionName: string): AiFunction => {
  const functionToExecute = FUNCTIONS.find(f => f.name === functionName);
  if (!functionToExecute) {
    throw new Error(`Function ${functionName} not found`);
  }
  return functionToExecute;
};

export const executeFunction = async (
  line: FunctionLine,
  history: ProcessedLine[]
): Promise<ProcessedLine[]> => {
  const func = getFunction(line.name);
  let result = '';
  let commandArgs: any = undefined;
  if (isPromptFunction(func)) {
    result = await aiClient.getResult(history, func);
  } else {
    commandArgs = await aiClient.getCommandArgs(history, func);
    if (process.env.DEBUG_COMMANDS === 'true') {
      console.log('commandArgs', commandArgs);
    }
    result = await func.exec(line.args)(commandArgs);
  }
  history.push({
    ...line,
    result,
    generatedArgs: commandArgs,
  });
  return history;
};
