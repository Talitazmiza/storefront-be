const NotFoundError = require("../exceptions/NotFoundError");
const { TechCluster } = require("../repository/techCluster.repository");
const { ResponseService } = require("./../helpers/hapiResponse");

class TechClusterService {
    constructor() {
        this.techClusterRepository = new TechCluster();
    }

    transformer(data) {
        let cluster = {};

        cluster["Id"] = data.id
        cluster["Name"] = data.name
        cluster["CreatedAt"] = data.createdAt
        cluster["UpdatedAt"] = data.updatedAt

        return cluster
    }

    transformers(data) {
        const clusters = Array.from(data)
        let result = []

        for (const index in clusters) {
            const cluster = clusters[index]
            result.push(this.transformer(cluster))
        }

        return result
    }


    async getTechClusterAll() {
        try {
            const clusters = await this.techClusterRepository.GetAll("id, name");
            const transformer = this.transformers(clusters)
            return ResponseService(200, "yay success get all tech cluster", transformer)
        } catch (e) {
            console.log('ERROR ==== ', e)
            throw new NotFoundError("Something Wrong");
        }
    }


}


module.exports = TechClusterService;