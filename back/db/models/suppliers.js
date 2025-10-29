import { sequelize } from "./sequelize.js";
import { Model, DataTypes } from "sequelize";

export class Suppliers extends Model {}

Suppliers.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(100), allowNull: false }, // obligatoire
    subtitle: { type: DataTypes.STRING(100), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    image: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    tableName: "suppliers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
