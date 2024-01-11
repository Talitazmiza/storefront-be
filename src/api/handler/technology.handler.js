const TechnologyService = require("../../services/TechnologyService");
const { ResponseHandlerFromService, CatchResponse } = require("../../helpers/hapiResponse");

class TechnologiesHandler {
    constructor() {
        this._service = new TechnologyService();
        this.getTechnologyAllHandler = this.getTechnologyAllHandler.bind(this);
    }


async getTechnologyAllHandler(request, h) {
    try {
        const response = await this._service.getTechnologyAll();
        return ResponseHandlerFromService(h, response)
    } catch (error) {
        return CatchResponse(h, error, "failed to get all technology")
    }
}
}

module.exports = TechnologiesHandler;