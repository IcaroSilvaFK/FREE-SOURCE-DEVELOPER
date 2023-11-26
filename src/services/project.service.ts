import axios from "axios"
import { NotificationService, notificationService } from "./notifications.service"

type Input = {
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

export type Output = {
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

class ProjectService {
  private static instance: ProjectService
  private notificationService: NotificationService
  private readonly axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api"
  })

  private constructor(notificationService: NotificationService) {
    this.notificationService = notificationService

  }

  async createProject(input: Input) {
    try {

      const response = await this.axiosInstance.post("/projects", input)

      if (response.status === 201) {
        this.notificationService.success("Projeto criado com sucesso")
      }
    } catch (err) {
      console.error(err)
      this.notificationService.error("Erro ao criar projeto")
    }
  }

  async getAllProjects() {
    try {
      const response = await this.axiosInstance.get<Output[]>("/projects")

      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  async getProjectById(id: string) {
    try {
      const response = await this.axiosInstance.get<Output>(`/projects/${id}`)

      return response.data
    } catch (err) {
      console.error(err)
    }
  }


  static getInstance(notificationsService: NotificationService) {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService(notificationsService)
    }
    return ProjectService.instance
  }
}


export const projectService = ProjectService.getInstance(notificationService)