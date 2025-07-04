const NotFoundError = require("../exceptions/NotFoundError");
const student = require("../models/student");
const { Student } = require("../repository/student.repository");
const { ResponseService } = require("./../helpers/hapiResponse");

class StudentService {
    constructor() {
        this.studentRepository = new Student();
    }

    transformer(data) {
        let student = {};

        student["Id"] = data.id
        student["UserId"] = data.user_id
        student["FullName"] = data.fullName
        student["Nrp"] = data.nrp
        student["Bio"] = data.bio
        student["Gender"] = data.gender
        student["Photo"] = data.photo
        student["CreatedAt"] = data.createdAt
        student["UpdatedAt"] = data.updatedAt

        return student
    }

    transformers(data) {
        const students = Array.from(data)
        let result = []

        for (const index in students) {
            const student = students[index]
            result.push(this.transformer(student))
        }
        return result
    }

    async getStudentAll() {
        try {
            const students = await this.studentRepository.GetAll("id, fullName, nrp, bio, gender");
            const transformer = this.transformers(students)
            return ResponseService(200, "yay success get all student", transformer)
        } catch (e) {
            console.log('ERROR ==== ', e)
            throw new NotFoundError("Something Wrong");
        }
    }

    async getStudentById(id) {
        try {
            const student = await this.studentRepository.GetById(id, "nrp");
            console.log(student.nrp);
            if (student === null) {
                return await ResponseService(404, "student not found")
            }

            const transformer = this.transformer(student)
            return ResponseService(200, "success get student", transformer)
        } catch (e) {
            console.log("ERROR === ", e);
            throw new NotFoundError("Something wrong")
        }
    }

    async getStudentByName(name) {
        try {
            const student = await this.studentRepository.GetByName(name);

            if (!student) {
                return ResponseService(404, "student not found")
            }

            const transformer = this.transformer(student)
            return ResponseService(200, "success get student", transformer)
        } catch (e) {
            console.log("ERROR === ", e);
            throw new NotFoundError("Something wrong")
        }
    }

    async deleteStudent(id) {
        try {
            const studentStore = await this.studentRepository.DeleteStudent(id);
            if(studentStore==null){
                return ResponseService(404, "cluster data not found", studentStore)
            } else {
                return ResponseService(200, "yayyy delete student succeed", studentStore)
            }
        } catch (e) {
            console.log('ERROR ==== ', e)
            throw new NotFoundError("Something Wrong");
        }
    }
}

module.exports = StudentService;
