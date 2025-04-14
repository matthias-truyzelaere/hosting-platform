Object.defineProperty(exports, '__esModule', { value: true })

const { Decimal, objectEnumValues, makeStrictEnum, Public, getRuntime, skip } = require('./runtime/index-browser.js')

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

Prisma.PrismaClientKnownRequestError = () => {
    const runtimeName = getRuntime().prettyName
    throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.PrismaClientUnknownRequestError = () => {
    const runtimeName = getRuntime().prettyName
    throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.PrismaClientRustPanicError = () => {
    const runtimeName = getRuntime().prettyName
    throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.PrismaClientInitializationError = () => {
    const runtimeName = getRuntime().prettyName
    throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.PrismaClientValidationError = () => {
    const runtimeName = getRuntime().prettyName
    throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
    const runtimeName = getRuntime().prettyName
    throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.empty = () => {
    const runtimeName = getRuntime().prettyName
    throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.join = () => {
    const runtimeName = getRuntime().prettyName
    throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.raw = () => {
    const runtimeName = getRuntime().prettyName
    throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.validator = Public.validator

/**
 * Extensions
 */
Prisma.getExtensionContext = () => {
    const runtimeName = getRuntime().prettyName
    throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}
Prisma.defineExtension = () => {
    const runtimeName = getRuntime().prettyName
    throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`)
}

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
    constructor() {
        return new Proxy(this, {
            get(target, prop) {
                let message
                const runtime = getRuntime()
                if (runtime.isEdge) {
                    message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`
                } else {
                    message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
                }

                message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

                throw new Error(message)
            },
        })
    }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
