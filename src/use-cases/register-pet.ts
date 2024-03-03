import {
  PetAge,
  PetEnergy,
  PetEnvironment,
  PetIndependency,
  PetSize,
} from '@prisma/client';

import { PetsRepository } from '@/repositories/pets-repository';

type ExecuteParams = {
  name: string;
  about?: string;
  age: PetAge;
  size: PetSize;
  energy: PetEnergy;
  independency: PetIndependency;
  environment: PetEnvironment;
  images?: string[];
  adoptionRequirements?: string[];
  organizationId: string;
};

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(data: ExecuteParams) {
    const pet = await this.petsRepository.create(data);

    return {
      pet,
    };
  }
}
