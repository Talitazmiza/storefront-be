const { DB } = require('./../database/config')

class Project{
    table() {
        return "projects"
    }

    defaulQuery(selectedFields) {
        return (selectedFields !== undefined) ?
        `SELECT ${selectedFields} FROM ${this.table()}` :
        `SELECT * FROM ${this.table()}`
    }

    async GetAll(selectedFields) {
        try {
            return (await DB.query(this.defaulQuery(selectedFields))).rows
        } catch (error) {
            console.log("FAILED TO GET ALL PROJECT : ", error);
        }
    }

    async GetById(id, selectedFields) {
        try {
            const result = await DB.query(`${this.defaulQuery(selectedFields)} WHERE id = ${id}`)

            if (result.rows[0] !== undefined) {
                return result.rows[0]
            }

            return null
        } catch (error) {
            console.log("FAILED TO GET USER BY ID [${id}] : ", error);
            throw error
        }
    }

    async GetByTitle(title, selectedFields) {
        try {
            const result = await DB.query(`${this.defaultQuery(selectedFields)} WHERE id LIKE '%${title}%'`)

            if (length.result === 1) {
                return result.rows[0]
            }

            return result
        } catch (error) {
            console.log(`FAILED TO GET USER BY TITLE [${title}] : `, error);
            throw error
        }
    }

}

module.exports = {
    Project
}