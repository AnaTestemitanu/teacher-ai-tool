export default class ProfileController {
  constructor(profileModel) {
    this.profileModel = profileModel;
  }

  async getAllProfiles() {
    const profiles = await this.profileModel.findAll();
    return profiles;
  }

  async createProfile(profileData) {
    const newProfile = await this.profileModel.create(profileData);
    return newProfile;
  }

  async deleteProfile(profileId) {
    const deleted = await this.profileModel.destroy({
      where: { id: profileId },
    });
    return deleted;
  }

  async getProfileById(profileId) {
    const profile = await this.profileModel.findByPk(profileId);
    return profile;
  }

  async getProfileByUserId(userId) {
    const profile = await this.profileModel.findOne({
      where: {
        UserId: userId
      }
    });
    return profile;
  }

  async updateProfile(profileId, updatePayload) {
    const [updatedRowsCount] = await this.profileModel.update(updatePayload, {
      where: { id: profileId },
    });

    if (updatedRowsCount === 0) {
        console.log("User not found or update failed");
        return null;
    }

    return this.getProfileById(profileId);
  }
}
