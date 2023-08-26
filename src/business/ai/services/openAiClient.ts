import 'dotenv/config';
import OpenAI from 'openai';
import { ChatCompletionMessage } from 'openai/resources/chat';
import { PromptFunction, StandardFunction } from '../../functions/types';
import { COMMAND_TOKEN } from '../../parser/constants';
import { ProcessedLine } from '../../processor/types';
import { AIClient } from '../types';

const SYSTEM_PROMPT =
  'You are a software engineer trying to help the user translate their specs into code';

export const lineToMessage = (line: ProcessedLine): ChatCompletionMessage => {
  if (line.type === 'function') {
    return {
      role: 'assistant',
      function_call: {
        name: line.name,
        arguments: JSON.stringify(line.generatedArgs),
      },
      content: null,
    };
  } else if (line.type === 'command') {
    return {
      role: 'user',
      content: `${line.result}`,
    };
  } else {
    return {
      role: 'user',
      content: line.value,
    };
  }
};

class OpenAiClient implements AIClient {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
  });
  private config = {
    model: 'gpt-4',
  };

  public getResult = async (
    processedLines: ProcessedLine[],
    func: PromptFunction
  ): Promise<string> => {
    const conv = processedLines.map(lineToMessage);

    const stream = await this.openai.chat.completions.create({
      ...this.config,
      stream: true,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...conv,
        { role: 'user', content: func.prompt },
      ],
    });
    let result = '';
    for await (const part of stream) {
      result += part.choices[0]?.delta?.content || '';
      process.stdout.write(part.choices[0]?.delta?.content || '');
    }
    return result;
  };

  public getCommandArgs = async (
    processedLines: ProcessedLine[],
    func: StandardFunction
  ): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const chatCompletion = await this.openai.chat.completions.create({
      ...this.config,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...processedLines.map(lineToMessage),
      ],
      function_call: { name: func.name },
      functions: [func.openaiFunction],
    });
    const call = chatCompletion.choices[0].message.function_call;
    if (call) {
      const name = call.name;
      if (name !== func.name) {
        throw new Error(`Function name mismatch: ${name} !== ${func.name}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse(call.arguments);
    }
  };
}

export default OpenAiClient;
