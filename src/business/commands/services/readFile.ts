import fs from 'fs';

const exec = (args: string[]): string => {
  console.log('executing bash command');
  const filePath = args[0];
  if (!filePath) {
    throw new Error('No file path provided');
  }
  return fs.readFileSync(filePath, 'utf8');
};

export default {
  name: 'readFile',
  exec,
};
