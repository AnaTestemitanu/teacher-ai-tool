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
        const pass = this.hashPassword(password);
        const newUser = await this.userModel.create({ email, password: pass });
        return newUser;
    }

    async getAllUsers() {
        const users = await this.userModel.findAll({ logging: console.log });
        return users;
    }
}