import { OrganizationAlreadyExistsError } from '@/errors/organization-already-exists';
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    caretakerName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    zipCode: z.string(),
  });

  const body = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterOrganizationUseCase();
    await registerUseCase.execute(body);
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      });
    }
    throw err;
  }

  return reply.status(201).send();
}
