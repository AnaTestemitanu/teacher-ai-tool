import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import userModel from "./user.model.js";

const profileModel = sequelize.define(
  "profile",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: userModel,
        key: "id",
      },
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    YearsOfExperience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 80,
        min: 0
      },
    },
    Gender: {
      type: DataTypes.ENUM,
      values: ["male", "female", "other"],
      allowNull: false,
    },
    MainLanguage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default profileModel;