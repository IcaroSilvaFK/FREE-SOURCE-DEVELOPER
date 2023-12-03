export type CreateProjectInput = {
  title: string
  description: string
  link_to_social_media: string
  project_type: string,
  tecs: string[],
  user: {
    email: string
    avatar_url: string
    link_to_profile: string
    username: string
  }
}
