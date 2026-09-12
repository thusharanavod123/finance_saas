import type { FastifyPluginAsync } from 'fastify';
import type { ChatRequest, ChatResponse } from '@financeflow/types';
import { requireAuth } from '../middleware/auth.js';

export const chatRoutes: FastifyPluginAsync = async (app) => {
  app.post<{ Body: ChatRequest; Reply: ChatResponse | { error: string } }>(
    '/chat',
    {
      preHandler: requireAuth,
      schema: {
        body: {
          type: 'object',
          required: ['message'],
          additionalProperties: false,
          properties: { message: { type: 'string', minLength: 1, maxLength: 10_000 } },
        },
      },
    },
    async (request) => ({ message: request.body.message }),
  );
};
