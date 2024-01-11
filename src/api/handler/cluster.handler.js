const ClusterService = require("../../services/TechClusterService");
const { ResponseHandlerFromService, CatchResponse } = require("../../helpers/hapiResponse");

class ClustersHandler {
    constructor() {
        this._service = new ClusterService();
        this.getTechClusterAllHandler = this.getTechClusterAllHandler.bind(this);
    }

    async getTechClusterAllHandler(request, h) {
        try {
            const response = await this._service.getTechClusterAll();
            return ResponseHandlerFromService(h, response)
        } catch (error) {
            return CatchResponse(h, error, "failed to get all cluster")
        }
    }
}

module.exports = ClustersHandler;
