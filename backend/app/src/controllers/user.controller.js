import { v4 as uuidv4 } from 'uuid';
import simplecrypt from 'simplecrypt';

export default class UserController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    hashPassword(password) {
        try {
            const sc = simplecrypt();
            const digest = sc.encrypt(password);
            return digest;
        } catch (error) {
            console.error('Error hashing password', error);
            throw error;
        }
    }

    async createUser(email, password) {
        const id = uuidv4();
        const pass = this.hashPassword(password);
        const newUser = await this.userModel.create({ id, email, password: pass });
        return newUser;
    }

    async getAllUsers() {
        const users = await this.userModel.findAll({ logging: console.log });
        return users;
    }

    async getUserByID(userId) {
        const user = await this.userModel.findByPk(userId);
        return user;
    }

    async deleteUser(userId) {
        const deleted = await this.userModel.destroy({
            where: { id: userId }
        });
        return deleted;
    }
}