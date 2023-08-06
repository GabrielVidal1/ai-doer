import { Command } from '../types';
import { executeBashCommand } from './helpers/bash';

const exec: Command['exec'] = (args: string[]): Promise<string> => {
  console.log('executing bash command');
  return executeBashCommand(args.join(' '));
};

export default {
  name: 'bash',
  exec,
};
