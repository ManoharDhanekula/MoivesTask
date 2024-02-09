import { DataTypes } from "sequelize";
import { sequelize } from "./config.js";

export const Movies = sequelize.define(
  "Movies",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 1,
        max: 10,
      },
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trailer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log(Movies === sequelize.models.Movies); // true
