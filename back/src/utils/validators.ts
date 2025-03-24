import { make } from 'ts-brand'
import { z } from 'zod'
import type {
  Amount as AmountType,
  Limit as LimitType,
  Minute as MinuteType,
  PercentagePoint as PercentagePointType,
  Percentage as PercentageType,
  Quantity as QuantityType,
  Seconde as SecondeType,
  Url as UrlType,
} from './types'

// TODO: Update validators pour que les erreurs soient plus explicites
export const Limit = make<LimitType>((value) => 
  z.number()
    .int()
    .min(1, { message: `Limit must be at least 1, received: ${value}` })
    .max(1000, { message: `Limit must be at most 1000, received: ${value}` })
    .parse(value)
)

export const Percentage = make<PercentageType>((value) => 
  z.number({ message: `Percentage must be a number, received: ${value}` }).parse(value)
)

export const Amount = make<AmountType>((value) => 
  z.number()
    .min(0, { message: `Amount must be non-negative, received: ${value}` })
    .parse(value)
)

export const Minute = make<MinuteType>((value) => 
  z.number()
    .int({ message: `Minute must be an integer, received: ${value}` })
    .min(0, { message: `Minute must be non-negative, received: ${value}` })
    .parse(value)
)

export const Seconde = make<SecondeType>((value) => 
  z.number()
    .int({ message: `Seconde must be an integer, received: ${value}` })
    .min(0, { message: `Seconde must be non-negative, received: ${value}` })
    .parse(value)
)

export const PercentagePoint = make<PercentagePointType>((value) => 
  z.number()
    .min(0, { message: `PercentagePoint must be non-negative, received: ${value}` })
    .max(1, { message: `PercentagePoint must be at most 1, received: ${value}` })
    .parse(value)
)

export const Url = make<UrlType>((value) => 
  z.string()
    .url({ message: `Url must be a valid URL, received: ${value}` })
    .parse(value)
)

export const Quantity = (value: number) => make<QuantityType>()(
  z.number()
    .int({ message: `Quantity must be an integer, received: ${value}` })
    .min(1, { message: `Quantity must be at least 1, received: ${value}` })
    .parse(value)
)
