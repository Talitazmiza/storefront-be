const { DB } = require('./../database/config')

class Project{
    table() {
        return "projects"
    }

    defaultQuery(selectedFields) {
        return (selectedFields !== undefined) ?
        `SELECT ${selectedFields} FROM ${this.table()}` :
        `SELECT * FROM ${this.table()}`
    }

    async GetAll(selectedFields) {
        // try {
        //     return (await DB.query(this.defaulQuery(selectedFields))).rows
        // } catch (error) {
        //     console.log("FAILED TO GET ALL PROJECT : ", error);
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

    fixNotSyncedId(){
        return `SELECT setval('${this.table()}_id_seq', COALESCE((SELECT MAX(id)+1 FROM ${this.table()}), 1), false)`;
    }

    searchByFieldQuery(selectedField, selectedValue, selectedFields) {
        return (selectedField !== undefined && selectedValue !== undefined) ?
            `SELECT ${selectedFields} FROM ${this.table()} WHERE ${selectedField} = '${selectedValue}'` :
            `SELECT ${selectedFields} FROM ${this.table()} LIMIT 1`
    }

    

}

module.exports = {
    Project
}