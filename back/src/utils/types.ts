import type { Brand } from 'ts-brand'

export type Limit = Brand<number, 'Limit'>
export type Percentage = Brand<number, 'Percentage'>
export type Amount = Brand<number, 'Amount'>
export type Minute = Brand<number, 'Minute'>
export type Seconde = Brand<number, 'Seconde'>
export type PercentagePoint = Brand<number, 'PercentagePoint'>
export type Url = Brand<string, 'Url'>

export type PartialEntity<T extends { id: string }> = Partial<T> & Pick<T, 'id'>
