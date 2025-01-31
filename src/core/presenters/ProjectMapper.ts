import type { Project } from '@/core/domain/project/Project'

export class ProjectMapper {
  static toDTO(project: Project): Record<string, unknown> {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      releaseDate: project.releaseDate,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }
  }
}
