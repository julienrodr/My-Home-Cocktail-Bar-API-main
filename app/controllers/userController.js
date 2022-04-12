require('dotenv').config();

const userMapper = require('../models/userMapper');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');

const userControllers = {

    // getAllUsers controller
    getAllUsers: async (req, res) =>{
            const users = await userMapper.getAllUsers();
            res.json(users);
    },

    // getOneUser controller
    getOneUser: async (req, res) =>{

        const  {id} = req.params;

        try {

            const user = await userMapper.getOneUser(id);
            res.json(user);

        } catch (err){

            res.status(404).json(err.message);

        }
    },

    // saveNewUser controller
    saveNewUser: async (req, res) =>{

        try {
            const newUser = new User(req.body);

            if (newUser.mail === null || newUser.password === null || newUser.first_name === null || newUser.Last_name === null || newUser.pseudo === null) {
                return res.status(400).json({'error': 'Missing field, please fill in all fields'})
            }

            newUser.password = await bcrypt.hash(req.body.password, 10);

            await userMapper.saveNewUser(newUser);

            res.status(201).json(newUser);

        } catch (err) {
            res.status(403).json(err.message);
        }
    },

    // updateUser controller
    updateUser: async (req, res) => {

        try {
            const { id } = req.params;
            const userData = req.body;
            const user = await userMapper.getOneUser(id);

            if (user) {
                for (let field in userData){
                    if (typeof user[field] !== 'undefined'){
                        user[field] = userData[field];
                    }
                }
            }
            const updatedUser = new User(user);
            await userMapper.updateUser(updatedUser);
            res.json(updatedUser);
        } catch (err) {
            res.status(404).send(err.message);
        }
},

    // delete controller
    deleteUser: async (req, res) => {
        const { id } = req.params;

        try {
            const user = await userMapper.deleteUser(id);
            res.json(user);
        } catch (err) {
            res.status(404).json(err.message);
        }
    },

    // login controller
    userLogin: async (req, res) => {
        const user = {
            mail : req.body.mail,
            password : req.body.password,
        };

        if (user.mail === undefined || user.password === undefined){
            if (!user.mail){
                return res.status(400).send({'error' : 'missing mail'});
            } else {
                return res.status(400).send({'error' : 'password mail'});
            }
        }

        try {
            const userToLog = await userMapper.login(user.mail);

            if (userToLog === undefined) {
                await res.status(400).json('This user does not exist');
            }

            const check = await bcrypt.compare(user.password, userToLog.password);

            if (check){
                userToLog.isAdmin = userToLog.role === 'admin';

                const token = await jwt.generateConnectionToken(userToLog, userToLog.isAdmin);
                res.status(200).json({
                    id : userToLog.id,
                    first_name : userToLog.first_name,
                    pseudo : userToLog.pseudo,
                    admin : userToLog.isAdmin,
                    token : token,
                });
            } else {
                res.status(400).json('Wrong password');
            }
        } catch (err) {
            res.status(400).send(err);
        }
    },

    // logout controller
    logout : (req, res ) => {

        res.status(200).json({
            id: '',
            first_name : '',
            pseudo : '',
            admin : '',
            token : '',
        });
    }
};

module.exports = userControllers;
