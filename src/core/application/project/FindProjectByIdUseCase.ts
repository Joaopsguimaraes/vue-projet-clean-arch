import { inject, injectable } from 'inversify'
import { TYPES } from '@/types/types'
import type { Project } from '@/core/domain/project/Project'
import type { IGateway } from '@/types/IRepository'

@injectable()
export class FindProjectByIdUseCase {
  constructor(@inject(TYPES.ProjectGatewayHttp) private projectGateway: IGateway<Project>) {}

  async execute(id: string): Promise<Project> {
    const project = await this.projectGateway.findById(id)

    if (!project) {
      throw new Error('Project not found')
    }

    return project
  }
}
