import { faker } from '@faker-js/faker'

export const mockUser = {
  avatar_url: faker.internet.avatar(),
  bio: faker.lorem.paragraph(),
  company: faker.company.name(),
  email: faker.internet.email(),
  id: faker.number.int(),
  login: faker.internet.userName(),
  name: faker.internet.userName(),
}