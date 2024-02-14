import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const role = sequelize.define(
  "Role",
  {
    // Model attributes are defined here
    roleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
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
