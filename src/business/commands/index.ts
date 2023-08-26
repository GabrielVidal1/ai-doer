import { CommandLine } from '../parser/types';
import bash from './services/bash';
import readFile from './services/readFile';
import clear from './services/clear';
import summarize from './services/summarize';
import { Command } from './types';
import { ProcessedLine } from '../processor/types';

const COMMANDS: Command[] = [
  bash,
  readFile,
  { name: 'command' },
  clear,
  summarize,
];

export const executeCommand = async (
  command: CommandLine,
  history: ProcessedLine[]
): Promise<ProcessedLine[]> => {
  const commandToExecute = COMMANDS.find(c => c.name === command.name);
  if (!commandToExecute) {
    throw new Error(`Command ${command.name} not found`);
  }
  const result = (await commandToExecute.exec?.(command.args)) ?? '';
  history.push({
    ...command,
    result,
  });
  return (await commandToExecute.processLines?.(history)) ?? history;
};
