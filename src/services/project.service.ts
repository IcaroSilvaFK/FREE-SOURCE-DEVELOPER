import { AxiosInstance } from "axios"
import { baseApi } from "../configs/axios"
import { CreateProjectInput } from "../interfaces/CreateProjectInput"
import { NotificationServiceInterface } from "../interfaces/NotificationsService"
import { ProjectDTO } from "../interfaces/ProjectDTO"
import { notificationService } from "./notifications.service"

export class ProjectService {
  private static instance: ProjectService
  private notificationService: NotificationServiceInterface
  readonly axiosInstance: AxiosInstance

  private constructor(notificationService: NotificationServiceInterface, axiosInstance: AxiosInstance) {
    this.notificationService = notificationService
    this.axiosInstance = axiosInstance
  }

  async createProject(input: CreateProjectInput) {
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
      const response = await this.axiosInstance.get<ProjectDTO[]>("/projects")

      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  async getProjectById(id: string) {
    try {
      const response = await this.axiosInstance.get<ProjectDTO>(`/projects/${id}`)

      return response.data
    } catch (err) {
      console.error(err)
    }
  }


  static getInstance(notificationsService: NotificationServiceInterface, axiosInstance: AxiosInstance) {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService(notificationsService, axiosInstance)
    }
    return ProjectService.instance
  }
}


export const projectService = ProjectService.getInstance(notificationService, baseApi)


