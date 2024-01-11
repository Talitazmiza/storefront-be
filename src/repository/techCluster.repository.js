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

    async GetAll(selectedFields) {
        try {
            return (await DB.query(this.defaulQuery(selectedFields))).rows
        } catch (error) {
            console.log("FAILED TO GET ALL CLUSTER : ", error);
            throw error
        }
    }

    // async GetById(id, selectedFields) {
    //     try {
    //         const result = await DB.query(`${this.defaulQuery(selectedFields)} WHERE id = ${id}`)
        
    //         if (result.rows[0] !== undefined) {
    //             return result.rows[0]
    //         }

    //         return null
    //     } catch (error) {
    //         console.log(`FAILED TO GET CLUSTER BY ID`)
    //     }
    // }

}

module.exports = { 
    TechCluster 
}