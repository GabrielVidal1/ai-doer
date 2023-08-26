import { readFileSync } from 'fs';

const exec = (args: string[]): string => {
  if (process.env.DEBUG_COMMANDS === 'true') {
    console.log('executing bash command');
  }
  const filePath = args[0];
  if (!filePath) {
    throw new Error('No file path provided');
  }

  return readFileSync(filePath, 'utf8');
};

export default {
  name: 'readFile',
  exec,
};
