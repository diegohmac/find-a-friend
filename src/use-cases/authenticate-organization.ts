import { compare } from 'bcrypt';

import { InvalidCredentialsError } from '@/errors/invalid-credentials';
import { OrganizationsRepository } from '@/repositories/organizations-repository';

type AuthenticateOrganizationParams = {
  email: string;
  password: string;
};

export class AuthenticateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({ email, password }: AuthenticateOrganizationParams) {
    const organization = await this.organizationsRepository.findByEmail(email);

    if (!organization) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await compare(password, organization.passwordHash);

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      organization,
    };
  }
}
