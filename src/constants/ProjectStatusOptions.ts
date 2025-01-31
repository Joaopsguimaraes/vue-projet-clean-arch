import { ProjectStatusEnum } from '@/core/domain/project/ProjectStatusEnum'

export const ProjectStatusOptions = [
  {
    label: 'Pending',
    value: ProjectStatusEnum.PENDING,
  },
  {
    label: 'In progress',
    value: ProjectStatusEnum.IN_PROGRESS,
  },
  {
    label: 'Completed',
    value: ProjectStatusEnum.COMPLETED,
  },
  {
    label: 'Cancelled',
    value: ProjectStatusEnum.CANCELLED,
  },
]
