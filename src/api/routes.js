const StudentsHandler = require("./handler/student.handler");
const UsersHandler = require("./handler/user.handler");
const ProjectHandler = require("./handler/project.handler");
const LecturersHandler = require("./handler/lecturer.handler");
const ClustersHandler = require("./handler/cluster.handler");
const TechnologyHandler = require("./handler/technology.handler");
const Joi = require('joi');

const studentHandler = new StudentsHandler();
const userHandler = new UsersHandler();
const projectHandler = new ProjectHandler();
const lecturerHandler = new LecturersHandler();
const clusterHandler = new ClustersHandler();
const technologyHandler = new TechnologyHandler();

const add = (method, path, handler, options = null) => {
    return {
        method: method,
        path: path,
        handler: handler, 
        options : options
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
        add("POST", "/clusters", clusterHandler.storeTechClusterHandler, {
            validate: {
                payload: Joi.object({
                    name: Joi.string().min(3).max(255)
                })
            }
        }),
        add("GET", "/clusters/{id}", clusterHandler.getTechClusterByIdHandler),
        add("PUT", "/clusters/update/{id}", clusterHandler.updateTechClusterHandler, {
            validate: {
                payload: Joi.object({
                    name: Joi.string().min(3).max(255)
                })
            }
        }),
        add("DELETE", "/clusters/delete/{id}", clusterHandler.deleteTechClusterHandler),
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
