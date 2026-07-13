
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model CompanyConfig
 * 
 */
export type CompanyConfig = $Result.DefaultSelection<Prisma.$CompanyConfigPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Job
 * 
 */
export type Job = $Result.DefaultSelection<Prisma.$JobPayload>
/**
 * Model Contract
 * 
 */
export type Contract = $Result.DefaultSelection<Prisma.$ContractPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model AIActionLog
 * 
 */
export type AIActionLog = $Result.DefaultSelection<Prisma.$AIActionLogPayload>
/**
 * Model C2PAManifest
 * 
 */
export type C2PAManifest = $Result.DefaultSelection<Prisma.$C2PAManifestPayload>
/**
 * Model HotPathColumn
 * 
 */
export type HotPathColumn = $Result.DefaultSelection<Prisma.$HotPathColumnPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  CSR: 'CSR',
  FIELD: 'FIELD',
  CUSTOMER: 'CUSTOMER',
  SYSTEM: 'SYSTEM'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const ActorType: {
  HUMAN: 'HUMAN',
  SYSTEM: 'SYSTEM',
  AI: 'AI'
};

export type ActorType = (typeof ActorType)[keyof typeof ActorType]


export const DocumentStatus: {
  DRAFT: 'DRAFT',
  PENDING_REVIEW: 'PENDING_REVIEW',
  APPROVED: 'APPROVED',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

export type DocumentStatus = (typeof DocumentStatus)[keyof typeof DocumentStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type ActorType = $Enums.ActorType

export const ActorType: typeof $Enums.ActorType

export type DocumentStatus = $Enums.DocumentStatus

export const DocumentStatus: typeof $Enums.DocumentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Companies
 * const companies = await prisma.company.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Companies
   * const companies = await prisma.company.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Executes a typed SQL query and returns a typed result
   * @example
   * ```
   * import { myQuery } from '@prisma/client/sql'
   * 
   * const result = await prisma.$queryRawTyped(myQuery())
   * ```
   */
  $queryRawTyped<T>(typedSql: runtime.TypedSql<unknown[], T>): Prisma.PrismaPromise<T[]>

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.companyConfig`: Exposes CRUD operations for the **CompanyConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyConfigs
    * const companyConfigs = await prisma.companyConfig.findMany()
    * ```
    */
  get companyConfig(): Prisma.CompanyConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.job`: Exposes CRUD operations for the **Job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.JobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contract`: Exposes CRUD operations for the **Contract** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contracts
    * const contracts = await prisma.contract.findMany()
    * ```
    */
  get contract(): Prisma.ContractDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIActionLog`: Exposes CRUD operations for the **AIActionLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIActionLogs
    * const aIActionLogs = await prisma.aIActionLog.findMany()
    * ```
    */
  get aIActionLog(): Prisma.AIActionLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.c2PAManifest`: Exposes CRUD operations for the **C2PAManifest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more C2PAManifests
    * const c2PAManifests = await prisma.c2PAManifest.findMany()
    * ```
    */
  get c2PAManifest(): Prisma.C2PAManifestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hotPathColumn`: Exposes CRUD operations for the **HotPathColumn** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HotPathColumns
    * const hotPathColumns = await prisma.hotPathColumn.findMany()
    * ```
    */
  get hotPathColumn(): Prisma.HotPathColumnDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Company: 'Company',
    CompanyConfig: 'CompanyConfig',
    User: 'User',
    Job: 'Job',
    Contract: 'Contract',
    Document: 'Document',
    AuditLog: 'AuditLog',
    AIActionLog: 'AIActionLog',
    C2PAManifest: 'C2PAManifest',
    HotPathColumn: 'HotPathColumn'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "company" | "companyConfig" | "user" | "job" | "contract" | "document" | "auditLog" | "aIActionLog" | "c2PAManifest" | "hotPathColumn"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      CompanyConfig: {
        payload: Prisma.$CompanyConfigPayload<ExtArgs>
        fields: Prisma.CompanyConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyConfigPayload>
          }
          findFirst: {
            args: Prisma.CompanyConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyConfigPayload>
          }
          findMany: {
            args: Prisma.CompanyConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyConfigPayload>[]
          }
          create: {
            args: Prisma.CompanyConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyConfigPayload>
          }
          createMany: {
            args: Prisma.CompanyConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyConfigPayload>[]
          }
          delete: {
            args: Prisma.CompanyConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyConfigPayload>
          }
          update: {
            args: Prisma.CompanyConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyConfigPayload>
          }
          deleteMany: {
            args: Prisma.CompanyConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyConfigPayload>[]
          }
          upsert: {
            args: Prisma.CompanyConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyConfigPayload>
          }
          aggregate: {
            args: Prisma.CompanyConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanyConfig>
          }
          groupBy: {
            args: Prisma.CompanyConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyConfigCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyConfigCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Job: {
        payload: Prisma.$JobPayload<ExtArgs>
        fields: Prisma.JobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findFirst: {
            args: Prisma.JobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findMany: {
            args: Prisma.JobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          create: {
            args: Prisma.JobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          createMany: {
            args: Prisma.JobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          delete: {
            args: Prisma.JobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          update: {
            args: Prisma.JobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          deleteMany: {
            args: Prisma.JobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          upsert: {
            args: Prisma.JobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          aggregate: {
            args: Prisma.JobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob>
          }
          groupBy: {
            args: Prisma.JobGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobCountArgs<ExtArgs>
            result: $Utils.Optional<JobCountAggregateOutputType> | number
          }
        }
      }
      Contract: {
        payload: Prisma.$ContractPayload<ExtArgs>
        fields: Prisma.ContractFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContractFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContractFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          findFirst: {
            args: Prisma.ContractFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContractFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          findMany: {
            args: Prisma.ContractFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>[]
          }
          create: {
            args: Prisma.ContractCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          createMany: {
            args: Prisma.ContractCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContractCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>[]
          }
          delete: {
            args: Prisma.ContractDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          update: {
            args: Prisma.ContractUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          deleteMany: {
            args: Prisma.ContractDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContractUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContractUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>[]
          }
          upsert: {
            args: Prisma.ContractUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          aggregate: {
            args: Prisma.ContractAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContract>
          }
          groupBy: {
            args: Prisma.ContractGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContractGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContractCountArgs<ExtArgs>
            result: $Utils.Optional<ContractCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      AIActionLog: {
        payload: Prisma.$AIActionLogPayload<ExtArgs>
        fields: Prisma.AIActionLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIActionLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIActionLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIActionLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIActionLogPayload>
          }
          findFirst: {
            args: Prisma.AIActionLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIActionLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIActionLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIActionLogPayload>
          }
          findMany: {
            args: Prisma.AIActionLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIActionLogPayload>[]
          }
          create: {
            args: Prisma.AIActionLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIActionLogPayload>
          }
          createMany: {
            args: Prisma.AIActionLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIActionLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIActionLogPayload>[]
          }
          delete: {
            args: Prisma.AIActionLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIActionLogPayload>
          }
          update: {
            args: Prisma.AIActionLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIActionLogPayload>
          }
          deleteMany: {
            args: Prisma.AIActionLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIActionLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIActionLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIActionLogPayload>[]
          }
          upsert: {
            args: Prisma.AIActionLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIActionLogPayload>
          }
          aggregate: {
            args: Prisma.AIActionLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIActionLog>
          }
          groupBy: {
            args: Prisma.AIActionLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIActionLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIActionLogCountArgs<ExtArgs>
            result: $Utils.Optional<AIActionLogCountAggregateOutputType> | number
          }
        }
      }
      C2PAManifest: {
        payload: Prisma.$C2PAManifestPayload<ExtArgs>
        fields: Prisma.C2PAManifestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.C2PAManifestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$C2PAManifestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.C2PAManifestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$C2PAManifestPayload>
          }
          findFirst: {
            args: Prisma.C2PAManifestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$C2PAManifestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.C2PAManifestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$C2PAManifestPayload>
          }
          findMany: {
            args: Prisma.C2PAManifestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$C2PAManifestPayload>[]
          }
          create: {
            args: Prisma.C2PAManifestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$C2PAManifestPayload>
          }
          createMany: {
            args: Prisma.C2PAManifestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.C2PAManifestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$C2PAManifestPayload>[]
          }
          delete: {
            args: Prisma.C2PAManifestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$C2PAManifestPayload>
          }
          update: {
            args: Prisma.C2PAManifestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$C2PAManifestPayload>
          }
          deleteMany: {
            args: Prisma.C2PAManifestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.C2PAManifestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.C2PAManifestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$C2PAManifestPayload>[]
          }
          upsert: {
            args: Prisma.C2PAManifestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$C2PAManifestPayload>
          }
          aggregate: {
            args: Prisma.C2PAManifestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateC2PAManifest>
          }
          groupBy: {
            args: Prisma.C2PAManifestGroupByArgs<ExtArgs>
            result: $Utils.Optional<C2PAManifestGroupByOutputType>[]
          }
          count: {
            args: Prisma.C2PAManifestCountArgs<ExtArgs>
            result: $Utils.Optional<C2PAManifestCountAggregateOutputType> | number
          }
        }
      }
      HotPathColumn: {
        payload: Prisma.$HotPathColumnPayload<ExtArgs>
        fields: Prisma.HotPathColumnFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HotPathColumnFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotPathColumnPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HotPathColumnFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotPathColumnPayload>
          }
          findFirst: {
            args: Prisma.HotPathColumnFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotPathColumnPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HotPathColumnFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotPathColumnPayload>
          }
          findMany: {
            args: Prisma.HotPathColumnFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotPathColumnPayload>[]
          }
          create: {
            args: Prisma.HotPathColumnCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotPathColumnPayload>
          }
          createMany: {
            args: Prisma.HotPathColumnCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HotPathColumnCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotPathColumnPayload>[]
          }
          delete: {
            args: Prisma.HotPathColumnDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotPathColumnPayload>
          }
          update: {
            args: Prisma.HotPathColumnUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotPathColumnPayload>
          }
          deleteMany: {
            args: Prisma.HotPathColumnDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HotPathColumnUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HotPathColumnUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotPathColumnPayload>[]
          }
          upsert: {
            args: Prisma.HotPathColumnUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotPathColumnPayload>
          }
          aggregate: {
            args: Prisma.HotPathColumnAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHotPathColumn>
          }
          groupBy: {
            args: Prisma.HotPathColumnGroupByArgs<ExtArgs>
            result: $Utils.Optional<HotPathColumnGroupByOutputType>[]
          }
          count: {
            args: Prisma.HotPathColumnCountArgs<ExtArgs>
            result: $Utils.Optional<HotPathColumnCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRawTyped: {
          args: runtime.UnknownTypedSql,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    company?: CompanyOmit
    companyConfig?: CompanyConfigOmit
    user?: UserOmit
    job?: JobOmit
    contract?: ContractOmit
    document?: DocumentOmit
    auditLog?: AuditLogOmit
    aIActionLog?: AIActionLogOmit
    c2PAManifest?: C2PAManifestOmit
    hotPathColumn?: HotPathColumnOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    users: number
    jobs: number
    contracts: number
    documents: number
    configs: number
    auditLogs: number
    aiActionLogs: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | CompanyCountOutputTypeCountUsersArgs
    jobs?: boolean | CompanyCountOutputTypeCountJobsArgs
    contracts?: boolean | CompanyCountOutputTypeCountContractsArgs
    documents?: boolean | CompanyCountOutputTypeCountDocumentsArgs
    configs?: boolean | CompanyCountOutputTypeCountConfigsArgs
    auditLogs?: boolean | CompanyCountOutputTypeCountAuditLogsArgs
    aiActionLogs?: boolean | CompanyCountOutputTypeCountAiActionLogsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountContractsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountConfigsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyConfigWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountAiActionLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIActionLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    name: string | null
    subdomain: string | null
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    subdomain: string | null
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    subdomain: number
    deletedAt: number
    deletedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    subdomain?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    subdomain?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    subdomain?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    name: string
    subdomain: string | null
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subdomain?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Company$usersArgs<ExtArgs>
    jobs?: boolean | Company$jobsArgs<ExtArgs>
    contracts?: boolean | Company$contractsArgs<ExtArgs>
    documents?: boolean | Company$documentsArgs<ExtArgs>
    configs?: boolean | Company$configsArgs<ExtArgs>
    auditLogs?: boolean | Company$auditLogsArgs<ExtArgs>
    aiActionLogs?: boolean | Company$aiActionLogsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subdomain?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subdomain?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    subdomain?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "subdomain" | "deletedAt" | "deletedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Company$usersArgs<ExtArgs>
    jobs?: boolean | Company$jobsArgs<ExtArgs>
    contracts?: boolean | Company$contractsArgs<ExtArgs>
    documents?: boolean | Company$documentsArgs<ExtArgs>
    configs?: boolean | Company$configsArgs<ExtArgs>
    auditLogs?: boolean | Company$auditLogsArgs<ExtArgs>
    aiActionLogs?: boolean | Company$aiActionLogsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      jobs: Prisma.$JobPayload<ExtArgs>[]
      contracts: Prisma.$ContractPayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      configs: Prisma.$CompanyConfigPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
      aiActionLogs: Prisma.$AIActionLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      subdomain: string | null
      deletedAt: Date | null
      deletedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Company$usersArgs<ExtArgs> = {}>(args?: Subset<T, Company$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    jobs<T extends Company$jobsArgs<ExtArgs> = {}>(args?: Subset<T, Company$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contracts<T extends Company$contractsArgs<ExtArgs> = {}>(args?: Subset<T, Company$contractsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends Company$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Company$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    configs<T extends Company$configsArgs<ExtArgs> = {}>(args?: Subset<T, Company$configsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends Company$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Company$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    aiActionLogs<T extends Company$aiActionLogsArgs<ExtArgs> = {}>(args?: Subset<T, Company$aiActionLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIActionLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly name: FieldRef<"Company", 'String'>
    readonly subdomain: FieldRef<"Company", 'String'>
    readonly deletedAt: FieldRef<"Company", 'DateTime'>
    readonly deletedBy: FieldRef<"Company", 'String'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.users
   */
  export type Company$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Company.jobs
   */
  export type Company$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Company.contracts
   */
  export type Company$contractsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    where?: ContractWhereInput
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    cursor?: ContractWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Company.documents
   */
  export type Company$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Company.configs
   */
  export type Company$configsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyConfig
     */
    select?: CompanyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyConfig
     */
    omit?: CompanyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyConfigInclude<ExtArgs> | null
    where?: CompanyConfigWhereInput
    orderBy?: CompanyConfigOrderByWithRelationInput | CompanyConfigOrderByWithRelationInput[]
    cursor?: CompanyConfigWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyConfigScalarFieldEnum | CompanyConfigScalarFieldEnum[]
  }

  /**
   * Company.auditLogs
   */
  export type Company$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Company.aiActionLogs
   */
  export type Company$aiActionLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIActionLog
     */
    select?: AIActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIActionLog
     */
    omit?: AIActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIActionLogInclude<ExtArgs> | null
    where?: AIActionLogWhereInput
    orderBy?: AIActionLogOrderByWithRelationInput | AIActionLogOrderByWithRelationInput[]
    cursor?: AIActionLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIActionLogScalarFieldEnum | AIActionLogScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model CompanyConfig
   */

  export type AggregateCompanyConfig = {
    _count: CompanyConfigCountAggregateOutputType | null
    _avg: CompanyConfigAvgAggregateOutputType | null
    _sum: CompanyConfigSumAggregateOutputType | null
    _min: CompanyConfigMinAggregateOutputType | null
    _max: CompanyConfigMaxAggregateOutputType | null
  }

  export type CompanyConfigAvgAggregateOutputType = {
    version: number | null
  }

  export type CompanyConfigSumAggregateOutputType = {
    version: number | null
  }

  export type CompanyConfigMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    version: number | null
    contentHash: string | null
    isActive: boolean | null
    createdAt: Date | null
    createdBy: string | null
  }

  export type CompanyConfigMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    version: number | null
    contentHash: string | null
    isActive: boolean | null
    createdAt: Date | null
    createdBy: string | null
  }

  export type CompanyConfigCountAggregateOutputType = {
    id: number
    companyId: number
    version: number
    schema: number
    contentHash: number
    isActive: number
    createdAt: number
    createdBy: number
    _all: number
  }


  export type CompanyConfigAvgAggregateInputType = {
    version?: true
  }

  export type CompanyConfigSumAggregateInputType = {
    version?: true
  }

  export type CompanyConfigMinAggregateInputType = {
    id?: true
    companyId?: true
    version?: true
    contentHash?: true
    isActive?: true
    createdAt?: true
    createdBy?: true
  }

  export type CompanyConfigMaxAggregateInputType = {
    id?: true
    companyId?: true
    version?: true
    contentHash?: true
    isActive?: true
    createdAt?: true
    createdBy?: true
  }

  export type CompanyConfigCountAggregateInputType = {
    id?: true
    companyId?: true
    version?: true
    schema?: true
    contentHash?: true
    isActive?: true
    createdAt?: true
    createdBy?: true
    _all?: true
  }

  export type CompanyConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyConfig to aggregate.
     */
    where?: CompanyConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyConfigs to fetch.
     */
    orderBy?: CompanyConfigOrderByWithRelationInput | CompanyConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyConfigs
    **/
    _count?: true | CompanyConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanyConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyConfigMaxAggregateInputType
  }

  export type GetCompanyConfigAggregateType<T extends CompanyConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyConfig[P]>
      : GetScalarType<T[P], AggregateCompanyConfig[P]>
  }




  export type CompanyConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyConfigWhereInput
    orderBy?: CompanyConfigOrderByWithAggregationInput | CompanyConfigOrderByWithAggregationInput[]
    by: CompanyConfigScalarFieldEnum[] | CompanyConfigScalarFieldEnum
    having?: CompanyConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyConfigCountAggregateInputType | true
    _avg?: CompanyConfigAvgAggregateInputType
    _sum?: CompanyConfigSumAggregateInputType
    _min?: CompanyConfigMinAggregateInputType
    _max?: CompanyConfigMaxAggregateInputType
  }

  export type CompanyConfigGroupByOutputType = {
    id: string
    companyId: string
    version: number
    schema: JsonValue
    contentHash: string | null
    isActive: boolean
    createdAt: Date
    createdBy: string | null
    _count: CompanyConfigCountAggregateOutputType | null
    _avg: CompanyConfigAvgAggregateOutputType | null
    _sum: CompanyConfigSumAggregateOutputType | null
    _min: CompanyConfigMinAggregateOutputType | null
    _max: CompanyConfigMaxAggregateOutputType | null
  }

  type GetCompanyConfigGroupByPayload<T extends CompanyConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyConfigGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyConfigGroupByOutputType[P]>
        }
      >
    >


  export type CompanyConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    version?: boolean
    schema?: boolean
    contentHash?: boolean
    isActive?: boolean
    createdAt?: boolean
    createdBy?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyConfig"]>

  export type CompanyConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    version?: boolean
    schema?: boolean
    contentHash?: boolean
    isActive?: boolean
    createdAt?: boolean
    createdBy?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyConfig"]>

  export type CompanyConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    version?: boolean
    schema?: boolean
    contentHash?: boolean
    isActive?: boolean
    createdAt?: boolean
    createdBy?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyConfig"]>

  export type CompanyConfigSelectScalar = {
    id?: boolean
    companyId?: boolean
    version?: boolean
    schema?: boolean
    contentHash?: boolean
    isActive?: boolean
    createdAt?: boolean
    createdBy?: boolean
  }

  export type CompanyConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "version" | "schema" | "contentHash" | "isActive" | "createdAt" | "createdBy", ExtArgs["result"]["companyConfig"]>
  export type CompanyConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type CompanyConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type CompanyConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $CompanyConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanyConfig"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      version: number
      schema: Prisma.JsonValue
      contentHash: string | null
      isActive: boolean
      createdAt: Date
      createdBy: string | null
    }, ExtArgs["result"]["companyConfig"]>
    composites: {}
  }

  type CompanyConfigGetPayload<S extends boolean | null | undefined | CompanyConfigDefaultArgs> = $Result.GetResult<Prisma.$CompanyConfigPayload, S>

  type CompanyConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyConfigCountAggregateInputType | true
    }

  export interface CompanyConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanyConfig'], meta: { name: 'CompanyConfig' } }
    /**
     * Find zero or one CompanyConfig that matches the filter.
     * @param {CompanyConfigFindUniqueArgs} args - Arguments to find a CompanyConfig
     * @example
     * // Get one CompanyConfig
     * const companyConfig = await prisma.companyConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyConfigFindUniqueArgs>(args: SelectSubset<T, CompanyConfigFindUniqueArgs<ExtArgs>>): Prisma__CompanyConfigClient<$Result.GetResult<Prisma.$CompanyConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompanyConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyConfigFindUniqueOrThrowArgs} args - Arguments to find a CompanyConfig
     * @example
     * // Get one CompanyConfig
     * const companyConfig = await prisma.companyConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyConfigClient<$Result.GetResult<Prisma.$CompanyConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyConfigFindFirstArgs} args - Arguments to find a CompanyConfig
     * @example
     * // Get one CompanyConfig
     * const companyConfig = await prisma.companyConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyConfigFindFirstArgs>(args?: SelectSubset<T, CompanyConfigFindFirstArgs<ExtArgs>>): Prisma__CompanyConfigClient<$Result.GetResult<Prisma.$CompanyConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyConfigFindFirstOrThrowArgs} args - Arguments to find a CompanyConfig
     * @example
     * // Get one CompanyConfig
     * const companyConfig = await prisma.companyConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyConfigClient<$Result.GetResult<Prisma.$CompanyConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompanyConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyConfigs
     * const companyConfigs = await prisma.companyConfig.findMany()
     * 
     * // Get first 10 CompanyConfigs
     * const companyConfigs = await prisma.companyConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyConfigWithIdOnly = await prisma.companyConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyConfigFindManyArgs>(args?: SelectSubset<T, CompanyConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompanyConfig.
     * @param {CompanyConfigCreateArgs} args - Arguments to create a CompanyConfig.
     * @example
     * // Create one CompanyConfig
     * const CompanyConfig = await prisma.companyConfig.create({
     *   data: {
     *     // ... data to create a CompanyConfig
     *   }
     * })
     * 
     */
    create<T extends CompanyConfigCreateArgs>(args: SelectSubset<T, CompanyConfigCreateArgs<ExtArgs>>): Prisma__CompanyConfigClient<$Result.GetResult<Prisma.$CompanyConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompanyConfigs.
     * @param {CompanyConfigCreateManyArgs} args - Arguments to create many CompanyConfigs.
     * @example
     * // Create many CompanyConfigs
     * const companyConfig = await prisma.companyConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyConfigCreateManyArgs>(args?: SelectSubset<T, CompanyConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompanyConfigs and returns the data saved in the database.
     * @param {CompanyConfigCreateManyAndReturnArgs} args - Arguments to create many CompanyConfigs.
     * @example
     * // Create many CompanyConfigs
     * const companyConfig = await prisma.companyConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompanyConfigs and only return the `id`
     * const companyConfigWithIdOnly = await prisma.companyConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CompanyConfig.
     * @param {CompanyConfigDeleteArgs} args - Arguments to delete one CompanyConfig.
     * @example
     * // Delete one CompanyConfig
     * const CompanyConfig = await prisma.companyConfig.delete({
     *   where: {
     *     // ... filter to delete one CompanyConfig
     *   }
     * })
     * 
     */
    delete<T extends CompanyConfigDeleteArgs>(args: SelectSubset<T, CompanyConfigDeleteArgs<ExtArgs>>): Prisma__CompanyConfigClient<$Result.GetResult<Prisma.$CompanyConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompanyConfig.
     * @param {CompanyConfigUpdateArgs} args - Arguments to update one CompanyConfig.
     * @example
     * // Update one CompanyConfig
     * const companyConfig = await prisma.companyConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyConfigUpdateArgs>(args: SelectSubset<T, CompanyConfigUpdateArgs<ExtArgs>>): Prisma__CompanyConfigClient<$Result.GetResult<Prisma.$CompanyConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompanyConfigs.
     * @param {CompanyConfigDeleteManyArgs} args - Arguments to filter CompanyConfigs to delete.
     * @example
     * // Delete a few CompanyConfigs
     * const { count } = await prisma.companyConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyConfigDeleteManyArgs>(args?: SelectSubset<T, CompanyConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyConfigs
     * const companyConfig = await prisma.companyConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyConfigUpdateManyArgs>(args: SelectSubset<T, CompanyConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyConfigs and returns the data updated in the database.
     * @param {CompanyConfigUpdateManyAndReturnArgs} args - Arguments to update many CompanyConfigs.
     * @example
     * // Update many CompanyConfigs
     * const companyConfig = await prisma.companyConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CompanyConfigs and only return the `id`
     * const companyConfigWithIdOnly = await prisma.companyConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CompanyConfig.
     * @param {CompanyConfigUpsertArgs} args - Arguments to update or create a CompanyConfig.
     * @example
     * // Update or create a CompanyConfig
     * const companyConfig = await prisma.companyConfig.upsert({
     *   create: {
     *     // ... data to create a CompanyConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyConfig we want to update
     *   }
     * })
     */
    upsert<T extends CompanyConfigUpsertArgs>(args: SelectSubset<T, CompanyConfigUpsertArgs<ExtArgs>>): Prisma__CompanyConfigClient<$Result.GetResult<Prisma.$CompanyConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompanyConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyConfigCountArgs} args - Arguments to filter CompanyConfigs to count.
     * @example
     * // Count the number of CompanyConfigs
     * const count = await prisma.companyConfig.count({
     *   where: {
     *     // ... the filter for the CompanyConfigs we want to count
     *   }
     * })
    **/
    count<T extends CompanyConfigCountArgs>(
      args?: Subset<T, CompanyConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyConfigAggregateArgs>(args: Subset<T, CompanyConfigAggregateArgs>): Prisma.PrismaPromise<GetCompanyConfigAggregateType<T>>

    /**
     * Group by CompanyConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyConfigGroupByArgs['orderBy'] }
        : { orderBy?: CompanyConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanyConfig model
   */
  readonly fields: CompanyConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompanyConfig model
   */
  interface CompanyConfigFieldRefs {
    readonly id: FieldRef<"CompanyConfig", 'String'>
    readonly companyId: FieldRef<"CompanyConfig", 'String'>
    readonly version: FieldRef<"CompanyConfig", 'Int'>
    readonly schema: FieldRef<"CompanyConfig", 'Json'>
    readonly contentHash: FieldRef<"CompanyConfig", 'String'>
    readonly isActive: FieldRef<"CompanyConfig", 'Boolean'>
    readonly createdAt: FieldRef<"CompanyConfig", 'DateTime'>
    readonly createdBy: FieldRef<"CompanyConfig", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CompanyConfig findUnique
   */
  export type CompanyConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyConfig
     */
    select?: CompanyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyConfig
     */
    omit?: CompanyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyConfigInclude<ExtArgs> | null
    /**
     * Filter, which CompanyConfig to fetch.
     */
    where: CompanyConfigWhereUniqueInput
  }

  /**
   * CompanyConfig findUniqueOrThrow
   */
  export type CompanyConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyConfig
     */
    select?: CompanyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyConfig
     */
    omit?: CompanyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyConfigInclude<ExtArgs> | null
    /**
     * Filter, which CompanyConfig to fetch.
     */
    where: CompanyConfigWhereUniqueInput
  }

  /**
   * CompanyConfig findFirst
   */
  export type CompanyConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyConfig
     */
    select?: CompanyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyConfig
     */
    omit?: CompanyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyConfigInclude<ExtArgs> | null
    /**
     * Filter, which CompanyConfig to fetch.
     */
    where?: CompanyConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyConfigs to fetch.
     */
    orderBy?: CompanyConfigOrderByWithRelationInput | CompanyConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyConfigs.
     */
    cursor?: CompanyConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyConfigs.
     */
    distinct?: CompanyConfigScalarFieldEnum | CompanyConfigScalarFieldEnum[]
  }

  /**
   * CompanyConfig findFirstOrThrow
   */
  export type CompanyConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyConfig
     */
    select?: CompanyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyConfig
     */
    omit?: CompanyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyConfigInclude<ExtArgs> | null
    /**
     * Filter, which CompanyConfig to fetch.
     */
    where?: CompanyConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyConfigs to fetch.
     */
    orderBy?: CompanyConfigOrderByWithRelationInput | CompanyConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyConfigs.
     */
    cursor?: CompanyConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyConfigs.
     */
    distinct?: CompanyConfigScalarFieldEnum | CompanyConfigScalarFieldEnum[]
  }

  /**
   * CompanyConfig findMany
   */
  export type CompanyConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyConfig
     */
    select?: CompanyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyConfig
     */
    omit?: CompanyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyConfigInclude<ExtArgs> | null
    /**
     * Filter, which CompanyConfigs to fetch.
     */
    where?: CompanyConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyConfigs to fetch.
     */
    orderBy?: CompanyConfigOrderByWithRelationInput | CompanyConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyConfigs.
     */
    cursor?: CompanyConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyConfigs.
     */
    distinct?: CompanyConfigScalarFieldEnum | CompanyConfigScalarFieldEnum[]
  }

  /**
   * CompanyConfig create
   */
  export type CompanyConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyConfig
     */
    select?: CompanyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyConfig
     */
    omit?: CompanyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a CompanyConfig.
     */
    data: XOR<CompanyConfigCreateInput, CompanyConfigUncheckedCreateInput>
  }

  /**
   * CompanyConfig createMany
   */
  export type CompanyConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanyConfigs.
     */
    data: CompanyConfigCreateManyInput | CompanyConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompanyConfig createManyAndReturn
   */
  export type CompanyConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyConfig
     */
    select?: CompanyConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyConfig
     */
    omit?: CompanyConfigOmit<ExtArgs> | null
    /**
     * The data used to create many CompanyConfigs.
     */
    data: CompanyConfigCreateManyInput | CompanyConfigCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompanyConfig update
   */
  export type CompanyConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyConfig
     */
    select?: CompanyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyConfig
     */
    omit?: CompanyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a CompanyConfig.
     */
    data: XOR<CompanyConfigUpdateInput, CompanyConfigUncheckedUpdateInput>
    /**
     * Choose, which CompanyConfig to update.
     */
    where: CompanyConfigWhereUniqueInput
  }

  /**
   * CompanyConfig updateMany
   */
  export type CompanyConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanyConfigs.
     */
    data: XOR<CompanyConfigUpdateManyMutationInput, CompanyConfigUncheckedUpdateManyInput>
    /**
     * Filter which CompanyConfigs to update
     */
    where?: CompanyConfigWhereInput
    /**
     * Limit how many CompanyConfigs to update.
     */
    limit?: number
  }

  /**
   * CompanyConfig updateManyAndReturn
   */
  export type CompanyConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyConfig
     */
    select?: CompanyConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyConfig
     */
    omit?: CompanyConfigOmit<ExtArgs> | null
    /**
     * The data used to update CompanyConfigs.
     */
    data: XOR<CompanyConfigUpdateManyMutationInput, CompanyConfigUncheckedUpdateManyInput>
    /**
     * Filter which CompanyConfigs to update
     */
    where?: CompanyConfigWhereInput
    /**
     * Limit how many CompanyConfigs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyConfigIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompanyConfig upsert
   */
  export type CompanyConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyConfig
     */
    select?: CompanyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyConfig
     */
    omit?: CompanyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the CompanyConfig to update in case it exists.
     */
    where: CompanyConfigWhereUniqueInput
    /**
     * In case the CompanyConfig found by the `where` argument doesn't exist, create a new CompanyConfig with this data.
     */
    create: XOR<CompanyConfigCreateInput, CompanyConfigUncheckedCreateInput>
    /**
     * In case the CompanyConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyConfigUpdateInput, CompanyConfigUncheckedUpdateInput>
  }

  /**
   * CompanyConfig delete
   */
  export type CompanyConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyConfig
     */
    select?: CompanyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyConfig
     */
    omit?: CompanyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyConfigInclude<ExtArgs> | null
    /**
     * Filter which CompanyConfig to delete.
     */
    where: CompanyConfigWhereUniqueInput
  }

  /**
   * CompanyConfig deleteMany
   */
  export type CompanyConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyConfigs to delete
     */
    where?: CompanyConfigWhereInput
    /**
     * Limit how many CompanyConfigs to delete.
     */
    limit?: number
  }

  /**
   * CompanyConfig without action
   */
  export type CompanyConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyConfig
     */
    select?: CompanyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyConfig
     */
    omit?: CompanyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyConfigInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    email: string | null
    name: string | null
    role: $Enums.UserRole | null
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    email: string | null
    name: string | null
    role: $Enums.UserRole | null
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    companyId: number
    email: number
    name: number
    role: number
    deletedAt: number
    deletedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    companyId?: true
    email?: true
    name?: true
    role?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    companyId?: true
    email?: true
    name?: true
    role?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    companyId?: true
    email?: true
    name?: true
    role?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    companyId: string
    email: string
    name: string | null
    role: $Enums.UserRole
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    companyId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "email" | "name" | "role" | "deletedAt" | "deletedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      email: string
      name: string | null
      role: $Enums.UserRole
      deletedAt: Date | null
      deletedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly companyId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
    readonly deletedBy: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Job
   */

  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    contentHash: string | null
    previousHash: string | null
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type JobMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    contentHash: string | null
    previousHash: string | null
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    companyId: number
    data: number
    contentHash: number
    previousHash: number
    deletedAt: number
    deletedBy: number
    createdAt: number
    createdBy: number
    updatedAt: number
    updatedBy: number
    _all: number
  }


  export type JobMinAggregateInputType = {
    id?: true
    companyId?: true
    contentHash?: true
    previousHash?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    companyId?: true
    contentHash?: true
    previousHash?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    companyId?: true
    data?: true
    contentHash?: true
    previousHash?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    _all?: true
  }

  export type JobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Job to aggregate.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type JobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
    orderBy?: JobOrderByWithAggregationInput | JobOrderByWithAggregationInput[]
    by: JobScalarFieldEnum[] | JobScalarFieldEnum
    having?: JobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }

  export type JobGroupByOutputType = {
    id: string
    companyId: string
    data: JsonValue
    contentHash: string | null
    previousHash: string | null
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date
    createdBy: string | null
    updatedAt: Date
    updatedBy: string | null
    _count: JobCountAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends JobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type JobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    data?: boolean
    contentHash?: boolean
    previousHash?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    data?: boolean
    contentHash?: boolean
    previousHash?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    data?: boolean
    contentHash?: boolean
    previousHash?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectScalar = {
    id?: boolean
    companyId?: boolean
    data?: boolean
    contentHash?: boolean
    previousHash?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }

  export type JobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "data" | "contentHash" | "previousHash" | "deletedAt" | "deletedBy" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy", ExtArgs["result"]["job"]>
  export type JobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type JobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type JobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $JobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Job"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      data: Prisma.JsonValue
      contentHash: string | null
      previousHash: string | null
      deletedAt: Date | null
      deletedBy: string | null
      createdAt: Date
      createdBy: string | null
      updatedAt: Date
      updatedBy: string | null
    }, ExtArgs["result"]["job"]>
    composites: {}
  }

  type JobGetPayload<S extends boolean | null | undefined | JobDefaultArgs> = $Result.GetResult<Prisma.$JobPayload, S>

  type JobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobCountAggregateInputType | true
    }

  export interface JobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Job'], meta: { name: 'Job' } }
    /**
     * Find zero or one Job that matches the filter.
     * @param {JobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobFindUniqueArgs>(args: SelectSubset<T, JobFindUniqueArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Job that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(args: SelectSubset<T, JobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobFindFirstArgs>(args?: SelectSubset<T, JobFindFirstArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(args?: SelectSubset<T, JobFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobFindManyArgs>(args?: SelectSubset<T, JobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Job.
     * @param {JobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
     */
    create<T extends JobCreateArgs>(args: SelectSubset<T, JobCreateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jobs.
     * @param {JobCreateManyArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCreateManyArgs>(args?: SelectSubset<T, JobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jobs and returns the data saved in the database.
     * @param {JobCreateManyAndReturnArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobCreateManyAndReturnArgs>(args?: SelectSubset<T, JobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Job.
     * @param {JobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
     */
    delete<T extends JobDeleteArgs>(args: SelectSubset<T, JobDeleteArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Job.
     * @param {JobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobUpdateArgs>(args: SelectSubset<T, JobUpdateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jobs.
     * @param {JobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobDeleteManyArgs>(args?: SelectSubset<T, JobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobUpdateManyArgs>(args: SelectSubset<T, JobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs and returns the data updated in the database.
     * @param {JobUpdateManyAndReturnArgs} args - Arguments to update many Jobs.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobUpdateManyAndReturnArgs>(args: SelectSubset<T, JobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Job.
     * @param {JobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
     */
    upsert<T extends JobUpsertArgs>(args: SelectSubset<T, JobUpsertArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobCountArgs>(
      args?: Subset<T, JobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobGroupByArgs['orderBy'] }
        : { orderBy?: JobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Job model
   */
  readonly fields: JobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Job model
   */
  interface JobFieldRefs {
    readonly id: FieldRef<"Job", 'String'>
    readonly companyId: FieldRef<"Job", 'String'>
    readonly data: FieldRef<"Job", 'Json'>
    readonly contentHash: FieldRef<"Job", 'String'>
    readonly previousHash: FieldRef<"Job", 'String'>
    readonly deletedAt: FieldRef<"Job", 'DateTime'>
    readonly deletedBy: FieldRef<"Job", 'String'>
    readonly createdAt: FieldRef<"Job", 'DateTime'>
    readonly createdBy: FieldRef<"Job", 'String'>
    readonly updatedAt: FieldRef<"Job", 'DateTime'>
    readonly updatedBy: FieldRef<"Job", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Job findUnique
   */
  export type JobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findUniqueOrThrow
   */
  export type JobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findFirst
   */
  export type JobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findFirstOrThrow
   */
  export type JobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findMany
   */
  export type JobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Jobs to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job create
   */
  export type JobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to create a Job.
     */
    data: XOR<JobCreateInput, JobUncheckedCreateInput>
  }

  /**
   * Job createMany
   */
  export type JobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Job createManyAndReturn
   */
  export type JobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job update
   */
  export type JobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to update a Job.
     */
    data: XOR<JobUpdateInput, JobUncheckedUpdateInput>
    /**
     * Choose, which Job to update.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job updateMany
   */
  export type JobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
  }

  /**
   * Job updateManyAndReturn
   */
  export type JobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job upsert
   */
  export type JobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The filter to search for the Job to update in case it exists.
     */
    where: JobWhereUniqueInput
    /**
     * In case the Job found by the `where` argument doesn't exist, create a new Job with this data.
     */
    create: XOR<JobCreateInput, JobUncheckedCreateInput>
    /**
     * In case the Job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobUpdateInput, JobUncheckedUpdateInput>
  }

  /**
   * Job delete
   */
  export type JobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter which Job to delete.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job deleteMany
   */
  export type JobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jobs to delete
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to delete.
     */
    limit?: number
  }

  /**
   * Job without action
   */
  export type JobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
  }


  /**
   * Model Contract
   */

  export type AggregateContract = {
    _count: ContractCountAggregateOutputType | null
    _min: ContractMinAggregateOutputType | null
    _max: ContractMaxAggregateOutputType | null
  }

  export type ContractMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    contentHash: string | null
    previousHash: string | null
    c2paManifestId: string | null
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type ContractMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    contentHash: string | null
    previousHash: string | null
    c2paManifestId: string | null
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type ContractCountAggregateOutputType = {
    id: number
    companyId: number
    data: number
    contentHash: number
    previousHash: number
    c2paManifestId: number
    deletedAt: number
    deletedBy: number
    createdAt: number
    createdBy: number
    updatedAt: number
    updatedBy: number
    _all: number
  }


  export type ContractMinAggregateInputType = {
    id?: true
    companyId?: true
    contentHash?: true
    previousHash?: true
    c2paManifestId?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type ContractMaxAggregateInputType = {
    id?: true
    companyId?: true
    contentHash?: true
    previousHash?: true
    c2paManifestId?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type ContractCountAggregateInputType = {
    id?: true
    companyId?: true
    data?: true
    contentHash?: true
    previousHash?: true
    c2paManifestId?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    _all?: true
  }

  export type ContractAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contract to aggregate.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contracts
    **/
    _count?: true | ContractCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContractMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContractMaxAggregateInputType
  }

  export type GetContractAggregateType<T extends ContractAggregateArgs> = {
        [P in keyof T & keyof AggregateContract]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContract[P]>
      : GetScalarType<T[P], AggregateContract[P]>
  }




  export type ContractGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractWhereInput
    orderBy?: ContractOrderByWithAggregationInput | ContractOrderByWithAggregationInput[]
    by: ContractScalarFieldEnum[] | ContractScalarFieldEnum
    having?: ContractScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContractCountAggregateInputType | true
    _min?: ContractMinAggregateInputType
    _max?: ContractMaxAggregateInputType
  }

  export type ContractGroupByOutputType = {
    id: string
    companyId: string
    data: JsonValue
    contentHash: string | null
    previousHash: string | null
    c2paManifestId: string | null
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date
    createdBy: string | null
    updatedAt: Date
    updatedBy: string | null
    _count: ContractCountAggregateOutputType | null
    _min: ContractMinAggregateOutputType | null
    _max: ContractMaxAggregateOutputType | null
  }

  type GetContractGroupByPayload<T extends ContractGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContractGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContractGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContractGroupByOutputType[P]>
            : GetScalarType<T[P], ContractGroupByOutputType[P]>
        }
      >
    >


  export type ContractSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    data?: boolean
    contentHash?: boolean
    previousHash?: boolean
    c2paManifestId?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contract"]>

  export type ContractSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    data?: boolean
    contentHash?: boolean
    previousHash?: boolean
    c2paManifestId?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contract"]>

  export type ContractSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    data?: boolean
    contentHash?: boolean
    previousHash?: boolean
    c2paManifestId?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contract"]>

  export type ContractSelectScalar = {
    id?: boolean
    companyId?: boolean
    data?: boolean
    contentHash?: boolean
    previousHash?: boolean
    c2paManifestId?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }

  export type ContractOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "data" | "contentHash" | "previousHash" | "c2paManifestId" | "deletedAt" | "deletedBy" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy", ExtArgs["result"]["contract"]>
  export type ContractInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type ContractIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type ContractIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $ContractPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contract"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      data: Prisma.JsonValue
      contentHash: string | null
      previousHash: string | null
      c2paManifestId: string | null
      deletedAt: Date | null
      deletedBy: string | null
      createdAt: Date
      createdBy: string | null
      updatedAt: Date
      updatedBy: string | null
    }, ExtArgs["result"]["contract"]>
    composites: {}
  }

  type ContractGetPayload<S extends boolean | null | undefined | ContractDefaultArgs> = $Result.GetResult<Prisma.$ContractPayload, S>

  type ContractCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContractFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContractCountAggregateInputType | true
    }

  export interface ContractDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contract'], meta: { name: 'Contract' } }
    /**
     * Find zero or one Contract that matches the filter.
     * @param {ContractFindUniqueArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContractFindUniqueArgs>(args: SelectSubset<T, ContractFindUniqueArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contract that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContractFindUniqueOrThrowArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContractFindUniqueOrThrowArgs>(args: SelectSubset<T, ContractFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contract that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractFindFirstArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContractFindFirstArgs>(args?: SelectSubset<T, ContractFindFirstArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contract that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractFindFirstOrThrowArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContractFindFirstOrThrowArgs>(args?: SelectSubset<T, ContractFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contracts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contracts
     * const contracts = await prisma.contract.findMany()
     * 
     * // Get first 10 Contracts
     * const contracts = await prisma.contract.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contractWithIdOnly = await prisma.contract.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContractFindManyArgs>(args?: SelectSubset<T, ContractFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contract.
     * @param {ContractCreateArgs} args - Arguments to create a Contract.
     * @example
     * // Create one Contract
     * const Contract = await prisma.contract.create({
     *   data: {
     *     // ... data to create a Contract
     *   }
     * })
     * 
     */
    create<T extends ContractCreateArgs>(args: SelectSubset<T, ContractCreateArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contracts.
     * @param {ContractCreateManyArgs} args - Arguments to create many Contracts.
     * @example
     * // Create many Contracts
     * const contract = await prisma.contract.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContractCreateManyArgs>(args?: SelectSubset<T, ContractCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contracts and returns the data saved in the database.
     * @param {ContractCreateManyAndReturnArgs} args - Arguments to create many Contracts.
     * @example
     * // Create many Contracts
     * const contract = await prisma.contract.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contracts and only return the `id`
     * const contractWithIdOnly = await prisma.contract.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContractCreateManyAndReturnArgs>(args?: SelectSubset<T, ContractCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contract.
     * @param {ContractDeleteArgs} args - Arguments to delete one Contract.
     * @example
     * // Delete one Contract
     * const Contract = await prisma.contract.delete({
     *   where: {
     *     // ... filter to delete one Contract
     *   }
     * })
     * 
     */
    delete<T extends ContractDeleteArgs>(args: SelectSubset<T, ContractDeleteArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contract.
     * @param {ContractUpdateArgs} args - Arguments to update one Contract.
     * @example
     * // Update one Contract
     * const contract = await prisma.contract.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContractUpdateArgs>(args: SelectSubset<T, ContractUpdateArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contracts.
     * @param {ContractDeleteManyArgs} args - Arguments to filter Contracts to delete.
     * @example
     * // Delete a few Contracts
     * const { count } = await prisma.contract.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContractDeleteManyArgs>(args?: SelectSubset<T, ContractDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contracts
     * const contract = await prisma.contract.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContractUpdateManyArgs>(args: SelectSubset<T, ContractUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contracts and returns the data updated in the database.
     * @param {ContractUpdateManyAndReturnArgs} args - Arguments to update many Contracts.
     * @example
     * // Update many Contracts
     * const contract = await prisma.contract.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contracts and only return the `id`
     * const contractWithIdOnly = await prisma.contract.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContractUpdateManyAndReturnArgs>(args: SelectSubset<T, ContractUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contract.
     * @param {ContractUpsertArgs} args - Arguments to update or create a Contract.
     * @example
     * // Update or create a Contract
     * const contract = await prisma.contract.upsert({
     *   create: {
     *     // ... data to create a Contract
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contract we want to update
     *   }
     * })
     */
    upsert<T extends ContractUpsertArgs>(args: SelectSubset<T, ContractUpsertArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractCountArgs} args - Arguments to filter Contracts to count.
     * @example
     * // Count the number of Contracts
     * const count = await prisma.contract.count({
     *   where: {
     *     // ... the filter for the Contracts we want to count
     *   }
     * })
    **/
    count<T extends ContractCountArgs>(
      args?: Subset<T, ContractCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContractCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContractAggregateArgs>(args: Subset<T, ContractAggregateArgs>): Prisma.PrismaPromise<GetContractAggregateType<T>>

    /**
     * Group by Contract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContractGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContractGroupByArgs['orderBy'] }
        : { orderBy?: ContractGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContractGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contract model
   */
  readonly fields: ContractFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contract.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContractClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Contract model
   */
  interface ContractFieldRefs {
    readonly id: FieldRef<"Contract", 'String'>
    readonly companyId: FieldRef<"Contract", 'String'>
    readonly data: FieldRef<"Contract", 'Json'>
    readonly contentHash: FieldRef<"Contract", 'String'>
    readonly previousHash: FieldRef<"Contract", 'String'>
    readonly c2paManifestId: FieldRef<"Contract", 'String'>
    readonly deletedAt: FieldRef<"Contract", 'DateTime'>
    readonly deletedBy: FieldRef<"Contract", 'String'>
    readonly createdAt: FieldRef<"Contract", 'DateTime'>
    readonly createdBy: FieldRef<"Contract", 'String'>
    readonly updatedAt: FieldRef<"Contract", 'DateTime'>
    readonly updatedBy: FieldRef<"Contract", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Contract findUnique
   */
  export type ContractFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract findUniqueOrThrow
   */
  export type ContractFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract findFirst
   */
  export type ContractFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contracts.
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contracts.
     */
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Contract findFirstOrThrow
   */
  export type ContractFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contracts.
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contracts.
     */
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Contract findMany
   */
  export type ContractFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contracts to fetch.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contracts.
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contracts.
     */
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Contract create
   */
  export type ContractCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * The data needed to create a Contract.
     */
    data: XOR<ContractCreateInput, ContractUncheckedCreateInput>
  }

  /**
   * Contract createMany
   */
  export type ContractCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contracts.
     */
    data: ContractCreateManyInput | ContractCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contract createManyAndReturn
   */
  export type ContractCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * The data used to create many Contracts.
     */
    data: ContractCreateManyInput | ContractCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contract update
   */
  export type ContractUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * The data needed to update a Contract.
     */
    data: XOR<ContractUpdateInput, ContractUncheckedUpdateInput>
    /**
     * Choose, which Contract to update.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract updateMany
   */
  export type ContractUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contracts.
     */
    data: XOR<ContractUpdateManyMutationInput, ContractUncheckedUpdateManyInput>
    /**
     * Filter which Contracts to update
     */
    where?: ContractWhereInput
    /**
     * Limit how many Contracts to update.
     */
    limit?: number
  }

  /**
   * Contract updateManyAndReturn
   */
  export type ContractUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * The data used to update Contracts.
     */
    data: XOR<ContractUpdateManyMutationInput, ContractUncheckedUpdateManyInput>
    /**
     * Filter which Contracts to update
     */
    where?: ContractWhereInput
    /**
     * Limit how many Contracts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contract upsert
   */
  export type ContractUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * The filter to search for the Contract to update in case it exists.
     */
    where: ContractWhereUniqueInput
    /**
     * In case the Contract found by the `where` argument doesn't exist, create a new Contract with this data.
     */
    create: XOR<ContractCreateInput, ContractUncheckedCreateInput>
    /**
     * In case the Contract was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContractUpdateInput, ContractUncheckedUpdateInput>
  }

  /**
   * Contract delete
   */
  export type ContractDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter which Contract to delete.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract deleteMany
   */
  export type ContractDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contracts to delete
     */
    where?: ContractWhereInput
    /**
     * Limit how many Contracts to delete.
     */
    limit?: number
  }

  /**
   * Contract without action
   */
  export type ContractDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type DocumentSumAggregateOutputType = {
    fileSize: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    title: string | null
    status: $Enums.DocumentStatus | null
    storagePath: string | null
    storageUrl: string | null
    mimeType: string | null
    fileSize: number | null
    contentHash: string | null
    previousHash: string | null
    c2paManifestId: string | null
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    title: string | null
    status: $Enums.DocumentStatus | null
    storagePath: string | null
    storageUrl: string | null
    mimeType: string | null
    fileSize: number | null
    contentHash: string | null
    previousHash: string | null
    c2paManifestId: string | null
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    companyId: number
    title: number
    status: number
    metadata: number
    storagePath: number
    storageUrl: number
    mimeType: number
    fileSize: number
    contentHash: number
    previousHash: number
    c2paManifestId: number
    deletedAt: number
    deletedBy: number
    createdAt: number
    createdBy: number
    updatedAt: number
    updatedBy: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    fileSize?: true
  }

  export type DocumentSumAggregateInputType = {
    fileSize?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    companyId?: true
    title?: true
    status?: true
    storagePath?: true
    storageUrl?: true
    mimeType?: true
    fileSize?: true
    contentHash?: true
    previousHash?: true
    c2paManifestId?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    companyId?: true
    title?: true
    status?: true
    storagePath?: true
    storageUrl?: true
    mimeType?: true
    fileSize?: true
    contentHash?: true
    previousHash?: true
    c2paManifestId?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    companyId?: true
    title?: true
    status?: true
    metadata?: true
    storagePath?: true
    storageUrl?: true
    mimeType?: true
    fileSize?: true
    contentHash?: true
    previousHash?: true
    c2paManifestId?: true
    deletedAt?: true
    deletedBy?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    companyId: string
    title: string | null
    status: $Enums.DocumentStatus
    metadata: JsonValue
    storagePath: string | null
    storageUrl: string | null
    mimeType: string | null
    fileSize: number | null
    contentHash: string | null
    previousHash: string | null
    c2paManifestId: string | null
    deletedAt: Date | null
    deletedBy: string | null
    createdAt: Date
    createdBy: string | null
    updatedAt: Date
    updatedBy: string | null
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    title?: boolean
    status?: boolean
    metadata?: boolean
    storagePath?: boolean
    storageUrl?: boolean
    mimeType?: boolean
    fileSize?: boolean
    contentHash?: boolean
    previousHash?: boolean
    c2paManifestId?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    title?: boolean
    status?: boolean
    metadata?: boolean
    storagePath?: boolean
    storageUrl?: boolean
    mimeType?: boolean
    fileSize?: boolean
    contentHash?: boolean
    previousHash?: boolean
    c2paManifestId?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    title?: boolean
    status?: boolean
    metadata?: boolean
    storagePath?: boolean
    storageUrl?: boolean
    mimeType?: boolean
    fileSize?: boolean
    contentHash?: boolean
    previousHash?: boolean
    c2paManifestId?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    companyId?: boolean
    title?: boolean
    status?: boolean
    metadata?: boolean
    storagePath?: boolean
    storageUrl?: boolean
    mimeType?: boolean
    fileSize?: boolean
    contentHash?: boolean
    previousHash?: boolean
    c2paManifestId?: boolean
    deletedAt?: boolean
    deletedBy?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "title" | "status" | "metadata" | "storagePath" | "storageUrl" | "mimeType" | "fileSize" | "contentHash" | "previousHash" | "c2paManifestId" | "deletedAt" | "deletedBy" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      title: string | null
      status: $Enums.DocumentStatus
      metadata: Prisma.JsonValue
      storagePath: string | null
      storageUrl: string | null
      mimeType: string | null
      fileSize: number | null
      contentHash: string | null
      previousHash: string | null
      c2paManifestId: string | null
      deletedAt: Date | null
      deletedBy: string | null
      createdAt: Date
      createdBy: string | null
      updatedAt: Date
      updatedBy: string | null
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly companyId: FieldRef<"Document", 'String'>
    readonly title: FieldRef<"Document", 'String'>
    readonly status: FieldRef<"Document", 'DocumentStatus'>
    readonly metadata: FieldRef<"Document", 'Json'>
    readonly storagePath: FieldRef<"Document", 'String'>
    readonly storageUrl: FieldRef<"Document", 'String'>
    readonly mimeType: FieldRef<"Document", 'String'>
    readonly fileSize: FieldRef<"Document", 'Int'>
    readonly contentHash: FieldRef<"Document", 'String'>
    readonly previousHash: FieldRef<"Document", 'String'>
    readonly c2paManifestId: FieldRef<"Document", 'String'>
    readonly deletedAt: FieldRef<"Document", 'DateTime'>
    readonly deletedBy: FieldRef<"Document", 'String'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly createdBy: FieldRef<"Document", 'String'>
    readonly updatedAt: FieldRef<"Document", 'DateTime'>
    readonly updatedBy: FieldRef<"Document", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    entityType: string | null
    entityId: string | null
    action: string | null
    actorId: string | null
    actorType: string | null
    occurredAt: Date | null
    beforeHash: string | null
    afterHash: string | null
    prevRecordHash: string | null
    ipAddress: string | null
    userAgent: string | null
    requestId: string | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    entityType: string | null
    entityId: string | null
    action: string | null
    actorId: string | null
    actorType: string | null
    occurredAt: Date | null
    beforeHash: string | null
    afterHash: string | null
    prevRecordHash: string | null
    ipAddress: string | null
    userAgent: string | null
    requestId: string | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    companyId: number
    entityType: number
    entityId: number
    action: number
    actorId: number
    actorType: number
    occurredAt: number
    beforeHash: number
    afterHash: number
    prevRecordHash: number
    beforeState: number
    afterState: number
    payload: number
    ipAddress: number
    userAgent: number
    requestId: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    companyId?: true
    entityType?: true
    entityId?: true
    action?: true
    actorId?: true
    actorType?: true
    occurredAt?: true
    beforeHash?: true
    afterHash?: true
    prevRecordHash?: true
    ipAddress?: true
    userAgent?: true
    requestId?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    companyId?: true
    entityType?: true
    entityId?: true
    action?: true
    actorId?: true
    actorType?: true
    occurredAt?: true
    beforeHash?: true
    afterHash?: true
    prevRecordHash?: true
    ipAddress?: true
    userAgent?: true
    requestId?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    companyId?: true
    entityType?: true
    entityId?: true
    action?: true
    actorId?: true
    actorType?: true
    occurredAt?: true
    beforeHash?: true
    afterHash?: true
    prevRecordHash?: true
    beforeState?: true
    afterState?: true
    payload?: true
    ipAddress?: true
    userAgent?: true
    requestId?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    companyId: string
    entityType: string
    entityId: string
    action: string
    actorId: string | null
    actorType: string
    occurredAt: Date
    beforeHash: string | null
    afterHash: string
    prevRecordHash: string | null
    beforeState: JsonValue | null
    afterState: JsonValue | null
    payload: JsonValue
    ipAddress: string | null
    userAgent: string | null
    requestId: string | null
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    actorId?: boolean
    actorType?: boolean
    occurredAt?: boolean
    beforeHash?: boolean
    afterHash?: boolean
    prevRecordHash?: boolean
    beforeState?: boolean
    afterState?: boolean
    payload?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    requestId?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    actorId?: boolean
    actorType?: boolean
    occurredAt?: boolean
    beforeHash?: boolean
    afterHash?: boolean
    prevRecordHash?: boolean
    beforeState?: boolean
    afterState?: boolean
    payload?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    requestId?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    actorId?: boolean
    actorType?: boolean
    occurredAt?: boolean
    beforeHash?: boolean
    afterHash?: boolean
    prevRecordHash?: boolean
    beforeState?: boolean
    afterState?: boolean
    payload?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    requestId?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    companyId?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    actorId?: boolean
    actorType?: boolean
    occurredAt?: boolean
    beforeHash?: boolean
    afterHash?: boolean
    prevRecordHash?: boolean
    beforeState?: boolean
    afterState?: boolean
    payload?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    requestId?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "entityType" | "entityId" | "action" | "actorId" | "actorType" | "occurredAt" | "beforeHash" | "afterHash" | "prevRecordHash" | "beforeState" | "afterState" | "payload" | "ipAddress" | "userAgent" | "requestId", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      entityType: string
      entityId: string
      action: string
      actorId: string | null
      actorType: string
      occurredAt: Date
      beforeHash: string | null
      afterHash: string
      prevRecordHash: string | null
      beforeState: Prisma.JsonValue | null
      afterState: Prisma.JsonValue | null
      payload: Prisma.JsonValue
      ipAddress: string | null
      userAgent: string | null
      requestId: string | null
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly companyId: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly actorId: FieldRef<"AuditLog", 'String'>
    readonly actorType: FieldRef<"AuditLog", 'String'>
    readonly occurredAt: FieldRef<"AuditLog", 'DateTime'>
    readonly beforeHash: FieldRef<"AuditLog", 'String'>
    readonly afterHash: FieldRef<"AuditLog", 'String'>
    readonly prevRecordHash: FieldRef<"AuditLog", 'String'>
    readonly beforeState: FieldRef<"AuditLog", 'Json'>
    readonly afterState: FieldRef<"AuditLog", 'Json'>
    readonly payload: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly requestId: FieldRef<"AuditLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model AIActionLog
   */

  export type AggregateAIActionLog = {
    _count: AIActionLogCountAggregateOutputType | null
    _avg: AIActionLogAvgAggregateOutputType | null
    _sum: AIActionLogSumAggregateOutputType | null
    _min: AIActionLogMinAggregateOutputType | null
    _max: AIActionLogMaxAggregateOutputType | null
  }

  export type AIActionLogAvgAggregateOutputType = {
    confidence: number | null
  }

  export type AIActionLogSumAggregateOutputType = {
    confidence: number | null
  }

  export type AIActionLogMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    actorId: string | null
    actorType: $Enums.ActorType | null
    action: string | null
    model: string | null
    version: string | null
    allowed: boolean | null
    reason: string | null
    confidence: number | null
    contentHash: string | null
    createdAt: Date | null
  }

  export type AIActionLogMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    actorId: string | null
    actorType: $Enums.ActorType | null
    action: string | null
    model: string | null
    version: string | null
    allowed: boolean | null
    reason: string | null
    confidence: number | null
    contentHash: string | null
    createdAt: Date | null
  }

  export type AIActionLogCountAggregateOutputType = {
    id: number
    companyId: number
    actorId: number
    actorType: number
    action: number
    model: number
    version: number
    input: number
    outcome: number
    allowed: number
    reason: number
    confidence: number
    contentHash: number
    createdAt: number
    _all: number
  }


  export type AIActionLogAvgAggregateInputType = {
    confidence?: true
  }

  export type AIActionLogSumAggregateInputType = {
    confidence?: true
  }

  export type AIActionLogMinAggregateInputType = {
    id?: true
    companyId?: true
    actorId?: true
    actorType?: true
    action?: true
    model?: true
    version?: true
    allowed?: true
    reason?: true
    confidence?: true
    contentHash?: true
    createdAt?: true
  }

  export type AIActionLogMaxAggregateInputType = {
    id?: true
    companyId?: true
    actorId?: true
    actorType?: true
    action?: true
    model?: true
    version?: true
    allowed?: true
    reason?: true
    confidence?: true
    contentHash?: true
    createdAt?: true
  }

  export type AIActionLogCountAggregateInputType = {
    id?: true
    companyId?: true
    actorId?: true
    actorType?: true
    action?: true
    model?: true
    version?: true
    input?: true
    outcome?: true
    allowed?: true
    reason?: true
    confidence?: true
    contentHash?: true
    createdAt?: true
    _all?: true
  }

  export type AIActionLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIActionLog to aggregate.
     */
    where?: AIActionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIActionLogs to fetch.
     */
    orderBy?: AIActionLogOrderByWithRelationInput | AIActionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIActionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIActionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIActionLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIActionLogs
    **/
    _count?: true | AIActionLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIActionLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIActionLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIActionLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIActionLogMaxAggregateInputType
  }

  export type GetAIActionLogAggregateType<T extends AIActionLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAIActionLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIActionLog[P]>
      : GetScalarType<T[P], AggregateAIActionLog[P]>
  }




  export type AIActionLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIActionLogWhereInput
    orderBy?: AIActionLogOrderByWithAggregationInput | AIActionLogOrderByWithAggregationInput[]
    by: AIActionLogScalarFieldEnum[] | AIActionLogScalarFieldEnum
    having?: AIActionLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIActionLogCountAggregateInputType | true
    _avg?: AIActionLogAvgAggregateInputType
    _sum?: AIActionLogSumAggregateInputType
    _min?: AIActionLogMinAggregateInputType
    _max?: AIActionLogMaxAggregateInputType
  }

  export type AIActionLogGroupByOutputType = {
    id: string
    companyId: string
    actorId: string | null
    actorType: $Enums.ActorType
    action: string
    model: string | null
    version: string | null
    input: JsonValue
    outcome: JsonValue
    allowed: boolean
    reason: string | null
    confidence: number | null
    contentHash: string | null
    createdAt: Date
    _count: AIActionLogCountAggregateOutputType | null
    _avg: AIActionLogAvgAggregateOutputType | null
    _sum: AIActionLogSumAggregateOutputType | null
    _min: AIActionLogMinAggregateOutputType | null
    _max: AIActionLogMaxAggregateOutputType | null
  }

  type GetAIActionLogGroupByPayload<T extends AIActionLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIActionLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIActionLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIActionLogGroupByOutputType[P]>
            : GetScalarType<T[P], AIActionLogGroupByOutputType[P]>
        }
      >
    >


  export type AIActionLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    actorId?: boolean
    actorType?: boolean
    action?: boolean
    model?: boolean
    version?: boolean
    input?: boolean
    outcome?: boolean
    allowed?: boolean
    reason?: boolean
    confidence?: boolean
    contentHash?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIActionLog"]>

  export type AIActionLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    actorId?: boolean
    actorType?: boolean
    action?: boolean
    model?: boolean
    version?: boolean
    input?: boolean
    outcome?: boolean
    allowed?: boolean
    reason?: boolean
    confidence?: boolean
    contentHash?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIActionLog"]>

  export type AIActionLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    actorId?: boolean
    actorType?: boolean
    action?: boolean
    model?: boolean
    version?: boolean
    input?: boolean
    outcome?: boolean
    allowed?: boolean
    reason?: boolean
    confidence?: boolean
    contentHash?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIActionLog"]>

  export type AIActionLogSelectScalar = {
    id?: boolean
    companyId?: boolean
    actorId?: boolean
    actorType?: boolean
    action?: boolean
    model?: boolean
    version?: boolean
    input?: boolean
    outcome?: boolean
    allowed?: boolean
    reason?: boolean
    confidence?: boolean
    contentHash?: boolean
    createdAt?: boolean
  }

  export type AIActionLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "actorId" | "actorType" | "action" | "model" | "version" | "input" | "outcome" | "allowed" | "reason" | "confidence" | "contentHash" | "createdAt", ExtArgs["result"]["aIActionLog"]>
  export type AIActionLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type AIActionLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type AIActionLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $AIActionLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIActionLog"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      actorId: string | null
      actorType: $Enums.ActorType
      action: string
      model: string | null
      version: string | null
      input: Prisma.JsonValue
      outcome: Prisma.JsonValue
      allowed: boolean
      reason: string | null
      confidence: number | null
      contentHash: string | null
      createdAt: Date
    }, ExtArgs["result"]["aIActionLog"]>
    composites: {}
  }

  type AIActionLogGetPayload<S extends boolean | null | undefined | AIActionLogDefaultArgs> = $Result.GetResult<Prisma.$AIActionLogPayload, S>

  type AIActionLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIActionLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIActionLogCountAggregateInputType | true
    }

  export interface AIActionLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIActionLog'], meta: { name: 'AIActionLog' } }
    /**
     * Find zero or one AIActionLog that matches the filter.
     * @param {AIActionLogFindUniqueArgs} args - Arguments to find a AIActionLog
     * @example
     * // Get one AIActionLog
     * const aIActionLog = await prisma.aIActionLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIActionLogFindUniqueArgs>(args: SelectSubset<T, AIActionLogFindUniqueArgs<ExtArgs>>): Prisma__AIActionLogClient<$Result.GetResult<Prisma.$AIActionLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIActionLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIActionLogFindUniqueOrThrowArgs} args - Arguments to find a AIActionLog
     * @example
     * // Get one AIActionLog
     * const aIActionLog = await prisma.aIActionLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIActionLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AIActionLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIActionLogClient<$Result.GetResult<Prisma.$AIActionLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIActionLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIActionLogFindFirstArgs} args - Arguments to find a AIActionLog
     * @example
     * // Get one AIActionLog
     * const aIActionLog = await prisma.aIActionLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIActionLogFindFirstArgs>(args?: SelectSubset<T, AIActionLogFindFirstArgs<ExtArgs>>): Prisma__AIActionLogClient<$Result.GetResult<Prisma.$AIActionLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIActionLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIActionLogFindFirstOrThrowArgs} args - Arguments to find a AIActionLog
     * @example
     * // Get one AIActionLog
     * const aIActionLog = await prisma.aIActionLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIActionLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AIActionLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIActionLogClient<$Result.GetResult<Prisma.$AIActionLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIActionLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIActionLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIActionLogs
     * const aIActionLogs = await prisma.aIActionLog.findMany()
     * 
     * // Get first 10 AIActionLogs
     * const aIActionLogs = await prisma.aIActionLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIActionLogWithIdOnly = await prisma.aIActionLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIActionLogFindManyArgs>(args?: SelectSubset<T, AIActionLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIActionLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIActionLog.
     * @param {AIActionLogCreateArgs} args - Arguments to create a AIActionLog.
     * @example
     * // Create one AIActionLog
     * const AIActionLog = await prisma.aIActionLog.create({
     *   data: {
     *     // ... data to create a AIActionLog
     *   }
     * })
     * 
     */
    create<T extends AIActionLogCreateArgs>(args: SelectSubset<T, AIActionLogCreateArgs<ExtArgs>>): Prisma__AIActionLogClient<$Result.GetResult<Prisma.$AIActionLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIActionLogs.
     * @param {AIActionLogCreateManyArgs} args - Arguments to create many AIActionLogs.
     * @example
     * // Create many AIActionLogs
     * const aIActionLog = await prisma.aIActionLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIActionLogCreateManyArgs>(args?: SelectSubset<T, AIActionLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIActionLogs and returns the data saved in the database.
     * @param {AIActionLogCreateManyAndReturnArgs} args - Arguments to create many AIActionLogs.
     * @example
     * // Create many AIActionLogs
     * const aIActionLog = await prisma.aIActionLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIActionLogs and only return the `id`
     * const aIActionLogWithIdOnly = await prisma.aIActionLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIActionLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AIActionLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIActionLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIActionLog.
     * @param {AIActionLogDeleteArgs} args - Arguments to delete one AIActionLog.
     * @example
     * // Delete one AIActionLog
     * const AIActionLog = await prisma.aIActionLog.delete({
     *   where: {
     *     // ... filter to delete one AIActionLog
     *   }
     * })
     * 
     */
    delete<T extends AIActionLogDeleteArgs>(args: SelectSubset<T, AIActionLogDeleteArgs<ExtArgs>>): Prisma__AIActionLogClient<$Result.GetResult<Prisma.$AIActionLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIActionLog.
     * @param {AIActionLogUpdateArgs} args - Arguments to update one AIActionLog.
     * @example
     * // Update one AIActionLog
     * const aIActionLog = await prisma.aIActionLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIActionLogUpdateArgs>(args: SelectSubset<T, AIActionLogUpdateArgs<ExtArgs>>): Prisma__AIActionLogClient<$Result.GetResult<Prisma.$AIActionLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIActionLogs.
     * @param {AIActionLogDeleteManyArgs} args - Arguments to filter AIActionLogs to delete.
     * @example
     * // Delete a few AIActionLogs
     * const { count } = await prisma.aIActionLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIActionLogDeleteManyArgs>(args?: SelectSubset<T, AIActionLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIActionLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIActionLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIActionLogs
     * const aIActionLog = await prisma.aIActionLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIActionLogUpdateManyArgs>(args: SelectSubset<T, AIActionLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIActionLogs and returns the data updated in the database.
     * @param {AIActionLogUpdateManyAndReturnArgs} args - Arguments to update many AIActionLogs.
     * @example
     * // Update many AIActionLogs
     * const aIActionLog = await prisma.aIActionLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIActionLogs and only return the `id`
     * const aIActionLogWithIdOnly = await prisma.aIActionLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AIActionLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AIActionLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIActionLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIActionLog.
     * @param {AIActionLogUpsertArgs} args - Arguments to update or create a AIActionLog.
     * @example
     * // Update or create a AIActionLog
     * const aIActionLog = await prisma.aIActionLog.upsert({
     *   create: {
     *     // ... data to create a AIActionLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIActionLog we want to update
     *   }
     * })
     */
    upsert<T extends AIActionLogUpsertArgs>(args: SelectSubset<T, AIActionLogUpsertArgs<ExtArgs>>): Prisma__AIActionLogClient<$Result.GetResult<Prisma.$AIActionLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIActionLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIActionLogCountArgs} args - Arguments to filter AIActionLogs to count.
     * @example
     * // Count the number of AIActionLogs
     * const count = await prisma.aIActionLog.count({
     *   where: {
     *     // ... the filter for the AIActionLogs we want to count
     *   }
     * })
    **/
    count<T extends AIActionLogCountArgs>(
      args?: Subset<T, AIActionLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIActionLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIActionLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIActionLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AIActionLogAggregateArgs>(args: Subset<T, AIActionLogAggregateArgs>): Prisma.PrismaPromise<GetAIActionLogAggregateType<T>>

    /**
     * Group by AIActionLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIActionLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AIActionLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIActionLogGroupByArgs['orderBy'] }
        : { orderBy?: AIActionLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AIActionLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIActionLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIActionLog model
   */
  readonly fields: AIActionLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIActionLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIActionLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AIActionLog model
   */
  interface AIActionLogFieldRefs {
    readonly id: FieldRef<"AIActionLog", 'String'>
    readonly companyId: FieldRef<"AIActionLog", 'String'>
    readonly actorId: FieldRef<"AIActionLog", 'String'>
    readonly actorType: FieldRef<"AIActionLog", 'ActorType'>
    readonly action: FieldRef<"AIActionLog", 'String'>
    readonly model: FieldRef<"AIActionLog", 'String'>
    readonly version: FieldRef<"AIActionLog", 'String'>
    readonly input: FieldRef<"AIActionLog", 'Json'>
    readonly outcome: FieldRef<"AIActionLog", 'Json'>
    readonly allowed: FieldRef<"AIActionLog", 'Boolean'>
    readonly reason: FieldRef<"AIActionLog", 'String'>
    readonly confidence: FieldRef<"AIActionLog", 'Float'>
    readonly contentHash: FieldRef<"AIActionLog", 'String'>
    readonly createdAt: FieldRef<"AIActionLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIActionLog findUnique
   */
  export type AIActionLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIActionLog
     */
    select?: AIActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIActionLog
     */
    omit?: AIActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIActionLogInclude<ExtArgs> | null
    /**
     * Filter, which AIActionLog to fetch.
     */
    where: AIActionLogWhereUniqueInput
  }

  /**
   * AIActionLog findUniqueOrThrow
   */
  export type AIActionLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIActionLog
     */
    select?: AIActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIActionLog
     */
    omit?: AIActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIActionLogInclude<ExtArgs> | null
    /**
     * Filter, which AIActionLog to fetch.
     */
    where: AIActionLogWhereUniqueInput
  }

  /**
   * AIActionLog findFirst
   */
  export type AIActionLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIActionLog
     */
    select?: AIActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIActionLog
     */
    omit?: AIActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIActionLogInclude<ExtArgs> | null
    /**
     * Filter, which AIActionLog to fetch.
     */
    where?: AIActionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIActionLogs to fetch.
     */
    orderBy?: AIActionLogOrderByWithRelationInput | AIActionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIActionLogs.
     */
    cursor?: AIActionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIActionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIActionLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIActionLogs.
     */
    distinct?: AIActionLogScalarFieldEnum | AIActionLogScalarFieldEnum[]
  }

  /**
   * AIActionLog findFirstOrThrow
   */
  export type AIActionLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIActionLog
     */
    select?: AIActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIActionLog
     */
    omit?: AIActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIActionLogInclude<ExtArgs> | null
    /**
     * Filter, which AIActionLog to fetch.
     */
    where?: AIActionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIActionLogs to fetch.
     */
    orderBy?: AIActionLogOrderByWithRelationInput | AIActionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIActionLogs.
     */
    cursor?: AIActionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIActionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIActionLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIActionLogs.
     */
    distinct?: AIActionLogScalarFieldEnum | AIActionLogScalarFieldEnum[]
  }

  /**
   * AIActionLog findMany
   */
  export type AIActionLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIActionLog
     */
    select?: AIActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIActionLog
     */
    omit?: AIActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIActionLogInclude<ExtArgs> | null
    /**
     * Filter, which AIActionLogs to fetch.
     */
    where?: AIActionLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIActionLogs to fetch.
     */
    orderBy?: AIActionLogOrderByWithRelationInput | AIActionLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIActionLogs.
     */
    cursor?: AIActionLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIActionLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIActionLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIActionLogs.
     */
    distinct?: AIActionLogScalarFieldEnum | AIActionLogScalarFieldEnum[]
  }

  /**
   * AIActionLog create
   */
  export type AIActionLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIActionLog
     */
    select?: AIActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIActionLog
     */
    omit?: AIActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIActionLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AIActionLog.
     */
    data: XOR<AIActionLogCreateInput, AIActionLogUncheckedCreateInput>
  }

  /**
   * AIActionLog createMany
   */
  export type AIActionLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIActionLogs.
     */
    data: AIActionLogCreateManyInput | AIActionLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIActionLog createManyAndReturn
   */
  export type AIActionLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIActionLog
     */
    select?: AIActionLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIActionLog
     */
    omit?: AIActionLogOmit<ExtArgs> | null
    /**
     * The data used to create many AIActionLogs.
     */
    data: AIActionLogCreateManyInput | AIActionLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIActionLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIActionLog update
   */
  export type AIActionLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIActionLog
     */
    select?: AIActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIActionLog
     */
    omit?: AIActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIActionLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AIActionLog.
     */
    data: XOR<AIActionLogUpdateInput, AIActionLogUncheckedUpdateInput>
    /**
     * Choose, which AIActionLog to update.
     */
    where: AIActionLogWhereUniqueInput
  }

  /**
   * AIActionLog updateMany
   */
  export type AIActionLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIActionLogs.
     */
    data: XOR<AIActionLogUpdateManyMutationInput, AIActionLogUncheckedUpdateManyInput>
    /**
     * Filter which AIActionLogs to update
     */
    where?: AIActionLogWhereInput
    /**
     * Limit how many AIActionLogs to update.
     */
    limit?: number
  }

  /**
   * AIActionLog updateManyAndReturn
   */
  export type AIActionLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIActionLog
     */
    select?: AIActionLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIActionLog
     */
    omit?: AIActionLogOmit<ExtArgs> | null
    /**
     * The data used to update AIActionLogs.
     */
    data: XOR<AIActionLogUpdateManyMutationInput, AIActionLogUncheckedUpdateManyInput>
    /**
     * Filter which AIActionLogs to update
     */
    where?: AIActionLogWhereInput
    /**
     * Limit how many AIActionLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIActionLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIActionLog upsert
   */
  export type AIActionLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIActionLog
     */
    select?: AIActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIActionLog
     */
    omit?: AIActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIActionLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AIActionLog to update in case it exists.
     */
    where: AIActionLogWhereUniqueInput
    /**
     * In case the AIActionLog found by the `where` argument doesn't exist, create a new AIActionLog with this data.
     */
    create: XOR<AIActionLogCreateInput, AIActionLogUncheckedCreateInput>
    /**
     * In case the AIActionLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIActionLogUpdateInput, AIActionLogUncheckedUpdateInput>
  }

  /**
   * AIActionLog delete
   */
  export type AIActionLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIActionLog
     */
    select?: AIActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIActionLog
     */
    omit?: AIActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIActionLogInclude<ExtArgs> | null
    /**
     * Filter which AIActionLog to delete.
     */
    where: AIActionLogWhereUniqueInput
  }

  /**
   * AIActionLog deleteMany
   */
  export type AIActionLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIActionLogs to delete
     */
    where?: AIActionLogWhereInput
    /**
     * Limit how many AIActionLogs to delete.
     */
    limit?: number
  }

  /**
   * AIActionLog without action
   */
  export type AIActionLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIActionLog
     */
    select?: AIActionLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIActionLog
     */
    omit?: AIActionLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIActionLogInclude<ExtArgs> | null
  }


  /**
   * Model C2PAManifest
   */

  export type AggregateC2PAManifest = {
    _count: C2PAManifestCountAggregateOutputType | null
    _min: C2PAManifestMinAggregateOutputType | null
    _max: C2PAManifestMaxAggregateOutputType | null
  }

  export type C2PAManifestMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    entityType: string | null
    entityId: string | null
    signature: string | null
    signedAt: Date | null
    signedBy: string | null
    isVerified: boolean | null
    verifiedAt: Date | null
    verifiedBy: string | null
    createdAt: Date | null
  }

  export type C2PAManifestMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    entityType: string | null
    entityId: string | null
    signature: string | null
    signedAt: Date | null
    signedBy: string | null
    isVerified: boolean | null
    verifiedAt: Date | null
    verifiedBy: string | null
    createdAt: Date | null
  }

  export type C2PAManifestCountAggregateOutputType = {
    id: number
    companyId: number
    entityType: number
    entityId: number
    manifestJson: number
    signature: number
    signedAt: number
    signedBy: number
    isVerified: number
    verifiedAt: number
    verifiedBy: number
    createdAt: number
    _all: number
  }


  export type C2PAManifestMinAggregateInputType = {
    id?: true
    companyId?: true
    entityType?: true
    entityId?: true
    signature?: true
    signedAt?: true
    signedBy?: true
    isVerified?: true
    verifiedAt?: true
    verifiedBy?: true
    createdAt?: true
  }

  export type C2PAManifestMaxAggregateInputType = {
    id?: true
    companyId?: true
    entityType?: true
    entityId?: true
    signature?: true
    signedAt?: true
    signedBy?: true
    isVerified?: true
    verifiedAt?: true
    verifiedBy?: true
    createdAt?: true
  }

  export type C2PAManifestCountAggregateInputType = {
    id?: true
    companyId?: true
    entityType?: true
    entityId?: true
    manifestJson?: true
    signature?: true
    signedAt?: true
    signedBy?: true
    isVerified?: true
    verifiedAt?: true
    verifiedBy?: true
    createdAt?: true
    _all?: true
  }

  export type C2PAManifestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which C2PAManifest to aggregate.
     */
    where?: C2PAManifestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of C2PAManifests to fetch.
     */
    orderBy?: C2PAManifestOrderByWithRelationInput | C2PAManifestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: C2PAManifestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` C2PAManifests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` C2PAManifests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned C2PAManifests
    **/
    _count?: true | C2PAManifestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: C2PAManifestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: C2PAManifestMaxAggregateInputType
  }

  export type GetC2PAManifestAggregateType<T extends C2PAManifestAggregateArgs> = {
        [P in keyof T & keyof AggregateC2PAManifest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateC2PAManifest[P]>
      : GetScalarType<T[P], AggregateC2PAManifest[P]>
  }




  export type C2PAManifestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: C2PAManifestWhereInput
    orderBy?: C2PAManifestOrderByWithAggregationInput | C2PAManifestOrderByWithAggregationInput[]
    by: C2PAManifestScalarFieldEnum[] | C2PAManifestScalarFieldEnum
    having?: C2PAManifestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: C2PAManifestCountAggregateInputType | true
    _min?: C2PAManifestMinAggregateInputType
    _max?: C2PAManifestMaxAggregateInputType
  }

  export type C2PAManifestGroupByOutputType = {
    id: string
    companyId: string
    entityType: string
    entityId: string
    manifestJson: JsonValue
    signature: string | null
    signedAt: Date | null
    signedBy: string | null
    isVerified: boolean
    verifiedAt: Date | null
    verifiedBy: string | null
    createdAt: Date
    _count: C2PAManifestCountAggregateOutputType | null
    _min: C2PAManifestMinAggregateOutputType | null
    _max: C2PAManifestMaxAggregateOutputType | null
  }

  type GetC2PAManifestGroupByPayload<T extends C2PAManifestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<C2PAManifestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof C2PAManifestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], C2PAManifestGroupByOutputType[P]>
            : GetScalarType<T[P], C2PAManifestGroupByOutputType[P]>
        }
      >
    >


  export type C2PAManifestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    entityType?: boolean
    entityId?: boolean
    manifestJson?: boolean
    signature?: boolean
    signedAt?: boolean
    signedBy?: boolean
    isVerified?: boolean
    verifiedAt?: boolean
    verifiedBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["c2PAManifest"]>

  export type C2PAManifestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    entityType?: boolean
    entityId?: boolean
    manifestJson?: boolean
    signature?: boolean
    signedAt?: boolean
    signedBy?: boolean
    isVerified?: boolean
    verifiedAt?: boolean
    verifiedBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["c2PAManifest"]>

  export type C2PAManifestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    entityType?: boolean
    entityId?: boolean
    manifestJson?: boolean
    signature?: boolean
    signedAt?: boolean
    signedBy?: boolean
    isVerified?: boolean
    verifiedAt?: boolean
    verifiedBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["c2PAManifest"]>

  export type C2PAManifestSelectScalar = {
    id?: boolean
    companyId?: boolean
    entityType?: boolean
    entityId?: boolean
    manifestJson?: boolean
    signature?: boolean
    signedAt?: boolean
    signedBy?: boolean
    isVerified?: boolean
    verifiedAt?: boolean
    verifiedBy?: boolean
    createdAt?: boolean
  }

  export type C2PAManifestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "entityType" | "entityId" | "manifestJson" | "signature" | "signedAt" | "signedBy" | "isVerified" | "verifiedAt" | "verifiedBy" | "createdAt", ExtArgs["result"]["c2PAManifest"]>

  export type $C2PAManifestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "C2PAManifest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      entityType: string
      entityId: string
      manifestJson: Prisma.JsonValue
      signature: string | null
      signedAt: Date | null
      signedBy: string | null
      isVerified: boolean
      verifiedAt: Date | null
      verifiedBy: string | null
      createdAt: Date
    }, ExtArgs["result"]["c2PAManifest"]>
    composites: {}
  }

  type C2PAManifestGetPayload<S extends boolean | null | undefined | C2PAManifestDefaultArgs> = $Result.GetResult<Prisma.$C2PAManifestPayload, S>

  type C2PAManifestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<C2PAManifestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: C2PAManifestCountAggregateInputType | true
    }

  export interface C2PAManifestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['C2PAManifest'], meta: { name: 'C2PAManifest' } }
    /**
     * Find zero or one C2PAManifest that matches the filter.
     * @param {C2PAManifestFindUniqueArgs} args - Arguments to find a C2PAManifest
     * @example
     * // Get one C2PAManifest
     * const c2PAManifest = await prisma.c2PAManifest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends C2PAManifestFindUniqueArgs>(args: SelectSubset<T, C2PAManifestFindUniqueArgs<ExtArgs>>): Prisma__C2PAManifestClient<$Result.GetResult<Prisma.$C2PAManifestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one C2PAManifest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {C2PAManifestFindUniqueOrThrowArgs} args - Arguments to find a C2PAManifest
     * @example
     * // Get one C2PAManifest
     * const c2PAManifest = await prisma.c2PAManifest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends C2PAManifestFindUniqueOrThrowArgs>(args: SelectSubset<T, C2PAManifestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__C2PAManifestClient<$Result.GetResult<Prisma.$C2PAManifestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first C2PAManifest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {C2PAManifestFindFirstArgs} args - Arguments to find a C2PAManifest
     * @example
     * // Get one C2PAManifest
     * const c2PAManifest = await prisma.c2PAManifest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends C2PAManifestFindFirstArgs>(args?: SelectSubset<T, C2PAManifestFindFirstArgs<ExtArgs>>): Prisma__C2PAManifestClient<$Result.GetResult<Prisma.$C2PAManifestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first C2PAManifest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {C2PAManifestFindFirstOrThrowArgs} args - Arguments to find a C2PAManifest
     * @example
     * // Get one C2PAManifest
     * const c2PAManifest = await prisma.c2PAManifest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends C2PAManifestFindFirstOrThrowArgs>(args?: SelectSubset<T, C2PAManifestFindFirstOrThrowArgs<ExtArgs>>): Prisma__C2PAManifestClient<$Result.GetResult<Prisma.$C2PAManifestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more C2PAManifests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {C2PAManifestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all C2PAManifests
     * const c2PAManifests = await prisma.c2PAManifest.findMany()
     * 
     * // Get first 10 C2PAManifests
     * const c2PAManifests = await prisma.c2PAManifest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const c2PAManifestWithIdOnly = await prisma.c2PAManifest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends C2PAManifestFindManyArgs>(args?: SelectSubset<T, C2PAManifestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$C2PAManifestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a C2PAManifest.
     * @param {C2PAManifestCreateArgs} args - Arguments to create a C2PAManifest.
     * @example
     * // Create one C2PAManifest
     * const C2PAManifest = await prisma.c2PAManifest.create({
     *   data: {
     *     // ... data to create a C2PAManifest
     *   }
     * })
     * 
     */
    create<T extends C2PAManifestCreateArgs>(args: SelectSubset<T, C2PAManifestCreateArgs<ExtArgs>>): Prisma__C2PAManifestClient<$Result.GetResult<Prisma.$C2PAManifestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many C2PAManifests.
     * @param {C2PAManifestCreateManyArgs} args - Arguments to create many C2PAManifests.
     * @example
     * // Create many C2PAManifests
     * const c2PAManifest = await prisma.c2PAManifest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends C2PAManifestCreateManyArgs>(args?: SelectSubset<T, C2PAManifestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many C2PAManifests and returns the data saved in the database.
     * @param {C2PAManifestCreateManyAndReturnArgs} args - Arguments to create many C2PAManifests.
     * @example
     * // Create many C2PAManifests
     * const c2PAManifest = await prisma.c2PAManifest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many C2PAManifests and only return the `id`
     * const c2PAManifestWithIdOnly = await prisma.c2PAManifest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends C2PAManifestCreateManyAndReturnArgs>(args?: SelectSubset<T, C2PAManifestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$C2PAManifestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a C2PAManifest.
     * @param {C2PAManifestDeleteArgs} args - Arguments to delete one C2PAManifest.
     * @example
     * // Delete one C2PAManifest
     * const C2PAManifest = await prisma.c2PAManifest.delete({
     *   where: {
     *     // ... filter to delete one C2PAManifest
     *   }
     * })
     * 
     */
    delete<T extends C2PAManifestDeleteArgs>(args: SelectSubset<T, C2PAManifestDeleteArgs<ExtArgs>>): Prisma__C2PAManifestClient<$Result.GetResult<Prisma.$C2PAManifestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one C2PAManifest.
     * @param {C2PAManifestUpdateArgs} args - Arguments to update one C2PAManifest.
     * @example
     * // Update one C2PAManifest
     * const c2PAManifest = await prisma.c2PAManifest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends C2PAManifestUpdateArgs>(args: SelectSubset<T, C2PAManifestUpdateArgs<ExtArgs>>): Prisma__C2PAManifestClient<$Result.GetResult<Prisma.$C2PAManifestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more C2PAManifests.
     * @param {C2PAManifestDeleteManyArgs} args - Arguments to filter C2PAManifests to delete.
     * @example
     * // Delete a few C2PAManifests
     * const { count } = await prisma.c2PAManifest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends C2PAManifestDeleteManyArgs>(args?: SelectSubset<T, C2PAManifestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more C2PAManifests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {C2PAManifestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many C2PAManifests
     * const c2PAManifest = await prisma.c2PAManifest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends C2PAManifestUpdateManyArgs>(args: SelectSubset<T, C2PAManifestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more C2PAManifests and returns the data updated in the database.
     * @param {C2PAManifestUpdateManyAndReturnArgs} args - Arguments to update many C2PAManifests.
     * @example
     * // Update many C2PAManifests
     * const c2PAManifest = await prisma.c2PAManifest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more C2PAManifests and only return the `id`
     * const c2PAManifestWithIdOnly = await prisma.c2PAManifest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends C2PAManifestUpdateManyAndReturnArgs>(args: SelectSubset<T, C2PAManifestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$C2PAManifestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one C2PAManifest.
     * @param {C2PAManifestUpsertArgs} args - Arguments to update or create a C2PAManifest.
     * @example
     * // Update or create a C2PAManifest
     * const c2PAManifest = await prisma.c2PAManifest.upsert({
     *   create: {
     *     // ... data to create a C2PAManifest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the C2PAManifest we want to update
     *   }
     * })
     */
    upsert<T extends C2PAManifestUpsertArgs>(args: SelectSubset<T, C2PAManifestUpsertArgs<ExtArgs>>): Prisma__C2PAManifestClient<$Result.GetResult<Prisma.$C2PAManifestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of C2PAManifests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {C2PAManifestCountArgs} args - Arguments to filter C2PAManifests to count.
     * @example
     * // Count the number of C2PAManifests
     * const count = await prisma.c2PAManifest.count({
     *   where: {
     *     // ... the filter for the C2PAManifests we want to count
     *   }
     * })
    **/
    count<T extends C2PAManifestCountArgs>(
      args?: Subset<T, C2PAManifestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], C2PAManifestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a C2PAManifest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {C2PAManifestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends C2PAManifestAggregateArgs>(args: Subset<T, C2PAManifestAggregateArgs>): Prisma.PrismaPromise<GetC2PAManifestAggregateType<T>>

    /**
     * Group by C2PAManifest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {C2PAManifestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends C2PAManifestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: C2PAManifestGroupByArgs['orderBy'] }
        : { orderBy?: C2PAManifestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, C2PAManifestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetC2PAManifestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the C2PAManifest model
   */
  readonly fields: C2PAManifestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for C2PAManifest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__C2PAManifestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the C2PAManifest model
   */
  interface C2PAManifestFieldRefs {
    readonly id: FieldRef<"C2PAManifest", 'String'>
    readonly companyId: FieldRef<"C2PAManifest", 'String'>
    readonly entityType: FieldRef<"C2PAManifest", 'String'>
    readonly entityId: FieldRef<"C2PAManifest", 'String'>
    readonly manifestJson: FieldRef<"C2PAManifest", 'Json'>
    readonly signature: FieldRef<"C2PAManifest", 'String'>
    readonly signedAt: FieldRef<"C2PAManifest", 'DateTime'>
    readonly signedBy: FieldRef<"C2PAManifest", 'String'>
    readonly isVerified: FieldRef<"C2PAManifest", 'Boolean'>
    readonly verifiedAt: FieldRef<"C2PAManifest", 'DateTime'>
    readonly verifiedBy: FieldRef<"C2PAManifest", 'String'>
    readonly createdAt: FieldRef<"C2PAManifest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * C2PAManifest findUnique
   */
  export type C2PAManifestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the C2PAManifest
     */
    select?: C2PAManifestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the C2PAManifest
     */
    omit?: C2PAManifestOmit<ExtArgs> | null
    /**
     * Filter, which C2PAManifest to fetch.
     */
    where: C2PAManifestWhereUniqueInput
  }

  /**
   * C2PAManifest findUniqueOrThrow
   */
  export type C2PAManifestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the C2PAManifest
     */
    select?: C2PAManifestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the C2PAManifest
     */
    omit?: C2PAManifestOmit<ExtArgs> | null
    /**
     * Filter, which C2PAManifest to fetch.
     */
    where: C2PAManifestWhereUniqueInput
  }

  /**
   * C2PAManifest findFirst
   */
  export type C2PAManifestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the C2PAManifest
     */
    select?: C2PAManifestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the C2PAManifest
     */
    omit?: C2PAManifestOmit<ExtArgs> | null
    /**
     * Filter, which C2PAManifest to fetch.
     */
    where?: C2PAManifestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of C2PAManifests to fetch.
     */
    orderBy?: C2PAManifestOrderByWithRelationInput | C2PAManifestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for C2PAManifests.
     */
    cursor?: C2PAManifestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` C2PAManifests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` C2PAManifests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of C2PAManifests.
     */
    distinct?: C2PAManifestScalarFieldEnum | C2PAManifestScalarFieldEnum[]
  }

  /**
   * C2PAManifest findFirstOrThrow
   */
  export type C2PAManifestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the C2PAManifest
     */
    select?: C2PAManifestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the C2PAManifest
     */
    omit?: C2PAManifestOmit<ExtArgs> | null
    /**
     * Filter, which C2PAManifest to fetch.
     */
    where?: C2PAManifestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of C2PAManifests to fetch.
     */
    orderBy?: C2PAManifestOrderByWithRelationInput | C2PAManifestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for C2PAManifests.
     */
    cursor?: C2PAManifestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` C2PAManifests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` C2PAManifests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of C2PAManifests.
     */
    distinct?: C2PAManifestScalarFieldEnum | C2PAManifestScalarFieldEnum[]
  }

  /**
   * C2PAManifest findMany
   */
  export type C2PAManifestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the C2PAManifest
     */
    select?: C2PAManifestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the C2PAManifest
     */
    omit?: C2PAManifestOmit<ExtArgs> | null
    /**
     * Filter, which C2PAManifests to fetch.
     */
    where?: C2PAManifestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of C2PAManifests to fetch.
     */
    orderBy?: C2PAManifestOrderByWithRelationInput | C2PAManifestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing C2PAManifests.
     */
    cursor?: C2PAManifestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` C2PAManifests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` C2PAManifests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of C2PAManifests.
     */
    distinct?: C2PAManifestScalarFieldEnum | C2PAManifestScalarFieldEnum[]
  }

  /**
   * C2PAManifest create
   */
  export type C2PAManifestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the C2PAManifest
     */
    select?: C2PAManifestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the C2PAManifest
     */
    omit?: C2PAManifestOmit<ExtArgs> | null
    /**
     * The data needed to create a C2PAManifest.
     */
    data: XOR<C2PAManifestCreateInput, C2PAManifestUncheckedCreateInput>
  }

  /**
   * C2PAManifest createMany
   */
  export type C2PAManifestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many C2PAManifests.
     */
    data: C2PAManifestCreateManyInput | C2PAManifestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * C2PAManifest createManyAndReturn
   */
  export type C2PAManifestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the C2PAManifest
     */
    select?: C2PAManifestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the C2PAManifest
     */
    omit?: C2PAManifestOmit<ExtArgs> | null
    /**
     * The data used to create many C2PAManifests.
     */
    data: C2PAManifestCreateManyInput | C2PAManifestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * C2PAManifest update
   */
  export type C2PAManifestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the C2PAManifest
     */
    select?: C2PAManifestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the C2PAManifest
     */
    omit?: C2PAManifestOmit<ExtArgs> | null
    /**
     * The data needed to update a C2PAManifest.
     */
    data: XOR<C2PAManifestUpdateInput, C2PAManifestUncheckedUpdateInput>
    /**
     * Choose, which C2PAManifest to update.
     */
    where: C2PAManifestWhereUniqueInput
  }

  /**
   * C2PAManifest updateMany
   */
  export type C2PAManifestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update C2PAManifests.
     */
    data: XOR<C2PAManifestUpdateManyMutationInput, C2PAManifestUncheckedUpdateManyInput>
    /**
     * Filter which C2PAManifests to update
     */
    where?: C2PAManifestWhereInput
    /**
     * Limit how many C2PAManifests to update.
     */
    limit?: number
  }

  /**
   * C2PAManifest updateManyAndReturn
   */
  export type C2PAManifestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the C2PAManifest
     */
    select?: C2PAManifestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the C2PAManifest
     */
    omit?: C2PAManifestOmit<ExtArgs> | null
    /**
     * The data used to update C2PAManifests.
     */
    data: XOR<C2PAManifestUpdateManyMutationInput, C2PAManifestUncheckedUpdateManyInput>
    /**
     * Filter which C2PAManifests to update
     */
    where?: C2PAManifestWhereInput
    /**
     * Limit how many C2PAManifests to update.
     */
    limit?: number
  }

  /**
   * C2PAManifest upsert
   */
  export type C2PAManifestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the C2PAManifest
     */
    select?: C2PAManifestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the C2PAManifest
     */
    omit?: C2PAManifestOmit<ExtArgs> | null
    /**
     * The filter to search for the C2PAManifest to update in case it exists.
     */
    where: C2PAManifestWhereUniqueInput
    /**
     * In case the C2PAManifest found by the `where` argument doesn't exist, create a new C2PAManifest with this data.
     */
    create: XOR<C2PAManifestCreateInput, C2PAManifestUncheckedCreateInput>
    /**
     * In case the C2PAManifest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<C2PAManifestUpdateInput, C2PAManifestUncheckedUpdateInput>
  }

  /**
   * C2PAManifest delete
   */
  export type C2PAManifestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the C2PAManifest
     */
    select?: C2PAManifestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the C2PAManifest
     */
    omit?: C2PAManifestOmit<ExtArgs> | null
    /**
     * Filter which C2PAManifest to delete.
     */
    where: C2PAManifestWhereUniqueInput
  }

  /**
   * C2PAManifest deleteMany
   */
  export type C2PAManifestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which C2PAManifests to delete
     */
    where?: C2PAManifestWhereInput
    /**
     * Limit how many C2PAManifests to delete.
     */
    limit?: number
  }

  /**
   * C2PAManifest without action
   */
  export type C2PAManifestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the C2PAManifest
     */
    select?: C2PAManifestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the C2PAManifest
     */
    omit?: C2PAManifestOmit<ExtArgs> | null
  }


  /**
   * Model HotPathColumn
   */

  export type AggregateHotPathColumn = {
    _count: HotPathColumnCountAggregateOutputType | null
    _min: HotPathColumnMinAggregateOutputType | null
    _max: HotPathColumnMaxAggregateOutputType | null
  }

  export type HotPathColumnMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    tableName: string | null
    columnName: string | null
    jsonPath: string | null
    dataType: string | null
    isIndexed: boolean | null
    indexName: string | null
    createdAt: Date | null
    createdBy: string | null
  }

  export type HotPathColumnMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    tableName: string | null
    columnName: string | null
    jsonPath: string | null
    dataType: string | null
    isIndexed: boolean | null
    indexName: string | null
    createdAt: Date | null
    createdBy: string | null
  }

  export type HotPathColumnCountAggregateOutputType = {
    id: number
    companyId: number
    tableName: number
    columnName: number
    jsonPath: number
    dataType: number
    isIndexed: number
    indexName: number
    usage: number
    createdAt: number
    createdBy: number
    _all: number
  }


  export type HotPathColumnMinAggregateInputType = {
    id?: true
    companyId?: true
    tableName?: true
    columnName?: true
    jsonPath?: true
    dataType?: true
    isIndexed?: true
    indexName?: true
    createdAt?: true
    createdBy?: true
  }

  export type HotPathColumnMaxAggregateInputType = {
    id?: true
    companyId?: true
    tableName?: true
    columnName?: true
    jsonPath?: true
    dataType?: true
    isIndexed?: true
    indexName?: true
    createdAt?: true
    createdBy?: true
  }

  export type HotPathColumnCountAggregateInputType = {
    id?: true
    companyId?: true
    tableName?: true
    columnName?: true
    jsonPath?: true
    dataType?: true
    isIndexed?: true
    indexName?: true
    usage?: true
    createdAt?: true
    createdBy?: true
    _all?: true
  }

  export type HotPathColumnAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HotPathColumn to aggregate.
     */
    where?: HotPathColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HotPathColumns to fetch.
     */
    orderBy?: HotPathColumnOrderByWithRelationInput | HotPathColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HotPathColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HotPathColumns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HotPathColumns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HotPathColumns
    **/
    _count?: true | HotPathColumnCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HotPathColumnMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HotPathColumnMaxAggregateInputType
  }

  export type GetHotPathColumnAggregateType<T extends HotPathColumnAggregateArgs> = {
        [P in keyof T & keyof AggregateHotPathColumn]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHotPathColumn[P]>
      : GetScalarType<T[P], AggregateHotPathColumn[P]>
  }




  export type HotPathColumnGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HotPathColumnWhereInput
    orderBy?: HotPathColumnOrderByWithAggregationInput | HotPathColumnOrderByWithAggregationInput[]
    by: HotPathColumnScalarFieldEnum[] | HotPathColumnScalarFieldEnum
    having?: HotPathColumnScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HotPathColumnCountAggregateInputType | true
    _min?: HotPathColumnMinAggregateInputType
    _max?: HotPathColumnMaxAggregateInputType
  }

  export type HotPathColumnGroupByOutputType = {
    id: string
    companyId: string
    tableName: string
    columnName: string
    jsonPath: string
    dataType: string
    isIndexed: boolean
    indexName: string | null
    usage: JsonValue | null
    createdAt: Date
    createdBy: string | null
    _count: HotPathColumnCountAggregateOutputType | null
    _min: HotPathColumnMinAggregateOutputType | null
    _max: HotPathColumnMaxAggregateOutputType | null
  }

  type GetHotPathColumnGroupByPayload<T extends HotPathColumnGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HotPathColumnGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HotPathColumnGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HotPathColumnGroupByOutputType[P]>
            : GetScalarType<T[P], HotPathColumnGroupByOutputType[P]>
        }
      >
    >


  export type HotPathColumnSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    tableName?: boolean
    columnName?: boolean
    jsonPath?: boolean
    dataType?: boolean
    isIndexed?: boolean
    indexName?: boolean
    usage?: boolean
    createdAt?: boolean
    createdBy?: boolean
  }, ExtArgs["result"]["hotPathColumn"]>

  export type HotPathColumnSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    tableName?: boolean
    columnName?: boolean
    jsonPath?: boolean
    dataType?: boolean
    isIndexed?: boolean
    indexName?: boolean
    usage?: boolean
    createdAt?: boolean
    createdBy?: boolean
  }, ExtArgs["result"]["hotPathColumn"]>

  export type HotPathColumnSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    tableName?: boolean
    columnName?: boolean
    jsonPath?: boolean
    dataType?: boolean
    isIndexed?: boolean
    indexName?: boolean
    usage?: boolean
    createdAt?: boolean
    createdBy?: boolean
  }, ExtArgs["result"]["hotPathColumn"]>

  export type HotPathColumnSelectScalar = {
    id?: boolean
    companyId?: boolean
    tableName?: boolean
    columnName?: boolean
    jsonPath?: boolean
    dataType?: boolean
    isIndexed?: boolean
    indexName?: boolean
    usage?: boolean
    createdAt?: boolean
    createdBy?: boolean
  }

  export type HotPathColumnOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "tableName" | "columnName" | "jsonPath" | "dataType" | "isIndexed" | "indexName" | "usage" | "createdAt" | "createdBy", ExtArgs["result"]["hotPathColumn"]>

  export type $HotPathColumnPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HotPathColumn"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      tableName: string
      columnName: string
      jsonPath: string
      dataType: string
      isIndexed: boolean
      indexName: string | null
      usage: Prisma.JsonValue | null
      createdAt: Date
      createdBy: string | null
    }, ExtArgs["result"]["hotPathColumn"]>
    composites: {}
  }

  type HotPathColumnGetPayload<S extends boolean | null | undefined | HotPathColumnDefaultArgs> = $Result.GetResult<Prisma.$HotPathColumnPayload, S>

  type HotPathColumnCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HotPathColumnFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HotPathColumnCountAggregateInputType | true
    }

  export interface HotPathColumnDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HotPathColumn'], meta: { name: 'HotPathColumn' } }
    /**
     * Find zero or one HotPathColumn that matches the filter.
     * @param {HotPathColumnFindUniqueArgs} args - Arguments to find a HotPathColumn
     * @example
     * // Get one HotPathColumn
     * const hotPathColumn = await prisma.hotPathColumn.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HotPathColumnFindUniqueArgs>(args: SelectSubset<T, HotPathColumnFindUniqueArgs<ExtArgs>>): Prisma__HotPathColumnClient<$Result.GetResult<Prisma.$HotPathColumnPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HotPathColumn that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HotPathColumnFindUniqueOrThrowArgs} args - Arguments to find a HotPathColumn
     * @example
     * // Get one HotPathColumn
     * const hotPathColumn = await prisma.hotPathColumn.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HotPathColumnFindUniqueOrThrowArgs>(args: SelectSubset<T, HotPathColumnFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HotPathColumnClient<$Result.GetResult<Prisma.$HotPathColumnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HotPathColumn that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotPathColumnFindFirstArgs} args - Arguments to find a HotPathColumn
     * @example
     * // Get one HotPathColumn
     * const hotPathColumn = await prisma.hotPathColumn.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HotPathColumnFindFirstArgs>(args?: SelectSubset<T, HotPathColumnFindFirstArgs<ExtArgs>>): Prisma__HotPathColumnClient<$Result.GetResult<Prisma.$HotPathColumnPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HotPathColumn that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotPathColumnFindFirstOrThrowArgs} args - Arguments to find a HotPathColumn
     * @example
     * // Get one HotPathColumn
     * const hotPathColumn = await prisma.hotPathColumn.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HotPathColumnFindFirstOrThrowArgs>(args?: SelectSubset<T, HotPathColumnFindFirstOrThrowArgs<ExtArgs>>): Prisma__HotPathColumnClient<$Result.GetResult<Prisma.$HotPathColumnPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HotPathColumns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotPathColumnFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HotPathColumns
     * const hotPathColumns = await prisma.hotPathColumn.findMany()
     * 
     * // Get first 10 HotPathColumns
     * const hotPathColumns = await prisma.hotPathColumn.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hotPathColumnWithIdOnly = await prisma.hotPathColumn.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HotPathColumnFindManyArgs>(args?: SelectSubset<T, HotPathColumnFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HotPathColumnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HotPathColumn.
     * @param {HotPathColumnCreateArgs} args - Arguments to create a HotPathColumn.
     * @example
     * // Create one HotPathColumn
     * const HotPathColumn = await prisma.hotPathColumn.create({
     *   data: {
     *     // ... data to create a HotPathColumn
     *   }
     * })
     * 
     */
    create<T extends HotPathColumnCreateArgs>(args: SelectSubset<T, HotPathColumnCreateArgs<ExtArgs>>): Prisma__HotPathColumnClient<$Result.GetResult<Prisma.$HotPathColumnPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HotPathColumns.
     * @param {HotPathColumnCreateManyArgs} args - Arguments to create many HotPathColumns.
     * @example
     * // Create many HotPathColumns
     * const hotPathColumn = await prisma.hotPathColumn.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HotPathColumnCreateManyArgs>(args?: SelectSubset<T, HotPathColumnCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HotPathColumns and returns the data saved in the database.
     * @param {HotPathColumnCreateManyAndReturnArgs} args - Arguments to create many HotPathColumns.
     * @example
     * // Create many HotPathColumns
     * const hotPathColumn = await prisma.hotPathColumn.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HotPathColumns and only return the `id`
     * const hotPathColumnWithIdOnly = await prisma.hotPathColumn.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HotPathColumnCreateManyAndReturnArgs>(args?: SelectSubset<T, HotPathColumnCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HotPathColumnPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HotPathColumn.
     * @param {HotPathColumnDeleteArgs} args - Arguments to delete one HotPathColumn.
     * @example
     * // Delete one HotPathColumn
     * const HotPathColumn = await prisma.hotPathColumn.delete({
     *   where: {
     *     // ... filter to delete one HotPathColumn
     *   }
     * })
     * 
     */
    delete<T extends HotPathColumnDeleteArgs>(args: SelectSubset<T, HotPathColumnDeleteArgs<ExtArgs>>): Prisma__HotPathColumnClient<$Result.GetResult<Prisma.$HotPathColumnPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HotPathColumn.
     * @param {HotPathColumnUpdateArgs} args - Arguments to update one HotPathColumn.
     * @example
     * // Update one HotPathColumn
     * const hotPathColumn = await prisma.hotPathColumn.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HotPathColumnUpdateArgs>(args: SelectSubset<T, HotPathColumnUpdateArgs<ExtArgs>>): Prisma__HotPathColumnClient<$Result.GetResult<Prisma.$HotPathColumnPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HotPathColumns.
     * @param {HotPathColumnDeleteManyArgs} args - Arguments to filter HotPathColumns to delete.
     * @example
     * // Delete a few HotPathColumns
     * const { count } = await prisma.hotPathColumn.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HotPathColumnDeleteManyArgs>(args?: SelectSubset<T, HotPathColumnDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HotPathColumns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotPathColumnUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HotPathColumns
     * const hotPathColumn = await prisma.hotPathColumn.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HotPathColumnUpdateManyArgs>(args: SelectSubset<T, HotPathColumnUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HotPathColumns and returns the data updated in the database.
     * @param {HotPathColumnUpdateManyAndReturnArgs} args - Arguments to update many HotPathColumns.
     * @example
     * // Update many HotPathColumns
     * const hotPathColumn = await prisma.hotPathColumn.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HotPathColumns and only return the `id`
     * const hotPathColumnWithIdOnly = await prisma.hotPathColumn.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HotPathColumnUpdateManyAndReturnArgs>(args: SelectSubset<T, HotPathColumnUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HotPathColumnPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HotPathColumn.
     * @param {HotPathColumnUpsertArgs} args - Arguments to update or create a HotPathColumn.
     * @example
     * // Update or create a HotPathColumn
     * const hotPathColumn = await prisma.hotPathColumn.upsert({
     *   create: {
     *     // ... data to create a HotPathColumn
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HotPathColumn we want to update
     *   }
     * })
     */
    upsert<T extends HotPathColumnUpsertArgs>(args: SelectSubset<T, HotPathColumnUpsertArgs<ExtArgs>>): Prisma__HotPathColumnClient<$Result.GetResult<Prisma.$HotPathColumnPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HotPathColumns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotPathColumnCountArgs} args - Arguments to filter HotPathColumns to count.
     * @example
     * // Count the number of HotPathColumns
     * const count = await prisma.hotPathColumn.count({
     *   where: {
     *     // ... the filter for the HotPathColumns we want to count
     *   }
     * })
    **/
    count<T extends HotPathColumnCountArgs>(
      args?: Subset<T, HotPathColumnCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HotPathColumnCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HotPathColumn.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotPathColumnAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HotPathColumnAggregateArgs>(args: Subset<T, HotPathColumnAggregateArgs>): Prisma.PrismaPromise<GetHotPathColumnAggregateType<T>>

    /**
     * Group by HotPathColumn.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotPathColumnGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HotPathColumnGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HotPathColumnGroupByArgs['orderBy'] }
        : { orderBy?: HotPathColumnGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HotPathColumnGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHotPathColumnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HotPathColumn model
   */
  readonly fields: HotPathColumnFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HotPathColumn.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HotPathColumnClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HotPathColumn model
   */
  interface HotPathColumnFieldRefs {
    readonly id: FieldRef<"HotPathColumn", 'String'>
    readonly companyId: FieldRef<"HotPathColumn", 'String'>
    readonly tableName: FieldRef<"HotPathColumn", 'String'>
    readonly columnName: FieldRef<"HotPathColumn", 'String'>
    readonly jsonPath: FieldRef<"HotPathColumn", 'String'>
    readonly dataType: FieldRef<"HotPathColumn", 'String'>
    readonly isIndexed: FieldRef<"HotPathColumn", 'Boolean'>
    readonly indexName: FieldRef<"HotPathColumn", 'String'>
    readonly usage: FieldRef<"HotPathColumn", 'Json'>
    readonly createdAt: FieldRef<"HotPathColumn", 'DateTime'>
    readonly createdBy: FieldRef<"HotPathColumn", 'String'>
  }
    

  // Custom InputTypes
  /**
   * HotPathColumn findUnique
   */
  export type HotPathColumnFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotPathColumn
     */
    select?: HotPathColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotPathColumn
     */
    omit?: HotPathColumnOmit<ExtArgs> | null
    /**
     * Filter, which HotPathColumn to fetch.
     */
    where: HotPathColumnWhereUniqueInput
  }

  /**
   * HotPathColumn findUniqueOrThrow
   */
  export type HotPathColumnFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotPathColumn
     */
    select?: HotPathColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotPathColumn
     */
    omit?: HotPathColumnOmit<ExtArgs> | null
    /**
     * Filter, which HotPathColumn to fetch.
     */
    where: HotPathColumnWhereUniqueInput
  }

  /**
   * HotPathColumn findFirst
   */
  export type HotPathColumnFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotPathColumn
     */
    select?: HotPathColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotPathColumn
     */
    omit?: HotPathColumnOmit<ExtArgs> | null
    /**
     * Filter, which HotPathColumn to fetch.
     */
    where?: HotPathColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HotPathColumns to fetch.
     */
    orderBy?: HotPathColumnOrderByWithRelationInput | HotPathColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HotPathColumns.
     */
    cursor?: HotPathColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HotPathColumns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HotPathColumns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HotPathColumns.
     */
    distinct?: HotPathColumnScalarFieldEnum | HotPathColumnScalarFieldEnum[]
  }

  /**
   * HotPathColumn findFirstOrThrow
   */
  export type HotPathColumnFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotPathColumn
     */
    select?: HotPathColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotPathColumn
     */
    omit?: HotPathColumnOmit<ExtArgs> | null
    /**
     * Filter, which HotPathColumn to fetch.
     */
    where?: HotPathColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HotPathColumns to fetch.
     */
    orderBy?: HotPathColumnOrderByWithRelationInput | HotPathColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HotPathColumns.
     */
    cursor?: HotPathColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HotPathColumns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HotPathColumns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HotPathColumns.
     */
    distinct?: HotPathColumnScalarFieldEnum | HotPathColumnScalarFieldEnum[]
  }

  /**
   * HotPathColumn findMany
   */
  export type HotPathColumnFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotPathColumn
     */
    select?: HotPathColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotPathColumn
     */
    omit?: HotPathColumnOmit<ExtArgs> | null
    /**
     * Filter, which HotPathColumns to fetch.
     */
    where?: HotPathColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HotPathColumns to fetch.
     */
    orderBy?: HotPathColumnOrderByWithRelationInput | HotPathColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HotPathColumns.
     */
    cursor?: HotPathColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HotPathColumns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HotPathColumns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HotPathColumns.
     */
    distinct?: HotPathColumnScalarFieldEnum | HotPathColumnScalarFieldEnum[]
  }

  /**
   * HotPathColumn create
   */
  export type HotPathColumnCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotPathColumn
     */
    select?: HotPathColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotPathColumn
     */
    omit?: HotPathColumnOmit<ExtArgs> | null
    /**
     * The data needed to create a HotPathColumn.
     */
    data: XOR<HotPathColumnCreateInput, HotPathColumnUncheckedCreateInput>
  }

  /**
   * HotPathColumn createMany
   */
  export type HotPathColumnCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HotPathColumns.
     */
    data: HotPathColumnCreateManyInput | HotPathColumnCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HotPathColumn createManyAndReturn
   */
  export type HotPathColumnCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotPathColumn
     */
    select?: HotPathColumnSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HotPathColumn
     */
    omit?: HotPathColumnOmit<ExtArgs> | null
    /**
     * The data used to create many HotPathColumns.
     */
    data: HotPathColumnCreateManyInput | HotPathColumnCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HotPathColumn update
   */
  export type HotPathColumnUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotPathColumn
     */
    select?: HotPathColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotPathColumn
     */
    omit?: HotPathColumnOmit<ExtArgs> | null
    /**
     * The data needed to update a HotPathColumn.
     */
    data: XOR<HotPathColumnUpdateInput, HotPathColumnUncheckedUpdateInput>
    /**
     * Choose, which HotPathColumn to update.
     */
    where: HotPathColumnWhereUniqueInput
  }

  /**
   * HotPathColumn updateMany
   */
  export type HotPathColumnUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HotPathColumns.
     */
    data: XOR<HotPathColumnUpdateManyMutationInput, HotPathColumnUncheckedUpdateManyInput>
    /**
     * Filter which HotPathColumns to update
     */
    where?: HotPathColumnWhereInput
    /**
     * Limit how many HotPathColumns to update.
     */
    limit?: number
  }

  /**
   * HotPathColumn updateManyAndReturn
   */
  export type HotPathColumnUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotPathColumn
     */
    select?: HotPathColumnSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HotPathColumn
     */
    omit?: HotPathColumnOmit<ExtArgs> | null
    /**
     * The data used to update HotPathColumns.
     */
    data: XOR<HotPathColumnUpdateManyMutationInput, HotPathColumnUncheckedUpdateManyInput>
    /**
     * Filter which HotPathColumns to update
     */
    where?: HotPathColumnWhereInput
    /**
     * Limit how many HotPathColumns to update.
     */
    limit?: number
  }

  /**
   * HotPathColumn upsert
   */
  export type HotPathColumnUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotPathColumn
     */
    select?: HotPathColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotPathColumn
     */
    omit?: HotPathColumnOmit<ExtArgs> | null
    /**
     * The filter to search for the HotPathColumn to update in case it exists.
     */
    where: HotPathColumnWhereUniqueInput
    /**
     * In case the HotPathColumn found by the `where` argument doesn't exist, create a new HotPathColumn with this data.
     */
    create: XOR<HotPathColumnCreateInput, HotPathColumnUncheckedCreateInput>
    /**
     * In case the HotPathColumn was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HotPathColumnUpdateInput, HotPathColumnUncheckedUpdateInput>
  }

  /**
   * HotPathColumn delete
   */
  export type HotPathColumnDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotPathColumn
     */
    select?: HotPathColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotPathColumn
     */
    omit?: HotPathColumnOmit<ExtArgs> | null
    /**
     * Filter which HotPathColumn to delete.
     */
    where: HotPathColumnWhereUniqueInput
  }

  /**
   * HotPathColumn deleteMany
   */
  export type HotPathColumnDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HotPathColumns to delete
     */
    where?: HotPathColumnWhereInput
    /**
     * Limit how many HotPathColumns to delete.
     */
    limit?: number
  }

  /**
   * HotPathColumn without action
   */
  export type HotPathColumnDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotPathColumn
     */
    select?: HotPathColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotPathColumn
     */
    omit?: HotPathColumnOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    subdomain: 'subdomain',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const CompanyConfigScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    version: 'version',
    schema: 'schema',
    contentHash: 'contentHash',
    isActive: 'isActive',
    createdAt: 'createdAt',
    createdBy: 'createdBy'
  };

  export type CompanyConfigScalarFieldEnum = (typeof CompanyConfigScalarFieldEnum)[keyof typeof CompanyConfigScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    email: 'email',
    name: 'name',
    role: 'role',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const JobScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    data: 'data',
    contentHash: 'contentHash',
    previousHash: 'previousHash',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const ContractScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    data: 'data',
    contentHash: 'contentHash',
    previousHash: 'previousHash',
    c2paManifestId: 'c2paManifestId',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy'
  };

  export type ContractScalarFieldEnum = (typeof ContractScalarFieldEnum)[keyof typeof ContractScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    title: 'title',
    status: 'status',
    metadata: 'metadata',
    storagePath: 'storagePath',
    storageUrl: 'storageUrl',
    mimeType: 'mimeType',
    fileSize: 'fileSize',
    contentHash: 'contentHash',
    previousHash: 'previousHash',
    c2paManifestId: 'c2paManifestId',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    entityType: 'entityType',
    entityId: 'entityId',
    action: 'action',
    actorId: 'actorId',
    actorType: 'actorType',
    occurredAt: 'occurredAt',
    beforeHash: 'beforeHash',
    afterHash: 'afterHash',
    prevRecordHash: 'prevRecordHash',
    beforeState: 'beforeState',
    afterState: 'afterState',
    payload: 'payload',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    requestId: 'requestId'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const AIActionLogScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    actorId: 'actorId',
    actorType: 'actorType',
    action: 'action',
    model: 'model',
    version: 'version',
    input: 'input',
    outcome: 'outcome',
    allowed: 'allowed',
    reason: 'reason',
    confidence: 'confidence',
    contentHash: 'contentHash',
    createdAt: 'createdAt'
  };

  export type AIActionLogScalarFieldEnum = (typeof AIActionLogScalarFieldEnum)[keyof typeof AIActionLogScalarFieldEnum]


  export const C2PAManifestScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    entityType: 'entityType',
    entityId: 'entityId',
    manifestJson: 'manifestJson',
    signature: 'signature',
    signedAt: 'signedAt',
    signedBy: 'signedBy',
    isVerified: 'isVerified',
    verifiedAt: 'verifiedAt',
    verifiedBy: 'verifiedBy',
    createdAt: 'createdAt'
  };

  export type C2PAManifestScalarFieldEnum = (typeof C2PAManifestScalarFieldEnum)[keyof typeof C2PAManifestScalarFieldEnum]


  export const HotPathColumnScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    tableName: 'tableName',
    columnName: 'columnName',
    jsonPath: 'jsonPath',
    dataType: 'dataType',
    isIndexed: 'isIndexed',
    indexName: 'indexName',
    usage: 'usage',
    createdAt: 'createdAt',
    createdBy: 'createdBy'
  };

  export type HotPathColumnScalarFieldEnum = (typeof HotPathColumnScalarFieldEnum)[keyof typeof HotPathColumnScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DocumentStatus'
   */
  export type EnumDocumentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentStatus'>
    


  /**
   * Reference to a field of type 'DocumentStatus[]'
   */
  export type ListEnumDocumentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentStatus[]'>
    


  /**
   * Reference to a field of type 'ActorType'
   */
  export type EnumActorTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActorType'>
    


  /**
   * Reference to a field of type 'ActorType[]'
   */
  export type ListEnumActorTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActorType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    subdomain?: StringNullableFilter<"Company"> | string | null
    deletedAt?: DateTimeNullableFilter<"Company"> | Date | string | null
    deletedBy?: StringNullableFilter<"Company"> | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserListRelationFilter
    jobs?: JobListRelationFilter
    contracts?: ContractListRelationFilter
    documents?: DocumentListRelationFilter
    configs?: CompanyConfigListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    aiActionLogs?: AIActionLogListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    subdomain?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    jobs?: JobOrderByRelationAggregateInput
    contracts?: ContractOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
    configs?: CompanyConfigOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
    aiActionLogs?: AIActionLogOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    subdomain?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    name?: StringFilter<"Company"> | string
    deletedAt?: DateTimeNullableFilter<"Company"> | Date | string | null
    deletedBy?: StringNullableFilter<"Company"> | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserListRelationFilter
    jobs?: JobListRelationFilter
    contracts?: ContractListRelationFilter
    documents?: DocumentListRelationFilter
    configs?: CompanyConfigListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    aiActionLogs?: AIActionLogListRelationFilter
  }, "id" | "subdomain">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    subdomain?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Company"> | string
    name?: StringWithAggregatesFilter<"Company"> | string
    subdomain?: StringNullableWithAggregatesFilter<"Company"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Company"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"Company"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type CompanyConfigWhereInput = {
    AND?: CompanyConfigWhereInput | CompanyConfigWhereInput[]
    OR?: CompanyConfigWhereInput[]
    NOT?: CompanyConfigWhereInput | CompanyConfigWhereInput[]
    id?: StringFilter<"CompanyConfig"> | string
    companyId?: StringFilter<"CompanyConfig"> | string
    version?: IntFilter<"CompanyConfig"> | number
    schema?: JsonFilter<"CompanyConfig">
    contentHash?: StringNullableFilter<"CompanyConfig"> | string | null
    isActive?: BoolFilter<"CompanyConfig"> | boolean
    createdAt?: DateTimeFilter<"CompanyConfig"> | Date | string
    createdBy?: StringNullableFilter<"CompanyConfig"> | string | null
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type CompanyConfigOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    version?: SortOrder
    schema?: SortOrder
    contentHash?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type CompanyConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    companyId_version?: CompanyConfigCompanyIdVersionCompoundUniqueInput
    AND?: CompanyConfigWhereInput | CompanyConfigWhereInput[]
    OR?: CompanyConfigWhereInput[]
    NOT?: CompanyConfigWhereInput | CompanyConfigWhereInput[]
    companyId?: StringFilter<"CompanyConfig"> | string
    version?: IntFilter<"CompanyConfig"> | number
    schema?: JsonFilter<"CompanyConfig">
    contentHash?: StringNullableFilter<"CompanyConfig"> | string | null
    isActive?: BoolFilter<"CompanyConfig"> | boolean
    createdAt?: DateTimeFilter<"CompanyConfig"> | Date | string
    createdBy?: StringNullableFilter<"CompanyConfig"> | string | null
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id" | "companyId_version">

  export type CompanyConfigOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    version?: SortOrder
    schema?: SortOrder
    contentHash?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    _count?: CompanyConfigCountOrderByAggregateInput
    _avg?: CompanyConfigAvgOrderByAggregateInput
    _max?: CompanyConfigMaxOrderByAggregateInput
    _min?: CompanyConfigMinOrderByAggregateInput
    _sum?: CompanyConfigSumOrderByAggregateInput
  }

  export type CompanyConfigScalarWhereWithAggregatesInput = {
    AND?: CompanyConfigScalarWhereWithAggregatesInput | CompanyConfigScalarWhereWithAggregatesInput[]
    OR?: CompanyConfigScalarWhereWithAggregatesInput[]
    NOT?: CompanyConfigScalarWhereWithAggregatesInput | CompanyConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CompanyConfig"> | string
    companyId?: StringWithAggregatesFilter<"CompanyConfig"> | string
    version?: IntWithAggregatesFilter<"CompanyConfig"> | number
    schema?: JsonWithAggregatesFilter<"CompanyConfig">
    contentHash?: StringNullableWithAggregatesFilter<"CompanyConfig"> | string | null
    isActive?: BoolWithAggregatesFilter<"CompanyConfig"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CompanyConfig"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"CompanyConfig"> | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    companyId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    deletedBy?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    companyId?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    deletedBy?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    companyId?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type JobWhereInput = {
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    id?: StringFilter<"Job"> | string
    companyId?: StringFilter<"Job"> | string
    data?: JsonFilter<"Job">
    contentHash?: StringNullableFilter<"Job"> | string | null
    previousHash?: StringNullableFilter<"Job"> | string | null
    deletedAt?: DateTimeNullableFilter<"Job"> | Date | string | null
    deletedBy?: StringNullableFilter<"Job"> | string | null
    createdAt?: DateTimeFilter<"Job"> | Date | string
    createdBy?: StringNullableFilter<"Job"> | string | null
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    updatedBy?: StringNullableFilter<"Job"> | string | null
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    data?: SortOrder
    contentHash?: SortOrderInput | SortOrder
    previousHash?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    companyId?: StringFilter<"Job"> | string
    data?: JsonFilter<"Job">
    contentHash?: StringNullableFilter<"Job"> | string | null
    previousHash?: StringNullableFilter<"Job"> | string | null
    deletedAt?: DateTimeNullableFilter<"Job"> | Date | string | null
    deletedBy?: StringNullableFilter<"Job"> | string | null
    createdAt?: DateTimeFilter<"Job"> | Date | string
    createdBy?: StringNullableFilter<"Job"> | string | null
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    updatedBy?: StringNullableFilter<"Job"> | string | null
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id">

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    data?: SortOrder
    contentHash?: SortOrderInput | SortOrder
    previousHash?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: JobCountOrderByAggregateInput
    _max?: JobMaxOrderByAggregateInput
    _min?: JobMinOrderByAggregateInput
  }

  export type JobScalarWhereWithAggregatesInput = {
    AND?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    OR?: JobScalarWhereWithAggregatesInput[]
    NOT?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Job"> | string
    companyId?: StringWithAggregatesFilter<"Job"> | string
    data?: JsonWithAggregatesFilter<"Job">
    contentHash?: StringNullableWithAggregatesFilter<"Job"> | string | null
    previousHash?: StringNullableWithAggregatesFilter<"Job"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Job"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"Job"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"Job"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"Job"> | string | null
  }

  export type ContractWhereInput = {
    AND?: ContractWhereInput | ContractWhereInput[]
    OR?: ContractWhereInput[]
    NOT?: ContractWhereInput | ContractWhereInput[]
    id?: StringFilter<"Contract"> | string
    companyId?: StringFilter<"Contract"> | string
    data?: JsonFilter<"Contract">
    contentHash?: StringNullableFilter<"Contract"> | string | null
    previousHash?: StringNullableFilter<"Contract"> | string | null
    c2paManifestId?: StringNullableFilter<"Contract"> | string | null
    deletedAt?: DateTimeNullableFilter<"Contract"> | Date | string | null
    deletedBy?: StringNullableFilter<"Contract"> | string | null
    createdAt?: DateTimeFilter<"Contract"> | Date | string
    createdBy?: StringNullableFilter<"Contract"> | string | null
    updatedAt?: DateTimeFilter<"Contract"> | Date | string
    updatedBy?: StringNullableFilter<"Contract"> | string | null
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type ContractOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    data?: SortOrder
    contentHash?: SortOrderInput | SortOrder
    previousHash?: SortOrderInput | SortOrder
    c2paManifestId?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type ContractWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContractWhereInput | ContractWhereInput[]
    OR?: ContractWhereInput[]
    NOT?: ContractWhereInput | ContractWhereInput[]
    companyId?: StringFilter<"Contract"> | string
    data?: JsonFilter<"Contract">
    contentHash?: StringNullableFilter<"Contract"> | string | null
    previousHash?: StringNullableFilter<"Contract"> | string | null
    c2paManifestId?: StringNullableFilter<"Contract"> | string | null
    deletedAt?: DateTimeNullableFilter<"Contract"> | Date | string | null
    deletedBy?: StringNullableFilter<"Contract"> | string | null
    createdAt?: DateTimeFilter<"Contract"> | Date | string
    createdBy?: StringNullableFilter<"Contract"> | string | null
    updatedAt?: DateTimeFilter<"Contract"> | Date | string
    updatedBy?: StringNullableFilter<"Contract"> | string | null
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id">

  export type ContractOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    data?: SortOrder
    contentHash?: SortOrderInput | SortOrder
    previousHash?: SortOrderInput | SortOrder
    c2paManifestId?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: ContractCountOrderByAggregateInput
    _max?: ContractMaxOrderByAggregateInput
    _min?: ContractMinOrderByAggregateInput
  }

  export type ContractScalarWhereWithAggregatesInput = {
    AND?: ContractScalarWhereWithAggregatesInput | ContractScalarWhereWithAggregatesInput[]
    OR?: ContractScalarWhereWithAggregatesInput[]
    NOT?: ContractScalarWhereWithAggregatesInput | ContractScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contract"> | string
    companyId?: StringWithAggregatesFilter<"Contract"> | string
    data?: JsonWithAggregatesFilter<"Contract">
    contentHash?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    previousHash?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    c2paManifestId?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Contract"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Contract"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"Contract"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"Contract"> | string | null
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    companyId?: StringFilter<"Document"> | string
    title?: StringNullableFilter<"Document"> | string | null
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    metadata?: JsonFilter<"Document">
    storagePath?: StringNullableFilter<"Document"> | string | null
    storageUrl?: StringNullableFilter<"Document"> | string | null
    mimeType?: StringNullableFilter<"Document"> | string | null
    fileSize?: IntNullableFilter<"Document"> | number | null
    contentHash?: StringNullableFilter<"Document"> | string | null
    previousHash?: StringNullableFilter<"Document"> | string | null
    c2paManifestId?: StringNullableFilter<"Document"> | string | null
    deletedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    deletedBy?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    createdBy?: StringNullableFilter<"Document"> | string | null
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    updatedBy?: StringNullableFilter<"Document"> | string | null
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrderInput | SortOrder
    status?: SortOrder
    metadata?: SortOrder
    storagePath?: SortOrderInput | SortOrder
    storageUrl?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    fileSize?: SortOrderInput | SortOrder
    contentHash?: SortOrderInput | SortOrder
    previousHash?: SortOrderInput | SortOrder
    c2paManifestId?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    companyId?: StringFilter<"Document"> | string
    title?: StringNullableFilter<"Document"> | string | null
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    metadata?: JsonFilter<"Document">
    storagePath?: StringNullableFilter<"Document"> | string | null
    storageUrl?: StringNullableFilter<"Document"> | string | null
    mimeType?: StringNullableFilter<"Document"> | string | null
    fileSize?: IntNullableFilter<"Document"> | number | null
    contentHash?: StringNullableFilter<"Document"> | string | null
    previousHash?: StringNullableFilter<"Document"> | string | null
    c2paManifestId?: StringNullableFilter<"Document"> | string | null
    deletedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    deletedBy?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    createdBy?: StringNullableFilter<"Document"> | string | null
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    updatedBy?: StringNullableFilter<"Document"> | string | null
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrderInput | SortOrder
    status?: SortOrder
    metadata?: SortOrder
    storagePath?: SortOrderInput | SortOrder
    storageUrl?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    fileSize?: SortOrderInput | SortOrder
    contentHash?: SortOrderInput | SortOrder
    previousHash?: SortOrderInput | SortOrder
    c2paManifestId?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    companyId?: StringWithAggregatesFilter<"Document"> | string
    title?: StringNullableWithAggregatesFilter<"Document"> | string | null
    status?: EnumDocumentStatusWithAggregatesFilter<"Document"> | $Enums.DocumentStatus
    metadata?: JsonWithAggregatesFilter<"Document">
    storagePath?: StringNullableWithAggregatesFilter<"Document"> | string | null
    storageUrl?: StringNullableWithAggregatesFilter<"Document"> | string | null
    mimeType?: StringNullableWithAggregatesFilter<"Document"> | string | null
    fileSize?: IntNullableWithAggregatesFilter<"Document"> | number | null
    contentHash?: StringNullableWithAggregatesFilter<"Document"> | string | null
    previousHash?: StringNullableWithAggregatesFilter<"Document"> | string | null
    c2paManifestId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
    deletedBy?: StringNullableWithAggregatesFilter<"Document"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"Document"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"Document"> | string | null
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    companyId?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    actorId?: StringNullableFilter<"AuditLog"> | string | null
    actorType?: StringFilter<"AuditLog"> | string
    occurredAt?: DateTimeFilter<"AuditLog"> | Date | string
    beforeHash?: StringNullableFilter<"AuditLog"> | string | null
    afterHash?: StringFilter<"AuditLog"> | string
    prevRecordHash?: StringNullableFilter<"AuditLog"> | string | null
    beforeState?: JsonNullableFilter<"AuditLog">
    afterState?: JsonNullableFilter<"AuditLog">
    payload?: JsonFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    requestId?: StringNullableFilter<"AuditLog"> | string | null
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    actorId?: SortOrderInput | SortOrder
    actorType?: SortOrder
    occurredAt?: SortOrder
    beforeHash?: SortOrderInput | SortOrder
    afterHash?: SortOrder
    prevRecordHash?: SortOrderInput | SortOrder
    beforeState?: SortOrderInput | SortOrder
    afterState?: SortOrderInput | SortOrder
    payload?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    requestId?: SortOrderInput | SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    companyId?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    actorId?: StringNullableFilter<"AuditLog"> | string | null
    actorType?: StringFilter<"AuditLog"> | string
    occurredAt?: DateTimeFilter<"AuditLog"> | Date | string
    beforeHash?: StringNullableFilter<"AuditLog"> | string | null
    afterHash?: StringFilter<"AuditLog"> | string
    prevRecordHash?: StringNullableFilter<"AuditLog"> | string | null
    beforeState?: JsonNullableFilter<"AuditLog">
    afterState?: JsonNullableFilter<"AuditLog">
    payload?: JsonFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    requestId?: StringNullableFilter<"AuditLog"> | string | null
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    actorId?: SortOrderInput | SortOrder
    actorType?: SortOrder
    occurredAt?: SortOrder
    beforeHash?: SortOrderInput | SortOrder
    afterHash?: SortOrder
    prevRecordHash?: SortOrderInput | SortOrder
    beforeState?: SortOrderInput | SortOrder
    afterState?: SortOrderInput | SortOrder
    payload?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    requestId?: SortOrderInput | SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    companyId?: StringWithAggregatesFilter<"AuditLog"> | string
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    actorId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    actorType?: StringWithAggregatesFilter<"AuditLog"> | string
    occurredAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
    beforeHash?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    afterHash?: StringWithAggregatesFilter<"AuditLog"> | string
    prevRecordHash?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    beforeState?: JsonNullableWithAggregatesFilter<"AuditLog">
    afterState?: JsonNullableWithAggregatesFilter<"AuditLog">
    payload?: JsonWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    requestId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
  }

  export type AIActionLogWhereInput = {
    AND?: AIActionLogWhereInput | AIActionLogWhereInput[]
    OR?: AIActionLogWhereInput[]
    NOT?: AIActionLogWhereInput | AIActionLogWhereInput[]
    id?: StringFilter<"AIActionLog"> | string
    companyId?: StringFilter<"AIActionLog"> | string
    actorId?: StringNullableFilter<"AIActionLog"> | string | null
    actorType?: EnumActorTypeFilter<"AIActionLog"> | $Enums.ActorType
    action?: StringFilter<"AIActionLog"> | string
    model?: StringNullableFilter<"AIActionLog"> | string | null
    version?: StringNullableFilter<"AIActionLog"> | string | null
    input?: JsonFilter<"AIActionLog">
    outcome?: JsonFilter<"AIActionLog">
    allowed?: BoolFilter<"AIActionLog"> | boolean
    reason?: StringNullableFilter<"AIActionLog"> | string | null
    confidence?: FloatNullableFilter<"AIActionLog"> | number | null
    contentHash?: StringNullableFilter<"AIActionLog"> | string | null
    createdAt?: DateTimeFilter<"AIActionLog"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type AIActionLogOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    actorId?: SortOrderInput | SortOrder
    actorType?: SortOrder
    action?: SortOrder
    model?: SortOrderInput | SortOrder
    version?: SortOrderInput | SortOrder
    input?: SortOrder
    outcome?: SortOrder
    allowed?: SortOrder
    reason?: SortOrderInput | SortOrder
    confidence?: SortOrderInput | SortOrder
    contentHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type AIActionLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIActionLogWhereInput | AIActionLogWhereInput[]
    OR?: AIActionLogWhereInput[]
    NOT?: AIActionLogWhereInput | AIActionLogWhereInput[]
    companyId?: StringFilter<"AIActionLog"> | string
    actorId?: StringNullableFilter<"AIActionLog"> | string | null
    actorType?: EnumActorTypeFilter<"AIActionLog"> | $Enums.ActorType
    action?: StringFilter<"AIActionLog"> | string
    model?: StringNullableFilter<"AIActionLog"> | string | null
    version?: StringNullableFilter<"AIActionLog"> | string | null
    input?: JsonFilter<"AIActionLog">
    outcome?: JsonFilter<"AIActionLog">
    allowed?: BoolFilter<"AIActionLog"> | boolean
    reason?: StringNullableFilter<"AIActionLog"> | string | null
    confidence?: FloatNullableFilter<"AIActionLog"> | number | null
    contentHash?: StringNullableFilter<"AIActionLog"> | string | null
    createdAt?: DateTimeFilter<"AIActionLog"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "id">

  export type AIActionLogOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    actorId?: SortOrderInput | SortOrder
    actorType?: SortOrder
    action?: SortOrder
    model?: SortOrderInput | SortOrder
    version?: SortOrderInput | SortOrder
    input?: SortOrder
    outcome?: SortOrder
    allowed?: SortOrder
    reason?: SortOrderInput | SortOrder
    confidence?: SortOrderInput | SortOrder
    contentHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AIActionLogCountOrderByAggregateInput
    _avg?: AIActionLogAvgOrderByAggregateInput
    _max?: AIActionLogMaxOrderByAggregateInput
    _min?: AIActionLogMinOrderByAggregateInput
    _sum?: AIActionLogSumOrderByAggregateInput
  }

  export type AIActionLogScalarWhereWithAggregatesInput = {
    AND?: AIActionLogScalarWhereWithAggregatesInput | AIActionLogScalarWhereWithAggregatesInput[]
    OR?: AIActionLogScalarWhereWithAggregatesInput[]
    NOT?: AIActionLogScalarWhereWithAggregatesInput | AIActionLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIActionLog"> | string
    companyId?: StringWithAggregatesFilter<"AIActionLog"> | string
    actorId?: StringNullableWithAggregatesFilter<"AIActionLog"> | string | null
    actorType?: EnumActorTypeWithAggregatesFilter<"AIActionLog"> | $Enums.ActorType
    action?: StringWithAggregatesFilter<"AIActionLog"> | string
    model?: StringNullableWithAggregatesFilter<"AIActionLog"> | string | null
    version?: StringNullableWithAggregatesFilter<"AIActionLog"> | string | null
    input?: JsonWithAggregatesFilter<"AIActionLog">
    outcome?: JsonWithAggregatesFilter<"AIActionLog">
    allowed?: BoolWithAggregatesFilter<"AIActionLog"> | boolean
    reason?: StringNullableWithAggregatesFilter<"AIActionLog"> | string | null
    confidence?: FloatNullableWithAggregatesFilter<"AIActionLog"> | number | null
    contentHash?: StringNullableWithAggregatesFilter<"AIActionLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AIActionLog"> | Date | string
  }

  export type C2PAManifestWhereInput = {
    AND?: C2PAManifestWhereInput | C2PAManifestWhereInput[]
    OR?: C2PAManifestWhereInput[]
    NOT?: C2PAManifestWhereInput | C2PAManifestWhereInput[]
    id?: StringFilter<"C2PAManifest"> | string
    companyId?: StringFilter<"C2PAManifest"> | string
    entityType?: StringFilter<"C2PAManifest"> | string
    entityId?: StringFilter<"C2PAManifest"> | string
    manifestJson?: JsonFilter<"C2PAManifest">
    signature?: StringNullableFilter<"C2PAManifest"> | string | null
    signedAt?: DateTimeNullableFilter<"C2PAManifest"> | Date | string | null
    signedBy?: StringNullableFilter<"C2PAManifest"> | string | null
    isVerified?: BoolFilter<"C2PAManifest"> | boolean
    verifiedAt?: DateTimeNullableFilter<"C2PAManifest"> | Date | string | null
    verifiedBy?: StringNullableFilter<"C2PAManifest"> | string | null
    createdAt?: DateTimeFilter<"C2PAManifest"> | Date | string
  }

  export type C2PAManifestOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    manifestJson?: SortOrder
    signature?: SortOrderInput | SortOrder
    signedAt?: SortOrderInput | SortOrder
    signedBy?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    verifiedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type C2PAManifestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    entityType_entityId?: C2PAManifestEntityTypeEntityIdCompoundUniqueInput
    AND?: C2PAManifestWhereInput | C2PAManifestWhereInput[]
    OR?: C2PAManifestWhereInput[]
    NOT?: C2PAManifestWhereInput | C2PAManifestWhereInput[]
    companyId?: StringFilter<"C2PAManifest"> | string
    entityType?: StringFilter<"C2PAManifest"> | string
    entityId?: StringFilter<"C2PAManifest"> | string
    manifestJson?: JsonFilter<"C2PAManifest">
    signature?: StringNullableFilter<"C2PAManifest"> | string | null
    signedAt?: DateTimeNullableFilter<"C2PAManifest"> | Date | string | null
    signedBy?: StringNullableFilter<"C2PAManifest"> | string | null
    isVerified?: BoolFilter<"C2PAManifest"> | boolean
    verifiedAt?: DateTimeNullableFilter<"C2PAManifest"> | Date | string | null
    verifiedBy?: StringNullableFilter<"C2PAManifest"> | string | null
    createdAt?: DateTimeFilter<"C2PAManifest"> | Date | string
  }, "id" | "entityType_entityId">

  export type C2PAManifestOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    manifestJson?: SortOrder
    signature?: SortOrderInput | SortOrder
    signedAt?: SortOrderInput | SortOrder
    signedBy?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    verifiedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: C2PAManifestCountOrderByAggregateInput
    _max?: C2PAManifestMaxOrderByAggregateInput
    _min?: C2PAManifestMinOrderByAggregateInput
  }

  export type C2PAManifestScalarWhereWithAggregatesInput = {
    AND?: C2PAManifestScalarWhereWithAggregatesInput | C2PAManifestScalarWhereWithAggregatesInput[]
    OR?: C2PAManifestScalarWhereWithAggregatesInput[]
    NOT?: C2PAManifestScalarWhereWithAggregatesInput | C2PAManifestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"C2PAManifest"> | string
    companyId?: StringWithAggregatesFilter<"C2PAManifest"> | string
    entityType?: StringWithAggregatesFilter<"C2PAManifest"> | string
    entityId?: StringWithAggregatesFilter<"C2PAManifest"> | string
    manifestJson?: JsonWithAggregatesFilter<"C2PAManifest">
    signature?: StringNullableWithAggregatesFilter<"C2PAManifest"> | string | null
    signedAt?: DateTimeNullableWithAggregatesFilter<"C2PAManifest"> | Date | string | null
    signedBy?: StringNullableWithAggregatesFilter<"C2PAManifest"> | string | null
    isVerified?: BoolWithAggregatesFilter<"C2PAManifest"> | boolean
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"C2PAManifest"> | Date | string | null
    verifiedBy?: StringNullableWithAggregatesFilter<"C2PAManifest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"C2PAManifest"> | Date | string
  }

  export type HotPathColumnWhereInput = {
    AND?: HotPathColumnWhereInput | HotPathColumnWhereInput[]
    OR?: HotPathColumnWhereInput[]
    NOT?: HotPathColumnWhereInput | HotPathColumnWhereInput[]
    id?: StringFilter<"HotPathColumn"> | string
    companyId?: StringFilter<"HotPathColumn"> | string
    tableName?: StringFilter<"HotPathColumn"> | string
    columnName?: StringFilter<"HotPathColumn"> | string
    jsonPath?: StringFilter<"HotPathColumn"> | string
    dataType?: StringFilter<"HotPathColumn"> | string
    isIndexed?: BoolFilter<"HotPathColumn"> | boolean
    indexName?: StringNullableFilter<"HotPathColumn"> | string | null
    usage?: JsonNullableFilter<"HotPathColumn">
    createdAt?: DateTimeFilter<"HotPathColumn"> | Date | string
    createdBy?: StringNullableFilter<"HotPathColumn"> | string | null
  }

  export type HotPathColumnOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    tableName?: SortOrder
    columnName?: SortOrder
    jsonPath?: SortOrder
    dataType?: SortOrder
    isIndexed?: SortOrder
    indexName?: SortOrderInput | SortOrder
    usage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
  }

  export type HotPathColumnWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    companyId_tableName_columnName?: HotPathColumnCompanyIdTableNameColumnNameCompoundUniqueInput
    AND?: HotPathColumnWhereInput | HotPathColumnWhereInput[]
    OR?: HotPathColumnWhereInput[]
    NOT?: HotPathColumnWhereInput | HotPathColumnWhereInput[]
    companyId?: StringFilter<"HotPathColumn"> | string
    tableName?: StringFilter<"HotPathColumn"> | string
    columnName?: StringFilter<"HotPathColumn"> | string
    jsonPath?: StringFilter<"HotPathColumn"> | string
    dataType?: StringFilter<"HotPathColumn"> | string
    isIndexed?: BoolFilter<"HotPathColumn"> | boolean
    indexName?: StringNullableFilter<"HotPathColumn"> | string | null
    usage?: JsonNullableFilter<"HotPathColumn">
    createdAt?: DateTimeFilter<"HotPathColumn"> | Date | string
    createdBy?: StringNullableFilter<"HotPathColumn"> | string | null
  }, "id" | "companyId_tableName_columnName">

  export type HotPathColumnOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    tableName?: SortOrder
    columnName?: SortOrder
    jsonPath?: SortOrder
    dataType?: SortOrder
    isIndexed?: SortOrder
    indexName?: SortOrderInput | SortOrder
    usage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    _count?: HotPathColumnCountOrderByAggregateInput
    _max?: HotPathColumnMaxOrderByAggregateInput
    _min?: HotPathColumnMinOrderByAggregateInput
  }

  export type HotPathColumnScalarWhereWithAggregatesInput = {
    AND?: HotPathColumnScalarWhereWithAggregatesInput | HotPathColumnScalarWhereWithAggregatesInput[]
    OR?: HotPathColumnScalarWhereWithAggregatesInput[]
    NOT?: HotPathColumnScalarWhereWithAggregatesInput | HotPathColumnScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HotPathColumn"> | string
    companyId?: StringWithAggregatesFilter<"HotPathColumn"> | string
    tableName?: StringWithAggregatesFilter<"HotPathColumn"> | string
    columnName?: StringWithAggregatesFilter<"HotPathColumn"> | string
    jsonPath?: StringWithAggregatesFilter<"HotPathColumn"> | string
    dataType?: StringWithAggregatesFilter<"HotPathColumn"> | string
    isIndexed?: BoolWithAggregatesFilter<"HotPathColumn"> | boolean
    indexName?: StringNullableWithAggregatesFilter<"HotPathColumn"> | string | null
    usage?: JsonNullableWithAggregatesFilter<"HotPathColumn">
    createdAt?: DateTimeWithAggregatesFilter<"HotPathColumn"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"HotPathColumn"> | string | null
  }

  export type CompanyCreateInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
    contracts?: ContractCreateNestedManyWithoutCompanyInput
    documents?: DocumentCreateNestedManyWithoutCompanyInput
    configs?: CompanyConfigCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogCreateNestedManyWithoutCompanyInput
    aiActionLogs?: AIActionLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
    contracts?: ContractUncheckedCreateNestedManyWithoutCompanyInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCompanyInput
    configs?: CompanyConfigUncheckedCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCompanyInput
    aiActionLogs?: AIActionLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
    contracts?: ContractUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUpdateManyWithoutCompanyNestedInput
    configs?: CompanyConfigUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCompanyNestedInput
    aiActionLogs?: AIActionLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
    contracts?: ContractUncheckedUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCompanyNestedInput
    configs?: CompanyConfigUncheckedUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCompanyNestedInput
    aiActionLogs?: AIActionLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyConfigCreateInput = {
    id?: string
    version: number
    schema: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    isActive?: boolean
    createdAt?: Date | string
    createdBy?: string | null
    company: CompanyCreateNestedOneWithoutConfigsInput
  }

  export type CompanyConfigUncheckedCreateInput = {
    id?: string
    companyId: string
    version: number
    schema: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    isActive?: boolean
    createdAt?: Date | string
    createdBy?: string | null
  }

  export type CompanyConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    schema?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    company?: CompanyUpdateOneRequiredWithoutConfigsNestedInput
  }

  export type CompanyConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    schema?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanyConfigCreateManyInput = {
    id?: string
    companyId: string
    version: number
    schema: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    isActive?: boolean
    createdAt?: Date | string
    createdBy?: string | null
  }

  export type CompanyConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    schema?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanyConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    schema?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    role: $Enums.UserRole
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    companyId: string
    email: string
    name?: string | null
    role: $Enums.UserRole
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    companyId: string
    email: string
    name?: string | null
    role: $Enums.UserRole
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCreateInput = {
    id?: string
    data: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    previousHash?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
    company: CompanyCreateNestedOneWithoutJobsInput
  }

  export type JobUncheckedCreateInput = {
    id?: string
    companyId: string
    data: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    previousHash?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type JobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
  }

  export type JobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobCreateManyInput = {
    id?: string
    companyId: string
    data: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    previousHash?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type JobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContractCreateInput = {
    id?: string
    data: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    previousHash?: string | null
    c2paManifestId?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
    company: CompanyCreateNestedOneWithoutContractsInput
  }

  export type ContractUncheckedCreateInput = {
    id?: string
    companyId: string
    data: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    previousHash?: string | null
    c2paManifestId?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type ContractUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    c2paManifestId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    company?: CompanyUpdateOneRequiredWithoutContractsNestedInput
  }

  export type ContractUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    c2paManifestId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContractCreateManyInput = {
    id?: string
    companyId: string
    data: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    previousHash?: string | null
    c2paManifestId?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type ContractUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    c2paManifestId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContractUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    c2paManifestId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentCreateInput = {
    id?: string
    title?: string | null
    status?: $Enums.DocumentStatus
    metadata: JsonNullValueInput | InputJsonValue
    storagePath?: string | null
    storageUrl?: string | null
    mimeType?: string | null
    fileSize?: number | null
    contentHash?: string | null
    previousHash?: string | null
    c2paManifestId?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
    company: CompanyCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    companyId: string
    title?: string | null
    status?: $Enums.DocumentStatus
    metadata: JsonNullValueInput | InputJsonValue
    storagePath?: string | null
    storageUrl?: string | null
    mimeType?: string | null
    fileSize?: number | null
    contentHash?: string | null
    previousHash?: string | null
    c2paManifestId?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    metadata?: JsonNullValueInput | InputJsonValue
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    storageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    c2paManifestId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    company?: CompanyUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    metadata?: JsonNullValueInput | InputJsonValue
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    storageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    c2paManifestId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentCreateManyInput = {
    id?: string
    companyId: string
    title?: string | null
    status?: $Enums.DocumentStatus
    metadata: JsonNullValueInput | InputJsonValue
    storagePath?: string | null
    storageUrl?: string | null
    mimeType?: string | null
    fileSize?: number | null
    contentHash?: string | null
    previousHash?: string | null
    c2paManifestId?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    metadata?: JsonNullValueInput | InputJsonValue
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    storageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    c2paManifestId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    metadata?: JsonNullValueInput | InputJsonValue
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    storageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    c2paManifestId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogCreateInput = {
    id?: string
    entityType: string
    entityId: string
    action: string
    actorId?: string | null
    actorType?: string
    occurredAt?: Date | string
    beforeHash?: string | null
    afterHash: string
    prevRecordHash?: string | null
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    payload: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    requestId?: string | null
    company: CompanyCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    companyId: string
    entityType: string
    entityId: string
    action: string
    actorId?: string | null
    actorType?: string
    occurredAt?: Date | string
    beforeHash?: string | null
    afterHash: string
    prevRecordHash?: string | null
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    payload: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    requestId?: string | null
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    beforeHash?: NullableStringFieldUpdateOperationsInput | string | null
    afterHash?: StringFieldUpdateOperationsInput | string
    prevRecordHash?: NullableStringFieldUpdateOperationsInput | string | null
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    payload?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    company?: CompanyUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    beforeHash?: NullableStringFieldUpdateOperationsInput | string | null
    afterHash?: StringFieldUpdateOperationsInput | string
    prevRecordHash?: NullableStringFieldUpdateOperationsInput | string | null
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    payload?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogCreateManyInput = {
    id?: string
    companyId: string
    entityType: string
    entityId: string
    action: string
    actorId?: string | null
    actorType?: string
    occurredAt?: Date | string
    beforeHash?: string | null
    afterHash: string
    prevRecordHash?: string | null
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    payload: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    requestId?: string | null
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    beforeHash?: NullableStringFieldUpdateOperationsInput | string | null
    afterHash?: StringFieldUpdateOperationsInput | string
    prevRecordHash?: NullableStringFieldUpdateOperationsInput | string | null
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    payload?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    beforeHash?: NullableStringFieldUpdateOperationsInput | string | null
    afterHash?: StringFieldUpdateOperationsInput | string
    prevRecordHash?: NullableStringFieldUpdateOperationsInput | string | null
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    payload?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AIActionLogCreateInput = {
    id?: string
    actorId?: string | null
    actorType: $Enums.ActorType
    action: string
    model?: string | null
    version?: string | null
    input: JsonNullValueInput | InputJsonValue
    outcome: JsonNullValueInput | InputJsonValue
    allowed: boolean
    reason?: string | null
    confidence?: number | null
    contentHash?: string | null
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutAiActionLogsInput
  }

  export type AIActionLogUncheckedCreateInput = {
    id?: string
    companyId: string
    actorId?: string | null
    actorType: $Enums.ActorType
    action: string
    model?: string | null
    version?: string | null
    input: JsonNullValueInput | InputJsonValue
    outcome: JsonNullValueInput | InputJsonValue
    allowed: boolean
    reason?: string | null
    confidence?: number | null
    contentHash?: string | null
    createdAt?: Date | string
  }

  export type AIActionLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorType?: EnumActorTypeFieldUpdateOperationsInput | $Enums.ActorType
    action?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    version?: NullableStringFieldUpdateOperationsInput | string | null
    input?: JsonNullValueInput | InputJsonValue
    outcome?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutAiActionLogsNestedInput
  }

  export type AIActionLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorType?: EnumActorTypeFieldUpdateOperationsInput | $Enums.ActorType
    action?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    version?: NullableStringFieldUpdateOperationsInput | string | null
    input?: JsonNullValueInput | InputJsonValue
    outcome?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIActionLogCreateManyInput = {
    id?: string
    companyId: string
    actorId?: string | null
    actorType: $Enums.ActorType
    action: string
    model?: string | null
    version?: string | null
    input: JsonNullValueInput | InputJsonValue
    outcome: JsonNullValueInput | InputJsonValue
    allowed: boolean
    reason?: string | null
    confidence?: number | null
    contentHash?: string | null
    createdAt?: Date | string
  }

  export type AIActionLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorType?: EnumActorTypeFieldUpdateOperationsInput | $Enums.ActorType
    action?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    version?: NullableStringFieldUpdateOperationsInput | string | null
    input?: JsonNullValueInput | InputJsonValue
    outcome?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIActionLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorType?: EnumActorTypeFieldUpdateOperationsInput | $Enums.ActorType
    action?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    version?: NullableStringFieldUpdateOperationsInput | string | null
    input?: JsonNullValueInput | InputJsonValue
    outcome?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type C2PAManifestCreateInput = {
    id?: string
    companyId: string
    entityType: string
    entityId: string
    manifestJson: JsonNullValueInput | InputJsonValue
    signature?: string | null
    signedAt?: Date | string | null
    signedBy?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    createdAt?: Date | string
  }

  export type C2PAManifestUncheckedCreateInput = {
    id?: string
    companyId: string
    entityType: string
    entityId: string
    manifestJson: JsonNullValueInput | InputJsonValue
    signature?: string | null
    signedAt?: Date | string | null
    signedBy?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    createdAt?: Date | string
  }

  export type C2PAManifestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    manifestJson?: JsonNullValueInput | InputJsonValue
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    signedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signedBy?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type C2PAManifestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    manifestJson?: JsonNullValueInput | InputJsonValue
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    signedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signedBy?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type C2PAManifestCreateManyInput = {
    id?: string
    companyId: string
    entityType: string
    entityId: string
    manifestJson: JsonNullValueInput | InputJsonValue
    signature?: string | null
    signedAt?: Date | string | null
    signedBy?: string | null
    isVerified?: boolean
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    createdAt?: Date | string
  }

  export type C2PAManifestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    manifestJson?: JsonNullValueInput | InputJsonValue
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    signedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signedBy?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type C2PAManifestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    manifestJson?: JsonNullValueInput | InputJsonValue
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    signedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signedBy?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HotPathColumnCreateInput = {
    id?: string
    companyId: string
    tableName: string
    columnName: string
    jsonPath: string
    dataType: string
    isIndexed?: boolean
    indexName?: string | null
    usage?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    createdBy?: string | null
  }

  export type HotPathColumnUncheckedCreateInput = {
    id?: string
    companyId: string
    tableName: string
    columnName: string
    jsonPath: string
    dataType: string
    isIndexed?: boolean
    indexName?: string | null
    usage?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    createdBy?: string | null
  }

  export type HotPathColumnUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    jsonPath?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    isIndexed?: BoolFieldUpdateOperationsInput | boolean
    indexName?: NullableStringFieldUpdateOperationsInput | string | null
    usage?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HotPathColumnUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    jsonPath?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    isIndexed?: BoolFieldUpdateOperationsInput | boolean
    indexName?: NullableStringFieldUpdateOperationsInput | string | null
    usage?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HotPathColumnCreateManyInput = {
    id?: string
    companyId: string
    tableName: string
    columnName: string
    jsonPath: string
    dataType: string
    isIndexed?: boolean
    indexName?: string | null
    usage?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    createdBy?: string | null
  }

  export type HotPathColumnUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    jsonPath?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    isIndexed?: BoolFieldUpdateOperationsInput | boolean
    indexName?: NullableStringFieldUpdateOperationsInput | string | null
    usage?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HotPathColumnUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    jsonPath?: StringFieldUpdateOperationsInput | string
    dataType?: StringFieldUpdateOperationsInput | string
    isIndexed?: BoolFieldUpdateOperationsInput | boolean
    indexName?: NullableStringFieldUpdateOperationsInput | string | null
    usage?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type JobListRelationFilter = {
    every?: JobWhereInput
    some?: JobWhereInput
    none?: JobWhereInput
  }

  export type ContractListRelationFilter = {
    every?: ContractWhereInput
    some?: ContractWhereInput
    none?: ContractWhereInput
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type CompanyConfigListRelationFilter = {
    every?: CompanyConfigWhereInput
    some?: CompanyConfigWhereInput
    none?: CompanyConfigWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type AIActionLogListRelationFilter = {
    every?: AIActionLogWhereInput
    some?: AIActionLogWhereInput
    none?: AIActionLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContractOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyConfigOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AIActionLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subdomain?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subdomain?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    subdomain?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type CompanyConfigCompanyIdVersionCompoundUniqueInput = {
    companyId: string
    version: number
  }

  export type CompanyConfigCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    version?: SortOrder
    schema?: SortOrder
    contentHash?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type CompanyConfigAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type CompanyConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    version?: SortOrder
    contentHash?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type CompanyConfigMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    version?: SortOrder
    contentHash?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type CompanyConfigSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type JobCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    data?: SortOrder
    contentHash?: SortOrder
    previousHash?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type JobMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    contentHash?: SortOrder
    previousHash?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type JobMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    contentHash?: SortOrder
    previousHash?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ContractCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    data?: SortOrder
    contentHash?: SortOrder
    previousHash?: SortOrder
    c2paManifestId?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ContractMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    contentHash?: SortOrder
    previousHash?: SortOrder
    c2paManifestId?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ContractMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    contentHash?: SortOrder
    previousHash?: SortOrder
    c2paManifestId?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EnumDocumentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusFilter<$PrismaModel> | $Enums.DocumentStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    metadata?: SortOrder
    storagePath?: SortOrder
    storageUrl?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    contentHash?: SortOrder
    previousHash?: SortOrder
    c2paManifestId?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    storagePath?: SortOrder
    storageUrl?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    contentHash?: SortOrder
    previousHash?: SortOrder
    c2paManifestId?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    storagePath?: SortOrder
    storageUrl?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    contentHash?: SortOrder
    previousHash?: SortOrder
    c2paManifestId?: SortOrder
    deletedAt?: SortOrder
    deletedBy?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type EnumDocumentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentStatusFilter<$PrismaModel>
    _max?: NestedEnumDocumentStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    actorId?: SortOrder
    actorType?: SortOrder
    occurredAt?: SortOrder
    beforeHash?: SortOrder
    afterHash?: SortOrder
    prevRecordHash?: SortOrder
    beforeState?: SortOrder
    afterState?: SortOrder
    payload?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    requestId?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    actorId?: SortOrder
    actorType?: SortOrder
    occurredAt?: SortOrder
    beforeHash?: SortOrder
    afterHash?: SortOrder
    prevRecordHash?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    requestId?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    actorId?: SortOrder
    actorType?: SortOrder
    occurredAt?: SortOrder
    beforeHash?: SortOrder
    afterHash?: SortOrder
    prevRecordHash?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    requestId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumActorTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActorType | EnumActorTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActorTypeFilter<$PrismaModel> | $Enums.ActorType
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type AIActionLogCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    actorId?: SortOrder
    actorType?: SortOrder
    action?: SortOrder
    model?: SortOrder
    version?: SortOrder
    input?: SortOrder
    outcome?: SortOrder
    allowed?: SortOrder
    reason?: SortOrder
    confidence?: SortOrder
    contentHash?: SortOrder
    createdAt?: SortOrder
  }

  export type AIActionLogAvgOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type AIActionLogMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    actorId?: SortOrder
    actorType?: SortOrder
    action?: SortOrder
    model?: SortOrder
    version?: SortOrder
    allowed?: SortOrder
    reason?: SortOrder
    confidence?: SortOrder
    contentHash?: SortOrder
    createdAt?: SortOrder
  }

  export type AIActionLogMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    actorId?: SortOrder
    actorType?: SortOrder
    action?: SortOrder
    model?: SortOrder
    version?: SortOrder
    allowed?: SortOrder
    reason?: SortOrder
    confidence?: SortOrder
    contentHash?: SortOrder
    createdAt?: SortOrder
  }

  export type AIActionLogSumOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type EnumActorTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActorType | EnumActorTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActorTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActorType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActorTypeFilter<$PrismaModel>
    _max?: NestedEnumActorTypeFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type C2PAManifestEntityTypeEntityIdCompoundUniqueInput = {
    entityType: string
    entityId: string
  }

  export type C2PAManifestCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    manifestJson?: SortOrder
    signature?: SortOrder
    signedAt?: SortOrder
    signedBy?: SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrder
    verifiedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type C2PAManifestMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    signature?: SortOrder
    signedAt?: SortOrder
    signedBy?: SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrder
    verifiedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type C2PAManifestMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    signature?: SortOrder
    signedAt?: SortOrder
    signedBy?: SortOrder
    isVerified?: SortOrder
    verifiedAt?: SortOrder
    verifiedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type HotPathColumnCompanyIdTableNameColumnNameCompoundUniqueInput = {
    companyId: string
    tableName: string
    columnName: string
  }

  export type HotPathColumnCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    tableName?: SortOrder
    columnName?: SortOrder
    jsonPath?: SortOrder
    dataType?: SortOrder
    isIndexed?: SortOrder
    indexName?: SortOrder
    usage?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type HotPathColumnMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    tableName?: SortOrder
    columnName?: SortOrder
    jsonPath?: SortOrder
    dataType?: SortOrder
    isIndexed?: SortOrder
    indexName?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type HotPathColumnMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    tableName?: SortOrder
    columnName?: SortOrder
    jsonPath?: SortOrder
    dataType?: SortOrder
    isIndexed?: SortOrder
    indexName?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type UserCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type JobCreateNestedManyWithoutCompanyInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type ContractCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ContractCreateWithoutCompanyInput, ContractUncheckedCreateWithoutCompanyInput> | ContractCreateWithoutCompanyInput[] | ContractUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutCompanyInput | ContractCreateOrConnectWithoutCompanyInput[]
    createMany?: ContractCreateManyCompanyInputEnvelope
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutCompanyInput = {
    create?: XOR<DocumentCreateWithoutCompanyInput, DocumentUncheckedCreateWithoutCompanyInput> | DocumentCreateWithoutCompanyInput[] | DocumentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCompanyInput | DocumentCreateOrConnectWithoutCompanyInput[]
    createMany?: DocumentCreateManyCompanyInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type CompanyConfigCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CompanyConfigCreateWithoutCompanyInput, CompanyConfigUncheckedCreateWithoutCompanyInput> | CompanyConfigCreateWithoutCompanyInput[] | CompanyConfigUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyConfigCreateOrConnectWithoutCompanyInput | CompanyConfigCreateOrConnectWithoutCompanyInput[]
    createMany?: CompanyConfigCreateManyCompanyInputEnvelope
    connect?: CompanyConfigWhereUniqueInput | CompanyConfigWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutCompanyInput = {
    create?: XOR<AuditLogCreateWithoutCompanyInput, AuditLogUncheckedCreateWithoutCompanyInput> | AuditLogCreateWithoutCompanyInput[] | AuditLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCompanyInput | AuditLogCreateOrConnectWithoutCompanyInput[]
    createMany?: AuditLogCreateManyCompanyInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AIActionLogCreateNestedManyWithoutCompanyInput = {
    create?: XOR<AIActionLogCreateWithoutCompanyInput, AIActionLogUncheckedCreateWithoutCompanyInput> | AIActionLogCreateWithoutCompanyInput[] | AIActionLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AIActionLogCreateOrConnectWithoutCompanyInput | AIActionLogCreateOrConnectWithoutCompanyInput[]
    createMany?: AIActionLogCreateManyCompanyInputEnvelope
    connect?: AIActionLogWhereUniqueInput | AIActionLogWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type ContractUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ContractCreateWithoutCompanyInput, ContractUncheckedCreateWithoutCompanyInput> | ContractCreateWithoutCompanyInput[] | ContractUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutCompanyInput | ContractCreateOrConnectWithoutCompanyInput[]
    createMany?: ContractCreateManyCompanyInputEnvelope
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<DocumentCreateWithoutCompanyInput, DocumentUncheckedCreateWithoutCompanyInput> | DocumentCreateWithoutCompanyInput[] | DocumentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCompanyInput | DocumentCreateOrConnectWithoutCompanyInput[]
    createMany?: DocumentCreateManyCompanyInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type CompanyConfigUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CompanyConfigCreateWithoutCompanyInput, CompanyConfigUncheckedCreateWithoutCompanyInput> | CompanyConfigCreateWithoutCompanyInput[] | CompanyConfigUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyConfigCreateOrConnectWithoutCompanyInput | CompanyConfigCreateOrConnectWithoutCompanyInput[]
    createMany?: CompanyConfigCreateManyCompanyInputEnvelope
    connect?: CompanyConfigWhereUniqueInput | CompanyConfigWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<AuditLogCreateWithoutCompanyInput, AuditLogUncheckedCreateWithoutCompanyInput> | AuditLogCreateWithoutCompanyInput[] | AuditLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCompanyInput | AuditLogCreateOrConnectWithoutCompanyInput[]
    createMany?: AuditLogCreateManyCompanyInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AIActionLogUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<AIActionLogCreateWithoutCompanyInput, AIActionLogUncheckedCreateWithoutCompanyInput> | AIActionLogCreateWithoutCompanyInput[] | AIActionLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AIActionLogCreateOrConnectWithoutCompanyInput | AIActionLogCreateOrConnectWithoutCompanyInput[]
    createMany?: AIActionLogCreateManyCompanyInputEnvelope
    connect?: AIActionLogWhereUniqueInput | AIActionLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type JobUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutCompanyInput | JobUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutCompanyInput | JobUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: JobUpdateManyWithWhereWithoutCompanyInput | JobUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type ContractUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ContractCreateWithoutCompanyInput, ContractUncheckedCreateWithoutCompanyInput> | ContractCreateWithoutCompanyInput[] | ContractUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutCompanyInput | ContractCreateOrConnectWithoutCompanyInput[]
    upsert?: ContractUpsertWithWhereUniqueWithoutCompanyInput | ContractUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ContractCreateManyCompanyInputEnvelope
    set?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    disconnect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    delete?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    update?: ContractUpdateWithWhereUniqueWithoutCompanyInput | ContractUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ContractUpdateManyWithWhereWithoutCompanyInput | ContractUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ContractScalarWhereInput | ContractScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<DocumentCreateWithoutCompanyInput, DocumentUncheckedCreateWithoutCompanyInput> | DocumentCreateWithoutCompanyInput[] | DocumentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCompanyInput | DocumentCreateOrConnectWithoutCompanyInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutCompanyInput | DocumentUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: DocumentCreateManyCompanyInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutCompanyInput | DocumentUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutCompanyInput | DocumentUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type CompanyConfigUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CompanyConfigCreateWithoutCompanyInput, CompanyConfigUncheckedCreateWithoutCompanyInput> | CompanyConfigCreateWithoutCompanyInput[] | CompanyConfigUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyConfigCreateOrConnectWithoutCompanyInput | CompanyConfigCreateOrConnectWithoutCompanyInput[]
    upsert?: CompanyConfigUpsertWithWhereUniqueWithoutCompanyInput | CompanyConfigUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CompanyConfigCreateManyCompanyInputEnvelope
    set?: CompanyConfigWhereUniqueInput | CompanyConfigWhereUniqueInput[]
    disconnect?: CompanyConfigWhereUniqueInput | CompanyConfigWhereUniqueInput[]
    delete?: CompanyConfigWhereUniqueInput | CompanyConfigWhereUniqueInput[]
    connect?: CompanyConfigWhereUniqueInput | CompanyConfigWhereUniqueInput[]
    update?: CompanyConfigUpdateWithWhereUniqueWithoutCompanyInput | CompanyConfigUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CompanyConfigUpdateManyWithWhereWithoutCompanyInput | CompanyConfigUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CompanyConfigScalarWhereInput | CompanyConfigScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<AuditLogCreateWithoutCompanyInput, AuditLogUncheckedCreateWithoutCompanyInput> | AuditLogCreateWithoutCompanyInput[] | AuditLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCompanyInput | AuditLogCreateOrConnectWithoutCompanyInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutCompanyInput | AuditLogUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: AuditLogCreateManyCompanyInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutCompanyInput | AuditLogUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutCompanyInput | AuditLogUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AIActionLogUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<AIActionLogCreateWithoutCompanyInput, AIActionLogUncheckedCreateWithoutCompanyInput> | AIActionLogCreateWithoutCompanyInput[] | AIActionLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AIActionLogCreateOrConnectWithoutCompanyInput | AIActionLogCreateOrConnectWithoutCompanyInput[]
    upsert?: AIActionLogUpsertWithWhereUniqueWithoutCompanyInput | AIActionLogUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: AIActionLogCreateManyCompanyInputEnvelope
    set?: AIActionLogWhereUniqueInput | AIActionLogWhereUniqueInput[]
    disconnect?: AIActionLogWhereUniqueInput | AIActionLogWhereUniqueInput[]
    delete?: AIActionLogWhereUniqueInput | AIActionLogWhereUniqueInput[]
    connect?: AIActionLogWhereUniqueInput | AIActionLogWhereUniqueInput[]
    update?: AIActionLogUpdateWithWhereUniqueWithoutCompanyInput | AIActionLogUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: AIActionLogUpdateManyWithWhereWithoutCompanyInput | AIActionLogUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: AIActionLogScalarWhereInput | AIActionLogScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutCompanyInput | JobUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutCompanyInput | JobUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: JobUpdateManyWithWhereWithoutCompanyInput | JobUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type ContractUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ContractCreateWithoutCompanyInput, ContractUncheckedCreateWithoutCompanyInput> | ContractCreateWithoutCompanyInput[] | ContractUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutCompanyInput | ContractCreateOrConnectWithoutCompanyInput[]
    upsert?: ContractUpsertWithWhereUniqueWithoutCompanyInput | ContractUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ContractCreateManyCompanyInputEnvelope
    set?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    disconnect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    delete?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    update?: ContractUpdateWithWhereUniqueWithoutCompanyInput | ContractUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ContractUpdateManyWithWhereWithoutCompanyInput | ContractUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ContractScalarWhereInput | ContractScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<DocumentCreateWithoutCompanyInput, DocumentUncheckedCreateWithoutCompanyInput> | DocumentCreateWithoutCompanyInput[] | DocumentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCompanyInput | DocumentCreateOrConnectWithoutCompanyInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutCompanyInput | DocumentUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: DocumentCreateManyCompanyInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutCompanyInput | DocumentUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutCompanyInput | DocumentUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type CompanyConfigUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CompanyConfigCreateWithoutCompanyInput, CompanyConfigUncheckedCreateWithoutCompanyInput> | CompanyConfigCreateWithoutCompanyInput[] | CompanyConfigUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyConfigCreateOrConnectWithoutCompanyInput | CompanyConfigCreateOrConnectWithoutCompanyInput[]
    upsert?: CompanyConfigUpsertWithWhereUniqueWithoutCompanyInput | CompanyConfigUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CompanyConfigCreateManyCompanyInputEnvelope
    set?: CompanyConfigWhereUniqueInput | CompanyConfigWhereUniqueInput[]
    disconnect?: CompanyConfigWhereUniqueInput | CompanyConfigWhereUniqueInput[]
    delete?: CompanyConfigWhereUniqueInput | CompanyConfigWhereUniqueInput[]
    connect?: CompanyConfigWhereUniqueInput | CompanyConfigWhereUniqueInput[]
    update?: CompanyConfigUpdateWithWhereUniqueWithoutCompanyInput | CompanyConfigUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CompanyConfigUpdateManyWithWhereWithoutCompanyInput | CompanyConfigUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CompanyConfigScalarWhereInput | CompanyConfigScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<AuditLogCreateWithoutCompanyInput, AuditLogUncheckedCreateWithoutCompanyInput> | AuditLogCreateWithoutCompanyInput[] | AuditLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutCompanyInput | AuditLogCreateOrConnectWithoutCompanyInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutCompanyInput | AuditLogUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: AuditLogCreateManyCompanyInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutCompanyInput | AuditLogUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutCompanyInput | AuditLogUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AIActionLogUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<AIActionLogCreateWithoutCompanyInput, AIActionLogUncheckedCreateWithoutCompanyInput> | AIActionLogCreateWithoutCompanyInput[] | AIActionLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AIActionLogCreateOrConnectWithoutCompanyInput | AIActionLogCreateOrConnectWithoutCompanyInput[]
    upsert?: AIActionLogUpsertWithWhereUniqueWithoutCompanyInput | AIActionLogUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: AIActionLogCreateManyCompanyInputEnvelope
    set?: AIActionLogWhereUniqueInput | AIActionLogWhereUniqueInput[]
    disconnect?: AIActionLogWhereUniqueInput | AIActionLogWhereUniqueInput[]
    delete?: AIActionLogWhereUniqueInput | AIActionLogWhereUniqueInput[]
    connect?: AIActionLogWhereUniqueInput | AIActionLogWhereUniqueInput[]
    update?: AIActionLogUpdateWithWhereUniqueWithoutCompanyInput | AIActionLogUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: AIActionLogUpdateManyWithWhereWithoutCompanyInput | AIActionLogUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: AIActionLogScalarWhereInput | AIActionLogScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutConfigsInput = {
    create?: XOR<CompanyCreateWithoutConfigsInput, CompanyUncheckedCreateWithoutConfigsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutConfigsInput
    connect?: CompanyWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CompanyUpdateOneRequiredWithoutConfigsNestedInput = {
    create?: XOR<CompanyCreateWithoutConfigsInput, CompanyUncheckedCreateWithoutConfigsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutConfigsInput
    upsert?: CompanyUpsertWithoutConfigsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutConfigsInput, CompanyUpdateWithoutConfigsInput>, CompanyUncheckedUpdateWithoutConfigsInput>
  }

  export type CompanyCreateNestedOneWithoutUsersInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    connect?: CompanyWhereUniqueInput
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type CompanyUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    upsert?: CompanyUpsertWithoutUsersInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUsersInput, CompanyUpdateWithoutUsersInput>, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type CompanyCreateNestedOneWithoutJobsInput = {
    create?: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobsInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobsInput
    upsert?: CompanyUpsertWithoutJobsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutJobsInput, CompanyUpdateWithoutJobsInput>, CompanyUncheckedUpdateWithoutJobsInput>
  }

  export type CompanyCreateNestedOneWithoutContractsInput = {
    create?: XOR<CompanyCreateWithoutContractsInput, CompanyUncheckedCreateWithoutContractsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutContractsInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutContractsNestedInput = {
    create?: XOR<CompanyCreateWithoutContractsInput, CompanyUncheckedCreateWithoutContractsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutContractsInput
    upsert?: CompanyUpsertWithoutContractsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutContractsInput, CompanyUpdateWithoutContractsInput>, CompanyUncheckedUpdateWithoutContractsInput>
  }

  export type CompanyCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<CompanyCreateWithoutDocumentsInput, CompanyUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutDocumentsInput
    connect?: CompanyWhereUniqueInput
  }

  export type EnumDocumentStatusFieldUpdateOperationsInput = {
    set?: $Enums.DocumentStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CompanyUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<CompanyCreateWithoutDocumentsInput, CompanyUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutDocumentsInput
    upsert?: CompanyUpsertWithoutDocumentsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutDocumentsInput, CompanyUpdateWithoutDocumentsInput>, CompanyUncheckedUpdateWithoutDocumentsInput>
  }

  export type CompanyCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<CompanyCreateWithoutAuditLogsInput, CompanyUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutAuditLogsInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<CompanyCreateWithoutAuditLogsInput, CompanyUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutAuditLogsInput
    upsert?: CompanyUpsertWithoutAuditLogsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutAuditLogsInput, CompanyUpdateWithoutAuditLogsInput>, CompanyUncheckedUpdateWithoutAuditLogsInput>
  }

  export type CompanyCreateNestedOneWithoutAiActionLogsInput = {
    create?: XOR<CompanyCreateWithoutAiActionLogsInput, CompanyUncheckedCreateWithoutAiActionLogsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutAiActionLogsInput
    connect?: CompanyWhereUniqueInput
  }

  export type EnumActorTypeFieldUpdateOperationsInput = {
    set?: $Enums.ActorType
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CompanyUpdateOneRequiredWithoutAiActionLogsNestedInput = {
    create?: XOR<CompanyCreateWithoutAiActionLogsInput, CompanyUncheckedCreateWithoutAiActionLogsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutAiActionLogsInput
    upsert?: CompanyUpsertWithoutAiActionLogsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutAiActionLogsInput, CompanyUpdateWithoutAiActionLogsInput>, CompanyUncheckedUpdateWithoutAiActionLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedEnumDocumentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusFilter<$PrismaModel> | $Enums.DocumentStatus
  }

  export type NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentStatusFilter<$PrismaModel>
    _max?: NestedEnumDocumentStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumActorTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActorType | EnumActorTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActorTypeFilter<$PrismaModel> | $Enums.ActorType
  }

  export type NestedEnumActorTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActorType | EnumActorTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActorType[] | ListEnumActorTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActorTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActorType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActorTypeFilter<$PrismaModel>
    _max?: NestedEnumActorTypeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutCompanyInput = {
    id?: string
    email: string
    name?: string | null
    role: $Enums.UserRole
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutCompanyInput = {
    id?: string
    email: string
    name?: string | null
    role: $Enums.UserRole
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutCompanyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserCreateManyCompanyInputEnvelope = {
    data: UserCreateManyCompanyInput | UserCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type JobCreateWithoutCompanyInput = {
    id?: string
    data: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    previousHash?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type JobUncheckedCreateWithoutCompanyInput = {
    id?: string
    data: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    previousHash?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type JobCreateOrConnectWithoutCompanyInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput>
  }

  export type JobCreateManyCompanyInputEnvelope = {
    data: JobCreateManyCompanyInput | JobCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type ContractCreateWithoutCompanyInput = {
    id?: string
    data: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    previousHash?: string | null
    c2paManifestId?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type ContractUncheckedCreateWithoutCompanyInput = {
    id?: string
    data: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    previousHash?: string | null
    c2paManifestId?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type ContractCreateOrConnectWithoutCompanyInput = {
    where: ContractWhereUniqueInput
    create: XOR<ContractCreateWithoutCompanyInput, ContractUncheckedCreateWithoutCompanyInput>
  }

  export type ContractCreateManyCompanyInputEnvelope = {
    data: ContractCreateManyCompanyInput | ContractCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutCompanyInput = {
    id?: string
    title?: string | null
    status?: $Enums.DocumentStatus
    metadata: JsonNullValueInput | InputJsonValue
    storagePath?: string | null
    storageUrl?: string | null
    mimeType?: string | null
    fileSize?: number | null
    contentHash?: string | null
    previousHash?: string | null
    c2paManifestId?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type DocumentUncheckedCreateWithoutCompanyInput = {
    id?: string
    title?: string | null
    status?: $Enums.DocumentStatus
    metadata: JsonNullValueInput | InputJsonValue
    storagePath?: string | null
    storageUrl?: string | null
    mimeType?: string | null
    fileSize?: number | null
    contentHash?: string | null
    previousHash?: string | null
    c2paManifestId?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type DocumentCreateOrConnectWithoutCompanyInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutCompanyInput, DocumentUncheckedCreateWithoutCompanyInput>
  }

  export type DocumentCreateManyCompanyInputEnvelope = {
    data: DocumentCreateManyCompanyInput | DocumentCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type CompanyConfigCreateWithoutCompanyInput = {
    id?: string
    version: number
    schema: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    isActive?: boolean
    createdAt?: Date | string
    createdBy?: string | null
  }

  export type CompanyConfigUncheckedCreateWithoutCompanyInput = {
    id?: string
    version: number
    schema: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    isActive?: boolean
    createdAt?: Date | string
    createdBy?: string | null
  }

  export type CompanyConfigCreateOrConnectWithoutCompanyInput = {
    where: CompanyConfigWhereUniqueInput
    create: XOR<CompanyConfigCreateWithoutCompanyInput, CompanyConfigUncheckedCreateWithoutCompanyInput>
  }

  export type CompanyConfigCreateManyCompanyInputEnvelope = {
    data: CompanyConfigCreateManyCompanyInput | CompanyConfigCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutCompanyInput = {
    id?: string
    entityType: string
    entityId: string
    action: string
    actorId?: string | null
    actorType?: string
    occurredAt?: Date | string
    beforeHash?: string | null
    afterHash: string
    prevRecordHash?: string | null
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    payload: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    requestId?: string | null
  }

  export type AuditLogUncheckedCreateWithoutCompanyInput = {
    id?: string
    entityType: string
    entityId: string
    action: string
    actorId?: string | null
    actorType?: string
    occurredAt?: Date | string
    beforeHash?: string | null
    afterHash: string
    prevRecordHash?: string | null
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    payload: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    requestId?: string | null
  }

  export type AuditLogCreateOrConnectWithoutCompanyInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutCompanyInput, AuditLogUncheckedCreateWithoutCompanyInput>
  }

  export type AuditLogCreateManyCompanyInputEnvelope = {
    data: AuditLogCreateManyCompanyInput | AuditLogCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type AIActionLogCreateWithoutCompanyInput = {
    id?: string
    actorId?: string | null
    actorType: $Enums.ActorType
    action: string
    model?: string | null
    version?: string | null
    input: JsonNullValueInput | InputJsonValue
    outcome: JsonNullValueInput | InputJsonValue
    allowed: boolean
    reason?: string | null
    confidence?: number | null
    contentHash?: string | null
    createdAt?: Date | string
  }

  export type AIActionLogUncheckedCreateWithoutCompanyInput = {
    id?: string
    actorId?: string | null
    actorType: $Enums.ActorType
    action: string
    model?: string | null
    version?: string | null
    input: JsonNullValueInput | InputJsonValue
    outcome: JsonNullValueInput | InputJsonValue
    allowed: boolean
    reason?: string | null
    confidence?: number | null
    contentHash?: string | null
    createdAt?: Date | string
  }

  export type AIActionLogCreateOrConnectWithoutCompanyInput = {
    where: AIActionLogWhereUniqueInput
    create: XOR<AIActionLogCreateWithoutCompanyInput, AIActionLogUncheckedCreateWithoutCompanyInput>
  }

  export type AIActionLogCreateManyCompanyInputEnvelope = {
    data: AIActionLogCreateManyCompanyInput | AIActionLogCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
  }

  export type UserUpdateManyWithWhereWithoutCompanyInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCompanyInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    companyId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    deletedBy?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type JobUpsertWithWhereUniqueWithoutCompanyInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutCompanyInput, JobUncheckedUpdateWithoutCompanyInput>
    create: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput>
  }

  export type JobUpdateWithWhereUniqueWithoutCompanyInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutCompanyInput, JobUncheckedUpdateWithoutCompanyInput>
  }

  export type JobUpdateManyWithWhereWithoutCompanyInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutCompanyInput>
  }

  export type JobScalarWhereInput = {
    AND?: JobScalarWhereInput | JobScalarWhereInput[]
    OR?: JobScalarWhereInput[]
    NOT?: JobScalarWhereInput | JobScalarWhereInput[]
    id?: StringFilter<"Job"> | string
    companyId?: StringFilter<"Job"> | string
    data?: JsonFilter<"Job">
    contentHash?: StringNullableFilter<"Job"> | string | null
    previousHash?: StringNullableFilter<"Job"> | string | null
    deletedAt?: DateTimeNullableFilter<"Job"> | Date | string | null
    deletedBy?: StringNullableFilter<"Job"> | string | null
    createdAt?: DateTimeFilter<"Job"> | Date | string
    createdBy?: StringNullableFilter<"Job"> | string | null
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    updatedBy?: StringNullableFilter<"Job"> | string | null
  }

  export type ContractUpsertWithWhereUniqueWithoutCompanyInput = {
    where: ContractWhereUniqueInput
    update: XOR<ContractUpdateWithoutCompanyInput, ContractUncheckedUpdateWithoutCompanyInput>
    create: XOR<ContractCreateWithoutCompanyInput, ContractUncheckedCreateWithoutCompanyInput>
  }

  export type ContractUpdateWithWhereUniqueWithoutCompanyInput = {
    where: ContractWhereUniqueInput
    data: XOR<ContractUpdateWithoutCompanyInput, ContractUncheckedUpdateWithoutCompanyInput>
  }

  export type ContractUpdateManyWithWhereWithoutCompanyInput = {
    where: ContractScalarWhereInput
    data: XOR<ContractUpdateManyMutationInput, ContractUncheckedUpdateManyWithoutCompanyInput>
  }

  export type ContractScalarWhereInput = {
    AND?: ContractScalarWhereInput | ContractScalarWhereInput[]
    OR?: ContractScalarWhereInput[]
    NOT?: ContractScalarWhereInput | ContractScalarWhereInput[]
    id?: StringFilter<"Contract"> | string
    companyId?: StringFilter<"Contract"> | string
    data?: JsonFilter<"Contract">
    contentHash?: StringNullableFilter<"Contract"> | string | null
    previousHash?: StringNullableFilter<"Contract"> | string | null
    c2paManifestId?: StringNullableFilter<"Contract"> | string | null
    deletedAt?: DateTimeNullableFilter<"Contract"> | Date | string | null
    deletedBy?: StringNullableFilter<"Contract"> | string | null
    createdAt?: DateTimeFilter<"Contract"> | Date | string
    createdBy?: StringNullableFilter<"Contract"> | string | null
    updatedAt?: DateTimeFilter<"Contract"> | Date | string
    updatedBy?: StringNullableFilter<"Contract"> | string | null
  }

  export type DocumentUpsertWithWhereUniqueWithoutCompanyInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutCompanyInput, DocumentUncheckedUpdateWithoutCompanyInput>
    create: XOR<DocumentCreateWithoutCompanyInput, DocumentUncheckedCreateWithoutCompanyInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutCompanyInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutCompanyInput, DocumentUncheckedUpdateWithoutCompanyInput>
  }

  export type DocumentUpdateManyWithWhereWithoutCompanyInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutCompanyInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    companyId?: StringFilter<"Document"> | string
    title?: StringNullableFilter<"Document"> | string | null
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    metadata?: JsonFilter<"Document">
    storagePath?: StringNullableFilter<"Document"> | string | null
    storageUrl?: StringNullableFilter<"Document"> | string | null
    mimeType?: StringNullableFilter<"Document"> | string | null
    fileSize?: IntNullableFilter<"Document"> | number | null
    contentHash?: StringNullableFilter<"Document"> | string | null
    previousHash?: StringNullableFilter<"Document"> | string | null
    c2paManifestId?: StringNullableFilter<"Document"> | string | null
    deletedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    deletedBy?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    createdBy?: StringNullableFilter<"Document"> | string | null
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    updatedBy?: StringNullableFilter<"Document"> | string | null
  }

  export type CompanyConfigUpsertWithWhereUniqueWithoutCompanyInput = {
    where: CompanyConfigWhereUniqueInput
    update: XOR<CompanyConfigUpdateWithoutCompanyInput, CompanyConfigUncheckedUpdateWithoutCompanyInput>
    create: XOR<CompanyConfigCreateWithoutCompanyInput, CompanyConfigUncheckedCreateWithoutCompanyInput>
  }

  export type CompanyConfigUpdateWithWhereUniqueWithoutCompanyInput = {
    where: CompanyConfigWhereUniqueInput
    data: XOR<CompanyConfigUpdateWithoutCompanyInput, CompanyConfigUncheckedUpdateWithoutCompanyInput>
  }

  export type CompanyConfigUpdateManyWithWhereWithoutCompanyInput = {
    where: CompanyConfigScalarWhereInput
    data: XOR<CompanyConfigUpdateManyMutationInput, CompanyConfigUncheckedUpdateManyWithoutCompanyInput>
  }

  export type CompanyConfigScalarWhereInput = {
    AND?: CompanyConfigScalarWhereInput | CompanyConfigScalarWhereInput[]
    OR?: CompanyConfigScalarWhereInput[]
    NOT?: CompanyConfigScalarWhereInput | CompanyConfigScalarWhereInput[]
    id?: StringFilter<"CompanyConfig"> | string
    companyId?: StringFilter<"CompanyConfig"> | string
    version?: IntFilter<"CompanyConfig"> | number
    schema?: JsonFilter<"CompanyConfig">
    contentHash?: StringNullableFilter<"CompanyConfig"> | string | null
    isActive?: BoolFilter<"CompanyConfig"> | boolean
    createdAt?: DateTimeFilter<"CompanyConfig"> | Date | string
    createdBy?: StringNullableFilter<"CompanyConfig"> | string | null
  }

  export type AuditLogUpsertWithWhereUniqueWithoutCompanyInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutCompanyInput, AuditLogUncheckedUpdateWithoutCompanyInput>
    create: XOR<AuditLogCreateWithoutCompanyInput, AuditLogUncheckedCreateWithoutCompanyInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutCompanyInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutCompanyInput, AuditLogUncheckedUpdateWithoutCompanyInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutCompanyInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutCompanyInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    companyId?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    actorId?: StringNullableFilter<"AuditLog"> | string | null
    actorType?: StringFilter<"AuditLog"> | string
    occurredAt?: DateTimeFilter<"AuditLog"> | Date | string
    beforeHash?: StringNullableFilter<"AuditLog"> | string | null
    afterHash?: StringFilter<"AuditLog"> | string
    prevRecordHash?: StringNullableFilter<"AuditLog"> | string | null
    beforeState?: JsonNullableFilter<"AuditLog">
    afterState?: JsonNullableFilter<"AuditLog">
    payload?: JsonFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    requestId?: StringNullableFilter<"AuditLog"> | string | null
  }

  export type AIActionLogUpsertWithWhereUniqueWithoutCompanyInput = {
    where: AIActionLogWhereUniqueInput
    update: XOR<AIActionLogUpdateWithoutCompanyInput, AIActionLogUncheckedUpdateWithoutCompanyInput>
    create: XOR<AIActionLogCreateWithoutCompanyInput, AIActionLogUncheckedCreateWithoutCompanyInput>
  }

  export type AIActionLogUpdateWithWhereUniqueWithoutCompanyInput = {
    where: AIActionLogWhereUniqueInput
    data: XOR<AIActionLogUpdateWithoutCompanyInput, AIActionLogUncheckedUpdateWithoutCompanyInput>
  }

  export type AIActionLogUpdateManyWithWhereWithoutCompanyInput = {
    where: AIActionLogScalarWhereInput
    data: XOR<AIActionLogUpdateManyMutationInput, AIActionLogUncheckedUpdateManyWithoutCompanyInput>
  }

  export type AIActionLogScalarWhereInput = {
    AND?: AIActionLogScalarWhereInput | AIActionLogScalarWhereInput[]
    OR?: AIActionLogScalarWhereInput[]
    NOT?: AIActionLogScalarWhereInput | AIActionLogScalarWhereInput[]
    id?: StringFilter<"AIActionLog"> | string
    companyId?: StringFilter<"AIActionLog"> | string
    actorId?: StringNullableFilter<"AIActionLog"> | string | null
    actorType?: EnumActorTypeFilter<"AIActionLog"> | $Enums.ActorType
    action?: StringFilter<"AIActionLog"> | string
    model?: StringNullableFilter<"AIActionLog"> | string | null
    version?: StringNullableFilter<"AIActionLog"> | string | null
    input?: JsonFilter<"AIActionLog">
    outcome?: JsonFilter<"AIActionLog">
    allowed?: BoolFilter<"AIActionLog"> | boolean
    reason?: StringNullableFilter<"AIActionLog"> | string | null
    confidence?: FloatNullableFilter<"AIActionLog"> | number | null
    contentHash?: StringNullableFilter<"AIActionLog"> | string | null
    createdAt?: DateTimeFilter<"AIActionLog"> | Date | string
  }

  export type CompanyCreateWithoutConfigsInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
    contracts?: ContractCreateNestedManyWithoutCompanyInput
    documents?: DocumentCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogCreateNestedManyWithoutCompanyInput
    aiActionLogs?: AIActionLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutConfigsInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
    contracts?: ContractUncheckedCreateNestedManyWithoutCompanyInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCompanyInput
    aiActionLogs?: AIActionLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutConfigsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutConfigsInput, CompanyUncheckedCreateWithoutConfigsInput>
  }

  export type CompanyUpsertWithoutConfigsInput = {
    update: XOR<CompanyUpdateWithoutConfigsInput, CompanyUncheckedUpdateWithoutConfigsInput>
    create: XOR<CompanyCreateWithoutConfigsInput, CompanyUncheckedCreateWithoutConfigsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutConfigsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutConfigsInput, CompanyUncheckedUpdateWithoutConfigsInput>
  }

  export type CompanyUpdateWithoutConfigsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
    contracts?: ContractUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCompanyNestedInput
    aiActionLogs?: AIActionLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutConfigsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
    contracts?: ContractUncheckedUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCompanyNestedInput
    aiActionLogs?: AIActionLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutUsersInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobCreateNestedManyWithoutCompanyInput
    contracts?: ContractCreateNestedManyWithoutCompanyInput
    documents?: DocumentCreateNestedManyWithoutCompanyInput
    configs?: CompanyConfigCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogCreateNestedManyWithoutCompanyInput
    aiActionLogs?: AIActionLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
    contracts?: ContractUncheckedCreateNestedManyWithoutCompanyInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCompanyInput
    configs?: CompanyConfigUncheckedCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCompanyInput
    aiActionLogs?: AIActionLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutUsersInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
  }

  export type CompanyUpsertWithoutUsersInput = {
    update: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutUsersInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type CompanyUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUpdateManyWithoutCompanyNestedInput
    contracts?: ContractUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUpdateManyWithoutCompanyNestedInput
    configs?: CompanyConfigUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCompanyNestedInput
    aiActionLogs?: AIActionLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
    contracts?: ContractUncheckedUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCompanyNestedInput
    configs?: CompanyConfigUncheckedUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCompanyNestedInput
    aiActionLogs?: AIActionLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutJobsInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    contracts?: ContractCreateNestedManyWithoutCompanyInput
    documents?: DocumentCreateNestedManyWithoutCompanyInput
    configs?: CompanyConfigCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogCreateNestedManyWithoutCompanyInput
    aiActionLogs?: AIActionLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutJobsInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    contracts?: ContractUncheckedCreateNestedManyWithoutCompanyInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCompanyInput
    configs?: CompanyConfigUncheckedCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCompanyInput
    aiActionLogs?: AIActionLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutJobsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
  }

  export type CompanyUpsertWithoutJobsInput = {
    update: XOR<CompanyUpdateWithoutJobsInput, CompanyUncheckedUpdateWithoutJobsInput>
    create: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutJobsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutJobsInput, CompanyUncheckedUpdateWithoutJobsInput>
  }

  export type CompanyUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    contracts?: ContractUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUpdateManyWithoutCompanyNestedInput
    configs?: CompanyConfigUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCompanyNestedInput
    aiActionLogs?: AIActionLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    contracts?: ContractUncheckedUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCompanyNestedInput
    configs?: CompanyConfigUncheckedUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCompanyNestedInput
    aiActionLogs?: AIActionLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutContractsInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
    documents?: DocumentCreateNestedManyWithoutCompanyInput
    configs?: CompanyConfigCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogCreateNestedManyWithoutCompanyInput
    aiActionLogs?: AIActionLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutContractsInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCompanyInput
    configs?: CompanyConfigUncheckedCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCompanyInput
    aiActionLogs?: AIActionLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutContractsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutContractsInput, CompanyUncheckedCreateWithoutContractsInput>
  }

  export type CompanyUpsertWithoutContractsInput = {
    update: XOR<CompanyUpdateWithoutContractsInput, CompanyUncheckedUpdateWithoutContractsInput>
    create: XOR<CompanyCreateWithoutContractsInput, CompanyUncheckedCreateWithoutContractsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutContractsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutContractsInput, CompanyUncheckedUpdateWithoutContractsInput>
  }

  export type CompanyUpdateWithoutContractsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUpdateManyWithoutCompanyNestedInput
    configs?: CompanyConfigUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCompanyNestedInput
    aiActionLogs?: AIActionLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutContractsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCompanyNestedInput
    configs?: CompanyConfigUncheckedUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCompanyNestedInput
    aiActionLogs?: AIActionLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutDocumentsInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
    contracts?: ContractCreateNestedManyWithoutCompanyInput
    configs?: CompanyConfigCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogCreateNestedManyWithoutCompanyInput
    aiActionLogs?: AIActionLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutDocumentsInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
    contracts?: ContractUncheckedCreateNestedManyWithoutCompanyInput
    configs?: CompanyConfigUncheckedCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCompanyInput
    aiActionLogs?: AIActionLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutDocumentsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutDocumentsInput, CompanyUncheckedCreateWithoutDocumentsInput>
  }

  export type CompanyUpsertWithoutDocumentsInput = {
    update: XOR<CompanyUpdateWithoutDocumentsInput, CompanyUncheckedUpdateWithoutDocumentsInput>
    create: XOR<CompanyCreateWithoutDocumentsInput, CompanyUncheckedCreateWithoutDocumentsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutDocumentsInput, CompanyUncheckedUpdateWithoutDocumentsInput>
  }

  export type CompanyUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
    contracts?: ContractUpdateManyWithoutCompanyNestedInput
    configs?: CompanyConfigUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCompanyNestedInput
    aiActionLogs?: AIActionLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
    contracts?: ContractUncheckedUpdateManyWithoutCompanyNestedInput
    configs?: CompanyConfigUncheckedUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCompanyNestedInput
    aiActionLogs?: AIActionLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
    contracts?: ContractCreateNestedManyWithoutCompanyInput
    documents?: DocumentCreateNestedManyWithoutCompanyInput
    configs?: CompanyConfigCreateNestedManyWithoutCompanyInput
    aiActionLogs?: AIActionLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
    contracts?: ContractUncheckedCreateNestedManyWithoutCompanyInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCompanyInput
    configs?: CompanyConfigUncheckedCreateNestedManyWithoutCompanyInput
    aiActionLogs?: AIActionLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutAuditLogsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutAuditLogsInput, CompanyUncheckedCreateWithoutAuditLogsInput>
  }

  export type CompanyUpsertWithoutAuditLogsInput = {
    update: XOR<CompanyUpdateWithoutAuditLogsInput, CompanyUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<CompanyCreateWithoutAuditLogsInput, CompanyUncheckedCreateWithoutAuditLogsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutAuditLogsInput, CompanyUncheckedUpdateWithoutAuditLogsInput>
  }

  export type CompanyUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
    contracts?: ContractUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUpdateManyWithoutCompanyNestedInput
    configs?: CompanyConfigUpdateManyWithoutCompanyNestedInput
    aiActionLogs?: AIActionLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
    contracts?: ContractUncheckedUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCompanyNestedInput
    configs?: CompanyConfigUncheckedUpdateManyWithoutCompanyNestedInput
    aiActionLogs?: AIActionLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateWithoutAiActionLogsInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    jobs?: JobCreateNestedManyWithoutCompanyInput
    contracts?: ContractCreateNestedManyWithoutCompanyInput
    documents?: DocumentCreateNestedManyWithoutCompanyInput
    configs?: CompanyConfigCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutAiActionLogsInput = {
    id?: string
    name: string
    subdomain?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
    contracts?: ContractUncheckedCreateNestedManyWithoutCompanyInput
    documents?: DocumentUncheckedCreateNestedManyWithoutCompanyInput
    configs?: CompanyConfigUncheckedCreateNestedManyWithoutCompanyInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutAiActionLogsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutAiActionLogsInput, CompanyUncheckedCreateWithoutAiActionLogsInput>
  }

  export type CompanyUpsertWithoutAiActionLogsInput = {
    update: XOR<CompanyUpdateWithoutAiActionLogsInput, CompanyUncheckedUpdateWithoutAiActionLogsInput>
    create: XOR<CompanyCreateWithoutAiActionLogsInput, CompanyUncheckedCreateWithoutAiActionLogsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutAiActionLogsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutAiActionLogsInput, CompanyUncheckedUpdateWithoutAiActionLogsInput>
  }

  export type CompanyUpdateWithoutAiActionLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    jobs?: JobUpdateManyWithoutCompanyNestedInput
    contracts?: ContractUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUpdateManyWithoutCompanyNestedInput
    configs?: CompanyConfigUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutAiActionLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
    contracts?: ContractUncheckedUpdateManyWithoutCompanyNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutCompanyNestedInput
    configs?: CompanyConfigUncheckedUpdateManyWithoutCompanyNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type UserCreateManyCompanyInput = {
    id?: string
    email: string
    name?: string | null
    role: $Enums.UserRole
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobCreateManyCompanyInput = {
    id?: string
    data: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    previousHash?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type ContractCreateManyCompanyInput = {
    id?: string
    data: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    previousHash?: string | null
    c2paManifestId?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type DocumentCreateManyCompanyInput = {
    id?: string
    title?: string | null
    status?: $Enums.DocumentStatus
    metadata: JsonNullValueInput | InputJsonValue
    storagePath?: string | null
    storageUrl?: string | null
    mimeType?: string | null
    fileSize?: number | null
    contentHash?: string | null
    previousHash?: string | null
    c2paManifestId?: string | null
    deletedAt?: Date | string | null
    deletedBy?: string | null
    createdAt?: Date | string
    createdBy?: string | null
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type CompanyConfigCreateManyCompanyInput = {
    id?: string
    version: number
    schema: JsonNullValueInput | InputJsonValue
    contentHash?: string | null
    isActive?: boolean
    createdAt?: Date | string
    createdBy?: string | null
  }

  export type AuditLogCreateManyCompanyInput = {
    id?: string
    entityType: string
    entityId: string
    action: string
    actorId?: string | null
    actorType?: string
    occurredAt?: Date | string
    beforeHash?: string | null
    afterHash: string
    prevRecordHash?: string | null
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    payload: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    requestId?: string | null
  }

  export type AIActionLogCreateManyCompanyInput = {
    id?: string
    actorId?: string | null
    actorType: $Enums.ActorType
    action: string
    model?: string | null
    version?: string | null
    input: JsonNullValueInput | InputJsonValue
    outcome: JsonNullValueInput | InputJsonValue
    allowed: boolean
    reason?: string | null
    confidence?: number | null
    contentHash?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContractUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    c2paManifestId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContractUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    c2paManifestId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContractUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    c2paManifestId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    metadata?: JsonNullValueInput | InputJsonValue
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    storageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    c2paManifestId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    metadata?: JsonNullValueInput | InputJsonValue
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    storageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    c2paManifestId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    metadata?: JsonNullValueInput | InputJsonValue
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    storageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    previousHash?: NullableStringFieldUpdateOperationsInput | string | null
    c2paManifestId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanyConfigUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    schema?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanyConfigUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    schema?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanyConfigUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    schema?: JsonNullValueInput | InputJsonValue
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    beforeHash?: NullableStringFieldUpdateOperationsInput | string | null
    afterHash?: StringFieldUpdateOperationsInput | string
    prevRecordHash?: NullableStringFieldUpdateOperationsInput | string | null
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    payload?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    beforeHash?: NullableStringFieldUpdateOperationsInput | string | null
    afterHash?: StringFieldUpdateOperationsInput | string
    prevRecordHash?: NullableStringFieldUpdateOperationsInput | string | null
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    payload?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorType?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    beforeHash?: NullableStringFieldUpdateOperationsInput | string | null
    afterHash?: StringFieldUpdateOperationsInput | string
    prevRecordHash?: NullableStringFieldUpdateOperationsInput | string | null
    beforeState?: NullableJsonNullValueInput | InputJsonValue
    afterState?: NullableJsonNullValueInput | InputJsonValue
    payload?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AIActionLogUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorType?: EnumActorTypeFieldUpdateOperationsInput | $Enums.ActorType
    action?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    version?: NullableStringFieldUpdateOperationsInput | string | null
    input?: JsonNullValueInput | InputJsonValue
    outcome?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIActionLogUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorType?: EnumActorTypeFieldUpdateOperationsInput | $Enums.ActorType
    action?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    version?: NullableStringFieldUpdateOperationsInput | string | null
    input?: JsonNullValueInput | InputJsonValue
    outcome?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIActionLogUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorType?: EnumActorTypeFieldUpdateOperationsInput | $Enums.ActorType
    action?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    version?: NullableStringFieldUpdateOperationsInput | string | null
    input?: JsonNullValueInput | InputJsonValue
    outcome?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    contentHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}