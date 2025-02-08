import { inject, injectable } from 'inversify'
import { TYPES } from '@/types/types'
import type { Project } from '@/core/domain/project/Project'
import type { ProjectGatewayHttp } from '@/core/infra/project/ProjectGatewayHttp'

@injectable()
export class FindProjectByIdUseCase {
  constructor(@inject(TYPES.ProjectGatewayHttp) private projectGateway: ProjectGatewayHttp) {}

  async execute(id: string): Promise<Project> {
    const project = await this.projectGateway.findById(id)

    if (!project) {
      throw new Error('Project not found')
    }

    return project
  }
}
