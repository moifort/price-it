import { findAll, findById } from './infra/repository'

export namespace GuessQuery {
  export const getAll = findAll
  export const getById = findById
}
