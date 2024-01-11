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
        try {
            return (await DB.query(this.defaultQuery(selectedFields))).rows
        } catch (error) {
            console.log("FAILED TO GET ALL TECHNOLOGY")
            throw error
        }
    }

}

module.exports = {
    TechnologyRepository
}