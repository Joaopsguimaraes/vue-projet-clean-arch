import type { ProjectStatusEnum } from './ProjectStatusEnum'

export class ProjectValidator {
  static isValidName(name: string): boolean {
    return !!name && name.trim().length > 0
  }

  static isValidDescription(description: string): boolean {
    return !!description && description.trim().length > 0
  }

  static isValidStatus(status: ProjectStatusEnum): boolean {
    return !!status && status.trim().length > 0
  }

  static validateProjectInput(
    name: string,
    description: string,
    releaseDate: Date,
    status: ProjectStatusEnum,
  ) {
    if (!this.isValidName(name)) {
      throw new Error('Name cannot be empty')
    }
    if (!this.isValidDescription(description)) {
      throw new Error('Description cannot be empty')
    }
    if (!this.isValidStatus(status)) {
      throw new Error('Status cannot be empty')
    }
  }
}
