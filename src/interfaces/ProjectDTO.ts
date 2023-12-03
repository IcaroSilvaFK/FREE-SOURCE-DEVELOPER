export type ProjectDTO = {
  project_name: string
  project_description: string
  link_to_social_media: string
  id: string
  project_type: string,
  tecs: string[],
  created_at: string
  user: {
    email: string
    avatar_url: string
    link_to_profile: string
    username: string
  }
}
