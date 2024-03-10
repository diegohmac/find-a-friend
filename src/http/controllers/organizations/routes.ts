import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { register } from './register';
import { authenticate } from './authenticate';

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', register);
  app.post('/organizations/login', { preHandler: verifyJWT }, authenticate);
}
