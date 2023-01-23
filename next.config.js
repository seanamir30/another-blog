/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      type: 'asset',
      resourceQuery: /url/, // only apply rule on imports if *.svg?url
      generator: {
        dataUrl: (content) => {
          const svgToMiniDataURI = require('mini-svg-data-uri');
          if (typeof content !== 'string') {
            content = content.toString();
          }
          return svgToMiniDataURI(content);
        },
      },
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });

    return config;
  },
}

module.exports = nextConfig
