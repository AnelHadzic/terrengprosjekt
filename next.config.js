/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DBKEY: process.env.DBKEY,
  },
  swcMinify: true,
}

module.exports = nextConfig
