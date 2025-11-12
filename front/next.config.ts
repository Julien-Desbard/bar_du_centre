import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		// remotePatterns permet d'autoriser des domaines spécifiques
		remotePatterns: [
			{
				protocol: "https", // Protocole (http ou https)
				hostname: "light-cheese-efa53451a5.media.strapiapp.com", // Le domaine de l'image Strapi
				// Vous pourriez aussi ajouter un 'pathname' si nécessaire, mais l'hostname seul suffit souvent
			},
		],
	},
};

export default nextConfig;
