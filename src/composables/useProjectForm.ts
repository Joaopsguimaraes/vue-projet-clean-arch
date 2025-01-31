import { reactive, ref, watch } from 'vue'
import { ProjectStatusEnum } from '@/core/domain/project/ProjectStatusEnum'
import { useProject } from './useProject'

export function useProjectForm() {
  const { createProject } = useProject()

  const name = ref<string>('')
  const description = ref<string>('')
  const releaseDate = ref<Date>(new Date())
  const status = ref<ProjectStatusEnum>(ProjectStatusEnum.PENDING)

  const errors = reactive({
    name: '',
    description: '',
    releaseDate: '',
    status: '',
  })

  function validateName(): void {
    if (name.value.length < 3) {
      errors.name = 'Name must be at least 3 characters'
    } else {
      errors.name = ''
    }
  }

  function validateDescription(): void {
    if (description.value.length < 3) {
      errors.description = 'description must be at least 3 characters'
    } else {
      errors.description = ''
    }
  }

  watch(name, validateName)
  watch(description, validateDescription)

  async function handleSubmit(): Promise<void> {
    validateName()
    validateDescription()

    if (!errors.name && !errors.description) {
      await createProject(name.value, description.value, releaseDate.value, status.value)
    }
  }
  return { errors, name, description, releaseDate, status, handleSubmit }
}
