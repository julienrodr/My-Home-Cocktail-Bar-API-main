require('dotenv').config();

const garnishMapper = require('../models/garnishMapper');
const Garnish = require('../models/garnish');

const garnishController = {

    // getAllGarnish controller
    getAllGarnish: async (req, res) => {
        const garnish = await garnishMapper.getAllGarnish();
        res.json(garnish);
    },

    // getOneGarnish controller
    getOneGarnish: async (req, res)  => {
        const {id} = req.params;

        try {
            const garnish = await garnishMapper.getOneGarnish(id);
            res.json(garnish);
        } catch (err) {
            res.status(404).json(err.message);
        }
    },

    // saveNewGarnish controller
    saveNewGarnish: async (req, res) => {
        try {
            const newGarnish = new Garnish(req.body);

            if(newGarnish.name === null || newGarnish.describe === null || newGarnish.category === null) {
                return res.status(400).json({'error': 'Missing field, please fill in all fields'})
            }
            await garnishMapper.saveNewGarnish(newGarnish);
            res.status(201).json(newGarnish.id);
        } catch (err) {
            res.status(403).json(err.message);
        }
    },

    // updateGarnish controller
    updateGarnish: async (req, res) => {
        try {
            const { id } = req.params;
            const garnishData = req.body;
            const garnish = await garnishMapper.getOneGarnish(id);

            if (garnish) {
                for (let field in garnishData) {
                    garnish[field] = garnishData[field];
                }
            }
            const updateGarnish = new Garnish(garnish);
            await garnishMapper.updateGarnish(updateGarnish);
            res.json(updateGarnish);
        } catch (err) {
            res.status(404).send(err.message);
        }
    },

    // deleteGarnish controller
    deleteGarnish: async (req ,res) => {
        const { id } = req.params;

        try {
            const garnish = await garnishMapper.deleteGarnish(id);
            res.json(garnish);
        } catch (err) {
            res.status(404).json(err.message);
        }
    }
}

module.exports = garnishController;
