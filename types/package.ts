export interface PackageCreateType {
    package_name: string
    domain: string
    email: string
    username: string
    status: string
    subscription_id: string
    user_id: string
}

export interface PackageReadType {
    id: string
    package_name: string
    domain: string
    username: string
    status: string
}
