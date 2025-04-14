type SitemapEntry = {
    url: string
    lastModified: string
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    priority?: number
}

export default async function sitemap(): Promise<SitemapEntry[]> {
    const baseUrl = `${process.env.DOMAIN_URL}`

    const staticPages: SitemapEntry[] = [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
            changeFrequency: 'never',
            priority: 1,
        },
    ]

    return [...staticPages]
}
