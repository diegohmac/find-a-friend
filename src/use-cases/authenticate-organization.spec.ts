import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcrypt';

import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { AuthenticateOrganizationUseCase } from './authenticate-organization';
import { InvalidCredentialsError } from '@/errors/invalid-credentials';

let organizationsRepository: InMemoryOrganizationsRepository;
let useCase: AuthenticateOrganizationUseCase;

describe('Authenticate Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    useCase = new AuthenticateOrganizationUseCase(organizationsRepository);
  });

  it('should be able to authenticate organization', async () => {
    const passwordHash = await hash('123456', 6);

    await organizationsRepository.create({
      name: 'Cat Lovers',
      caretakerName: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash,
      phone: '+351123123123',
      address: 'Rua dos Gatos, 123',
      city: 'Lisbon',
      zipCode: '1234-123',
    });

    const { organization } = await useCase.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(organization.id).toEqual(expect.any(String));
  });
  it('should not be able to authenticate organization with incorrect email', async () => {
    const passwordHash = await hash('123456', 6);

    await organizationsRepository.create({
      name: 'Cat Lovers',
      caretakerName: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash,
      phone: '+351123123123',
      address: 'Rua dos Gatos, 123',
      city: 'Lisbon',
      zipCode: '1234-123',
    });

    await expect(
      useCase.execute({
        email: 'incorrect@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  it('should not be able to authenticate organization with incorrect password', async () => {
    const passwordHash = await hash('123456', 6);

    await organizationsRepository.create({
      name: 'Cat Lovers',
      caretakerName: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash,
      phone: '+351123123123',
      address: 'Rua dos Gatos, 123',
      city: 'Lisbon',
      zipCode: '1234-123',
    });

    await expect(
      useCase.execute({
        email: 'johndoe@example.com',
        password: 'incorrect-password',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
