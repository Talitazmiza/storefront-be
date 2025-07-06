const { DB } = require('./../database/config')
const {ResponseHandlerFromService, CatchResponse} = require("../helpers/hapiResponse");

class Project{
    table() {
        return "projects"
    }

    defaultQuery(selectedFields) {
        return (selectedFields !== undefined) ?
        `SELECT ${selectedFields} FROM ${this.table()}` :
        `SELECT * FROM ${this.table()}`
    }

    async GetAll(query, selectedFields) {
        var titleQuery = query.title!=undefined ? `%${query.title}%` : '';
        var abstractQuery = query.abstract!=undefined ? `%${query.abstract}%` : '';
        return new Promise((resolve, reject) => {
            DB.query(`${this.defaultQuery(selectedFields)} WHERE title LIKE '${titleQuery}' OR abstract LIKE '${abstractQuery}'`, [], function (err, results) {
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
        //     const result = await DB.query(`${this.defaulQuery(selectedFields)} WHERE id = ${id}`)
        //
        //     if (result.rows[0] !== undefined) {
        //         return result.rows[0]
        //     }
        //
        //     return null
        // } catch (error) {
        //     console.log("FAILED TO GET USER BY ID [${id}] : ", error);
        //     throw error
        // }
        return new Promise((resolve, reject) => {
            DB.query(`${this.defaultQuery(selectedFields)} WHERE id = ${id}`, [], function (err, results) {
                if (err) {
                    return reject(err)
                }
                console.log(results);
                return resolve((results[0] !== undefined) ? results[0] : null)
            })
        })
    }

    async GetByTitle(title, selectedFields) {
        // try {
        //     const result = await DB.query(`${this.defaultQuery(selectedFields)} WHERE id LIKE '%${title}%'`)
        //
        //     if (length.result === 1) {
        //         return result.rows[0]
        //     }
        //
        //     return result
        // } catch (error) {
        //     console.log(`FAILED TO GET USER BY TITLE [${title}] : `, error);
        //     throw error
        // }
        return new Promise((resolve, reject) => {
            DB.query(`${this.defaultQuery(selectedFields)} WHERE title LIKE '%${title}%'`, [], function (err, results) {
                if (err) {
                    return reject(err)
                }
                console.log(results);
                return resolve(results);
            })
        })
    }

    fixNotSyncedId(){
        return `SELECT setval('${this.table()}_id_seq', COALESCE((SELECT MAX(id)+1 FROM ${this.table()}), 1), false)`;
    }

    searchByFieldQuery(selectedField, selectedValue, selectedFields) {
        return (selectedField !== undefined && selectedValue !== undefined) ?
            `SELECT ${selectedFields} FROM ${this.table()} WHERE ${selectedField} = '${selectedValue}'` :
            `SELECT ${selectedFields} FROM ${this.table()} LIMIT 1`
    }

    async DeleteProject(id) {
        try {
            var existingData = await DB.query(this.searchByFieldQuery("id", id, "id, full_name")); //buat cek apakah data cluster dg id yg dimaksud ada/enggak
            if(existingData.rowCount>0){ //mastiin kalo datanya ada kalo gada nanti takutnya eror
                await DB.query(this.deleteQuery(id))
                return existingData.rows[0];
            } else {
                return null; //kalo gada berarti gagal update data not found
            }
        } catch (error) {
            console.log("FAILED TO DELETE STUDENT : ", error);
            throw error
        }
    }

}

module.exports = {
    Project
}