import { randomUUID } from 'node:crypto';
import { Pet, Prisma } from '@prisma/client';
import { PetsFilterOptions, PetsRepository } from '../pets-repository';

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = [];

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }
    return pet;
  }

  async list(filterOptions: PetsFilterOptions, page: number) {
    const { city, age, energy, environment, independency, size } =
      filterOptions;
    return this.pets
      .filter((pet) => {
        if (city && pet.city !== city) {
          return false;
        }
        if (age && pet.age !== age) {
          return false;
        }
        if (energy && pet.energy !== energy) {
          return false;
        }
        if (environment && pet.environment !== environment) {
          return false;
        }
        if (independency && pet.independency !== independency) {
          return false;
        }
        if (size && pet.size !== size) {
          return false;
        }
        return true;
      })
      .slice((page - 1) * 20, page * 20);
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
