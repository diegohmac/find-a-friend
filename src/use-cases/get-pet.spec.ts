import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { GetPetUseCase } from './get-pet';

let petsRepository: InMemoryPetsRepository;
let useCase: GetPetUseCase;

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    useCase = new GetPetUseCase(petsRepository);
  });

  it('should be able to get pet by ID', async () => {
    petsRepository.pets.push({
      id: 'pet-id',
      about: '',
      images: [],
      adoptionRequirements: [],
      name: 'Buddy',
      age: 'YOUNG',
      size: 'LARGE',
      energy: 'MEDIUM',
      independency: 'MEDIUM',
      environment: 'OUTDOOR',
      organizationId: 'org-id',
      city: 'Lisbon',
    });

    const { pet } = await useCase.execute({ petId: 'pet-id' });

    expect(pet).toEqual(expect.objectContaining({ id: 'pet-id' }));
  });
});
