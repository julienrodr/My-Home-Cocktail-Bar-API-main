const Reward = require('./reward');

const db = require('../database');

const rewardMapper = {

    // get all reward
    getAllRewards: async () => {
        const result = await db.query(`SELECT * FROM "reward";`);
        return result.rows.map(data => new Reward(data));
    },

    // get one reward
    getOneReward: async (id) => {
        const query = `SELECT * FROM "reward" WHERE id=$1;`
        const result = await db.query(query, [id]);

        if (!result.rows[0]) {
            throw new Error("not reward with this id");
        } else {
           return new Reward(result.rows[0]);
        }
    },

    // save new reward
    saveNewReward: async (newReward) => {
        let query =  `INSERT INTO "reward"("name", "describe") VALUES ($1, $2) RETURNING id;`;

        const data = [
          newReward.name,
          newReward.describe,
        ];

        try {
            const { rows } = await db.query(query, data);
            newReward.id = rows[0].id;
        } catch (err) {
            console.trace(err)
        }
    },

    //update reward
    updateReward: async (updateReward) => {
        const query = `UPDATE "reward" SET "name"=$1, "describe"=$2, "user_id"=$3 WHERE id = $4;`;

        const data = [
            updateReward.name,
            updateReward.describe,
        ];

        try {
            await db.query(query, data);
        } catch (err) {
            console.trace(err);
        }
    },

    //delete reward
    deleteReward: async (id) => {
        const result = await rewardMapper.getOneReward(id);

        if (result){
            const query = `DELETE FROM "reward" WHERE id=$1 RETURNING *;`;

            await db.query(query, [id]);

            return `The reward of ${result.name} was deleted`;

        } else {
            throw new Error("not reward with this id");
        }
    }
};

module.exports = rewardMapper;
