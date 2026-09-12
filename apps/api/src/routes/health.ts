import type { FastifyPluginAsync } from 'fastify';
import type { HealthResponse } from '@financeflow/types';

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get<{ Reply: HealthResponse }>('/health', async () => ({ status: 'ok' }));
};
