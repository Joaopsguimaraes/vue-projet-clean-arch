import { describe, expect, it } from 'vitest'
import { Project } from './Project'
import { ProjectStatusEnum } from './ProjectStatusEnum'

describe('Project entity unit test', () => {
  it('should create a project with valid properties', () => {
    const expectedName = 'Project 1'
    const expectedDescription = 'Project description'
    const expectedReleaseDate = new Date()
    const expectedStatus = ProjectStatusEnum.PENDING

    const project = new Project(
      expectedName,
      expectedDescription,
      expectedReleaseDate,
      expectedStatus,
    )

    expect(project.name).toBe(expectedName)
    expect(project.description).toBe(expectedDescription)
    expect(project.releaseDate).toBe(expectedReleaseDate)
    expect(project.status).toBe(expectedStatus)
  })

  it('should throw an error for invalid name during construction', () => {
    expect(() => {
      new Project('', 'Description of Project 1', new Date())
    }).toThrow('Name cannot be empty')
  })

  it('should throw an error for invalid description during construction', () => {
    expect(() => {
      new Project('Project 1', '', new Date())
    }).toThrow('Description cannot be empty')
  })

  it('should apply default status when status is not provided', () => {
    const expectedName = 'Project 1'
    const expectedDescription = 'Project description'
    const expectedReleaseDate = new Date()
    const expectedStatus = ProjectStatusEnum.PENDING

    const project = new Project(expectedName, expectedDescription, expectedReleaseDate)
    expect(project.status).toBe(expectedStatus)
  })

  it('should throw an error for invalid name during setName', () => {
    const expectedName = 'Project 1'
    const expectedDescription = 'Project description'
    const expectedReleaseDate = new Date()

    const project = new Project(expectedName, expectedDescription, expectedReleaseDate)

    expect(() => {
      project.setName('')
    }).toThrow('Name cannot be empty')
  })

  it('should throw an error for invalid description during setDescription', () => {
    const expectedName = 'Project 1'
    const expectedDescription = 'Project description'
    const expectedReleaseDate = new Date()

    const project = new Project(expectedName, expectedDescription, expectedReleaseDate)

    expect(() => {
      project.setDescription('')
    }).toThrow('Description cannot be empty')
  })

  it('should updated status to complete when method makeProjectCompleted is called', () => {
    const expectedName = 'Project 1'
    const expectedDescription = 'Project description'
    const expectedReleaseDate = new Date()

    const project = new Project(expectedName, expectedDescription, expectedReleaseDate)

    expect(project.status).toBe(ProjectStatusEnum.PENDING)

    project.makeProjectCompleted()

    expect(project.status).toBe(ProjectStatusEnum.COMPLETED)
  })
})
