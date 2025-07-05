const { DB } = require('./../database/config');

class TechnologyRepository {
    table() {
        return 'technology'
    }

    defaultQuery(selectedFields) {
        return (selectedFields !== undefined) ?
        `SELECT ${selectedFields} FROM ${this.table()}` :
        `SELECT * FROM ${this.table()}`
    }

    async GetAll(selectedFields) {
        // try {
        //     return (await DB.query(this.defaultQuery(selectedFields))).rows
        // } catch (error) {
        //     console.log("FAILED TO GET ALL TECHNOLOGY")
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

    fixNotSyncedId(){
        return `SELECT setval('${this.table()}_id_seq', COALESCE((SELECT MAX(id)+1 FROM ${this.table()}), 1), false)`;
    }

    searchByFieldQuery(selectedField, selectedValue, selectedFields) {
        return (selectedField !== undefined && selectedValue !== undefined) ?
            `SELECT ${selectedFields} FROM ${this.table()} WHERE ${selectedField} = '${selectedValue}'` :
            `SELECT ${selectedFields} FROM ${this.table()} LIMIT 1`
    }

    storeQuery() {
        return `INSERT INTO ${this.table()} (cluster_id, name, code, "createdAt", "updatedAt") VALUES ($1, $2, $3, to_timestamp($4), to_timestamp($5)) RETURNING id, cluster_id, name, code`; //notes kalo ada kolom camelCase harus diapit tanda "" yaa
    }

    async StoreTechnology(techData) {
        try {
            const {
                cluster_id,
                name,
                code,
            } = techData; //ambil data name dari payload/request body
            // const {
            //     name,
            //     email,
            //     password
            // } = studentData;  //kalo di student bisa pakek kayak gini
            var existingData = await DB.query(this.searchByFieldQuery("name", name, "id")); //buat cek apakah data cluster dg nama yg dimaksud uda ada/belum
            var currTime = Date.now()/1000.0; //ini buat generate timestamp buat createdAt sama updatedAt
            if(existingData.rowCount==0){ //kalo gaada datanya berarti baris datanya 0 atau kosong jadi gada data yg udah ada
                DB.query(this.fixNotSyncedId());
                return (await DB.query(this.storeQuery(), [cluster_id, name, code, currTime, currTime])) //ini buat store kolom name, createdAt sama updatedAt. id gada karna autoincrement
            } else {
                return null; //ketika data sudah ada dan menghindari data duplicate sih
            }
        } catch (error) {
            console.log("FAILED TO STORE TECHNOLOGY : ", error);
            throw error
        }
    }

    updateQuery(id, technologyObject) {
        return `UPDATE ${this.table()} set name = '${technologyObject.name}', "updatedAt" = to_timestamp(${technologyObject.updatedAt}) where id = ${id}`; //notes kalo ada kolom camelCase harus diapit tanda "" yaa
    }

    async UpdateTechnology(id, techData) {
        try {
            const {
                name,
            } = techData; //ambil data name dari payload/request body
            // const {
            //     name,
            //     email,
            //     password
            // } = studentData;  //kalo di student bisa pakek kayak gini
            var existingData = await DB.query(this.searchByFieldQuery("id", id, "id")); //buat cek apakah data cluster dg id yg dimaksud ada/enggak
            var currTime = Date.now()/1000.0; //ini buat generate timestamp buat createdAt sama updatedAt
            var technologyObject = {
                name : name,
                updatedAt : currTime
            }
            if(existingData.rowCount>0){ //mastiin kalo datanya ada kalo gada nanti takutnya eror
                await DB.query(this.updateQuery(id, technologyObject)) //buat update yg diupdate kolom yg dimaksud sama updatedAt/diupdate kapan terakhirkali
                var newExistingData = await DB.query(this.searchByFieldQuery("id", id, "id, name")); //buat cek apakah data cluster dg id yg dimaksud ada/enggak
                return newExistingData.rows[0];
            } else {
                return null; //kalo gada berarti gagal update data not found
            }
        } catch (error) {
            console.log("FAILED TO UPDATE TECHNOLOGY : ", error);
            throw error
        }
    }

    deleteQuery(id) {
        return `DELETE FROM ${this.table()} where id = ${id} `; 
    }

    async DeleteTechnology(id) {
        try {
            var existingData = await DB.query(this.searchByFieldQuery("id", id, "id, name")); //buat cek apakah data cluster dg id yg dimaksud ada/enggak
            if(existingData.rowCount>0){ //mastiin kalo datanya ada kalo gada nanti takutnya eror
                await DB.query(this.deleteQuery(id))
                return existingData.rows[0];
            } else {
                return null; //kalo gada berarti gagal update data not found
            }
        } catch (error) {
            console.log("FAILED TO DELETE TECHNOLOGY : ", error);
            throw error
        }
    }



}

module.exports = {
    TechnologyRepository
}