import fs from 'fs';
import { COMMAND_TOKEN, FUNCTION_TOKEN } from './constants';
import { CommandLine, FunctionLine, Line } from './types';

const CUSTOM_COMMAND_FOLDERS = './customCommands';

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
    let content = fs.readFileSync(commandFile, 'utf8');
    for (let i = 0; i < args.length; i++) {
      content = content.replaceAll(`{${i}}`, args[i + 1]);
    }
    console.log(content);
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
    if (line.startsWith(COMMAND_TOKEN) || line.startsWith(FUNCTION_TOKEN)) {
      if (current) {
        parsedLines.push({ type: 'string', value: current });
      }
      current = '';
      const specialLine = parseSpecialLine(line);
      if (specialLine.type === 'command' && specialLine.name === 'command') {
        parsedLines.push(...parseContent(getSubCommand(specialLine.args)));
      } else {
        parsedLines.push(specialLine);
      }
    } else {
      current += line + '\n';
    }
  }
  if (current.trim().length > 0) {
    parsedLines.push({ type: 'string', value: current });
  }

  // Remove empty lines
  return parsedLines.filter(
    line => line.type !== 'string' || line.value.trim().length > 0
  );
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
