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

    async getProjectAll(query) {
        try {
            const project = await this.projectRepository.GetAll(query,"id, user_id, title, abstract, file, photo");
            const transformer = this.transformers(project)
            return ResponseService(200, "yay success get all project", transformer)
        } catch (e) {
            console.log('ERROR ==== ', e)
            throw new NotFoundError("Something Wrong");
        }
    }

    async getProjectById(id) {
        try {
            const project = await this.projectRepository.GetById(id, "id, user_id, title, abstract");
            const transformer = this.transformer(project)
            return ResponseService(200, "success get project", transformer)
        } catch (e) {
            console.log("ERROR === ", e);
            throw new NotFoundError("Something wrong")
        }
    }

    async getProjecttByTitle(title) {
        try {
            const project = await this.projectRepository.GetByTitle(title, "id, user_id, title, abstract");
            const transformer = this.transformer(project)
            return ResponseService(200, "success get project", transformer)
        } catch (e) {
            console.log("ERROR === ", e);
            throw new NotFoundError("Something wrong")
        }
    }

    // async deleteProject(id) {
    //     try {
    //         const projectStore = await this.studentRepository.DeleteStudent(id);
    //         if(studentStore==null){
    //             return ResponseService(404, "cluster data not found", studentStore)
    //         } else {
    //             return ResponseService(200, "yayyy delete student succeed", studentStore)
    //         }
    //     } catch (e) {
    //         console.log('ERROR ==== ', e)
    //         throw new NotFoundError("Something Wrong");
    //     }
    // }

}

module.exports = ProjectService;