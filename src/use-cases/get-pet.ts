import { PetsRepository } from '@/repositories/pets-repository';

type GetPetParams = {
  petId: string;
};

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ petId }: GetPetParams) {
    const pet = await this.petsRepository.findById(petId);

    return {
      pet,
    };
  }
}
