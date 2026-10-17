// packages/ai/src/llm/openai.ts
// OpenAI client used by the portal chatbot and office assistant.

import OpenAI from 'openai';

export const DEFAULT_OPENAI_MODEL = 'gpt-4o-mini';

let client: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (client) return client;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is missing');
  }
  client = new OpenAI({ apiKey });
  return client;
}

export function getOpenAIModel(): string {
  return process.env.OPENAI_MODEL || DEFAULT_OPENAI_MODEL;
}
