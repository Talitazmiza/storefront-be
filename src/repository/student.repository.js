const { DB } = require('./../database/config');

class Student {
    table() {
        return "students"
    }

    defaultQuery(selectedFields) {
        // console.log("SELECTED FIELDS : ", selectedFields);

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

    deleteQuery(id) {
        return `DELETE FROM ${this.table()} where id = ${id} `; 
    }

    async GetAll(selectedFields) {
        // try {
        //     return (await DB.query(this.defaultQuery(selectedFields))).rows
        // } catch (error) {
        //     console.log("FAILED TO GET ALL STUDENTS : ", error);
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
        // try {
        //     const result = await DB.query(`${this.defaultQuery(selectedFields)} WHERE id = ${id}`)
        //
        //     if (result.rows[0] !== undefined) {
        //         return result.rows[0]
        //     }
        //
        //     return null
        // } catch (error) {
        //     console.log(`FAILED TO GET STUDENT BY ID [${id}] : `, error);
        //     throw error
        // }
        return new Promise((resolve, reject) => {
            DB.query(`${this.defaultQuery(selectedFields)} WHERE id = ${id}`, [], function (err, results) {
                if (err) {
                    return reject(err)
                }
                console.log(results);
                return resolve(results);
            })
        })
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

    async generateStoreQuery(student) {
        const fields = 'user_id, fullName, nrp, bio, gender, photo, created_at, updated_at'
        const values = `${student.user_id}, '', '', '', '', '', NOW(), NOW()`
        return`INSERT INTO ${this.table()} (${fields}) VALUES (${values}) RETURNING *`
    }

    async DeleteStudent(id) {
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
    Student
}
