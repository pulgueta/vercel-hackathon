/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2", "@prisma/client"]
  }
};

export default nextConfig;
