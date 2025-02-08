import { inject, injectable } from 'inversify'
import { TYPES } from '@/types/types'
import type { Project } from '@/core/domain/project/Project'
import { ResourceNotFound } from '@/core/ResourceNotFound'
import type { ProjectGatewayHttp } from '@/core/infra/project/ProjectGatewayHttp'

@injectable()
export class UpdateProjectUseCase {
  constructor(@inject(TYPES.ProjectGatewayHttp) private projectGateway: ProjectGatewayHttp) {}

  async execute(project: Project): Promise<void> {
    const projectFounded = await this.projectGateway.findById(project.id)

    if (!projectFounded) {
      throw new ResourceNotFound('Project not found')
    }

    await this.projectGateway.update(project)
  }
}
