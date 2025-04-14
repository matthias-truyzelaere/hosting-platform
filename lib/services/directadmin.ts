import type { DirectAdminCreateType } from '@/types/directadmin'

const DA_HOST = process.env.DA_HOST || ''
const DA_USERNAME = process.env.DA_USERNAME || ''
const DA_PASSWORD = process.env.DA_PASSWORD || ''
const DA_IP = process.env.DA_IP || ''

function checkConfig(): void {
    if (!DA_HOST || !DA_USERNAME || !DA_PASSWORD || !DA_IP) {
        throw new Error('DirectAdmin credentials (host, username, password, ip) are not properly configured in environment variables.')
    }
}

function getDirectAdminAuthHeader(): string {
    const credentials = `${DA_USERNAME}:${DA_PASSWORD}`
    const encodedCredentials = Buffer.from(credentials).toString('base64')
    return `Basic ${encodedCredentials}`
}

/**
 * Creates a new user account in DirectAdmin.
 * Requires Admin credentials to be configured.
 * @param {DirectAdminCreateType} userData - The user data for creation.
 * @returns {Promise<{ success: true; message: string; data: string }>} - Resolves on successful creation.
 * @throws {Error} - If configuration is missing or the API request fails.
 */
async function createDirectAdminUser(userData: DirectAdminCreateType): Promise<{ success: true; message: string; data: string }> {
    checkConfig()

    try {
        const url = `${DA_HOST}/CMD_API_ACCOUNT_USER`
        const params = new URLSearchParams({
            action: 'create',
            add: 'Submit',
            username: userData.username,
            passwd: userData.password,
            passwd2: userData.password,
            domain: userData.domain,
            email: userData.email,
            package: userData.package_name,
            ip: DA_IP,
            notify: 'yes',
        })

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: getDirectAdminAuthHeader(),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        })

        const responseText = await response.text()

        if (!response.ok || responseText.includes('error=1')) {
            const detailsMatch = responseText.match(/details=([^&]*)/)
            const details = detailsMatch ? decodeURIComponent(detailsMatch[1].replace(/\+/g, ' ')) : responseText

            throw new Error(`DirectAdmin API error creating user: ${details}`)
        }

        return { success: true, message: 'User created in DirectAdmin', data: responseText }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`DirectAdmin user creation failed: ${error.message}`)
        } else {
            throw new Error('An unknown error occurred')
        }
    }
}

/**
 * Deletes a user account in DirectAdmin.
 * Requires Admin credentials to be configured.
 * @param username - The username for deletion
 * @returns {Promise<{ success: true; message: string; data: string }>} - Resolves on successful deletion.
 * @throws {Error} - If configuration is missing or the API request fails.
 */
async function deleteDirectAdminUser(username: string): Promise<{ success: true; message: string; data: string }> {
    checkConfig()

    try {
        const url = `${DA_HOST}/CMD_API_SELECT_USERS`
        const params = new URLSearchParams({
            confirmed: 'Confirm',
            delete: 'yes',
            select0: username,
        })

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: getDirectAdminAuthHeader(),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        })

        const responseText = await response.text()

        if (!response.ok || responseText.includes('error=1')) {
            const detailsMatch = responseText.match(/details=([^&]*)/)
            const details = detailsMatch ? decodeURIComponent(detailsMatch[1].replace(/\+/g, ' ')) : responseText

            throw new Error(`DirectAdmin API error deleting user: ${details}`)
        }

        return { success: true, message: `User deleted in DirectAdmin`, data: responseText }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`DirectAdmin user deletion failed: ${error.message}`)
        } else {
            throw new Error('An unknown error occurred')
        }
    }
}

export { createDirectAdminUser, deleteDirectAdminUser }
