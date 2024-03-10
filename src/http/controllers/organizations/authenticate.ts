import { InvalidCredentialsError } from '@/errors/invalid-credentials';
import { makeAuthenticateOrganizationUseCase } from '@/use-cases/factories/make-authenticate-organization';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateOrganizationUseCase();
    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign({
      sign: {
        sub: organization.id,
      },
    });

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: organization.id,
        expiresIn: '7d',
      },
    });

    return reply
      .setCookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: true,
        path: '/',
      })
      .status(200)
      .send({
        token,
      });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: err.message,
      });
    }
    throw err;
  }
}
