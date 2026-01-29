import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Post = sequelize.define(
  "Posts",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "posts",
    timestamps: true,
    createdAt: "createAt",
    updatedAt: "updateAt",
  },
);
