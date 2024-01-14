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

    searchByFieldQuery(selectedField, selectedValue, selectedFields) {
        return (selectedField !== undefined && selectedValue !== undefined) ?
            `SELECT ${selectedFields} FROM ${this.table()} WHERE ${selectedField} = '${selectedValue}'` :
            `SELECT ${selectedFields} FROM ${this.table()} LIMIT 1`
    }

    deleteQuery(id) {
        return `DELETE FROM ${this.table()} where id = ${id} `; 
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

    async DeleteLecturer(id) {
        try {
            var existingData = await DB.query(this.searchByFieldQuery("id", id, "id, name")); //buat cek apakah data cluster dg id yg dimaksud ada/enggak
            if(existingData.rowCount>0){ //mastiin kalo datanya ada kalo gada nanti takutnya eror
                await DB.query(this.deleteQuery(id))
                return existingData.rows[0];
            } else {
                return null; //kalo gada berarti gagal update data not found
            }
        } catch (error) {
            console.log("FAILED TO DELETE LECTURER : ", error);
            throw error
        }
    }
}
    
module.exports = {
    Lecturer
}