const { DB } = require('./../database/config')
const StudentExample = require("./../models/student")

class Student {
    table() {
        return "students"
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
            console.log(`FAILED TO GET STUDENT BY ID [${id}] : `, error);
            throw error
        }
    }

    async GetByName(name, selectedFields) {
        try {
            const result = await DB.query(`${this.defaultQuery(selectedFields)} WHERE nrp LIKE '%${name}%'`)

            if (length.result === 1) {
                return result.rows[0]
            }

            return result
        } catch (error) {
            console.log(`FAILED TO GET STUDENT BY NAME [${name}] : `, error);
            throw error
        }
    }
}

module.exports = {
    Student
}
