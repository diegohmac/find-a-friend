# Find a Friend API
Bring happiness to your home. Find the ideal pet for your lifestyle!

## FRs (Functional Requirements)
- [x] It must be possible to register a pet.
- [x] It must be possible to list all pets available for adoption in a city.
- [x] It must be possible to filter pets by their characteristics.
- [x] It must be possible to view details of a pet for adoption.
- [x] It must be possible to register as an organization (ORG).
- [x] It must be possible to log in as an organization (ORG).

## BRs (Business Rules)
- [x] To list pets, we must inform the city.
- [x] An organization (ORG) must have an address and a WhatsApp number.
- [x] A pet must be associated with an organization (ORG).
- [x] The user who wants to adopt will contact the organization (ORG) via WhatsApp.
- [x] All filters, besides the city, are optional.
- [x] For an organization (ORG) to access the application as an admin, they must be logged in.

## NFRs (Non-Functional Requirements)
- [x] It should encrypt the user password.
- [x] It should persist the data in a PostgresSQL database.
- [x] It should paginate all GET endpoints with 20 items per page.
- [x] It should identify a user based on a JWT (JSON Web Token).