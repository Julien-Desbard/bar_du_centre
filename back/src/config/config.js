// back/src/config/config.js

const config = {
	development: {
		database: {
			url:
				process.env.DATABASE_URL ||
				"postgres://menubdc:admin@localhost:5432/menubdc",
			options: {
				dialect: "postgres",
				logging: false,
				pool: {
					max: 5,
					min: 0,
					acquire: 30000,
					idle: 10000,
				},
			},
		},
		sync: {
			force: true,
			alter: false,
		},
		security: {
			rateLimit: {
				enabled: false, // Désactive en dev pour tester facilement
				windowMs: 15 * 60 * 1000,
				max: 1000, // Plus permissif en dev
			},
		},
		seed: true,
		server: {
			port: process.env.PORT || 3001,
			cors: {
				origin: ["http://localhost:3001", "http://127.0.0.1:3001"],
			},
		},
	},

	production: {
		database: {
			url: process.env.DATABASE_URL,
			options: {
				dialect: "postgres",
				logging: false,
				pool: {
					max: 10,
					min: 2,
					acquire: 30000,
					idle: 10000,
				},
				dialectOptions: {
					ssl: {
						require: true,
						rejectUnauthorized: false,
					},
				},
			},
		},
		security: {
			rateLimit: {
				enabled: true,
				windowMs: 15 * 60 * 1000,
				max: 100,
			},
			helmet: {
				enabled: true,
			},
		},
		sync: {
			force: false,
			alter: false,
		},
		seed: false,
		server: {
			port: process.env.PORT || 10000,
			cors: {
				origin: process.env.FRONTEND_URL || "https://bar-du-centre.vercel.app/",
			},
		},
	},

	test: {
		database: {
			url:
				process.env.DATABASE_URL ||
				"postgresql://localhost:5432/barducentre_test",
			options: {
				dialect: "postgres",
				logging: false,
			},
		},
		sync: {
			force: true,
			alter: false,
		},
		seed: true,
		server: {
			port: 3002,
			cors: {
				origin: "*",
			},
		},
	},
};

const env = process.env.NODE_ENV || "development";

export default config[env];
