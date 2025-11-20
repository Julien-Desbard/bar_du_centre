// front/src/config/config.ts

interface Config {
	apiUrl: string;
	strapiUrl: string;
	environment: string;
	isDevelopment: boolean;
	isProduction: boolean;
	features: {
		enableDebug: boolean;
		enableAnalytics: boolean;
	};
}

const getConfig = (): Config => {
	const env = process.env.NODE_ENV || "development";
	const isDevelopment = env === "development";
	const isProduction = env === "production";

	return {
		apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/",
		strapiUrl:
			process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/api/",
		environment: env,
		isDevelopment,
		isProduction,
		features: {
			enableDebug: isDevelopment,
			enableAnalytics: isProduction,
		},
	};
};

export const config = getConfig();

// Helper pour les logs conditionnels
export const debugLog = (...args: unknown[]) => {
	if (config.features.enableDebug) {
		console.log("[DEBUG]", ...args);
	}
};

// Helper pour vérifier l'environnement
export const isDev = () => config.isDevelopment;
export const isProd = () => config.isProduction;
