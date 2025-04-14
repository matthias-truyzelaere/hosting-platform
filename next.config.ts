const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
    allowedDevOrigins: ['nyxahosting.com'],
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
}

module.exports = withBundleAnalyzer(nextConfig)
