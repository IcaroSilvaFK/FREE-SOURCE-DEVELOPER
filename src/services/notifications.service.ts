import { toast } from 'react-hot-toast'
import { NotificationServiceInterface } from '../interfaces/NotificationsService'

export class NotificationService implements NotificationServiceInterface {
  private static instance: NotificationService

  private constructor() { }

  static getInstance() {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }

    return NotificationService.instance
  }

  success(msg: string) {
    toast.success(msg)
  }

  error(msg: string) {
    toast.error(msg)
  }

  info(msg: string) {
    toast.custom(msg, {
      icon: "👋",
    })
  }
}

export const notificationService = NotificationService.getInstance()