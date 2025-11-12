import { sequelize } from "./sequelize.js";
import { Model, DataTypes } from "sequelize";

export class CarteDuJour extends Model{}

CarteDuJour.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        categorie: {type:DataTypes.STRING(100), allowNull: false},
        prix : {type: DataTypes.DECIMAL(10,2), allowNull: false},
      },
      {
        sequelize,
        tableName: "carteDuJour",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );