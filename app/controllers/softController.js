require('dotenv').config();

const softMapper = require('../models/softMapper');
const Soft = require('../models/soft');

const softControllers = {

    // getAllSofts controller
    getAllSofts: async (req, res) => {
        const softs = await softMapper.getAllSofts();
        res.json(softs);
    },

    // getOneSoft controller
    getOneSoft: async (req, res) => {

        const {id} = req.params;

        try {
            const soft = await softMapper.getOneSoft(id);
            res.json(soft);
        } catch (err){
            res.status(404).json(err.message);
        }
    },

    // saveNewSoft controller
    saveNewSoft: async (req, res) => {
        try {
            const newSoft = new Soft(req.body);

            if (newSoft.name === null || newSoft.describe === null) {
                return res.status(400).json({'error': 'Missing field, please fill in all fields'})
            }

            await softMapper.saveNewSoft(newSoft);

            res.status(201).json(newSoft.id);
        } catch (err){
            res.status(403).json(err.message);
        }
    },

    // updateSoft controller
    updateSoft: async (req, res) => {
        try {
            const { id } = req.params;
            const softData = req.body;
            const soft = await softMapper.getOneSoft(id);

            if (soft) {
                for (let field in softData){
                    soft[field] = softData[field];
                }
            }
            const updateSoft = new  Soft(soft);
            await softMapper.updateSoft(updateSoft);
            res.json(updateSoft);
        } catch (err) {
            res.status(404).send(err.message);
        }
    },

    // deleteSoft controller
    deleteSoft: async (req, res) => {
        const { id } = req.params;

        try {
            const soft = await softMapper.deleteSoft(id);
            res.json(soft);
        } catch (err) {
            res.status(404).json(err.message);
        }
    },
}

module.exports = softControllers;
