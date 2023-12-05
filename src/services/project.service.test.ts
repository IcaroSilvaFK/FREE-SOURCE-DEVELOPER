/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import sinon from 'sinon'
import { vi } from 'vitest'
import { mockProject } from '../mocks/project'
import { mockProjects } from '../mocks/projects'
import { projectService } from './project.service'

const postFn = vi.hoisted(() => vi.fn(() => ({
  status: 201
})))

vi.mock("../configs/axios", () => ({
  baseApi: {
    get: vi.fn(),
    post: postFn,
  }
}))

describe("Project service test case suite", () => {
  let sandbox: sinon.SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })
  afterEach(() => {
    sandbox.restore()
  })

  it("Should return all projects", async () => {

    sandbox.stub(
      projectService,
      projectService.getAllProjects.name as keyof typeof projectService

    )
      //@ts-expect-error
      .returns(mockProjects)

    const projects = await projectService.getAllProjects()
    expect(projects).toHaveLength(mockProjects.length)
    expect(projects).toEqual(mockProjects)
  })

  it("Should create new project", async () => {

    await projectService.createProject({
      title: "title",
      description: "desc",
      link_to_social_media: "link",
      project_type: "type",
      tecs: ["test"],
      user: {
        email: "email",
        avatar_url: "url",
        link_to_profile: "link",
        username: "name"
      }
    })

    expect(postFn).toHaveBeenCalled()
    expect(postFn).toHaveReturnedWith({
      status: 201
    })
  })

  it("Should find project by id", async () => {

    sandbox.stub(
      projectService,
      projectService.getProjectById.name as keyof typeof projectService

    )
      //@ts-expect-error
      .returns(mockProject)

    const project = await projectService.getProjectById("1")


    expect(project).toEqual(mockProject)
  })
})