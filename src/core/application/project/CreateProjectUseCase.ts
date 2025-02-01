import { inject, injectable } from 'inversify'
import { TYPES } from '@/types/types'
import { Project } from '@/core/domain/project/Project'
import type { ProjectStatusEnum } from '@/core/domain/project/ProjectStatusEnum'
import type { IGateway } from '@/types/IRepository'

@injectable()
export class CreateProjectUseCase {
  constructor(@inject(TYPES.ProjectGatewayHttp) private projectGateway: IGateway<Project>) {}

  async execute(name: string, description: string, releaseDate: Date, status?: ProjectStatusEnum) {
    const project = new Project(name, description, releaseDate, status)

    await this.projectGateway.create(project)

    return project
  }
}
