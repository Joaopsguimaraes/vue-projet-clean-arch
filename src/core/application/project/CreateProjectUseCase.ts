import { inject, injectable } from 'inversify'
import { TYPES } from '@/types/types'
import { Project } from '@/core/domain/project/Project'
import type { ProjectStatusEnum } from '@/core/domain/project/ProjectStatusEnum'
import type { ProjectGatewayHttp } from '@/core/infra/project/ProjectGateway'

@injectable()
export class CreateProjectUseCase {
  constructor(@inject(TYPES.ProjectGatewayHttp) private projectGateway: ProjectGatewayHttp) {}

  async execute(name: string, description: string, releaseDate: Date, status?: ProjectStatusEnum) {
    const project = new Project(name, description, releaseDate, status)

    await this.projectGateway.create(project)

    return project
  }
}
