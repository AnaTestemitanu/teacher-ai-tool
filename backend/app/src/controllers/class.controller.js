export default class ClassController {
    constructor(classModel) {
        this.classModel = classModel;
    }

    async createClass(data) {
        if (data.courseBookPdf)
            delete data.courseBookPdf;
        const newClass = await this.classModel.create(data);
        return newClass;
    }

    async getClassesByUserId(userId) {
        const classes = await this.classModel.findAll({
            where: {
              UserId: userId
            }
          });
          return classes;
    }
}