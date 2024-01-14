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

    async getTechClusterById(id) {
        try {
            const clusters = await this.techClusterRepository.GetById(id, "id, name");
            if(clusters==null){
                return ResponseService(404, "data cluster not found", null)
            } else {
                const transformer = this.transformer(clusters)
                return ResponseService(200, "yay success get single tech cluster", transformer)
            }
           
        } catch (e) {
            console.log('ERROR ==== ', e)
            throw new NotFoundError("Something Wrong");
        }
    }

    async storeTechCluster(clusterRequest) {
        try {
            const clusterData = await this.techClusterRepository.StoreCluster(clusterRequest);
            if(clusterData==null){
                return ResponseService(200, "cluster data existed!", clusterData)
            } else {
                return ResponseService(200, "yayyy store cluster succeed", clusterData.rows[0])
            }
        } catch (e) {
            console.log('ERROR ==== ', e)
            throw new NotFoundError("Something Wrong");
        }
    }

    async updateTechCluster(id, clusterRequest) {
        try {
            const clusterData = await this.techClusterRepository.UpdateCluster(id, clusterRequest);
            if(clusterData==null){
                return ResponseService(404, "cluster data not found", clusterData)
            } else {
                return ResponseService(200, "yayyy update cluster succeed", clusterData)
            }
        } catch (e) {
            console.log('ERROR ==== ', e)
            throw new NotFoundError("Something Wrong");
        }
    }

    async deleteTechCluster(id) {
        try {
            const clusterStore = await this.techClusterRepository.DeleteCluster(id);
            if(clusterStore==null){
                return ResponseService(404, "cluster data not found", clusterStore)
            } else {
                return ResponseService(200, "yayyy delete cluster succeed", clusterStore)
            }
        } catch (e) {
            console.log('ERROR ==== ', e)
            throw new NotFoundError("Something Wrong");
        }
    }
    


}


module.exports = TechClusterService;