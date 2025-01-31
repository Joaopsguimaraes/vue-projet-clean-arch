import { beforeEach, describe, expect, it } from 'vitest'
import { Project } from './Project'
import { ProjectStatusEnum } from './ProjectStatusEnum'

describe('Project unit test', () => {
  let project: Project

  beforeEach(() => {
    project = new Project(
      'Project 1',
      'Description of Project 1',
      new Date(),
      '1',
      ProjectStatusEnum.PENDING,
    )
  })

  it('should create a project with valid properties', () => {
    expect(project.name).toBe('Project 1')
    expect(project.description).toBe('Description of Project 1')
    expect(project.releaseDate).toBeInstanceOf(Date)
    expect(project.status).toBe(ProjectStatusEnum.PENDING)
    expect(project.userId).toBe('1')
  })

  it('should throw an error for invalid name during construction', () => {
    expect(() => {
      new Project('', 'Description of Project 1', new Date(), '1')
    }).toThrow('Name cannot be empty')
  })

  it('should throw an error for invalid description during construction', () => {
    expect(() => {
      new Project('Project 1', '', new Date(), '1')
    }).toThrow('Description cannot be empty')
  })

  it('should apply default status when status is not provided', () => {
    const project = new Project('Project 1', 'Description of Project 1', new Date(), '1')
    console.log(project)
    expect(project.status).toBe(ProjectStatusEnum.PENDING)
  })

  it('should throw an error for invalid name during setName', () => {
    expect(() => {
      project.setName('')
    }).toThrow('Name cannot be empty')
  })

  it('should throw an error for invalid description during setDescription', () => {
    expect(() => {
      project.setDescription('')
    }).toThrow('Description cannot be empty')
  })
})
