import { inject, injectable } from 'inversify'
import { TYPES } from '@/types/types'
import type { ProjectGatewayHttp } from '@/core/infra/project/ProjectGatewayHttp'

@injectable()
export class RemoveProjectUseCase {
  constructor(@inject(TYPES.ProjectGatewayHttp) private projectGateway: ProjectGatewayHttp) {}

  async execute(projectId: string) {
    const projectFounded = await this.projectGateway.findById(projectId)

    if (!projectFounded) {
      throw new Error('Project not found')
    }

    await this.projectGateway.removeById(projectId)
  }
}
