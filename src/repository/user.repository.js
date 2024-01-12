const { DB } = require('./../database/config')
const { ADMIN_ROLE, STUDENT_ROLE } = require('./../const/constdata')
const { Student } = require("../repository/student.repository");

class User{
    constructor(){
        this.studentRepository = new Student()
    }

    table() {
        return "users"
    }

    defaultQuery(selectedFields) {
        return (selectedFields !== undefined) ?
        `SELECT ${selectedFields} FROM ${this.table()}` :
        `SELECT * FROM ${this.table()}`
    }

    async GetAll(selectedFields) {
        try {
            return (await DB.query(this.defaultQuery(selectedFields))).rows
        } catch (error) {
            console.log("FAILED TO GET ALL STUDENTS : ", error);
            throw error
        }
    }

    async GetById(id, selectedFields) {
        try {
            const result = await DB.query(`${this.defaultQuery(selectedFields)} WHERE id = ${id}`)

            if (result.rows[0] !== undefined) {
                return result.rows[0]
            }

            return null
        } catch (error) {
            console.log("FAILED TO GET USER BY ID [${id}] : ", error);
            throw error
        }
    }

    async GetByUsername(username, selectedFields) {
        try {
            const result = await DB.query(`${this.defaultQuery(selectedFields)} WHERE username = '${username}'`)

            if (result.rows[0] !== undefined) {
                return result.rows[0]
            }

            return null
        } catch (error) {
            console.log(`FAILED TO GET USER BY USERNAME [${username}] : `, error);
            throw error
        }
    }

    async GetByEmail(email, selectedFields) {
        try {
            const result = await DB.query(`${this.defaultQuery(selectedFields)} WHERE email = '${email}'`)

            if (result.rows[0] !== undefined) {
                return result.rows[0]
            }

            return null
        } catch (error) {
            console.log(`FAILED TO GET USER BY USERNAME [${username}] : `, error);
            throw error
        }
    }

    async Store(user, entity) {
        try {
            await DB.query("BEGIN")
            const userFields = 'role_id, username, password, email, status, created_at, updated_at'
            const userValues = `${user.role_id}, '${user.username}', '${user.password}', '${user.email}', ${user.status}, NOW(), NOW()`
            const userQuery = `INSERT INTO ${this.table()} (${userFields}) VALUES (${userValues}) RETURNING *`
            const newUser = await DB.query(userQuery)

            let entityQuery = ""
            entity.user_id = newUser.rows[0].id

            switch (user.role_id) {
                case ADMIN_ROLE:

                    break;
                case STUDENT_ROLE:
                    entityQuery = await this.studentRepository.generateStoreQuery(entity)
                    break
                default:
                    console.log("INVALID ROLE ID")
            }

            const newEntity = await DB.query(entityQuery)
            await DB.query("COMMIT")
            console.log("NEW USER : ", newUser.rows[0])
            console.log("NEW ENTITY : ", newEntity.rows[0])

            const resUser = newUser.rows[0]
            const resEntity = newEntity.rows[0]

            return
        } catch (error) {
            console.log("FAILED TO INSERT NEW USER : ", error);
            await DB.query("ROLLBACK")
            throw error
        }
    }
}

module.exports = {
    User
}
