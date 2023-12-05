import { vi } from 'vitest'
import { notificationService } from './notifications.service'

const successMock = vi.hoisted(() => vi.fn())
const errorMock = vi.hoisted(() => vi.fn())
const customToast = vi.hoisted(() => vi.fn())




vi.mock("react-hot-toast", async () => {
  const originalModule = await vi.importActual("react-hot-toast") as typeof import("react-hot-toast")

  originalModule.toast.custom = customToast
  originalModule.toast.success = successMock
  originalModule.toast.error = errorMock

  return originalModule
})

describe("Notification service test suite", () => {

  it("Should success notification", () => {

    notificationService.success("test")

    expect(successMock).toHaveBeenCalled()
  })

  it("Should error notification", () => {

    notificationService.error("test")

    expect(errorMock).toHaveBeenCalled()
  })

  it("Should toast notification", () => {

    notificationService.info("test")

    expect(customToast).toHaveBeenCalled()
  })

})

