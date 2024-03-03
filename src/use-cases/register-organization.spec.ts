import { expect, describe, it, beforeEach } from 'vitest';
import { compare } from 'bcrypt';

import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { RegisterOrganizationUseCase } from './register-organization';
import { OrganizationAlreadyExistsError } from '@/errors/organization-already-exists';
import { OrganizationMissingFieldsError } from '@/errors/organization-missing-fields';

let organizationsRepository: InMemoryOrganizationsRepository;
let useCase: RegisterOrganizationUseCase;

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    useCase = new RegisterOrganizationUseCase(organizationsRepository);
  });

  it('should register a new organization', async () => {
    const { organization } = await useCase.execute({
      name: 'Cat Lovers',
      caretakerName: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '+351123123123',
      address: 'Rua dos Gatos, 123',
      city: 'Lisbon',
      zipCode: '1234-123',
    });
    expect(organization.id).toEqual(expect.any(String));
  });
  it('should hash organization password upon registration', async () => {
    const { organization } = await useCase.execute({
      name: 'Cats Lovers',
      caretakerName: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '+351123123123',
      address: 'Rua dos Gatos, 123',
      city: 'Lisbon',
      zipCode: '1234-123',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.passwordHash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
  it('should not allow an organization to be registered with an email that is already in use', async () => {
    const email = 'johndoe@example.com';

    await useCase.execute({
      name: 'Cats Lovers',
      caretakerName: 'John Doe',
      email,
      password: '123456',
      phone: '+351123123123',
      address: 'Rua dos Gatos, 123',
      city: 'Lisbon',
      zipCode: '1234-123',
    });

    await expect(() =>
      useCase.execute({
        name: 'Dogs Lovers',
        caretakerName: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '+351123123123',
        address: 'Rua dos Cachorros, 123',
        city: 'Lisbon',
        zipCode: '1234-123',
      })
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError);
  });
  it('should throw error if attempt to register organization without phone number or address', async () => {
    await expect(() =>
      useCase.execute({
        name: 'Cats Lovers',
        caretakerName: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '',
        address: 'Rua dos Gatos, 123',
        city: 'Lisbon',
        zipCode: '1234-123',
      })
    ).rejects.toBeInstanceOf(OrganizationMissingFieldsError);

    await expect(() =>
      useCase.execute({
        name: 'Dogs Lovers',
        caretakerName: 'John Doe',
        email: 'johndoe2@example.com',
        password: '123456',
        phone: '+351123123123',
        address: '',
        city: 'Lisbon',
        zipCode: '1234-123',
      })
    ).rejects.toBeInstanceOf(OrganizationMissingFieldsError);
  });
});
