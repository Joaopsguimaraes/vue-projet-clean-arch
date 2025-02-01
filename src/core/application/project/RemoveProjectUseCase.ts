import { inject, injectable } from 'inversify'
import { TYPES } from '@/types/types'
import type { IGateway } from '@/types/IRepository'
import type { Project } from '@/core/domain/project/Project'

@injectable()
export class RemoveProjectUseCase {
  constructor(@inject(TYPES.ProjectGatewayHttp) private projectGateway: IGateway<Project>) {}

  async execute(projectId: string) {
    const projectFounded = await this.projectGateway.findById(projectId)

    if (!projectFounded) {
      throw new Error('Project not found')
    }

    await this.projectGateway.removeById(projectId)
  }
}
