const ClusterService = require("../../services/TechClusterService");
const { ResponseHandlerFromService, CatchResponse } = require("../../helpers/hapiResponse");

class ClustersHandler {
    constructor() {
        this._service = new ClusterService();
        this.getTechClusterAllHandler = this.getTechClusterAllHandler.bind(this);
        this.storeTechClusterHandler = this.storeTechClusterHandler.bind(this);
        this.getTechClusterByIdHandler = this.getTechClusterByIdHandler.bind(this);
        this.updateTechClusterHandler = this.updateTechClusterHandler.bind(this);
        this.deleteTechClusterHandler = this.deleteTechClusterHandler.bind(this);

    }

    async getTechClusterAllHandler(request, h) {
        try {
            const response = await this._service.getTechClusterAll();
            return ResponseHandlerFromService(h, response)
        } catch (error) {
            return CatchResponse(h, error, "failed to get all cluster")
        }
    }

    async getTechClusterByIdHandler(request, h) {
        try {
            const response = await this._service.getTechClusterById(request.params.id);
            return ResponseHandlerFromService(h, response)
        } catch (error) {
            return CatchResponse(h, error, "failed to get cluster by id")
        }
    }

    async storeTechClusterHandler(request, h) {
        try {
            const response = await this._service.storeTechCluster(request.payload);
            return ResponseHandlerFromService(h, response)
        } catch (error) {
            return CatchResponse(h, error, "failed to get all cluster")
        }
    }

    async updateTechClusterHandler(request, h) {
        try {
            const response = await this._service.updateTechCluster(request.params.id, request.payload);
            return ResponseHandlerFromService(h, response)
        } catch (error) {
            return CatchResponse(h, error, "failed to update cluster")
        }
    }

    async deleteTechClusterHandler(request, h) {
        try {
            const response = await this._service.deleteTechCluster(request.params.id);
            return ResponseHandlerFromService(h, response)
        } catch (error) {
            return CatchResponse(h, error, "failed to update cluster")
        }
    }
}

module.exports = ClustersHandler;
