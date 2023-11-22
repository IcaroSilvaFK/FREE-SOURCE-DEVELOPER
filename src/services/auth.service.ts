import axios from 'axios'
import { IUserDTO } from '../interfaces/UserDTO'

export class AuthService {

  private static instance: AuthService

  async requestCredentials(code: string): Promise<string> {
    const response = await axios.post("https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token", {
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
      code,
    }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
    })
    return response.data.access_token
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