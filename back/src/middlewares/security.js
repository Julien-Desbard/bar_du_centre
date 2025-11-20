// back/src/middlewares/security.js
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// ═══════════════════════════════════════════════════════════════
// 1️⃣ RATE LIMITING - Limite le nombre de requêtes par IP
// ═══════════════════════════════════════════════════════════════

/**
 * Rate limiter général : 100 requêtes par 15 minutes
 * Appliqué à toutes les routes de l'API
 */
export const generalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limite à 100 requêtes par IP
	message: {
		error:
			"Trop de requêtes depuis cette IP, veuillez réessayer dans 15 minutes.",
	},
	standardHeaders: true, // Retourne les infos dans les headers `RateLimit-*`
	legacyHeaders: false, // Désactive les anciens headers `X-RateLimit-*`
	// Skip les requêtes en dev si besoin :
	skip: (req) => process.env.NODE_ENV === "development" && req.ip === "::1",
});

// Test avec envoi de 150 requetes : 
//bash: for i in {1..150}; do curl http://localhost:3001/api/menu; done

/**
 * Rate limiter strict : 20 requêtes par 15 minutes
 * Pour les routes sensibles : authentification, admin, etc.
 */
export const strictLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 20, // Limite à 20 requêtes par IP
	message: {
		error: "Trop de tentatives, veuillez réessayer plus tard.",
	},
	standardHeaders: true,
	legacyHeaders: false,
	// Personnalisation du message selon le type d'erreur
	handler: (req, res) => {
		res.status(429).json({
			error: "Trop de tentatives",
			message:
				"Vous avez effectué trop de tentatives. Réessayez dans 15 minutes.",
			retryAfter: Math.ceil(req.rateLimit.resetTime / 1000),
		});
	},
});

/**
 * Rate limiter très strict : 5 requêtes par heure
 * Pour les opérations critiques : changement de mot de passe, etc.
 */
export const criticalLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 heure
	max: 5, // Maximum 5 tentatives par heure
	message: {
		error: "Trop de tentatives sensibles, veuillez réessayer dans 1 heure.",
	},
	standardHeaders: true,
	legacyHeaders: false,
});

// ═══════════════════════════════════════════════════════════════
// 2️⃣ HELMET - Sécurise les headers HTTP
// ═══════════════════════════════════════════════════════════════

/**
 * Configuration Helmet pour une API REST
 */
export const helmetConfig = helmet({
	// Content Security Policy - Contrôle les sources de contenu autorisées
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"], // Par défaut, uniquement depuis notre domaine
			scriptSrc: ["'self'"], // Scripts uniquement depuis notre domaine
			styleSrc: ["'self'", "'unsafe-inline'"], // Styles (unsafe-inline nécessaire pour certains frameworks)
			imgSrc: ["'self'", "data:", "https:"], // Images depuis notre domaine, data URIs et HTTPS
			connectSrc: ["'self'"], // Connexions API uniquement vers notre domaine
			fontSrc: ["'self'"],
			objectSrc: ["'none'"], // Pas d'objets Flash/etc
			mediaSrc: ["'self'"],
			frameSrc: ["'none'"], // Pas d'iframes
		},
	},

	// HSTS - Force HTTPS (en production uniquement)
	hsts: {
		maxAge: 31536000, // 1 an en secondes
		includeSubDomains: true, // Applique aux sous-domaines
		preload: true, // Permet d'être dans la liste de préchargement des navigateurs
	},

	// Autres protections
	frameguard: { action: "deny" }, // Empêche le site d'être dans une iframe (clickjacking)
	noSniff: true, // Empêche le browser de deviner le MIME type
	xssFilter: true, // Protection XSS basique (deprecated mais garde pour vieux navigateurs)
	referrerPolicy: { policy: "strict-origin-when-cross-origin" }, // Contrôle le header Referer
});

/**
 * Version allégée de Helmet pour le développement
 */
export const helmetDevConfig = helmet({
	contentSecurityPolicy: false, // Désactivé en dev pour plus de flexibilité
	hsts: false, // Pas de HTTPS forcé en dev
});

// ═══════════════════════════════════════════════════════════════
// 3️⃣ MIDDLEWARES PERSONNALISÉS
// ═══════════════════════════════════════════════════════════════

/**
 * Bloque les requêtes avec User-Agent suspect
 */
export const blockSuspiciousUserAgents = (req, res, next) => {
	const userAgent = req.headers["user-agent"] || "";

	// Liste de User-Agents suspects (bots malveillants)
	const suspiciousPatterns = [
		/sqlmap/i,
		/nikto/i,
		/nmap/i,
		/masscan/i,
		/acunetix/i,
	];

	const isSuspicious = suspiciousPatterns.some((pattern) =>
		pattern.test(userAgent)
	);

	if (isSuspicious) {
		console.warn(`🚫 User-Agent suspect bloqué: ${userAgent}`);
		return res.status(403).json({
			error: "Accès refusé",
			message: "User-Agent non autorisé",
		});
	}

	next();
};

/**
 * Log les informations de sécurité en développement
 */
export const securityLogger = (req, res, next) => {
	if (process.env.NODE_ENV === "development") {
		console.log(`🔒 [Security] ${req.method} ${req.path} - IP: ${req.ip}`);
	}
	next();
};

// ═══════════════════════════════════════════════════════════════
// 4️⃣ EXPORT GROUPÉ
// ═══════════════════════════════════════════════════════════════

export default {
	generalLimiter,
	strictLimiter,
	criticalLimiter,
	helmetConfig,
	helmetDevConfig,
	blockSuspiciousUserAgents,
	securityLogger,
};
