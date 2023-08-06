import { CommandLine } from '../parser';
import bash from './services/bash';
import readFile from './services/readFile';
import { Command } from './types';

const COMMANDS: Command[] = [bash, readFile];

export const executeCommand = async (command: CommandLine): Promise<string> => {
  const commandToExecute = COMMANDS.find(c => c.name === command.name);
  if (!commandToExecute) {
    throw new Error(`Command ${command.name} not found`);
  }
  return commandToExecute.exec(command.args);
};