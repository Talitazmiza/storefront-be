const { DB } = require('./../database/config')

class Lecturer{
    table() {
        return "lecturers"
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
            console.log("FAILED TO GET ALL LECTURER : ", error);
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
            console.log(`FAILED TO GET LECTURER BY ID [${id}] : `, error);
            throw error
        }
    }

    async GetByName(name, selectedFields) {
        try {
            const result = await DB.query(`${this.defaultQuery(selectedFields)} WHEHE nip LIKE '%${name}%'`)
        
        if (length.result === 1) {
            return result.rows[0]
        }

        return result
        } catch {
            console.log(`FAILED TO GET LECTURER BY NAME [${name}] :`, error)
            throw error
        }
    }
}
    
module.exports = {
    Lecturer
}