import { AxiosHttpClient } from '@/helpers/AxiosHttpClient'
import type { HttpClientInterface } from '@/types/HttpClientInterface'
import { TYPES } from '@/types/types'
import { Container } from 'inversify'
import { CreateProjectUseCase } from './application/project/CreateProjectUseCase'
import { FindProjectByIdUseCase } from './application/project/FindProjectByIdUseCase'
import { FindAllProjectUseCase } from './application/project/FindAllProjectUseCase'
import { UpdateProjectUseCase } from './application/project/UpdateProjectUseCase'
import { RemoveProjectUseCase } from './application/project/RemoveProjectUseCase'
import { ProjectGatewayHttp } from './infra/project/ProjectGatewayHttp'

const container = new Container()

container.bind<HttpClientInterface>(TYPES.HttpClient).to(AxiosHttpClient)
container.bind<ProjectGatewayHttp>(TYPES.ProjectGatewayHttp).to(ProjectGatewayHttp)

container.bind<CreateProjectUseCase>(TYPES.CreateProjectUseCase).to(CreateProjectUseCase)
container.bind<FindProjectByIdUseCase>(TYPES.FindProjectByIdUseCase).to(FindProjectByIdUseCase)
container.bind<FindAllProjectUseCase>(TYPES.FindAllProjectUseCase).to(FindAllProjectUseCase)
container.bind<UpdateProjectUseCase>(TYPES.UpdateProjectUseCase).to(UpdateProjectUseCase)
container.bind<RemoveProjectUseCase>(TYPES.RemoveProjectUseCase).to(RemoveProjectUseCase)

export { container }
