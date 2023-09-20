/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DBKEY: process.env.DBKEY,
      }
}

module.exports = nextConfig
