import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { role } from "./role.model.js";
// import { session } from "./session.model.js";

const users = sequelize.define(
  "users",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);
users.belongsTo(role, { foreignKey: "roleId" });
// users.hasMany(session, { foreignKey: "user_id" });
// `sequelize.define` also returns the model
console.log(users === sequelize.models.users); // true

export { users };
