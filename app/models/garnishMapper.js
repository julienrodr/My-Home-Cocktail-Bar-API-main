const db = require('../database');

const Garnish = require('./garnish');

const garnishMapper = {

    // Get all garnish
    getAllGarnish: async () => {
        const result = await db.query(`SELECT * FROM "garnish";`);
        return result.rows.map(data => new Garnish(data));
    },

    // Get one garnish
    getOneGarnish: async (id) =>{
        const query = `SELECT * FROM "garnish" WHERE id=$1;`;

        const result = await db.query(query, [id]);

        if (!result.rows[0]){
            throw new Error("not garnish with this id");
        } else {
            return new Garnish(result.rows[0]);
        }
    },

    // Save New garnish
    saveNewGarnish: async (newGarnish) => {
        let query =  `INSERT INTO "garnish"("name", "describe", "category") VALUES ($1, $2, $3) RETURNING id;`;

        const data = [
            newGarnish.name,
            newGarnish.describe,
            newGarnish.category,
        ];

        try {
            const { rows } = await db.query(query, data);

            newGarnish.id = rows[0].id;
        } catch (err) {
            console.trace(err)
        }
    },

    // update Garnish
    updateGarnish: async (newGarnish) => {
        const query = `UPDATE "garnish" SET "name"=$1, "describe"=$2, "category"=$3 WHERE id = $4;`;

        const data = [
            newGarnish.name,
            newGarnish.describe,
            newGarnish.category,
        ];

        try {
            await db.query(query, data);
        } catch (err) {
            console.trace(err);
        }

    },

    // delete Garnish
    deleteGarnish: async (id) => {
        const result = await garnishMapper.getOneGarnish(id);

        if (result){
            const query = `DELETE FROM "garnish" WHERE id=$1 RETURNING *;`;

            await db.query(query, [id]);

            return `The garnish of ${result.name} was deleted`;

        } else {
            throw new Error("not garnish with this id");
        }
    }
}

module.exports = garnishMapper;
