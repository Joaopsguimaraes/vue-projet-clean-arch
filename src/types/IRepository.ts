export interface IGateway<T> {
  create(entity: T): Promise<T>
  update(entity: T): Promise<void>
  findById(id: string): Promise<T | null>
  findAll(): Promise<T[]>
  removeById(id: string): Promise<void>
}
