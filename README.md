# Find a Friend API
Bring happiness to your home. Find the ideal pet for your lifestyle!

## FRs (Functional Requirements)
- [ ] It must be possible to register a pet.
- [ ] It must be possible to list all pets available for adoption in a city.
- [ ] It must be possible to filter pets by their characteristics.
- [ ] It must be possible to view details of a pet for adoption.
- [ ] It must be possible to register as an organization (ORG).
- [ ] It must be possible to log in as an organization (ORG).

## BRs (Business Rules)
- [ ] To list pets, we must inform the city.
- [ ] An organization (ORG) must have an address and a WhatsApp number.
- [ ] A pet must be associated with an organization (ORG).
- [ ] The user who wants to adopt will contact the organization (ORG) via WhatsApp.
- [ ] All filters, besides the city, are optional.
- [ ] For an organization (ORG) to access the application as an admin, they must be logged in.

## NFRs (Non-Functional Requirements)
- [ ] It should encrypt the user password.
- [ ] It should persist the data in a PostgresSQL database.
- [ ] It should paginate all GET endpoints with 20 items per page.
- [ ] It should identify a user based on a JWT (JSON Web Token).