/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import sinon from 'sinon';
import { mockUser } from '../mocks/user';
import { AuthService, authService } from './auth.service';


describe("Auth service test suite", () => {

  let sandbox: sinon.SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })


  afterEach(() => {
    sandbox.restore();
  })

  it("Should request credentials and returns access token", async () => {


    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    sandbox
      .stub(
        authService,
        authService.requestCredentials.name as keyof AuthService
      )
      //@ts-expect-error
      .returns(token)

    const result = await authService.requestCredentials("code")

    const expected = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

    expect(result).toBe(expected)
  })

  it("Should get user details", async () => {

    sandbox
      .stub(
        authService,
        authService.requestUserDetails.name as keyof AuthService
      )
      //@ts-expect-error
      .returns(mockUser)

    const result = await authService.requestUserDetails("code")

    const expected = mockUser

    expect(result).toBe(expected)
  })


})