const Soft = require('./soft');

const db = require('../database');

const softMapper = {

    // Get all soft
    getAllSofts: async () => {
        const result = await db.query(`SELECT * FROM "soft";`);
        return result.rows.map(data => new Soft(data));
    },

    // Get one soft
    getOneSoft: async (id) => {

        const query = `SELECT * FROM "soft" WHERE id=$1;`;

        const result = await db.query(query, [id]);

        if (!result.rows[0]){
            throw new Error("not soft with this id");
        } else {
            return new Soft(result.rows[0]);
        }
    },

    // save new soft
    saveNewSoft: async (newSoft) => {

        let query =  `INSERT INTO "soft"("name", "describe") VALUES ($1, $2) RETURNING id;`;

        const data = [
            newSoft.name,
            newSoft.describe,
        ];

        try {
            const { rows } = await db.query(query, data);

            newSoft.id = rows[0].id;
        } catch (err){
            console.trace(err)
        }
    },

    // update soft
    updateSoft: async (newSoft) =>{
        const query = `UPDATE "soft" SET "name"=$1, "describe"=$2 WHERE id = $3;`;

        const data = [
            newSoft.name,
            newSoft.describe,
        ];

        try {
            await db.query(query, data);
        } catch (err) {
            console.trace(err);
        }
    },

    // delete soft
    deleteSoft: async (id) => {
        const result = await softMapper.getOneSoft(id);

        if (result){
            const query = `DELETE FROM "soft" WHERE id=$1 RETURNING *;`;

            await db.query(query, [id]);

            return `The soft of ${result.name} was deleted`;

        } else {
            throw new Error("not soft with this id");
        }
    }
}

module.exports = softMapper;
