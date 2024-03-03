import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';


export async function organizationsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);
}
