import { toast } from 'react-hot-toast'

export class NotificationService {
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
    toast(msg)
  }
}

export const notificationService = NotificationService.getInstance()