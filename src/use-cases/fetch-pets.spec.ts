import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { FetchPetsUseCase } from './fetch-pets';

let petsRepository: InMemoryPetsRepository;
let useCase: FetchPetsUseCase;

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    useCase = new FetchPetsUseCase(petsRepository);
  });

  it('should be able to list all pets within a city', async () => {
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

    const { pets } = await useCase.execute({
      city: 'Lisbon',
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ city: 'Lisbon' })])
    );
  });
});
