import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { RegisterPetUseCase } from './register-pet';

let petsRepository: InMemoryPetsRepository;
let useCase: RegisterPetUseCase;

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    useCase = new RegisterPetUseCase(petsRepository);
  });

  it('should be able to register a pet to an organization', async () => {
    const { pet } = await useCase.execute({
      name: 'Buddy',
      age: 'YOUNG',
      size: 'LARGE',
      energy: 'MEDIUM',
      independency: 'MEDIUM',
      environment: 'OUTDOOR',
      organizationId: 'org-id',
      city: 'Lisbon',
    });
    expect(pet.id).toEqual(expect.any(String));
  });
});
