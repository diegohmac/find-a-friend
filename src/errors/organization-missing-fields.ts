export class OrganizationMissingFieldsError extends Error {
  constructor() {
    super('Email and Phone number are required fields.');
  }
}
