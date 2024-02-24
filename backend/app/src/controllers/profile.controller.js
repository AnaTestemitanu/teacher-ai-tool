export default class ProfileController {
    constructor(profileModel) {
        this.profileModel = profileModel;
    }

    async getAllProfiles() {
        const profiles = await this.profileModel.findAll();
        return profiles;
    }
}