import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { AiFunction, StandardFunction } from '../types';
import path from 'path';

const exec =
  (cliArgs: string[]) =>
  (args: { content: string }): string => {
    const content = args.content;
    const filePath = cliArgs[0];

    if (!filePath) {
      throw new Error('No file path provided');
    }

    const folderPath = path.dirname(filePath);
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true });
    }

    writeFileSync(filePath, content);

    return 'File written';
  };

const openaiFunction: StandardFunction['openaiFunction'] = {
  name: 'writeFile',
  description: 'Write a file to the file system',
  parameters: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        description: 'The content to write to the file',
      },
    },
  },
};

const writeFile: AiFunction = {
  name: 'writeFile',
  exec,
  openaiFunction,
};

export default writeFile;
