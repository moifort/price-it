import { type Brand, identity } from 'ts-brand'
import { useRoute } from 'vue-router'

export const getIntPathParam = <T extends Brand<number, unknown>>(key: string) => {
  const { params } = useRoute()
  const recordValue = getRecordValue(params, key)
  if (recordValue === null) {
    throw new Error(`Path param ${key} cannot be null!`)
  }
  return identity<T>(Number(recordValue))
}

export const getStringPathParam = <T extends Brand<string, unknown>>(key: string) => {
  const { params } = useRoute()
  const recordValue = getRecordValue(params, key)
  if (recordValue === null) {
    throw new Error(`Path param ${key} cannot be null!`)
  }
  return identity<T>(recordValue)
}

export const getIntQuery = <T extends Brand<number, unknown>>(key: string) => {
  const { query } = useRoute()
  const recordValue = getRecordValue(query, key)
  if (recordValue === null) {
    throw new Error(`Query param ${key} should be a number!`)
  }
  return identity<T>(Number(recordValue))
}

export const getStringQuery = <T extends Brand<string, unknown>>(key: string) => {
  const { query } = useRoute()
  const value = getRecordValue(query, key)
  if (value === null) {
    throw new Error(`Query param ${key} should be a string!`)
  }
  return identity<T>(value)
}

const getRecordValue = <T>(record: Record<string, T | T[]>, key: string): T => {
  const manyValues = record[key]
  const value = Array.isArray(manyValues) ? manyValues[0] : manyValues
  if (value === null) {
    throw new Error(`Value for key ${key} cannot be null!`)
  }
  return value
}
