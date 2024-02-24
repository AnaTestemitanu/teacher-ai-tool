import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import userModel from "./user.model.js";

const classModel = sequelize.define(
  "classes",
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
    ClassName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ClassAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ClassLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Tons: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ClassGroupName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PdfLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default classModel;