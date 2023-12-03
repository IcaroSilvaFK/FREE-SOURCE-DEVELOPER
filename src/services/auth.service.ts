import { AxiosInstance } from 'axios'
import { baseApi } from '../configs/axios'
import { IUserDTO } from '../interfaces/UserDTO'

export class AuthService {

  private static instance: AuthService
  readonly axiosInstance: AxiosInstance

  private constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance

  }

  async requestCredentials(code: string): Promise<string> { //https://github.com/login/oauth/access_token
    //https://cors-anywhere.herokuapp.com/
    const response = await this.axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/api/login/${code}`)

    return response.data.token
  }

  async requestUserDetails(token: string): Promise<IUserDTO> {
    const response = await this.axiosInstance.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`
      }
    })
    return response.data as IUserDTO
  }

  static getInstance(axiosInstance: AxiosInstance): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(axiosInstance)
    }
    return AuthService.instance
  }

}

export const authService = AuthService.getInstance(baseApi)