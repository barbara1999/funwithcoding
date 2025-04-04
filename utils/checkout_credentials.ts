import { faker } from "@faker-js/faker";

export let firstName: string;
export let lastName: string;
export let postalCode: string;

firstName = faker.person.firstName();
lastName = faker.person.lastName();
postalCode = faker.location.zipCode();
