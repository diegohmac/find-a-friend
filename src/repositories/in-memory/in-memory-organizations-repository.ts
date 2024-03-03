import { randomUUID } from 'node:crypto';
import { Organization, Prisma } from '@prisma/client';

import { OrganizationsRepository } from '../organizations-repository';

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizations: Organization[] = [];

  async findById(id: string) {
    const organization = this.organizations.find((org) => org.id === id);

    if (!organization) {
      return null;
    }
    return organization;
  }

  async findByEmail(email: string) {
    const organization = this.organizations.find((org) => org.email === email);

    if (!organization) {
      return null;
    }
    return organization;
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      ...data,
    };

    this.organizations.push(organization);

    return organization;
  }
}
