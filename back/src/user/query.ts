import { isExist as repositoryIsExist } from './infra/repository'

export namespace UserQuery {
  export const isExist = repositoryIsExist
}
