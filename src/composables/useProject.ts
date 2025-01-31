/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRoute, useRouter } from 'vue-router'
import type { CreateProjectUseCase } from '@/core/application/project/CreateProjectUseCase'
import type { FindAllProjectUseCase } from '@/core/application/project/FindAllProjectUseCase'
import type { FindProjectByIdUseCase } from '@/core/application/project/FindProjectByIdUseCase'
import { container } from '@/core/container'
import { Project } from '@/core/domain/project/Project'
import type { ProjectStatusEnum } from '@/core/domain/project/ProjectStatusEnum'
import { TYPES } from '@/types/types'
import { ref } from 'vue'

export function useProject() {
  const router = useRouter()
  const project = ref<Project | null>(null)
  const projects = ref<Project[]>([])
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  const createProjectUseCase: CreateProjectUseCase = container.get<CreateProjectUseCase>(
    TYPES.CreateProjectUseCase,
  )
  const findAllProjectUseCase: FindAllProjectUseCase = container.get<FindAllProjectUseCase>(
    TYPES.FindAllProjectUseCase,
  )
  const findProjectByIdUseCase: FindProjectByIdUseCase = container.get<FindProjectByIdUseCase>(
    TYPES.FindProjectByIdUseCase,
  )

  async function createProject(
    name: string,
    description: string,
    releaseDate: Date,
    status?: ProjectStatusEnum,
  ): Promise<void> {
    isLoading.value = true
    error.value = null
    project.value = null

    try {
      const newProject = await createProjectUseCase.execute(name, description, releaseDate, status)

      project.value = newProject

      // await router.push({ name: 'ProjectDetail', params: { id: newProject.id } })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create project'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  async function findProjectById(id: string): Promise<void> {
    isLoading.value = true
    error.value = null
    project.value = null

    try {
      const foundProject = await findProjectByIdUseCase.execute(id)
      project.value = foundProject
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to find project'
    } finally {
      isLoading.value = false
    }
  }

  async function findAllProject(): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      const allProject = await findAllProjectUseCase.execute()

      console.log(allProject)

      projects.value = allProject
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to find all project'
    }
  }

  return {
    project,
    projects,
    error,
    isLoading,
    createProject,
    findProjectById,
    findAllProject,
  }
}
