const StudentsHandler = require("./handler/student.handler");
const UsersHandler = require("./handler/user.handler");
const ProjectHandler = require("./handler/project.handler");

const studentHandler = new StudentsHandler();
const userHandler = new UsersHandler();
const projectHandler = new ProjectHandler();


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
        add("GET", "/students/{id}", studentHandler.getStudentByIdHandler),
        add("GET", "/students/name/{name}", studentHandler.getStudentByNameHandler),
        add("GET", "/users/name/{name}", userHandler.getUsersByUsername),
        add("GET", "/users", userHandler.getAllUsers),
        add("GET", "/projects", projectHandler.getProjectAllHandler),

        add("POST", "/register", userHandler.storeUsers),

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
