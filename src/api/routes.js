const StudentsHandler = require("./handler/student.handler");
const UsersHandler = require("./handler/user.handler");
const ProjectHandler = require("./handler/project.handler");
const LecturersHandler = require("./handler/lecturer.handler");

const studentHandler = new StudentsHandler();
const userHandler = new UsersHandler();
const projectHandler = new ProjectHandler();
const lecturerHandler = new LecturersHandler();


const add = (method, path, handler) => {
    return {
        method: method,
        path: path,
        handler: handler
    }
}

const routes = () => {
    return [
        add("GET", "/students", studentHandler.getStudentAllHandler),
        add("GET", "/student/{id}", studentHandler.getStudentByIdHandler),
        add("GET", "/students/name/{name}", studentHandler.getStudentByNameHandler),
        add("GET", "/users/name/{name}", userHandler.getUsersByUsername),
        add("GET", "/users", userHandler.getAllUsers),
        add("GET", "/projects", projectHandler.getProjectAllHandler),
        add("GET", "/lecturers", lecturerHandler.getLecturerAllHandler),
        add("GET", "/lecturer/{id}", lecturerHandler.getLecturerByIdHandler),
        add("GET", "/lecturer/name/{name}", lecturerHandler.getLecturerByNameHandler),
        // {
        //     method: "GET",
        //     path: "/students",
        //     handler: handler.getStudentAllHandler(),
        // },
        // {
        //     method: "GET",
        //     path: "/test",
        //     handler: (request, h) => {
        //         return h.response('test')
        //     }
        // }
    ]
}

module.exports = routes;
