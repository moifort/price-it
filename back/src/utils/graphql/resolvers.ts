import { DateTimeResolver } from 'graphql-scalars'
import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'

import type {
  Amount as AmountType,
  Limit as LimitType,
  Minute as MinuteType,
  PercentagePoint as PercentagePointType,
  Percentage as PercentageType,
  Seconde as SecondeType,
  Url as UrlType,
} from '../types'
import { Amount, Limit, Minute, Percentage, PercentagePoint, Seconde, Url } from '../validators'

const MinuteScalar = new GraphQLScalarType({
  name: 'Minute',
  description: 'The `Minute` scalar type represents time in minutes as a non-negative integer.',
  parseValue: (value: unknown): MinuteType => Minute(Number(value)),
  serialize: (value: unknown) => Minute(Number(value)),
  parseLiteral: (ast) => (ast.kind === Kind.INT ? Minute(Number.parseInt(ast.value, 10)) : null),
})

const SecondeScalar = new GraphQLScalarType({
  name: 'Seconde',
  description: 'The `Seconde` scalar type represents time in seconds as a non-negative integer.',
  parseValue: (value: unknown): SecondeType => Seconde(Number(value)),
  serialize: (value: unknown) => Seconde(Number(value)),
  parseLiteral: (ast) => (ast.kind === Kind.INT ? Seconde(Number.parseInt(ast.value, 10)) : null),
})

const LimitScalar = new GraphQLScalarType({
  name: 'Limit',
  description: 'The `Limit` scalar type represents a limit as a positive integer between 1 and 1000.',
  parseValue: (value: unknown): LimitType => Limit(Number(value)),
  serialize: (value: unknown) => Limit(Number(value)),
  parseLiteral: (ast) => (ast.kind === Kind.INT ? Limit(Number.parseInt(ast.value, 10)) : null),
})

const PercentageScalar = new GraphQLScalarType({
  name: 'Percentage',
  description: 'The `Percentage` scalar type represents a percentage value.',
  parseValue: (value: unknown): PercentageType => Percentage(Number(value)),
  serialize: (value: unknown) => Percentage(Number(value)),
  parseLiteral: (ast) => (ast.kind === Kind.FLOAT || ast.kind === Kind.INT ? Percentage(Number(ast.value)) : null),
})

const AmountScalar = new GraphQLScalarType({
  name: 'Amount',
  description: 'The `Amount` scalar type represents a monetary amount as a non-negative number.',
  parseValue: (value: unknown): AmountType => Amount(Number(value)),
  serialize: (value: unknown) => Amount(Number(value)),
  parseLiteral: (ast) => (ast.kind === Kind.FLOAT || ast.kind === Kind.INT ? Amount(Number(ast.value)) : null),
})

const PercentagePointScalar = new GraphQLScalarType({
  name: 'PercentagePoint',
  description: 'The `PercentagePoint` scalar type represents a percentage point as a number between 0 and 1.',
  parseValue: (value: unknown): PercentagePointType => PercentagePoint(Number(value)),
  serialize: (value: unknown) => PercentagePoint(Number(value)),
  parseLiteral: (ast) => (ast.kind === Kind.FLOAT || ast.kind === Kind.INT ? PercentagePoint(Number(ast.value)) : null),
})

const UrlScalar = new GraphQLScalarType({
  name: 'Url',
  description: 'The `Url` scalar type represents a valid URL string.',
  parseValue: (value: unknown): UrlType => Url(String(value)),
  serialize: (value: unknown) => Url(String(value)),
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? Url(ast.value) : null),
})

export const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Minute: MinuteScalar,
  Seconde: SecondeScalar,
  Limit: LimitScalar,
  Percentage: PercentageScalar,
  Amount: AmountScalar,
  PercentagePoint: PercentagePointScalar,
  Url: UrlScalar,
}
