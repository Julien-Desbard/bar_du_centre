import { sequelize } from "./sequelize.js";
import { Model, DataTypes } from "sequelize";

export class Event extends Model{}

Event.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING(100), allowNull: false }, // obligatoire
        subtitle: { type: DataTypes.STRING(100), allowNull: true },
        date: {type:DataTypes.DATEONLY, allowNull: true},
        image: {type: DataTypes.TEXT, allowNull: false}
      },
      {
        sequelize,
        tableName: "events",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );