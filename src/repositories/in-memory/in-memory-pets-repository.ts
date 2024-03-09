import { randomUUID } from 'node:crypto';
import { Pet, Prisma } from '@prisma/client';
import { PetsRepository } from '../pets-repository';

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = [];

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }
    return pet;
  }

  async list(city: string) {
    return this.pets.filter(
      (pet) => pet.city.toLowerCase() === city.toLowerCase()
    );
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const images = Array.isArray(data?.images) ? data.images : [];
    const adoptionRequirements = Array.isArray(data?.adoptionRequirements)
      ? data.adoptionRequirements
      : [];

    const pet = {
      id: randomUUID(),
      ...data,
      about: data.about || null,
      images,
      adoptionRequirements,
    };

    this.pets.push(pet);

    return pet;
  }
}
