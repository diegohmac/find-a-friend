import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository';
import { AuthenticateOrganizationUseCase } from '../authenticate-organization';

export function makeAuthenticateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const useCase = new AuthenticateOrganizationUseCase(organizationsRepository);

  return useCase;
}
