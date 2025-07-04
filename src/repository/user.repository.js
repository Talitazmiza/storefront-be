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

    searchByFieldQuery(selectedField, selectedValue, selectedFields) {
        return (selectedField !== undefined && selectedValue !== undefined) ?
            `SELECT ${selectedFields} FROM ${this.table()} WHERE ${selectedField} = '${selectedValue}'` :
            `SELECT ${selectedFields} FROM ${this.table()} LIMIT 1`
    }

    async GetAll(selectedFields) {
        // try {
        //     return (await DB.query(this.defaultQuery(selectedFields))).rows
        // } catch (error) {
        //     console.log("FAILED TO GET ALL STUDENTS : ", error);
        //     throw error
        // }
        return new Promise((resolve, reject) => {
            DB.query(this.defaultQuery(selectedFields), [], function (err, results) {
                if (err) {
                    return reject(err)
                }

                console.log(results);

                return resolve(results);
            })
        })
    }

    async GetById(id, selectedFields) {
        // try {
        //     const result = await DB.query(`${this.defaultQuery(selectedFields)} WHERE id = ${id}`)
        //
        //     if (result.rows[0] !== undefined) {
        //         return result.rows[0]
        //     }
        //     return null
        // } catch (error) {
        //     console.log("FAILED TO GET USER BY ID [${id}] : ", error);
        //     throw error
        // }
        // return new Promise((resolve, reject) => {
        //     DB.query(`${this.defaultQuery(selectedFields)} WHERE id = ${id}`, [], function (err, results) {
        //         if (err) {
        //             return reject(err)
        //         }
        //
        //         console.log(results);
        //
        //         return resolve(results);
        //     })
        // })
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
            const userFields = 'role_id, username, password, email, created_at, updated_at'
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

    deleteQuery(id) {
        return `DELETE FROM ${this.table()} where id = ${id} `; 
    }

    async DeleteUser(id) {
        try {
            var existingData = await DB.query(this.searchByFieldQuery("id", id, "id, username")); //buat cek apakah data cluster dg id yg dimaksud ada/enggak
            if(existingData.rowCount>0){ //mastiin kalo datanya ada kalo gada nanti takutnya eror
                await DB.query(this.deleteQuery(id))
                return existingData.rows[0];
            } else {
                return null; //kalo gada berarti gagal update data not found
            }
        } catch (error) {
            console.log("FAILED TO DELETE USER : ", error);
            throw error
        }
    }


}

module.exports = {
    User
}
