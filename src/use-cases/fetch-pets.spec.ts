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

    const { pets } = await useCase.execute(
      {
        city: 'Lisbon',
      },
      1
    );

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ city: 'Lisbon' })])
    );
  });

  it('should throw error if trying to list pets without city param', async () => {
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

    await expect(useCase.execute({ city: '' }, 1)).rejects.toBeInstanceOf(
      Error
    );
  });

  it('should be able to filter pets by age', async () => {
    petsRepository.pets.push(
      {
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
      },
      {
        id: 'pet-id-2',
        about: '',
        images: [],
        adoptionRequirements: [],
        name: 'Joe',
        age: 'ADULT',
        size: 'LARGE',
        energy: 'MEDIUM',
        independency: 'MEDIUM',
        environment: 'OUTDOOR',
        organizationId: 'org-id',
        city: 'Lisbon',
      }
    );

    const { pets } = await useCase.execute(
      {
        city: 'Lisbon',
        age: 'ADULT',
      },
      1
    );

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ age: 'ADULT' })])
    );
  });

  it('should be able to filter pets by size', async () => {
    petsRepository.pets.push(
      {
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
      },
      {
        id: 'pet-id-2',
        about: '',
        images: [],
        adoptionRequirements: [],
        name: 'Joe',
        age: 'ADULT',
        size: 'SMALL',
        energy: 'MEDIUM',
        independency: 'MEDIUM',
        environment: 'OUTDOOR',
        organizationId: 'org-id',
        city: 'Lisbon',
      }
    );

    const { pets } = await useCase.execute(
      {
        city: 'Lisbon',
        size: 'SMALL',
      },
      1
    );

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ size: 'SMALL' })])
    );
  });

  it('should be able to filter pets by energy', async () => {
    petsRepository.pets.push(
      {
        id: 'pet-id',
        about: '',
        images: [],
        adoptionRequirements: [],
        name: 'Buddy',
        age: 'YOUNG',
        size: 'LARGE',
        energy: 'HIGH',
        independency: 'MEDIUM',
        environment: 'OUTDOOR',
        organizationId: 'org-id',
        city: 'Lisbon',
      },
      {
        id: 'pet-id-2',
        about: '',
        images: [],
        adoptionRequirements: [],
        name: 'Joe',
        age: 'ADULT',
        size: 'SMALL',
        energy: 'MEDIUM',
        independency: 'MEDIUM',
        environment: 'OUTDOOR',
        organizationId: 'org-id',
        city: 'Lisbon',
      }
    );

    const { pets } = await useCase.execute(
      {
        city: 'Lisbon',
        energy: 'HIGH',
      },
      1
    );

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ energy: 'HIGH' })])
    );
  });

  it('should be able to filter pets by independency', async () => {
    petsRepository.pets.push(
      {
        id: 'pet-id',
        about: '',
        images: [],
        adoptionRequirements: [],
        name: 'Buddy',
        age: 'YOUNG',
        size: 'LARGE',
        energy: 'HIGH',
        independency: 'HIGH',
        environment: 'OUTDOOR',
        organizationId: 'org-id',
        city: 'Lisbon',
      },
      {
        id: 'pet-id-2',
        about: '',
        images: [],
        adoptionRequirements: [],
        name: 'Joe',
        age: 'ADULT',
        size: 'SMALL',
        energy: 'MEDIUM',
        independency: 'LOW',
        environment: 'OUTDOOR',
        organizationId: 'org-id',
        city: 'Lisbon',
      }
    );

    const { pets } = await useCase.execute(
      {
        city: 'Lisbon',
        independency: 'LOW',
      },
      1
    );

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ independency: 'LOW' })])
    );
  });

  it('should be able to filter pets by environment', async () => {
    petsRepository.pets.push(
      {
        id: 'pet-id',
        about: '',
        images: [],
        adoptionRequirements: [],
        name: 'Buddy',
        age: 'YOUNG',
        size: 'LARGE',
        energy: 'HIGH',
        independency: 'HIGH',
        environment: 'OUTDOOR',
        organizationId: 'org-id',
        city: 'Lisbon',
      },
      {
        id: 'pet-id-2',
        about: '',
        images: [],
        adoptionRequirements: [],
        name: 'Joe',
        age: 'ADULT',
        size: 'SMALL',
        energy: 'MEDIUM',
        independency: 'LOW',
        environment: 'BOTH',
        organizationId: 'org-id',
        city: 'Lisbon',
      }
    );

    const { pets } = await useCase.execute(
      {
        city: 'Lisbon',
        environment: 'BOTH',
      },
      1
    );

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ environment: 'BOTH' })])
    );
  });
});
