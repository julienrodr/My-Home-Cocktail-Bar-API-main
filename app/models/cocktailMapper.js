const Cocktail = require('./cocktail');

const db = require('../database');

const cocktailMapper = {

    // Get all cocktail
    getAllCocktail: async () => {
        const result = await db.query(`SELECT * FROM "cocktail";`);
        return result.rows.map(data => new Cocktail(data));
    },

    // Get One cocktail
    getOneCocktail: async (id) => {
        const query = `SELECT * FROM "cocktail" WHERE id=$1;`;

        const result = await db.query(query, [id]);

        if (!result.rows[0]){
            throw new Error("not cocktail with this id");
        } else {
            return new Cocktail(result.rows[0]);
        }
    },

    // save new cocktail
    saveNewCocktail: async (newCocktail) => {
        let query =  `INSERT INTO "cocktail"("name", "describe", "recipe", "category", "user_id") VALUES ($1, $2, $3, $4, $5) RETURNING id;`;

        const data = [
            newCocktail.name,
            newCocktail.describe,
            newCocktail.recipe,
            newCocktail.category,
            newCocktail.user_id
        ];

        try {
            const { rows } = await db.query(query, data);

            newCocktail.id = rows[0].id;
        } catch (err){
            console.trace(err)
        }
    },

    // update cocktail
    updateCocktail: async (updateCocktail) => {
        const query = `UPDATE "cocktail" SET "name"=$1, "describe"=$2, "recipe"=$3, "category"=$4, "user_id"=$5 WHERE id = $6;`;

        const data = [
            updateCocktail.name,
            updateCocktail.describe,
            updateCocktail.recipe,
            updateCocktail.category,
            updateCocktail.user_id
        ];

        try {
            await db.query(query, data);
        } catch (err) {
            console.trace(err);
        }
    },

    // delete cocktail
    deleteCocktail: async (id) => {
        const result = await cocktailMapper.getOneCocktail(id);

        if (result){
            const query = `DELETE FROM "cocktail" WHERE id=$1 RETURNING *;`;

            await db.query(query, [id]);

            return `The cocktail of ${result.name} was deleted`;

        } else {
            throw new Error("not cocktail with this id");
        }
    }


}

module.exports = cocktailMapper;
