import { v4 as uuid } from 'uuid'

export abstract class Entity {
  protected _id: string
  public readonly createdAt: Date
  public updatedAt: Date

  constructor() {
    this._id = uuid()
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  protected updateTimestamp(): void {
    this.updatedAt = new Date()
  }
}
