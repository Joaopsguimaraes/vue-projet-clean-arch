import { inject, injectable } from 'inversify'
import { TYPES } from '@/types/types'
import type { Project } from '@/core/domain/project/Project'
import type { ProjectGatewayHttp } from '@/core/infra/project/ProjectGateway'

@injectable()
export class FindAllProjectUseCase {
  constructor(@inject(TYPES.ProjectGatewayHttp) private projectGateway: ProjectGatewayHttp) {}

  async execute(): Promise<Project[]> {
    return this.projectGateway.findAll()
  }
}
