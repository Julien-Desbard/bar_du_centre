import AppError from "../errors/AppError.js";
import { Menu } from "../models/index.js";
import { createMenuItemSchema, updateMenuItemSchema } from "../schemas/menu.js";

const menuController = {
	async getAllMenuItems(req, res, next) {
		try {
			const allMenuItems = await Menu.findAll({
				order: [["cat2", "ASC"],["name", "ASC"]]

			});

			if (allMenuItems.length === 0) {
				throw AppError(404, "NOT_FOUND", "Le menu est vide");
			}

			return res.status(200).json({
				message: "Ensemble du menu récupéré avec succès",
				allMenuItems,
			});
		} catch (error) {
			next(error);
		}
	},
	async getMenuItemsPerCat1(req, res, next) {
		const { cat1 } = req.params;
		try {
			const menuItemsPerCat1 = await Menu.findAll({
				where: { cat1 },
				order: [["cat2", "ASC"],["name", "ASC"]]
			});

			if (menuItemsPerCat1.length === 0) {
				throw AppError(
					404,
					"NOT_FOUND",
					`Aucun élément trouvé pour la catégorie ${cat1}`
				);
			}
			return res.status(200).json({
				message: `Éléments de la catégorie ${cat1} récupérés avec succès`,
				count: menuItemsPerCat1.length,
				menuItemsPerCat1,
			});
		} catch (error) {
			next(error);
		}
	},

		async getMenuItemsPerSlugCat2(req, res, next) {
		const { slug_cat2 } = req.params;
		try {
			const menuItemsPerSlugCat2 = await Menu.findAll({
				where: { slug_cat2 },
				order: [["cat2", "ASC"],["name", "ASC"]]
			});

			if (menuItemsPerSlugCat2.length === 0) {
				throw AppError(
					404,
					"NOT_FOUND",
					`Aucun élément trouvé pour la catégorie ${slug_cat2}`
				);
			}
			return res.status(200).json({
				message: `Éléments de la catégorie ${slug_cat2} récupérés avec succès`,
				count: menuItemsPerSlugCat2.length,
				menuItemsPerSlugCat2,
			});
		} catch (error) {
			next(error);
		}
	},

	async getOneMenuItem(req, res, next) {
		const { id } = req.params;
		try {
			const oneMenuItem = await Menu.findByPk(id);

			if (!oneMenuItem) {
				throw AppError(404, "NOT_FOUND", `Élément ${id} introuvable`);
			}
			return res.status(200).json({
				message: `Succès lors de la récupération de l'\élément ${id} du menu`,
				oneMenuItem,
			});
		} catch (error) {
			next(error);
		}
	},
	async updateOneMenuItem(req, res, next) {
		const { id } = req.params;

		try {
			const itemToUpdate = await Menu.findByPk(id);

			if (!itemToUpdate) {
				throw AppError(404, "NOT_FOUND", `Élément ${id} introuvable`);
			}

			const updateData = updateMenuItemSchema.safeParse(req.body);
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
				message: `Elément ${id} bien mis à jour`,
				itemToUpdate,
			});
		} catch (error) {
			next(error);
		}
	},
	async deleteOneMenuItem(req, res, next) {
		const { id } = req.params;

		try {
			const itemToDelete = await Menu.findByPk(id);

			if (!itemToDelete) {
				throw AppError(404, "NOT_FOUND", `Élément ${id} introuvable`);
			}

			await itemToDelete.destroy();
			return res.status(200).json({
				message: "Elément du menu supprimé avec succès",
			});
		} catch (error) {
			next(error);
		}
	},
	async createOneMenuItem(req, res, next) {
		const newItemData = createMenuItemSchema.safeParse(req.body);
		if (!newItemData.success) {
			const zodIssues = newItemData.error.issues;
			throw AppError(400, "ZOD_ERROR", "La validation des données a échoué.", {
				zodIssues: zodIssues,
			});
		}

		try {
			const newMenuItem = await Menu.create(newItemData.data);

			return res.status(201).json({
				message: "Succès lors de la création d'un nouvel élemement du menu",
				newMenuItem,
			});
		} catch (error) {
			next(error);
		}
	},
};

export default menuController;
