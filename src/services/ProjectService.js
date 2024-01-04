const NotFoundError = require("../exceptions/NotFoundError");
const { Project } = require("../repository/project.repository");
const { ResponseService } = require("./../helpers/hapiResponse");

class ProjectService {
    constructor() {
        this.projectRepository = new Project();
    }

    transformer(data) {
        let project = {};

        project["Id"] = data.id 
        project["UserId"] = data.user_id
        project["Title"] = data.title 
        project["Abstract"] = data.abstract
        project["YoutubeUrl"] = data.urlYoutube
        project["File"] = data.file 
        project["Photo"] = data.photo 
        project["Status"] = data.status
        project["CreatedAt"] = data.createdAt
        project["UpdatedAt"] = data.updatedAt

        return project
    }

    transformers(data) {
        const projects = Array.from(data)
        let result = []

        for (const index in projects) {
            const project = projects[index]
            result.push(this.transformer(project))
        }

        return result
    }

    async getProjectAll() {
        try {
            const project = await this.projectRepository.GetAll("id, user_id, title, abstract, file, photo");
            const transformer = this.transformers(project)
            return ResponseService(200, "yay success get all project", transformer)
        } catch (e) {
            console.log('ERROR ==== ', e)
            throw new NotFoundError("Something Wrong");
        }
    }

    // async getProjectById(id) {
    //     try {
    //         const project = await this.studentRepository.GetById(id, "nrp");
    //         console.log(project.id);
    //         if (student === null) {
    //             return await ResponseService(404, "student not found")
    //         }

    //         const transformer = this.transformer(student)
    //         return ResponseService(200, "success get student", transformer)
    //     } catch (e) {
    //         console.log("ERROR === ", e);
    //         throw new NotFoundError("Something wrong")
    //     }
    // }
}

module.exports = ProjectService;