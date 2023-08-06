import { COMMAND_TOKEN, FUNCTION_TOKEN } from './constants';

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
      parsedLines.push(parseSpecialLine(line));
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
