/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true
  },
  env: {
    DBKEY: process.env.DBKEY,
  }
}

module.exports = nextConfig
