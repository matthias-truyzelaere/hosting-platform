Object.defineProperty(exports, '__esModule', { value: true })

const { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError, PrismaClientInitializationError, PrismaClientValidationError, getPrismaClient, sqltag, empty, join, raw, skip, Decimal, Debug, objectEnumValues, makeStrictEnum, Extensions, warnOnce, defineDmmfProperty, Public, getRuntime, createParam } = require('./runtime/edge.js')

const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
    client: '6.6.0',
    engine: 'f676762280b54cd07c770017ed3711ddde35f37a',
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
 * Extensions
 */
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
    DbNull: objectEnumValues.classes.DbNull,
    JsonNull: objectEnumValues.classes.JsonNull,
    AnyNull: objectEnumValues.classes.AnyNull,
}

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable',
})

exports.Prisma.UserScalarFieldEnum = {
    id: 'id',
    created_time: 'created_time',
    email: 'email',
    first_name: 'first_name',
    last_name: 'last_name',
    profile_image_url: 'profile_image_url',
    user_id: 'user_id',
}

exports.Prisma.PackageScalarFieldEnum = {
    id: 'id',
    created_time: 'created_time',
    package_name: 'package_name',
    domain: 'domain',
    email: 'email',
    username: 'username',
    status: 'status',
    subscription_id: 'subscription_id',
    user_id: 'user_id',
}

exports.Prisma.SubscriptionScalarFieldEnum = {
    id: 'id',
    created_time: 'created_time',
    subscription_id: 'subscription_id',
    stripe_user_id: 'stripe_user_id',
    status: 'status',
    start_date: 'start_date',
    product_id: 'product_id',
    user_id: 'user_id',
}

exports.Prisma.InvoiceScalarFieldEnum = {
    id: 'id',
    created_time: 'created_time',
    invoice_id: 'invoice_id',
    invoice_pdf: 'invoice_pdf',
    hosted_invoice_url: 'hosted_invoice_url',
    amount_paid: 'amount_paid',
    amount_due: 'amount_due',
    currency: 'currency',
    status: 'status',
    email: 'email',
    subscription_id: 'subscription_id',
    user_id: 'user_id',
}

exports.Prisma.SortOrder = {
    asc: 'asc',
    desc: 'desc',
}

exports.Prisma.QueryMode = {
    default: 'default',
    insensitive: 'insensitive',
}

exports.Prisma.NullsOrder = {
    first: 'first',
    last: 'last',
}

exports.Prisma.ModelName = {
    User: 'User',
    Package: 'Package',
    Subscription: 'Subscription',
    Invoice: 'Invoice',
}
/**
 * Create the Client
 */
const config = {
    generator: {
        name: 'client',
        provider: {
            fromEnvVar: null,
            value: 'prisma-client-js',
        },
        output: {
            value: '/Users/matthiastruyzelaere/Projecten/hosting-platform/prisma/app/generated/prisma/client',
            fromEnvVar: null,
        },
        config: {
            engineType: 'library',
        },
        binaryTargets: [
            {
                fromEnvVar: null,
                value: 'darwin-arm64',
                native: true,
            },
        ],
        previewFeatures: [],
        sourceFilePath: '/Users/matthiastruyzelaere/Projecten/hosting-platform/prisma/schema.prisma',
        isCustomOutput: true,
    },
    relativeEnvPaths: {
        rootEnvPath: '../../../../../.env',
        schemaEnvPath: '../../../../../.env',
    },
    relativePath: '../../../..',
    clientVersion: '6.6.0',
    engineVersion: 'f676762280b54cd07c770017ed3711ddde35f37a',
    datasourceNames: ['db'],
    activeProvider: 'postgresql',
    inlineDatasources: {
        db: {
            url: {
                fromEnvVar: 'DATABASE_URL',
                value: 'postgresql://postgres.pupunxauoynoqwtepgbv:qE5zrJIvgmatFlqU@aws-0-eu-west-2.pooler.supabase.com:6543/postgres',
            },
        },
    },
    inlineSchema:
        'generator client {\n  provider = "prisma-client-js"\n  output   = "app/generated/prisma/client"\n}\n\ndatasource db {\n  provider  = "postgresql"\n  url       = env("DATABASE_URL")\n  directUrl = env("DIRECT_URL")\n}\n\nmodel User {\n  id                Int      @id @default(autoincrement())\n  created_time      DateTime @default(now())\n  email             String   @unique\n  first_name        String?\n  last_name         String?\n  profile_image_url String\n  user_id           String   @unique\n}\n\nmodel Package {\n  id              Int      @id @default(autoincrement())\n  created_time    DateTime @default(now())\n  package_name    String\n  domain          String\n  email           String\n  username        String   @unique\n  status          String\n  subscription_id String\n  user_id         String\n}\n\nmodel Subscription {\n  id              Int      @id @default(autoincrement())\n  created_time    DateTime @default(now())\n  subscription_id String\n  stripe_user_id  String\n  status          String\n  start_date      String\n  product_id      String\n  user_id         String\n}\n\nmodel Invoice {\n  id                 Int      @id @default(autoincrement())\n  created_time       DateTime @default(now())\n  invoice_id         String\n  invoice_pdf        String\n  hosted_invoice_url String\n  amount_paid        String\n  amount_due         String?\n  currency           String\n  status             String\n  email              String\n  subscription_id    String\n  user_id            String\n}\n',
    inlineSchemaHash: 'dbec3223e52058ecf45e6a19aab6b5c0259b92a843cf632882d7c2e639be4569',
    copyEngine: true,
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse(
    '{"models":{"User":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"created_time","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"first_name","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"last_name","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"profile_image_url","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Package":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"created_time","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"package_name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"domain","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"username","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"subscription_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Subscription":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"created_time","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"subscription_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"stripe_user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"start_date","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"product_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Invoice":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"created_time","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"invoice_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"invoice_pdf","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"hosted_invoice_url","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"amount_paid","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"amount_due","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"currency","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"subscription_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{},"types":{}}'
)
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
    parsed: {
        DATABASE_URL: (typeof globalThis !== 'undefined' && globalThis['DATABASE_URL']) || (typeof process !== 'undefined' && process.env && process.env.DATABASE_URL) || undefined,
    },
})

if ((typeof globalThis !== 'undefined' && globalThis['DEBUG']) || (typeof process !== 'undefined' && process.env && process.env.DEBUG) || undefined) {
    Debug.enable((typeof globalThis !== 'undefined' && globalThis['DEBUG']) || (typeof process !== 'undefined' && process.env && process.env.DEBUG) || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)
