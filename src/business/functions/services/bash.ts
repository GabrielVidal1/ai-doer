import { executeBashCommand } from '../../commands/services/helpers/bash';
import { AiFunction, StandardFunction } from '../types';

const exec =
  () =>
  (args: any): Promise<string> => {
    const command = args.command;
    return executeBashCommand(command);
  };

const openaiFunction: StandardFunction['openaiFunction'] = {
  name: 'bash',
  description: 'Execute a bash command',
  parameters: {
    type: 'object',
    properties: {
      command: {
        type: 'string',
        description: 'The bash command to execute',
      },
    },
    required: ['command'],
  },
};

const bash: AiFunction = {
  name: 'bash',
  exec,
  openaiFunction,
};

export default bash;
