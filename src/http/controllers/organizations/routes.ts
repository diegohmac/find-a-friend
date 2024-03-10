import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { register } from './register';

export async function organizationsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.post('/organizations', register);
}
