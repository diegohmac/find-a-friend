import {
  Prisma,
  Pet,
  PetAge,
  PetSize,
  PetEnergy,
  PetIndependency,
  PetEnvironment,
} from '@prisma/client';

export type PetsFilterOptions = {
  city: string;
  age?: PetAge;
  size?: PetSize;
  energy?: PetEnergy;
  independency?: PetIndependency;
  environment?: PetEnvironment;
};
export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  list(filter: PetsFilterOptions): Promise<Pet[]>;
}
