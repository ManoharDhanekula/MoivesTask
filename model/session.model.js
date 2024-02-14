import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { users } from "./users.model.js";

const session = sequelize.define(
  "session",
  {
    // Model attributes are defined here
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);
users.hasMany(session, { onDelete: "cascade", hooks: true });
users.hasMany(session, { foreignKey: "user_id" });
session.belongsTo(users, { foreignKey: "user_id" });
// `sequelize.define` also returns the model
console.log(session === sequelize.models.session); // true

export { session };
