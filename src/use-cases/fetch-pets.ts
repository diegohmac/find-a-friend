import { PetsRepository } from '@/repositories/pets-repository';

type FetchUPetsParams = {
  city: string;
};

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city }: FetchUPetsParams) {
    const pets = await this.petsRepository.list(city);

    return {
      pets,
    };
  }
}
