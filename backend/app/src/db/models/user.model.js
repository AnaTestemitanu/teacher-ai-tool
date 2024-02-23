import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const userModel = sequelize.define(
    'users', 
    {
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey: true,
            validate: {
            isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        underscored: true,
    }
);

export default userModel;
