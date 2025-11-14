import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "light-cheese-efa53451a5.media.strapiapp.com",
			},
		],
	},
};

export default nextConfig;
