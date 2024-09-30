/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: '*.blob.vercel-storage.com',
        port: '',
        pathname: '**'
      }
    ]
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /pdf\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    })

    return config
  }
}

export default nextConfig
