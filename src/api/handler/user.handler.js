const UsersService  = require("./../../services/UsersService")
const { ResponseHandlerFromService, CatchResponse } = require("./../../helpers/hapiResponse")

class UsersHandler {
    constructor(){
        this._service = new UsersService()

        this.getUsersByUsername = this.getUsersByUsername.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this)
        this.storeUsers = this.storeUsers.bind(this)
        this.deleteUserHandler = this.deleteUserHandler.bind(this)
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

    async storeUsers(request, h) {
        try {
            const user = new Object
            user.role_id = request.payload.role_id
            user.username = request.payload.username
            user.password = request.payload.password
            user.email = request.payload.email
            // user.full_name = request.payload.full_name
            // user.nrp = request.payload.nrp
            // user.bio = request.payload.bio
            // user.gender = request.payload.Gender
            // user.photo = request.payload.Photo
            const response = await this._service.storeUser(user)
            return ResponseHandlerFromService(h, response)
        } catch (error) {
            console.log("ERROR : ", error);
            return CatchResponse(h, error, "failed to create student")
        }
    }

    async deleteUserHandler(request, h) {
        try {
            const response = await this._service.deleteUser(request.params.id);
            return ResponseHandlerFromService(h, response)
        } catch (error) {
            return CatchResponse(h, error, "failed to delete user")
        }
    }
}

module.exports = UsersHandler
