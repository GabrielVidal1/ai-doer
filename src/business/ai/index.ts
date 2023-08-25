import MockAIClient from './services/mockClient';
import OpenAiClient from './services/openAiClient';

const aiClientFactory = (type?: string) => {
  if (type === 'openai') {
    return new OpenAiClient();
  }
  if (type !== 'mock') {
    console.warn(
      `Unsupported AI Client type : ${type}, defaulting to mocked service`
    );
  }
  return new MockAIClient();
};

export const aiClient = aiClientFactory(process.env.AI_CLIENT);
