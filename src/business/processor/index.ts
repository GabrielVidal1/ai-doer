import { executeCommand } from '../commands';
import { executeFunction } from '../functions';
import { Line, parseContent } from '../parser';

export type ProcessedLine =
  | {
      type: 'string';
      value: string;
    }
  | {
      type: 'command';
      name: string;
      args: string[];
      result: string;
    }
  | {
      type: 'function';
      name: string;
      args: string[];
      generatedArgs?: any;
      result: string;
    }
  | {
      type: 'error';
      value: string;
    };

export const printProcessedLines = (lines: ProcessedLine[]): void => {
  lines.forEach(line => {
    if (line.type === 'string') {
      console.log(line.value);
    } else if (line.type === 'command') {
      console.log(`Command ${line.name} executed with result: ${line.result}`);
    } else if (line.type === 'function') {
      console.log(`Function ${line.name} executed with result: ${line.result}`);
    } else {
      console.log(`Error: ${line.value}`);
    }
  });
};

const processLines = async (lines: Line[]): Promise<ProcessedLine[]> => {
  const processedLines: ProcessedLine[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    try {
      if (line.type === 'string') {
        processedLines.push(line);
      } else if (line.type === 'command') {
        const result = await executeCommand(line);
        processedLines.push({
          ...line,
          result,
        });
      } else {
        const result = await executeFunction(line, processedLines);
        processedLines.push({
          ...line,
          result,
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        processedLines.push({ type: 'error', value: e.message });
      }
    }
  }
  return processedLines;
};

export const processText = async (text: string): Promise<ProcessedLine[]> => {
  const lines = parseContent(text);
  const res = await processLines(lines);
  return res;
};
