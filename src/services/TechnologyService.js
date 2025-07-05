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

    async getProjectById(id) {
        try {
            const student = await this.technologyRepository.GetById(id, "id, cluster_id, name, code");
            // console.log(student.nrp);
            // if (student === null) {
            //     return await ResponseService(404, "student not found")
            // }
            const transformer = this.transformer(student)
            return ResponseService(200, "success get project", transformer)
        } catch (e) {
            console.log("ERROR === ", e);
            throw new NotFoundError("Something wrong")
        }
    }

    async storeTechnology(technologyRequest) {
        try {
            const techData = await this.technologyRepository.StoreTechnology(technologyRequest);
            if(techData==null) {
                return ResponseService(200, "technology data exist!", techData)
            } else {
                return ResponseService(200, "yayy store technology succeed", techData.rows[0])
            }
        } catch (e) {
            console.log('ERROR === ', e)
            throw new NotFoundError("Something Wrong");
        }
    }

    async updateTechnology(id, technologyRequest) {
        try {
            const techData = await this.technologyRepository.UpdateTechnology(id, technologyRequest);
            if(techData==null){
                return ResponseService(404, "technology data not found", techData)
            } else {
                return ResponseService(200, "yayyy update technology succeed", techData)
            }
        } catch (e) {
            console.log('ERROR ==== ', e)
            throw new NotFoundError("Something Wrong");
        }
    }

    async deleteTechnology(id) {
        try {
            const techStore = await this.technologyRepository.DeleteTechnology(id);
            if(techStore==null){
                return ResponseService(404, "technology data not found", techStore)
            } else {
                return ResponseService(200, "yayyy delete technology succeed", techStore)
            }
        } catch (e) {
            console.log('ERROR ==== ', e)
            throw new NotFoundError("Something Wrong");
        }
    }

}

module.exports = TechnologyService;