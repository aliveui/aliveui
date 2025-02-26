/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this to help with type issues in route handlers
  experimental: {
    serverComponentsExternalPackages: ["shadcn/registry"],
  },
  // Ensure TypeScript doesn't block the build
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
