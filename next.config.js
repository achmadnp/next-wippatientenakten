/** @type {import('next').NextConfig} */

module.exports = {
  // ...
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    API_URL: "http://localhost:3000",
  },
  // ...
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      pathRewrite: { "^/api": "" },
    },
  },
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
