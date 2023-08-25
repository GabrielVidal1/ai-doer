import fs from 'fs';
import { COMMAND_TOKEN, FUNCTION_TOKEN } from './constants';

const CUSTOM_COMMAND_FOLDERS = './customCommands';

export type CommandLine = {
  type: 'command';
  name: string;
  args: string[];
};

export type FunctionLine = {
  type: 'function';
  name: string;
  args: string[];
};

export type StringBlock = {
  type: 'string';
  value: string;
};

export type Line = CommandLine | FunctionLine | StringBlock;

const parseSpecialLine = (line: string): CommandLine | FunctionLine => {
  const lineType = line[0] === COMMAND_TOKEN ? 'command' : 'function';
  const [name, ...args] = line.slice(1).trim().split(' ');
  return {
    type: lineType,
    name: name,
    args,
  };
};

const getSubCommand = (args: string[]): string => {
  const command = args[0];
  const commandFile = `${CUSTOM_COMMAND_FOLDERS}/${command}.md`;

  try {
    console.log(commandFile);
    const content = fs.readFileSync(commandFile, 'utf8');
    for (let i = 1; i < args.length; i++) {
      content.replace(`{${i}}`, args[i]);
    }
    return content;
  } catch (error) {
    throw new Error('Unknown custom command');
  }
};

export const parseContent = (fileContent: string): Line[] => {
  const lines = fileContent.split('\n');
  const parsedLines: Line[] = [];
  let current = '';
  for (const line of lines) {
    console.log(line);
    if (line.startsWith(COMMAND_TOKEN) || line.startsWith(FUNCTION_TOKEN)) {
      if (current) {
        parsedLines.push({ type: 'string', value: current });
      }
      current = '';
      const specialLine = parseSpecialLine(line);
      parsedLines.push(specialLine);
      if (specialLine.type === 'command' && specialLine.name === 'command') {
        parsedLines.push(...parseContent(getSubCommand(specialLine.args)));
      }
    } else {
      current += line;
    }
  }
  if (current) {
    parsedLines.push({ type: 'string', value: current });
  }
  return parsedLines;
};

export const printLines = (lines: Line[]): void => {
  for (const line of lines) {
    if (line.type === 'string') {
      console.log(line.value);
    } else {
      console.log(`${line.type}: ${line.name}(${line.args.join(', ')})`);
    }
  }
};
