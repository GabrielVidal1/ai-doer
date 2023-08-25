import fs from 'fs';

const COMMAND_FOLDERS = './commands';

const exec = async (args: string[]): Promise<string> => {
  const command = args[0];
  const commandFile = `${COMMAND_FOLDERS}/${command}.md`;

  try {
    const content = await fs.promises.readFile(commandFile, 'utf8');
    for (let i = 1; i < args.length; i++) {
      content.replace(`{${i}}`, args[i]);
    }
    return content;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Unknown error';
  }
};

export default {
  name: 'command',
  exec,
};
