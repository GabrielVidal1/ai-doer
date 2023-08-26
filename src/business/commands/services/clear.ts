import { ProcessedLine } from '../../processor/types';
import { Command } from '../types';

const config: Command = {
  name: 'clear',
  processLines: (_history: ProcessedLine[]): Promise<ProcessedLine[]> => {
    return Promise.resolve([]);
  },
};

export default config;
