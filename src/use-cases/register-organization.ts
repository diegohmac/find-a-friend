import { hash } from 'bcrypt';

import { OrganizationAlreadyExistsError } from '@/errors/organization-already-exists';
import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { OrganizationMissingFieldsError } from '@/errors/organization-missing-fields';

type ExecuteParams = {
  name: string;
  caretakerName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  email: string;
  password: string;
};

export class RegisterOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({ email, password, phone, address, ...data }: ExecuteParams) {
    if (!phone || !address) {
      throw new OrganizationMissingFieldsError();
    }

    const organizationAlreadyExists =
      await this.organizationsRepository.findByEmail(email);

    if (organizationAlreadyExists) {
      throw new OrganizationAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const organization = await this.organizationsRepository.create({
      email,
      passwordHash,
      phone,
      address,
      ...data,
    });

    return {
      organization,
    };
  }
}
