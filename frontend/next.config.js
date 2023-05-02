/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.gutenberg.org", "i.scdn.co"],
  },
};

module.exports = nextConfig;
