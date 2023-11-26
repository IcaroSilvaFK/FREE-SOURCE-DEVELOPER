import axios from 'axios'
import { IUserDTO } from '../interfaces/UserDTO'

export class AuthService {

  private static instance: AuthService

  async requestCredentials(code: string): Promise<string> { //https://github.com/login/oauth/access_token
    //https://cors-anywhere.herokuapp.com/
    const response = await axios.get(`${import.meta.env.BACKEND_URL}/api/login/${code}`)

    return response.data.token
  }

  async requestUserDetails(token: string): Promise<IUserDTO> {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`
      }
    })
    return response.data as IUserDTO
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

}

export const authService = AuthService.getInstance()