require('dotenv').config();

const alcoholMapper = require('../models/alcoholMapper');
const Alcohol = require('../models/alcohol');

const alcoholController = {

    // getAllAlcohol controller
    getAllAlcohols: async (req, res) => {
        const alcohol = await alcoholMapper.getAllAlcohols();
        res.json(alcohol);
    },

    // getOneAlcohol controller
    getOneAlcohol: async (req, res) => {
        const { id } = req.params;

        try {
            const alcohol = await alcoholMapper.getOneAlcohol(id);
            res.json(alcohol)
        } catch (err) {
            res.status(404).json(err.message);
        }
    },

    // saveNewAlcohol controller
    saveNewAlcohol: async (req, res) => {
        try {
            const newAlcohol = new Alcohol(req.body);

            if (newAlcohol.name === null || newAlcohol.describe === null || newAlcohol.nose === null || newAlcohol.brand === null || newAlcohol.category === null || newAlcohol.localisation === null){
                return res.status(400).json({'error': 'Missing field, please fill in all fields'})
            }
            await alcoholMapper.saveNewAlcohol(newAlcohol);
            res.status(201).json(newAlcohol.id)

        } catch (err) {
            res.status(403).json(err.message);

        }
    },

    // updateNewAlcohol controller
    updateAlcohol: async (req, res) =>{
        try {
            const { id } = req.params;
            const alcoholData = req.body;
            const alcohol = await alcoholMapper.getOneAlcohol(id);

            if (alcohol) {
                for (let field in alcoholData){
                    alcohol[field] = alcoholData[field];
                }
            }
            const updateAlcohol = new Alcohol(alcohol);
            await alcoholMapper.updateAlcohol(updateAlcohol);
            res.json(updateAlcohol);
        } catch (err) {
            res.status(404).send(err.message);
        }
    },

    // deleteAlcohol controller
    deleteAlcohol: async (req, res) => {
        const { id } = req.params;

        try {
            const soft = await alcoholMapper.deleteAlcohol(id);
            res.json(soft);
        } catch (err) {
            res.status(404).json(err.message);
        }
    },
}

module.exports = alcoholController;
