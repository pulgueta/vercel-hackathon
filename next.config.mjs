/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"]
  }
};

export default nextConfig;
