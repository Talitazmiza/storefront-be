const NotFoundError = require("../exceptions/NotFoundError");
const { Lecturer } = require("../repository/lecturer.repository");
const { ResponseService } = require("./../helpers/hapiResponse");

class LecturerService {
    constructor() {
        this.lecturerRepository = new Lecturer();
    }

    transformer(data) {
        let lecturer = {};

        lecturer["Id"] = data.id
        lecturer["UserId"] = data.user_id
        lecturer["Name"] = data.name
        lecturer["NIP"] = data.nip
        lecturer["Gender"] = data.gender
        lecturer["CreatedAt"] = data.createdAt
        lecturer["UpdatedAt"] = data.updatedAt
        
        return lecturer
    }

    transformers(data) {
        const lecturers = Array.from(data)
        let result = []

        for (const index in lecturers) {
            const lecturer = lecturers[index]
            result.push(this.transformer(lecturer))
        }

        return result
    }

    async getLecturerAll() {
        try {
            const lecturers = await this.lecturerRepository.GetAll("id, name, nip, gender");
            const transformer = this.transformers(lecturers)
            return ResponseService(200, "yay success get all lecturer", transformer)
        } catch (e) {
            console.log('ERROR ====', e)
            throw new NotFoundError("Something Wrong");
        }
    }

    async getLecturerById(id) {
        try {
            const lecturer = await this.lecturerRepository.GetById(id, "nip");
            console.log(lecturer.nip);
            if (lecturer === null) {
                return await ResponseService(404, "lecturer not found")
            }

            const transformer = this.transformer(lecturer)
            return ResponseService(200, "success get lecturer", transformer)
        } catch (e) {
            console.log("ERROR === ", e);
            throw new NotFoundError("Something wrong")
        }
    }

    async getSLecturerByName(name) {
        try {
            const lecturer = await this.lecturerRepository.GetByName(name);

            if (!lecturer) {
                return ResponseService(404, "lecturer not found")
            }

            const transformer = this.transformer(lecturer)
            return ResponseService(200, "success get lecturer", transformer)
        } catch (e) {
            console.log("ERROR === ", e);
            throw new NotFoundError("Something wrong")
        }
    }


}

module.exports = LecturerService;