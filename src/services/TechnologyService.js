const NotFoundError = require("../exceptions/NotFoundError");
const { TechnologyRepository } = require("../repository/technology.repository");
const { ResponseService } = require("./../helpers/hapiResponse");

class TechnologyService {
    constructor() {
        this.technologyRepository = new TechnologyRepository();
    }

    transformer(data) {
        let technology = {};

        technology["Id"] = data.id 
        technology["ClusterId"] = data.cluster_id
        technology["Name"] = data.name
        technology["Code"] = data.code
        technology["CreatedAt"] = data.createdAt
        technology["UpdatedAt"] = data.updatedAt

        return technology
    }

    transformers(data) {
        const technologies = Array.from(data)
        let result = []

        for (const index in technologies) {
            const technology = technologies[index]
            result.push(this.transformer(technology))
        }

        return result
    }

    async getTechnologyAll() {
        try {
            const technologies = await this.technologyRepository.GetAll("id, cluster_id, code, name");
            const transformer = this.transformers(technologies)
            return ResponseService(200, "yay success get all tech cluster", transformer)
        } catch (e) {
            console.log('ERROR ==== ', e)
            throw new NotFoundError("Something Wrong");
        }
    }

}

module.exports = TechnologyService;