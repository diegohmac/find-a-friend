import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { PetsFilterOptions, PetsRepository } from '../pets-repository';

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }
  async list(filterOptions: PetsFilterOptions, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        city: filterOptions.city,
        age: filterOptions.age,
        size: filterOptions.size,
        energy: filterOptions.energy,
        independency: filterOptions.independency,
        environment: filterOptions.environment,
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return pets;
  }
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
