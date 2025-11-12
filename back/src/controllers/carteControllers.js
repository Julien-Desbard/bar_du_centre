import AppError from "../errors/AppError.js";
import { CarteDuJour } from "../models/index.js";
import {
	createCarteDuJourItem,
	updateCarteDuJourItem,
} from "../schemas/carteDuJour.js";
import { sequelize } from "../models/index.js";

const carteController = {
	async getAllCarteItems(req, res, next) {
		try {
			const allCarteItems = await CarteDuJour.findAll({
				order: [
					[
						sequelize.literal(`
						CASE categorie
							WHEN 'Entrées' THEN 1
							WHEN 'Plats' THEN 2
							WHEN 'Desserts' THEN 3
							ELSE 4
						END
					`),
						"ASC",
					],
					["name", "ASC"], // Tri secondaire par nom
				],
			});

			if (allCarteItems.length === 0) {
				throw AppError(404, "NOT_FOUND", "Le menu est vide");
			}

			return res.status(200).json({
				ok: true,
				message: "Ensemble des élements de la carte du jour récupérés",
				count: allCarteItems.length,
				allCarteItems,
			});
		} catch (error) {
			next(error);
		}
	},

	async getOneCarteItem(req, res, next) {
		const { id } = req.params;
		try {
			const oneCarteItem = await CarteDuJour.findByPk(id);

			if (!oneCarteItem) {
				throw AppError(404, "NOT_FOUND", `Element ${id} introuvable`);
			}

			return res.status(200).json({
				ok: true,
				message: `Succès lors de la récupération de l'\élément ${id} de la carte`,
				oneCarteItem,
			});
		} catch (error) {
			next(error);
		}
	},
	async updateCarteItem(req, res, next) {
		const { id } = req.params;
		try {
			const itemToUpdate = await CarteDuJour.findByPk(id);

			if (itemToUpdate.length === 0) {
				throw AppError(404, "NOT_FOUND", `Element ${id} introuvable`);
			}

			const updateData = updateCarteDuJourItem.safeParse(req.body);
			if (!updateData.success) {
				const zodIssues = updateData.error.issues;
				throw AppError(
					400,
					"ZOD_ERROR",
					"La validation des données a échoué.",
					{ zodIssues: zodIssues }
				);
			}

			await itemToUpdate.update(updateData.data);

			return res.status(200).json({
				ok: true,
				message: `Elément ${id} bien mis à jour`,
				itemToUpdate,
			});
		} catch (error) {
			next(error);
		}
	},
	async createCarteItem(req, res, next) {
		const createData = createCarteDuJourItem.safeParse(req.body);
		if (!createData.success) {
			const zodIssues = createData.error.issues;
			throw AppError(400, "ZOD_ERROR", "La validation des données a échoué.", {
				zodIssues: zodIssues,
			});
		}
		try {
			const newCarteItem = await CarteDuJour.create(createData.data);

			return res.status(201).json({
				ok: true,
				message: "Succès lors de la création d'un nouvel élemement de la carte",
				newCarteItem,
			});
		} catch (error) {
			next(error);
		}
	},

	async deleteCarteItem(req, res, next) {
		const { id } = req.params;
		try {
			const carteItemToDelete = await CarteDuJour.findByPk(id);

			if (carteItemToDelete.length === 0) {
				throw AppError(404, "NOT_FOUND", `Element ${id} introuvable`);
			}

			await carteItemToDelete.destroy();

			return res.status(200).json({
				ok: true,
				message: "Elément de la carte supprimé avec succès",
			});
		} catch (error) {
			next(error);
		}
	},
};

export default carteController;
