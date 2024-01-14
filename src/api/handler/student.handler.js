const StudentService = require("../../services/StudentService");
const { ResponseHandlerFromService, CatchResponse } = require("../../helpers/hapiResponse")

class StudentsHandler {
    constructor() {
        this._service = new StudentService();
        this.getStudentAllHandler = this.getStudentAllHandler.bind(this);
        this.getStudentByIdHandler = this.getStudentByIdHandler.bind(this);
        this.getStudentByNameHandler = this.getStudentByNameHandler.bind(this);
        this.deleteStudentHandler = this.deleteStudentHandler.bind(this);
    }

    async getStudentAllHandler(request, h){
        try {
            const response = await this._service.getStudentAll();
            return ResponseHandlerFromService(h, response)
        } catch (error) {
           return CatchResponse(h, error, "failed to get all students")
        }
    }

    async getStudentByIdHandler(request, h){
        try {
            const response = await this._service.getStudentById(request.params.id);
            return ResponseHandlerFromService(h, response)
        } catch (error) {
           return CatchResponse(h, error, "failed to get student")
        }
    }

    async getStudentByNameHandler(request, h){
        try {
            const response = await this._service.getStudentByName(request.params.name);
            return ResponseHandlerFromService(response)
        } catch (error) {
           return CatchResponse(h, error, "failed to get student")
        }
    }

    async deleteStudentHandler(request, h) {
        try {
            const response = await this._service.deleteStudent(request.params.id);
            return ResponseHandlerFromService(h, response)
        } catch (error) {
            return CatchResponse(h, error, "failed to delete student")
        }
    }
}

module.exports = StudentsHandler;
