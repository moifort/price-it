/* eslint-disable */
// @ts-nocheck
import type { Amount } from '../../utils/types';
import type { Limit } from '../../utils/types';
import type { Minute } from '../../utils/types';
import type { Percentage } from '../../utils/types';
import type { PercentagePoint } from '../../utils/types';
import type { Point } from '../../score/types';
import type { ProductId } from '../../product/types';
import type { Run } from '../../run/types';
import type { Score } from '../../score/types';
import type { Seconde } from '../../utils/types';
import type { Url } from '../../utils/types';
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GraphQlContext } from '../types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Amount: { input: Amount; output: Amount; }
  DateTime: { input: any; output: any; }
  Limit: { input: Limit; output: Limit; }
  Minute: { input: Minute; output: Minute; }
  Percentage: { input: Percentage; output: Percentage; }
  PercentagePoint: { input: PercentagePoint; output: PercentagePoint; }
  Point: { input: Point; output: Point; }
  ProductId: { input: ProductId; output: ProductId; }
  Run: { input: Run; output: Run; }
  Score: { input: Score; output: Score; }
  Seconde: { input: Seconde; output: Seconde; }
  Url: { input: Url; output: Url; }
  UserId: { input: any; output: any; }
  _FieldSet: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createPlayerIfNotExist: Scalars['UserId']['output'];
};

export type Player = {
  __typename?: 'Player';
  firstName: Scalars['String']['output'];
  id: Scalars['UserId']['output'];
  runs: Runs;
  score: Scalars['Score']['output'];
};

export type Product = {
  __typename?: 'Product';
  category: Scalars['String']['output'];
  id: Scalars['ProductId']['output'];
  image: Scalars['Url']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Amount']['output'];
  url: Scalars['Url']['output'];
};

export type Query = {
  __typename?: 'Query';
  me: Player;
  products: Array<Product>;
};


export type QueryProductsArgs = {
  limit: Scalars['Limit']['input'];
};

export type Runs = {
  __typename?: 'Runs';
  remaining: Scalars['Run']['output'];
  renewAt: Scalars['DateTime']['output'];
  total: Scalars['Run']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Amount: ResolverTypeWrapper<Scalars['Amount']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Limit: ResolverTypeWrapper<Scalars['Limit']['output']>;
  Minute: ResolverTypeWrapper<Scalars['Minute']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Percentage: ResolverTypeWrapper<Scalars['Percentage']['output']>;
  PercentagePoint: ResolverTypeWrapper<Scalars['PercentagePoint']['output']>;
  Player: ResolverTypeWrapper<Player>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Point: ResolverTypeWrapper<Scalars['Point']['output']>;
  Product: ResolverTypeWrapper<Product>;
  ProductId: ResolverTypeWrapper<Scalars['ProductId']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Run: ResolverTypeWrapper<Scalars['Run']['output']>;
  Runs: ResolverTypeWrapper<Runs>;
  Score: ResolverTypeWrapper<Scalars['Score']['output']>;
  Seconde: ResolverTypeWrapper<Scalars['Seconde']['output']>;
  Url: ResolverTypeWrapper<Scalars['Url']['output']>;
  UserId: ResolverTypeWrapper<Scalars['UserId']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Amount: Scalars['Amount']['output'];
  DateTime: Scalars['DateTime']['output'];
  Limit: Scalars['Limit']['output'];
  Minute: Scalars['Minute']['output'];
  Mutation: {};
  Percentage: Scalars['Percentage']['output'];
  PercentagePoint: Scalars['PercentagePoint']['output'];
  Player: Player;
  String: Scalars['String']['output'];
  Point: Scalars['Point']['output'];
  Product: Product;
  ProductId: Scalars['ProductId']['output'];
  Query: {};
  Run: Scalars['Run']['output'];
  Runs: Runs;
  Score: Scalars['Score']['output'];
  Seconde: Scalars['Seconde']['output'];
  Url: Scalars['Url']['output'];
  UserId: Scalars['UserId']['output'];
  Boolean: Scalars['Boolean']['output'];
};

export interface AmountScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Amount'], any> {
  name: 'Amount';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface LimitScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Limit'], any> {
  name: 'Limit';
}

export interface MinuteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Minute'], any> {
  name: 'Minute';
}

export type MutationResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createPlayerIfNotExist?: Resolver<ResolversTypes['UserId'], ParentType, ContextType>;
};

export interface PercentageScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Percentage'], any> {
  name: 'Percentage';
}

export interface PercentagePointScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PercentagePoint'], any> {
  name: 'PercentagePoint';
}

export type PlayerResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UserId'], ParentType, ContextType>;
  runs?: Resolver<ResolversTypes['Runs'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Score'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface PointScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Point'], any> {
  name: 'Point';
}

export type ProductResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ProductId'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['Url'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Amount'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['Url'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ProductIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ProductId'], any> {
  name: 'ProductId';
}

export type QueryResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductsArgs, 'limit'>>;
};

export interface RunScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Run'], any> {
  name: 'Run';
}

export type RunsResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Runs'] = ResolversParentTypes['Runs']> = {
  remaining?: Resolver<ResolversTypes['Run'], ParentType, ContextType>;
  renewAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Run'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ScoreScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Score'], any> {
  name: 'Score';
}

export interface SecondeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Seconde'], any> {
  name: 'Seconde';
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Url'], any> {
  name: 'Url';
}

export interface UserIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UserId'], any> {
  name: 'UserId';
}

export type Resolvers<ContextType = GraphQlContext> = {
  Amount?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Limit?: GraphQLScalarType;
  Minute?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Percentage?: GraphQLScalarType;
  PercentagePoint?: GraphQLScalarType;
  Player?: PlayerResolvers<ContextType>;
  Point?: GraphQLScalarType;
  Product?: ProductResolvers<ContextType>;
  ProductId?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Run?: GraphQLScalarType;
  Runs?: RunsResolvers<ContextType>;
  Score?: GraphQLScalarType;
  Seconde?: GraphQLScalarType;
  Url?: GraphQLScalarType;
  UserId?: GraphQLScalarType;
};

