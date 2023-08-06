import writeFile from './services/writeFile';
import { AiFunction } from './types';

const FUNCTIONS: AiFunction[] = [writeFile];

export const getFunction = (functionName: string): AiFunction => {
  const functionToExecute = FUNCTIONS.find(f => f.name === functionName);
  if (!functionToExecute) {
    throw new Error(`Function ${functionName} not found`);
  }
  return functionToExecute;
};
