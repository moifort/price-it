import { findAll, findById } from './infra/repository'

export namespace ProductQuery {
  export const getProducts = findAll
  export const getProduct = findById
}
