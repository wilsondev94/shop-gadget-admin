/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dhshshrfayvmncnkwauk.supabase.co",
      },
    ],
  },
};

export default nextConfig;
