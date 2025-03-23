import { findAll } from './infra/repository'

export namespace GuessQuery {
  export const getAll = findAll
}
