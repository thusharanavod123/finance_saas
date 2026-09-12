import cors from '@fastify/cors';
import Fastify from 'fastify';
import { chatRoutes } from './routes/chat.js';
import { healthRoutes } from './routes/health.js';

export function buildApp() {
  const app = Fastify({ logger: true });
  const webOrigin = process.env.WEB_ORIGIN ?? 'http://localhost:5173';

  void app.register(cors, { origin: webOrigin });
  void app.register(healthRoutes, { prefix: '/api' });
  void app.register(chatRoutes, { prefix: '/api' });

  return app;
}
