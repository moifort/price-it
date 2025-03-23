import { DateTimeResolver } from 'graphql-scalars'
import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'

import type { TelegramStar as TelegramStarType } from '../telegram/types'
import { TelegramStar } from '../telegram/validators'
import type {
  Amount as AmountType,
  Limit as LimitType,
  Minute as MinuteType,
  PercentagePoint as PercentagePointType,
  Percentage as PercentageType,
  Quantity as QuantityType,
  Seconde as SecondeType,
  Url as UrlType,
} from '../types'
import { Amount, Limit, Minute, Percentage, PercentagePoint, Quantity, Seconde, Url } from '../validators'

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

const QuantityScalar = new GraphQLScalarType({
  name: 'Quantity',
  description: 'The `Quantity` scalar type represents a quantity as a positive integer.',
  parseValue: (value: unknown): QuantityType => Quantity(Number(value)),
  serialize: (value: unknown) => Quantity(Number(value)),
  parseLiteral: (ast) => (ast.kind === Kind.INT ? Quantity(Number.parseInt(ast.value, 10)) : null),
})

const TelegramStarScalar = new GraphQLScalarType({
  name: 'TelegramStar',
  description: 'The `TelegramStar` scalar type represents a star rating as an integer between 1 and 5.',
  parseValue: (value: unknown): TelegramStarType => TelegramStar(Number(value)),
  serialize: (value: unknown) => TelegramStar(Number(value)),
  parseLiteral: (ast) => (ast.kind === Kind.INT ? TelegramStar(Number.parseInt(ast.value, 10)) : null),
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
  Quantity: QuantityScalar,
  TelegramStar: TelegramStarScalar,
}
