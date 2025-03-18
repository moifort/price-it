import { type AnyBrand, type Brand, identity } from 'ts-brand'
import { useRoute } from 'vue-router'

type ManyValues<T> = T | T[]

const isValueArray = <T>(value: T | T[]): value is T[] => Array.isArray(value)

const getRecordValue = <T>(record: Record<string, ManyValues<T>>, key: string): T => {
  const manyValues = record[key]
  const value = isValueArray(manyValues) ? manyValues[0] : manyValues
  if (value === null) {
    throw new Error(`Value for key ${key} cannot be null!`)
  }
  return value
}

const nullableIdentity = <T extends AnyBrand>(value: unknown) => (value === null ? null : identity<T>(value))

export type UseRouteV2Helpers = {
  getIntPathParam: <T extends Brand<number, unknown>>(key: string) => T
  getStringPathParam: <T extends Brand<string, unknown>>(key: string) => T
  getIntQuery: <T extends Brand<number, unknown>>(key: string) => T
  getStringQuery: <T extends Brand<string, unknown>>(key: string) => T
}

export type UseRouteV2 = () => UseRouteV2Helpers

export const useRouteHelper: UseRouteV2 = () => {
  const { params, query } = useRoute()
  const getIntPathParam = <T extends Brand<number, unknown>>(key: string) => {
    const recordValue = getRecordValue(params, key)
    if (recordValue === null) {
      throw new Error(`Path param ${key} cannot be null!`)
    }
    return identity<T>(Number(recordValue))
  }
  const getStringPathParam = <T extends Brand<string, unknown>>(key: string) => {
    const value = nullableIdentity<T>(getRecordValue(params, key))
    if (value === null) {
      throw new Error(`Path param ${key} cannot be null!`)
    }
    return value
  }
  const getIntQuery = <T extends Brand<number, unknown>>(key: string) => {
    const recordValue = getRecordValue(query, key)
    if (recordValue === null) {
      throw new Error(`Query param ${key} should be a number!`)
    }
    return identity<T>(Number(recordValue))
  }
  const getStringQuery = <T extends Brand<string, unknown>>(key: string) => {
    const value = getRecordValue(query, key)
    if (value === null) {
      throw new Error(`Query param ${key} should be a string!`)
    }
    return identity<T>(value)
  }
  return {
    getIntPathParam,
    getStringPathParam,
    getIntQuery,
    getStringQuery,
  }
}
