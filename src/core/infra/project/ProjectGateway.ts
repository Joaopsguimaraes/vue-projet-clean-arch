import type { Project } from '@/core/domain/project/Project'
import { ProjectMapper } from '@/core/presenters/ProjectMapper'
import type { HttpClientInterface } from '@/types/HttpClientInterface'
import type { IGateway } from '@/types/IRepository'
import { TYPES } from '@/types/types'
import { inject, injectable } from 'inversify'

@injectable()
export class ProjectGatewayHttp implements IGateway<Project> {
  constructor(@inject(TYPES.HttpClient) private httpClient: HttpClientInterface) {}

  async create(project: Project): Promise<Project> {
    const projectData = ProjectMapper.toDTO(project)
    return this.httpClient.post<Project, Record<string, unknown>>('/projects', projectData)
  }

  async update(project: Project): Promise<void> {
    return this.httpClient.put<void, Project>(`/projects/${project.id}`, project)
  }

  async findById(id: string): Promise<Project | null> {
    return this.httpClient.get<Project>(`/projects/${id}`)
  }

  async findAll(): Promise<Project[]> {
    return this.httpClient.get<Project[]>('/projects')
  }

  async removeById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`/projects/${id}`)
  }
}
