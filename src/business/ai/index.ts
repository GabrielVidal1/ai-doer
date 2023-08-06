import 'dotenv/config';
import OpenAI from 'openai';
import { ChatCompletionMessage } from 'openai/resources/chat';
import { AiFunction } from '../functions/types';
import { COMMAND_TOKEN } from '../parser/constants';
import { ProcessedLine } from '../processor';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

export const lineToMessage = (line: ProcessedLine): ChatCompletionMessage => {
  if (line.type === 'function') {
    return {
      role: 'assistant',
      function_call: { name: line.name, arguments: line.generatedArgs },
      content: null,
    };
  } else if (line.type === 'command') {
    return {
      role: 'user',
      content: `${COMMAND_TOKEN}${line.name} ${line.args.join(' ')}
${line.result}`,
    };
  } else {
    return {
      role: 'user',
      content: line.value,
    };
  }
};

export const getCommandArgs = async (
  processedLines: ProcessedLine[],
  func: AiFunction
): Promise<any> => {
  const conv = processedLines.map(lineToMessage);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [...conv, { role: 'user', content: 'Hello!' }],
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
