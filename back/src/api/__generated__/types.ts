/* eslint-disable */
// @ts-nocheck
import type { Amount } from '../../utils/types';
import type { Category } from '../../shop-product/types';
import type { GuessId } from '../../game-guess/types';
import type { Limit } from '../../utils/types';
import type { Media } from '../../task/types';
import type { Minute } from '../../utils/types';
import type { Percentage } from '../../utils/types';
import type { PercentagePoint } from '../../utils/types';
import type { Period } from '../../shop-product/types';
import type { Point } from '../../score/types';
import type { ProductId } from '../../shop-product/types';
import type { Quantity } from '../../utils/types';
import type { Rank } from '../../score/types';
import type { Run } from '../../run/types';
import type { Score } from '../../score/types';
import type { Seconde } from '../../utils/types';
import type { TelegramStar } from '../../utils/telegram/types';
import type { Url } from '../../utils/types';
import type { PlayerId } from '../../player/types';
import type { WalletId } from '../../airdrop/types';
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
  Category: { input: Category; output: Category; }
  DateTime: { input: any; output: any; }
  GuessId: { input: GuessId; output: GuessId; }
  Limit: { input: Limit; output: Limit; }
  Media: { input: Media; output: Media; }
  Minute: { input: Minute; output: Minute; }
  Percentage: { input: Percentage; output: Percentage; }
  PercentagePoint: { input: PercentagePoint; output: PercentagePoint; }
  Period: { input: Period; output: Period; }
  Point: { input: Point; output: Point; }
  ProductId: { input: ProductId; output: ProductId; }
  Quantity: { input: Quantity; output: Quantity; }
  Rank: { input: Rank; output: Rank; }
  Run: { input: Run; output: Run; }
  Score: { input: Score; output: Score; }
  Seconde: { input: Seconde; output: Seconde; }
  TelegramStar: { input: TelegramStar; output: TelegramStar; }
  Url: { input: Url; output: Url; }
  UserId: { input: PlayerId; output: PlayerId; }
  WalletId: { input: WalletId; output: WalletId; }
  _FieldSet: { input: any; output: any; }
};

export type Affiliation = {
  __typename?: 'Affiliation';
  friends: Scalars['Int']['output'];
};

export type Airdrop = {
  __typename?: 'Airdrop';
  walletId?: Maybe<Scalars['WalletId']['output']>;
};

export type AirdropMutation = {
  __typename?: 'AirdropMutation';
  updateWalletId: Scalars['Boolean']['output'];
};


export type AirdropMutationUpdateWalletIdArgs = {
  walletId: Scalars['WalletId']['input'];
};

export type Bonus = {
  __typename?: 'Bonus';
  run: Scalars['Run']['output'];
  win: Scalars['Point']['output'];
};

export type GameMutation = {
  __typename?: 'GameMutation';
  lose: Scalars['Boolean']['output'];
  win: Scalars['Boolean']['output'];
};


export type GameMutationLoseArgs = {
  guessId: Scalars['GuessId']['input'];
};


export type GameMutationWinArgs = {
  guessId: Scalars['GuessId']['input'];
};

export type GameQuery = {
  __typename?: 'GameQuery';
  guesses: Array<Guess>;
};

export type Guess = {
  __typename?: 'Guess';
  category: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['GuessId']['output'];
  image: Scalars['Url']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Amount']['output'];
  url: Scalars['Url']['output'];
};

export type LeaderboardQuery = {
  __typename?: 'LeaderboardQuery';
  topPlayers: Array<TopPlayer>;
};


export type LeaderboardQueryTopPlayersArgs = {
  limit: Scalars['Limit']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  airdrop: AirdropMutation;
  game: GameMutation;
  me: PlayerMutation;
  shop: ShopMutation;
  task: TaskMutation;
};

export type Player = {
  __typename?: 'Player';
  affiliation: Affiliation;
  airdrop?: Maybe<Airdrop>;
  bonus: Bonus;
  firstName: Scalars['String']['output'];
  id: Scalars['UserId']['output'];
  runs: Runs;
  score: Scalars['Score']['output'];
  task: Task;
};

export type PlayerMutation = {
  __typename?: 'PlayerMutation';
  createIfNotExist: Scalars['Boolean']['output'];
};

export type Product = {
  __typename?: 'Product';
  amount: Scalars['TelegramStar']['output'];
  category: Scalars['Category']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ProductId']['output'];
  name: Scalars['String']['output'];
  period: Scalars['Period']['output'];
  quantity: Scalars['Quantity']['output'];
};

export type Query = {
  __typename?: 'Query';
  game: GameQuery;
  leaderboard: LeaderboardQuery;
  me: Player;
  shop: ShopQuery;
};

export type Runs = {
  __typename?: 'Runs';
  remaining: Scalars['Run']['output'];
  renewAt: Scalars['DateTime']['output'];
  total: Scalars['Run']['output'];
};

export type ShopMutation = {
  __typename?: 'ShopMutation';
  createInvoice: Scalars['Url']['output'];
};


export type ShopMutationCreateInvoiceArgs = {
  productId: Scalars['ProductId']['input'];
};

export type ShopQuery = {
  __typename?: 'ShopQuery';
  products: Array<Product>;
};

export type Task = {
  __typename?: 'Task';
  join: Array<Scalars['Media']['output']>;
};

export type TaskMutation = {
  __typename?: 'TaskMutation';
  join: Scalars['Boolean']['output'];
};


export type TaskMutationJoinArgs = {
  media: Scalars['Media']['input'];
};

export type TopPlayer = {
  __typename?: 'TopPlayer';
  id: Scalars['UserId']['output'];
  name: Scalars['String']['output'];
  rank: Scalars['Rank']['output'];
  score: Scalars['Score']['output'];
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
  Affiliation: ResolverTypeWrapper<Affiliation>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Airdrop: ResolverTypeWrapper<Airdrop>;
  AirdropMutation: ResolverTypeWrapper<AirdropMutation>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Amount: ResolverTypeWrapper<Scalars['Amount']['output']>;
  Bonus: ResolverTypeWrapper<Bonus>;
  Category: ResolverTypeWrapper<Scalars['Category']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  GameMutation: ResolverTypeWrapper<GameMutation>;
  GameQuery: ResolverTypeWrapper<GameQuery>;
  Guess: ResolverTypeWrapper<Guess>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  GuessId: ResolverTypeWrapper<Scalars['GuessId']['output']>;
  LeaderboardQuery: ResolverTypeWrapper<LeaderboardQuery>;
  Limit: ResolverTypeWrapper<Scalars['Limit']['output']>;
  Media: ResolverTypeWrapper<Scalars['Media']['output']>;
  Minute: ResolverTypeWrapper<Scalars['Minute']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Percentage: ResolverTypeWrapper<Scalars['Percentage']['output']>;
  PercentagePoint: ResolverTypeWrapper<Scalars['PercentagePoint']['output']>;
  Period: ResolverTypeWrapper<Scalars['Period']['output']>;
  Player: ResolverTypeWrapper<Player>;
  PlayerMutation: ResolverTypeWrapper<PlayerMutation>;
  Point: ResolverTypeWrapper<Scalars['Point']['output']>;
  Product: ResolverTypeWrapper<Product>;
  ProductId: ResolverTypeWrapper<Scalars['ProductId']['output']>;
  Quantity: ResolverTypeWrapper<Scalars['Quantity']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Rank: ResolverTypeWrapper<Scalars['Rank']['output']>;
  Run: ResolverTypeWrapper<Scalars['Run']['output']>;
  Runs: ResolverTypeWrapper<Runs>;
  Score: ResolverTypeWrapper<Scalars['Score']['output']>;
  Seconde: ResolverTypeWrapper<Scalars['Seconde']['output']>;
  ShopMutation: ResolverTypeWrapper<ShopMutation>;
  ShopQuery: ResolverTypeWrapper<ShopQuery>;
  Task: ResolverTypeWrapper<Task>;
  TaskMutation: ResolverTypeWrapper<TaskMutation>;
  TelegramStar: ResolverTypeWrapper<Scalars['TelegramStar']['output']>;
  TopPlayer: ResolverTypeWrapper<TopPlayer>;
  Url: ResolverTypeWrapper<Scalars['Url']['output']>;
  UserId: ResolverTypeWrapper<Scalars['UserId']['output']>;
  WalletId: ResolverTypeWrapper<Scalars['WalletId']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Affiliation: Affiliation;
  Int: Scalars['Int']['output'];
  Airdrop: Airdrop;
  AirdropMutation: AirdropMutation;
  Boolean: Scalars['Boolean']['output'];
  Amount: Scalars['Amount']['output'];
  Bonus: Bonus;
  Category: Scalars['Category']['output'];
  DateTime: Scalars['DateTime']['output'];
  GameMutation: GameMutation;
  GameQuery: GameQuery;
  Guess: Guess;
  String: Scalars['String']['output'];
  GuessId: Scalars['GuessId']['output'];
  LeaderboardQuery: LeaderboardQuery;
  Limit: Scalars['Limit']['output'];
  Media: Scalars['Media']['output'];
  Minute: Scalars['Minute']['output'];
  Mutation: {};
  Percentage: Scalars['Percentage']['output'];
  PercentagePoint: Scalars['PercentagePoint']['output'];
  Period: Scalars['Period']['output'];
  Player: Player;
  PlayerMutation: PlayerMutation;
  Point: Scalars['Point']['output'];
  Product: Product;
  ProductId: Scalars['ProductId']['output'];
  Quantity: Scalars['Quantity']['output'];
  Query: {};
  Rank: Scalars['Rank']['output'];
  Run: Scalars['Run']['output'];
  Runs: Runs;
  Score: Scalars['Score']['output'];
  Seconde: Scalars['Seconde']['output'];
  ShopMutation: ShopMutation;
  ShopQuery: ShopQuery;
  Task: Task;
  TaskMutation: TaskMutation;
  TelegramStar: Scalars['TelegramStar']['output'];
  TopPlayer: TopPlayer;
  Url: Scalars['Url']['output'];
  UserId: Scalars['UserId']['output'];
  WalletId: Scalars['WalletId']['output'];
};

export type AffiliationResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Affiliation'] = ResolversParentTypes['Affiliation']> = {
  friends?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AirdropResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Airdrop'] = ResolversParentTypes['Airdrop']> = {
  walletId?: Resolver<Maybe<ResolversTypes['WalletId']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AirdropMutationResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['AirdropMutation'] = ResolversParentTypes['AirdropMutation']> = {
  updateWalletId?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<AirdropMutationUpdateWalletIdArgs, 'walletId'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface AmountScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Amount'], any> {
  name: 'Amount';
}

export type BonusResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Bonus'] = ResolversParentTypes['Bonus']> = {
  run?: Resolver<ResolversTypes['Run'], ParentType, ContextType>;
  win?: Resolver<ResolversTypes['Point'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface CategoryScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Category'], any> {
  name: 'Category';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GameMutationResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['GameMutation'] = ResolversParentTypes['GameMutation']> = {
  lose?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GameMutationLoseArgs, 'guessId'>>;
  win?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GameMutationWinArgs, 'guessId'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameQueryResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['GameQuery'] = ResolversParentTypes['GameQuery']> = {
  guesses?: Resolver<Array<ResolversTypes['Guess']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuessResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Guess'] = ResolversParentTypes['Guess']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GuessId'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['Url'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Amount'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['Url'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GuessIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GuessId'], any> {
  name: 'GuessId';
}

export type LeaderboardQueryResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['LeaderboardQuery'] = ResolversParentTypes['LeaderboardQuery']> = {
  topPlayers?: Resolver<Array<ResolversTypes['TopPlayer']>, ParentType, ContextType, RequireFields<LeaderboardQueryTopPlayersArgs, 'limit'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface LimitScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Limit'], any> {
  name: 'Limit';
}

export interface MediaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Media'], any> {
  name: 'Media';
}

export interface MinuteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Minute'], any> {
  name: 'Minute';
}

export type MutationResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  airdrop?: Resolver<ResolversTypes['AirdropMutation'], ParentType, ContextType>;
  game?: Resolver<ResolversTypes['GameMutation'], ParentType, ContextType>;
  me?: Resolver<ResolversTypes['PlayerMutation'], ParentType, ContextType>;
  shop?: Resolver<ResolversTypes['ShopMutation'], ParentType, ContextType>;
  task?: Resolver<ResolversTypes['TaskMutation'], ParentType, ContextType>;
};

export interface PercentageScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Percentage'], any> {
  name: 'Percentage';
}

export interface PercentagePointScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PercentagePoint'], any> {
  name: 'PercentagePoint';
}

export interface PeriodScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Period'], any> {
  name: 'Period';
}

export type PlayerResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  affiliation?: Resolver<ResolversTypes['Affiliation'], ParentType, ContextType>;
  airdrop?: Resolver<Maybe<ResolversTypes['Airdrop']>, ParentType, ContextType>;
  bonus?: Resolver<ResolversTypes['Bonus'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UserId'], ParentType, ContextType>;
  runs?: Resolver<ResolversTypes['Runs'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Score'], ParentType, ContextType>;
  task?: Resolver<ResolversTypes['Task'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerMutationResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['PlayerMutation'] = ResolversParentTypes['PlayerMutation']> = {
  createIfNotExist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface PointScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Point'], any> {
  name: 'Point';
}

export type ProductResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  amount?: Resolver<ResolversTypes['TelegramStar'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ProductId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  period?: Resolver<ResolversTypes['Period'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Quantity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ProductIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ProductId'], any> {
  name: 'ProductId';
}

export interface QuantityScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Quantity'], any> {
  name: 'Quantity';
}

export type QueryResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  game?: Resolver<ResolversTypes['GameQuery'], ParentType, ContextType>;
  leaderboard?: Resolver<ResolversTypes['LeaderboardQuery'], ParentType, ContextType>;
  me?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  shop?: Resolver<ResolversTypes['ShopQuery'], ParentType, ContextType>;
};

export interface RankScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Rank'], any> {
  name: 'Rank';
}

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

export type ShopMutationResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['ShopMutation'] = ResolversParentTypes['ShopMutation']> = {
  createInvoice?: Resolver<ResolversTypes['Url'], ParentType, ContextType, RequireFields<ShopMutationCreateInvoiceArgs, 'productId'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopQueryResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['ShopQuery'] = ResolversParentTypes['ShopQuery']> = {
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  join?: Resolver<Array<ResolversTypes['Media']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskMutationResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['TaskMutation'] = ResolversParentTypes['TaskMutation']> = {
  join?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<TaskMutationJoinArgs, 'media'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TelegramStarScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TelegramStar'], any> {
  name: 'TelegramStar';
}

export type TopPlayerResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['TopPlayer'] = ResolversParentTypes['TopPlayer']> = {
  id?: Resolver<ResolversTypes['UserId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['Rank'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Score'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Url'], any> {
  name: 'Url';
}

export interface UserIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UserId'], any> {
  name: 'UserId';
}

export interface WalletIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['WalletId'], any> {
  name: 'WalletId';
}

export type Resolvers<ContextType = GraphQlContext> = {
  Affiliation?: AffiliationResolvers<ContextType>;
  Airdrop?: AirdropResolvers<ContextType>;
  AirdropMutation?: AirdropMutationResolvers<ContextType>;
  Amount?: GraphQLScalarType;
  Bonus?: BonusResolvers<ContextType>;
  Category?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  GameMutation?: GameMutationResolvers<ContextType>;
  GameQuery?: GameQueryResolvers<ContextType>;
  Guess?: GuessResolvers<ContextType>;
  GuessId?: GraphQLScalarType;
  LeaderboardQuery?: LeaderboardQueryResolvers<ContextType>;
  Limit?: GraphQLScalarType;
  Media?: GraphQLScalarType;
  Minute?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Percentage?: GraphQLScalarType;
  PercentagePoint?: GraphQLScalarType;
  Period?: GraphQLScalarType;
  Player?: PlayerResolvers<ContextType>;
  PlayerMutation?: PlayerMutationResolvers<ContextType>;
  Point?: GraphQLScalarType;
  Product?: ProductResolvers<ContextType>;
  ProductId?: GraphQLScalarType;
  Quantity?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Rank?: GraphQLScalarType;
  Run?: GraphQLScalarType;
  Runs?: RunsResolvers<ContextType>;
  Score?: GraphQLScalarType;
  Seconde?: GraphQLScalarType;
  ShopMutation?: ShopMutationResolvers<ContextType>;
  ShopQuery?: ShopQueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TaskMutation?: TaskMutationResolvers<ContextType>;
  TelegramStar?: GraphQLScalarType;
  TopPlayer?: TopPlayerResolvers<ContextType>;
  Url?: GraphQLScalarType;
  UserId?: GraphQLScalarType;
  WalletId?: GraphQLScalarType;
};

