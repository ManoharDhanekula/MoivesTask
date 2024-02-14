import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const role = sequelize.define(
  "Roles",
  {
    // Model attributes are defined here
    authentication: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

console.log(role === sequelize.models.role); // true

export { role };
