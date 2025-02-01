import { Entity } from '../Entity'
import { ProjectStatusEnum } from './ProjectStatusEnum'
import { ProjectValidator } from './ProjectValidator'

export class Project extends Entity {
  private _name: string
  private _description: string
  private _releaseDate: Date
  private _status: ProjectStatusEnum | undefined

  constructor(name: string, description: string, releaseDate: Date, status?: ProjectStatusEnum) {
    super()

    const defaultStatus = status || ProjectStatusEnum.PENDING

    ProjectValidator.validateProjectInput(name, description, releaseDate, defaultStatus)

    this._name = name
    this._description = description
    this._releaseDate = releaseDate
    this._status = defaultStatus
  }

  public makeProjectCompleted(): void {
    if (this._status === ProjectStatusEnum.COMPLETED) {
      throw new Error('Project is already completed')
    }

    this._status = ProjectStatusEnum.COMPLETED
  }

  public get id(): string {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  public get description(): string {
    return this._description
  }

  public get releaseDate(): Date {
    return this._releaseDate
  }

  public get status(): string | undefined {
    return this._status
  }

  public setName(name: string): void {
    if (!ProjectValidator.isValidName(name)) {
      throw new Error('Name cannot be empty')
    }

    this._name = name
  }

  public setDescription(description: string): void {
    if (!ProjectValidator.isValidDescription(description)) {
      throw new Error('Description cannot be empty')
    }

    this._description = description
  }

  public setReleaseDate(releaseDate: Date): void {
    this._releaseDate = releaseDate
  }

  public setStatus(status: ProjectStatusEnum): void {
    if (!ProjectValidator.isValidStatus(status)) {
      throw new Error('Status cannot be empty')
    }

    this._status = status
  }

  public toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      name: this._name,
      description: this._description,
      releaseDate: this._releaseDate.toISOString(),
      status: this._status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
