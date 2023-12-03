import { faker } from '@faker-js/faker'

export const mockProject = {
  project_name: faker.lorem.paragraph(),
  project_description: faker.lorem.paragraphs(),
  link_to_social_media: faker.internet.url(),
  id: faker.string.uuid(),
  project_type: faker.lorem.word(),
  tecs: [faker.lorem.word(), faker.lorem.word()],
  created_at: faker.date.recent().toISOString(),
  user: {
    email: faker.internet.email(),
    avatar_url: faker.internet.avatar(),
    link_to_profile: faker.internet.url(),
    username: faker.internet.userName(),
  }
}