import { verifyPassword } from '../utils/hashPassword.js';
import jwt from 'jsonwebtoken';

export default class LoginController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async login(email, password) {
        const user = await this.userModel.findOne({ where: { email } });
        if (!user) return { error: "User not found"};

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) return { error: "Invalid password"};

        const token = jwt.sign({ userId: user.id}, 'test', { expiresIn: '5h' })

        return { token };
    }
}