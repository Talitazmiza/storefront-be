const { DB } = require('./../database/config');

class TechCluster {
    table() {
        return "technology_clusters"
    }

    defaulQuery(selectedFields) {
        return (selectedFields !== undefined) ?
            `SELECT ${selectedFields} FROM ${this.table()}` :
            `SELECT * FROM ${this.table()}`
    }

    fixNotSyncedId(){
        return `SELECT setval('${this.table()}_id_seq', COALESCE((SELECT MAX(id)+1 FROM ${this.table()}), 1), false)`; 
        //function ini buat sinkronisasi id di db soalnya kadang sinkron takutnya ada duplicate id gitu, wajib dirun sebelum create data
    }

    searchByFieldQuery(selectedField, selectedValue, selectedFields) {
        return (selectedField !== undefined && selectedValue !== undefined) ?
            `SELECT ${selectedFields} FROM ${this.table()} WHERE ${selectedField} = '${selectedValue}'` :
            `SELECT ${selectedFields} FROM ${this.table()} LIMIT 1`
    }

    storeQuery() {
        return `INSERT INTO ${this.table()} (name, "createdAt", "updatedAt") VALUES ($1, to_timestamp($2), to_timestamp($3)) RETURNING id, name`; //notes kalo ada kolom camelCase harus diapit tanda "" yaa
    }

    updateQuery(id, clusterObject) {
        return `UPDATE ${this.table()} set name = '${clusterObject.name}', "updatedAt" = to_timestamp(${clusterObject.updatedAt}) where id = ${id}`; //notes kalo ada kolom camelCase harus diapit tanda "" yaa
    }

    deleteQuery(id) {
        return `DELETE FROM ${this.table()} where id = ${id} `; 
    }

    async GetAll(selectedFields) {
        try {
            return (await DB.query(this.defaulQuery(selectedFields))).rows
        } catch (error) {
            console.log("FAILED TO GET ALL CLUSTER : ", error);
            throw error
        }
    }

    async StoreCluster(clusterData) {
        try {
            const {
                name,
            } = clusterData; //ambil data name dari payload/request body
            // const {
            //     name,
            //     email,
            //     password
            // } = studentData;  //kalo di student bisa pakek kayak gini
            var existingData = await DB.query(this.searchByFieldQuery("name", name, "id")); //buat cek apakah data cluster dg nama yg dimaksud uda ada/belum
            var currTime = Date.now()/1000.0; //ini buat generate timestamp buat createdAt sama updatedAt
            if(existingData.rowCount==0){ //kalo gaada datanya berarti baris datanya 0 atau kosong jadi gada data yg udah ada
                DB.query(this.fixNotSyncedId());
                return (await DB.query(this.storeQuery(), [name, currTime, currTime])) //ini buat store kolom name, createdAt sama updatedAt. id gada karna autoincrement
            } else {
                return null; //ketika data sudah ada dan menghindari data duplicate sih
            }
        } catch (error) {
            console.log("FAILED TO STORE CLUSTER : ", error);
            throw error
        }
    }

    async UpdateCluster(id, clusterData) {
        try {
            const {
                name,
            } = clusterData; //ambil data name dari payload/request body
            // const {
            //     name,
            //     email,
            //     password
            // } = studentData;  //kalo di student bisa pakek kayak gini
            var existingData = await DB.query(this.searchByFieldQuery("id", id, "id")); //buat cek apakah data cluster dg id yg dimaksud ada/enggak
            var currTime = Date.now()/1000.0; //ini buat generate timestamp buat createdAt sama updatedAt
            var clusterObject = {
                name : name,
                updatedAt : currTime
            }
            if(existingData.rowCount>0){ //mastiin kalo datanya ada kalo gada nanti takutnya eror
                await DB.query(this.updateQuery(id, clusterObject)) //buat update yg diupdate kolom yg dimaksud sama updatedAt/diupdate kapan terakhirkali
                var newExistingData = await DB.query(this.searchByFieldQuery("id", id, "id, name")); //buat cek apakah data cluster dg id yg dimaksud ada/enggak
                return newExistingData.rows[0];
            } else {
                return null; //kalo gada berarti gagal update data not found
            }
        } catch (error) {
            console.log("FAILED TO STORE CLUSTER : ", error);
            throw error
        }
    }

    async DeleteCluster(id) {
        try {
            var existingData = await DB.query(this.searchByFieldQuery("id", id, "id, name")); //buat cek apakah data cluster dg id yg dimaksud ada/enggak
            if(existingData.rowCount>0){ //mastiin kalo datanya ada kalo gada nanti takutnya eror
                await DB.query(this.deleteQuery(id))
                return existingData.rows[0];
            } else {
                return null; //kalo gada berarti gagal update data not found
            }
        } catch (error) {
            console.log("FAILED TO STORE CLUSTER : ", error);
            throw error
        }
    }


    async GetById(id, selectedFields) {
        try {
            const result = await DB.query(this.searchByFieldQuery('id', id, selectedFields))
            if (result.rows[0] !== undefined) {
                return result.rows[0]
            }

            return null
        } catch (error) {
            console.log(`FAILED TO GET CLUSTER BY ID`)
            throw error
        }
    }

}

module.exports = { 
    TechCluster 
}