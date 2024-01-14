const TechnologyService = require("../../services/TechnologyService");
const { ResponseHandlerFromService, CatchResponse } = require("../../helpers/hapiResponse");

class TechnologiesHandler {
    constructor() {
        this._service = new TechnologyService();
        this.getTechnologyAllHandler = this.getTechnologyAllHandler.bind(this);
        this.storeTechnologyHandler = this.storeTechnologyHandler.bind(this);
        this.updateTechnologyHandler = this.updateTechnologyHandler.bind(this);
        this.deleteTechnologyHandler = this.deleteTechnologyHandler.bind(this);
    }



async getTechnologyAllHandler(request, h) {
    try {
        const response = await this._service.getTechnologyAll();
        return ResponseHandlerFromService(h, response)
    } catch (error) {
        return CatchResponse(h, error, "failed to get all technology")
    }
}

async storeTechnologyHandler(request, h) {
    try {
        const response = await this._service.storeTechnology(request.payload);
        return ResponseHandlerFromService(h, response)
    } catch (error) {
        return CatchResponse(h, error, "failed to store technology")
    }
}

async updateTechnologyHandler(request, h) {
    try {
        const response = await this._service.updateTechnology(request.params.id, request.payload);
        return ResponseHandlerFromService(h, response)
    } catch (error) {
        return CatchResponse(h, error, "failed to update technology")
    }
}

async deleteTechnologyHandler(request, h) {
    try {
        const response = await this._service.deleteTechnology(request.params.id);
        return ResponseHandlerFromService(h, response)
    } catch (error) {
        return CatchResponse(h, error, "failed to delete technology")
    }
}


}

module.exports = TechnologiesHandler;