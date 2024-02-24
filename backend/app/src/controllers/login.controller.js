import { verifyPassword } from '../utils/hashPassword.js';
import jwt from 'jsonwebtoken';

export default class LoginController {
    constructor(userModel, profileModel) {
        this.userModel = userModel;
        this.profileModel = profileModel;
    }

    async login(email, password) {
        const user = await this.userModel.findOne({ where: { email } });
        if (!user) return { error: "User not found"};

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) return { error: "Invalid password"};

        const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET, { expiresIn: '5h' })

        return { token };
    }

    async register(email, password, data) {
        const newUser = await this.userModel.create({ email, password });
        const profileData = { UserId: newUser.id, ...data };
        const newProfile = await this.profileModel.create(profileData);
        return {user: newUser, profile: newProfile};
    }
}