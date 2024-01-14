const StudentsHandler = require("./handler/student.handler");
const UsersHandler = require("./handler/user.handler");
const ProjectHandler = require("./handler/project.handler");
const LecturersHandler = require("./handler/lecturer.handler");
const ClustersHandler = require("./handler/cluster.handler");
const TechnologyHandler = require("./handler/technology.handler");

const studentHandler = new StudentsHandler();
const userHandler = new UsersHandler();
const projectHandler = new ProjectHandler();
const lecturerHandler = new LecturersHandler();
const clusterHandler = new ClustersHandler();
const technologyHandler = new TechnologyHandler();


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

        add("POST", "/register", userHandler.storeUsers),

        add("GET", "/lecturers", lecturerHandler.getLecturerAllHandler),
        add("GET", "/lecturer/{id}", lecturerHandler.getLecturerByIdHandler),
        add("GET", "/lecturer/name/{name}", lecturerHandler.getLecturerByNameHandler),
        add("GET", "/clusters", clusterHandler.getTechClusterAllHandler),
        add("GET", "/technologies", technologyHandler.getTechnologyAllHandler),
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
