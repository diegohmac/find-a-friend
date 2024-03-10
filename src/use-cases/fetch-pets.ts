import { PetsRepository } from '@/repositories/pets-repository';
import {
  PetAge,
  PetEnergy,
  PetEnvironment,
  PetIndependency,
  PetSize,
} from '@prisma/client';

type FetchPetsParams = {
  city: string;
  age?: PetAge;
  size?: PetSize;
  energy?: PetEnergy;
  independency?: PetIndependency;
  environment?: PetEnvironment;
};

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(filterOptions: FetchPetsParams, page: number) {
    if (!filterOptions.city) {
      throw new Error('City is required');
    }

    const pets = await this.petsRepository.list(filterOptions, page);

    return {
      pets,
    };
  }
}
