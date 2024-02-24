import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../utils/hashPassword.js';

export default class UserController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async createUser(email, password) {
        const id = uuidv4();
        const pass = await hashPassword(password);
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

    async getUserByEmail(email) {
        const user = await this.userModel.findOne({ where: { email } });
        return user;
    }
}