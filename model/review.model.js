import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { users } from "./users.model.js";
import { Mobile } from "./mobile.model.js";

const review = sequelize.define(
  "review",
  {
    // Model attributes are defined here
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mobile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title_Of: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);
review.belongsTo(users, { foreignKey: "user_id" });
users.hasMany(review, { foreignKey: "user_id" });

review.belongsTo(Mobile, { foreignKey: "mobile_id" });
Mobile.hasMany(review, { foreignKey: "mobile_id" });

// `sequelize.define` also returns the model
console.log(users === sequelize.models.users); // true

export { review };
