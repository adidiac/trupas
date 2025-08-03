/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // WARNING: this will let *any* TS errors through, even real bugs
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig