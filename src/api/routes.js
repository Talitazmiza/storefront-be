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
        // User
        add("POST", "/register", userHandler.storeUsers),
        add("GET", "/users/name/{name}", userHandler.getUsersByUsername),
        add("GET", "/users", userHandler.getAllUsers),
        add("DELETE", "/users/delete/{id}", userHandler.deleteUserHandler),

        // Student
        add("GET", "/students", studentHandler.getStudentAllHandler),
        add("GET", "/student/{id}", studentHandler.getStudentByIdHandler),
        add("GET", "/students/name/{name}", studentHandler.getStudentByNameHandler),
        add("DELETE", "/students/delete/{id}", studentHandler.deleteStudentHandler),
        
        // Lecturer
        add("GET", "/lecturers", lecturerHandler.getLecturerAllHandler),
        add("GET", "/lecturer/{id}", lecturerHandler.getLecturerByIdHandler),
        add("GET", "/lecturer/name/{name}", lecturerHandler.getLecturerByNameHandler),
        add("DELETE", "/lecturers/delete/{id}", lecturerHandler.deleteLecturerHandler),


        // Project
        add("GET", "/projects", projectHandler.getProjectAllHandler),
        

        // Cluster
        add("GET", "/clusters", clusterHandler.getTechClusterAllHandler),
        add("POST", "/clusters", clusterHandler.storeTechClusterHandler, {
            validate: {
                payload: Joi.object({
                    name: Joi.string().min(3).max(255).required(),
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
        
        
        // Technology
        add("GET", "/technologies", technologyHandler.getTechnologyAllHandler),
        add("POST", "/technologies", technologyHandler.storeTechnologyHandler, {
            validate: {
                payload: Joi.object({
                    cluster_id: Joi.number().required(),
                    name: Joi.string().min(3).max(255).required(),
                    code: Joi.string().min(3).max(255).required()
                })
            }
        }),
        add("PUT", "/technologies/update/{id}", technologyHandler.updateTechnologyHandler, {
            validate: {
                payload: Joi.object({
                    name: Joi.string().min(3).max(255).required()
                })
            }
        }),
        add("DELETE", "/technologies/delete/{id}", technologyHandler.deleteTechnologyHandler),


















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
