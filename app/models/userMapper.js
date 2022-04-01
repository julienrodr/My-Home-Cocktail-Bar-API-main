const User = require('./user');

const db = require('../database');
const userMapper = {

    // Get all users
    getAllUsers: async  () => {

            const result = await db.query(`SELECT * FROM "user";`);
            return result.rows.map(data => new User(data));

    },

    // Get one user
    getOneUser: async (id) =>{

        const query = `SELECT * FROM "user" WHERE id=$1;`;

        const result = await db.query(query, [id]);

        if (!result.rows[0]){
            throw new Error("not user with this id");
        } else {
            return new User(result.rows[0]);
        }
    },

    // save new user
    saveNewUser: async (newUser) => {

        let query = `INSERT INTO "user"(first_name, last_name, mail, password, pseudo) VALUES ($1, $2, $3, $4, $5) RETURNING id;`

        const data = [
            newUser.first_name,
            newUser.last_name,
            newUser.mail,
            newUser.password,
            newUser.pseudo
        ];

        try {
            const { rows } = await db.query(query, data);

            newUser.id = rows[0].id;
            newUser.role = rows[0].role;
        } catch (err){
            console.trace(err)
        }
    },

    // update user
    updateUser: async (newUser) => {

        const query = `UPDATE "user" SET first_name=$1, last_name=$2, mail=$3, password=$4, pseudo=$5, "role"=$6 WHERE id = $7;`;

        const data = [
            newUser.first_name,
            newUser.last_name,
            newUser.mail,
            newUser.password,
            newUser.pseudo,
            newUser.role,
            newUser.id
        ];

        try {

            await db.query(query, data);

        } catch (err){

            console.trace(err);
        }
    },

    // delete user
    deleteUser: async (id) =>{

        const result = await userMapper.getOneUser(id);

        if (result){
            const query = `DELETE FROM "user" WHERE id=$1 RETURNING *;`

            await db.query(query, [id]);

            return `The account of ${result.mail} was deleted`
        } else {
            throw new Error("not user with this id");
        }
    },

    // login user
    login : async (mail) => {

        const query = `SELECT * FROM "user" WHERE mail = $1;`

        const result = await db.query(query, [mail]);

        if (!result.rows) {
            throw new Error('no user with this email ' + mail);
        } else {
            return result.rows[0];
        };
    }
};

module.exports = userMapper;
