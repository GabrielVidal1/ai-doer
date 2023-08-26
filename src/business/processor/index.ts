import { executeCommand } from '../commands';
import { executeFunction } from '../functions';
import { parseContent } from '../parser';
import { Line } from '../parser/types';
import { ProcessedLine } from './types';

export const printProcessedLines = (lines: ProcessedLine[]): void => {
  lines.forEach(line => {
    if (line.type === 'string') {
      console.log(line.value.trimEnd() + '\n');
    } else if (line.type === 'command') {
      console.log(
        `/${line.name} ${line.args.join(' ')}\n${line.result.trim()}`
      );
    } else if (line.type === 'function') {
      console.log(
        `> ${line.name} ${line.args.join(' ')}\n${line.result.trim()}`
      );
    } else {
      console.log(`Error: ${line.value}`);
    }
  });
};

const processLines = async (
  lines: Line[],
  noFunctions = false
): Promise<ProcessedLine[]> => {
  let processedLines: ProcessedLine[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    try {
      if (line.type === 'string') {
        processedLines.push(line);
      } else if (line.type === 'command') {
        processedLines = await executeCommand(line, processedLines);
      } else if (line.type === 'function') {
        if (!noFunctions) {
          processedLines = await executeFunction(line, processedLines);
        } else {
          processedLines.push({ ...line, result: 'NA' });
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        processedLines.push({ type: 'error', value: e.message });
      }
    }
  }
  return processedLines;
};

export const processText = async (
  text: string,
  noFunctions = false
): Promise<ProcessedLine[]> => {
  const lines = parseContent(text);
  const res = await processLines(lines, noFunctions);
  return res;
};
