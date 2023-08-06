import { writeFileSync } from 'fs';
import { AiFunction } from '../types';

const exec =
  (cliArgs: string[]) =>
  (args: any): string => {
    const content = args.content;
    const filePath = cliArgs[0];

    if (!filePath) {
      throw new Error('No file path provided');
    }

    writeFileSync(filePath, content);

    return 'File written';
  };

const openaiFunction: AiFunction['openaiFunction'] = {
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
