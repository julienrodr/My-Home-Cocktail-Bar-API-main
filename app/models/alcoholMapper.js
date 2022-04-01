const db = require('../database');

const Alcohol = require('./alcohol');

const alcoholMapper = {

    // Get all Alcohol
    getAllAlcohols: async () => {
        const result = await db.query(`SELECT * FROM "alcohol";`);
        return result.rows.map(data => new Alcohol(data));
    },

    // Get one Alcohol
    getOneAlcohol: async (id) => {

        const query = `SELECT * FROM "alcohol" WHERE id=$1;`;

        const result = await db.query(query, [id]);

        if (!result.rows[0]){
            throw new Error("not alcohol with this id");
        } else {
            return new Alcohol(result.rows[0]);
        }
    },

    // Save new alcohol
    saveNewAlcohol: async (newAlcohol) => {
        let query = `INSERT INTO alcohol ("name", "describe", "localisation", "category", "nose", "brand") VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`

        const data = [
            newAlcohol.name,
            newAlcohol.describe,
            newAlcohol.localisation,
            newAlcohol.category,
            newAlcohol.nose,
            newAlcohol.brand,
        ];

        try {
            const { rows } = await db.query(query, data);

            newAlcohol.id = rows[0].id;
        } catch (err) {
            console.trace(err)
        }
    },

    // update Alcohol
    updateAlcohol: async (updateAlcohol) => {
        const query = `UPDATE "alcohol" SET "name"=$1, "describe"=$2, "localisation"=$3, "category"=$4, "nose"=$5, "brand"=$6  WHERE id = $7;`;

            const data = [
                updateAlcohol.name,
                updateAlcohol.describe,
                updateAlcohol.localisation,
                updateAlcohol.category,
                updateAlcohol.nose,
                updateAlcohol.brand
            ];

        try {
            await db.query(query, data);
        } catch (err) {
            console.trace(err);
        }
    },

    // delete alcohol
    deleteAlcohol: async (id) => {
        const result = await alcoholMapper.getOneAlcohol(id);

        if (result){
            const query = `DELETE FROM "alcohol" WHERE id=$1 RETURNING *;`;

            await db.query(query, [id]);

            return `The alcohol of ${result.name} was deleted`;

        } else {
            throw new Error("not alcohol with this id");
        }
    }
}

module.exports = alcoholMapper;
