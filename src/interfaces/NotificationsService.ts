export abstract class NotificationServiceInterface {
  abstract success(msg: string): void
  abstract error(msg: string): void
  abstract info(msg: string): void
}