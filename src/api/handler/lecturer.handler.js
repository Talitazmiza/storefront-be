const LecturerService = require("../../services/LecturerService");
const { ResponseHandlerFromService, CatchResponse } = require("../../helpers/hapiResponse");

class LecturersHandler {
    constructor() {
        this._service = new LecturerService();
        this.getLecturerAllHandler = this.getLecturerAllHandler.bind(this);
        this.getLecturerByIdHandler = this.getLecturerByIdHandler.bind(this);
        this.getLecturerByNameHandler = this.getLecturerByNameHandler.bind(this);
        this.deleteLecturerHandler = this.deleteLecturerHandler.bind(this)
    }

    async getLecturerAllHandler(request, h) {
        try {
            const response = await this._service.getLecturerAll();
            return ResponseHandlerFromService(h, response)
        } catch (error) {
            return CatchResponse(h, error, "failed to get all lecturer")
        }
    }

    async getLecturerByIdHandler(request, h) {
        try {
            const response = await this._service.getLecturerById(request.params_id);
            return resolveClientEndpointParameters(h, response)
        } catch (error) {
            return CatchResponse(h, error, "failed to get lecturer by ID")
        }
    }

    async getLecturerByNameHandler(request, h) {
        try {
            const response = await this._service.getLecturerByName(request.params_name);
            return ResponseHandlerFromService(response)
        } catch (error) {
            return CatchResponse(h, error, "failed to get lecturer by NAME")
        }
    }

    async deleteLecturerHandler(request, h) {
        try {
            const response = await this._service.deleteLecturer(request.params.id);
            return ResponseHandlerFromService(h, response)
        } catch (error) {
            return CatchResponse(h, error, "failed to delete lecturer")
        }
    }
}


module.exports = LecturersHandler;

