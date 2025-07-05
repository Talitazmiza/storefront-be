const ProjectService = require("../../services/ProjectService");
const { ResponseHandlerFromService, CatchResponse } = require("../../helpers/hapiResponse")

class ProjectHandler {
    constructor() {
        this._service = new ProjectService();
        this.getProjectAllHandler = this.getProjectAllHandler.bind(this);
        this.getProjectByIdHandler = this.getProjectByIdHandler.bind(this);
        // this.getProjectByTitle = this.getProjectByTitle.bind(this);
    }

    async getProjectAllHandler(request, h){
        try {
            const response = await this._service.getProjectAll();
            return ResponseHandlerFromService(h, response)
        } catch (error) {
           return CatchResponse(h, error, "hufft failed to get all project")
        }
    }

    async getProjectByIdHandler(request, h){
        try {
            const response = await this._service.getProjecttById(request.params.id);
            return ResponseHandlerFromService(h, response)
        } catch (error) {
            return CatchResponse(h, error, "failed to get project")
        }
    }

}

module.exports = ProjectHandler;