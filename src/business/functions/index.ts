import { aiClient } from '../ai';
import { FunctionLine } from '../parser';
import { ProcessedLine } from '../processor';
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
  processedLines: ProcessedLine[]
): Promise<string> => {
  const func = getFunction(line.name);

  if (isPromptFunction(func)) {
    return aiClient.getResult(processedLines, func);
  }
  const commandArgs = await aiClient.getCommandArgs(processedLines, func);
  console.log('commandArgs', commandArgs);
  const result = func.exec(line.args)(commandArgs);
  return result;
};
