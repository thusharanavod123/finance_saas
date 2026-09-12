import type { FastifyReply, FastifyRequest } from 'fastify';
import type { User } from '@supabase/supabase-js';
import { supabaseAdmin } from '../services/supabase.js';

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}

export async function requireAuth(request: FastifyRequest, reply: FastifyReply) {
  const authorization = request.headers.authorization;
  if (!authorization?.startsWith('Bearer ')) {
    return reply.code(401).send({ error: 'Missing Bearer token' });
  }

  const token = authorization.slice('Bearer '.length);
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) {
    return reply.code(401).send({ error: 'Invalid or expired token' });
  }
  request.user = data.user;
}
