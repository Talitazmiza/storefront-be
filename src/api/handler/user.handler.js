const UsersService  = require("./../../services/UsersService")
const { ResponseHandlerFromService, CatchResponse } = require("./../../helpers/hapiResponse")

class UsersHandler {
    constructor(){
        this._service = new UsersService()

        this.getUsersByUsername = this.getUsersByUsername.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this)
    }

    async getAllUsers(request, h) {
        try {
            const response = await this._service.getUserAll();
            return ResponseHandlerFromService(h, response)
        } catch (error) {
            console.log("ERROR : ", error);
           return CatchResponse(h, error, "failed to get all users")
        }
    }

    async getUsersByUsername(request, h) {
        try {
            const response = await this._service.getUsersByUsername(request.params.name);
            return ResponseHandlerFromService(h, response)
        } catch (error) {
            console.log("ERROR : ", error);
           return CatchResponse(h, error, "failed to get user")
        }
    }
}

module.exports = UsersHandler
