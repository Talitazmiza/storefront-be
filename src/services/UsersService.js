// const { nanoid } = require("nanoid");
// const { Pool } = require("pg");
const bcrypt = require("bcrypt");
// const InvariantError = require("../exceptions/InvariantError");

// const slug = require("slug");
// const users = require("../models/user");
// const db = require("../models");

// const Role = db.Role;
// const User = db.User;

// const Sequelize = require('sequelize');
// const paginationHelper = require("../helpers/paginationHelper");
// const Op = Sequelize.Op;

// const { DB } = require("./../database/config");
const NotFoundError = require("../exceptions/NotFoundError");
const { User } = require("../repository/user.repository");
const { ResponseService } = require("../helpers/hapiResponse");
const { ADMIN_ROLE, STUDENT_ROLE } = require("../const/constdata")

class UsersService {

    constructor() {
        this.userRepository = new User();
        this.storeUser = this.storeUser.bind(this);
    }

    transformer(data) {
        let user = {};

        user["Id"] = data.id
        user["RoleId"] = data.role_id
        user["Username"] = data.username
        user["Password"] = data.Password
        user["Email"] = data.email
        user["Status"] = data.status
        user["CreatedAt"] = data.createdAt
        user["UpdatedAt"] = data.updatedAt

        return user
    }

    transformers(data) {
        const users = Array.from(data)
        let result = []

        for (const index in users) {
            const user = users[index]
            result.push(this.transformer(user))
        }

        return result
    }

    async getUserAll() {
        try {
            const users = await this.userRepository.GetAll("id, username, email");
            const transformer = this.transformers(users)
            return ResponseService(200, "yay success get all user", transformer)
        } catch (e) {
            console.log('ERROR === ', e)
            throw new NotFoundError("Somwhat Wrong");
        }
    }


    async storeUser(user) {
        try {
            // Check duplicate username
            const userByUsername = await this.userRepository.GetByUsername(user.username)

            if (userByUsername !== null) {
                return ResponseService(400, "username is already in use")
            }

            // Check duplicate email
            const userByEmail = await this.userRepository.GetByEmail(user.email)

            if (userByEmail !== null) {
                return ResponseService(400, "email is already in use")
            }

            let entity = new Object

            switch (user.role_id) {
                case ADMIN_ROLE:
                    // map admin attributes here

                    break;
                case STUDENT_ROLE:
                    entity.full_name = user.full_name
                    entity.nrp = user.nrp
                    entity.bio = user.bio
                    entity.gender = user.gender
                    entity.photo = user.photo

                    break;
                default:
                    return ResponseService(400, "invalid role")
            }

            let newUser = new Object;
            newUser.role_id = user.role_id
            newUser.username = user.username
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(user.password, salt);
            newUser.password = hashPassword
            newUser.email = user.email
            newUser.status = false

            await this.userRepository.Store(newUser, entity)

            return ResponseService(201, "register successfully")
        } catch (error) {
            console.log('ERROR ===', error);
            return new NotFoundError('Something wrong')
        }
    }

    async deleteUser(id) {
        try {
            const userStore = await this.userRepository.DeleteUser(id);
            if(userStore==null){
                return ResponseService(404, "cluster data not found", userStore)
            } else {
                return ResponseService(200, "yayyy delete user succeed", userStore)
            }
        } catch (e) {
            console.log('ERROR ==== ', e)
            throw new NotFoundError("Something Wrong");
        }
    }
}

module.exports = UsersService;
