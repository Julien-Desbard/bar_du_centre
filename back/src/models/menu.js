import { sequelize } from "./sequelize.js";
import { Model, DataTypes } from "sequelize";

export class Menu extends Model {}

Menu.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    // Colonnes CSV
    cat1: { type: DataTypes.STRING(100), allowNull: false }, // obligatoire
    cat2: { type: DataTypes.STRING(100), allowNull: true, defaultValue: "" },
    slug_cat2: { type: DataTypes.STRING(100), allowNull: true, defaultValue: "" },
    cat3: { type: DataTypes.STRING(100), allowNull: true, defaultValue: "" },

    name: { type: DataTypes.STRING(255), allowNull: false }, // CSV: nom
    description: { type: DataTypes.TEXT, allowNull: true, defaultValue: "" },

    intitule: { type: DataTypes.STRING(100), allowNull: true, defaultValue: "" }, // CSV: intitulé
    prix_1: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    prix_2: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    prix_3: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  },
  {
    sequelize,
    tableName: "menu",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ fields: ["cat1", "cat2", "cat3"] }, { fields: ["name"] }],
  }
);
