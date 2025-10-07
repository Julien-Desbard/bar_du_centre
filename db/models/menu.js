import { sequelize } from "./sequelize.js";
import { Model, DataTypes } from "sequelize";

export class Menu extends Model {}

Menu.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cat1: { type: DataTypes.STRING(100), allowNull: false }, // obligatoire
    cat2: { type: DataTypes.STRING(100), allowNull: true },
    cat3: { type: DataTypes.STRING(100), allowNull: true },

    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },

    price_1_boule: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    price_2_boules: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    prix_unique: { type: DataTypes.DECIMAL(10, 2), allowNull: true },

    bio: { type: DataTypes.STRING(20), allowNull: true },

    petit: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    grand: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    contenance: { type: DataTypes.STRING(50), allowNull: true },
    titrage: { type: DataTypes.STRING(50), allowNull: true },

    demi: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    pinte: { type: DataTypes.DECIMAL(10, 2), allowNull: true },

    verre: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    bouteille: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    cl_25: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    cl_50: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    l_1: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
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
