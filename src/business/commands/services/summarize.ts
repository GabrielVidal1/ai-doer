import { aiClient } from '../../ai';
import { ProcessedLine } from '../../processor/types';
import { Command } from '../types';

const config: Command = {
  name: 'summarize',
  processLines: async (history: ProcessedLine[]): Promise<ProcessedLine[]> => {
    const result = await aiClient.getResult(history, {
      name: 'summarize',
      prompt:
        'Summarize all the previous text to keep only essential informations',
    });

    return [{ type: 'string', value: result }];
  },
};

export default config;
