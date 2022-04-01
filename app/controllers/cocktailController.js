require('dotenv').config();

const cocktailMapper = require('../models/cocktailMapper');
const Cocktail = require('../models/cocktail');

const cocktailController = {

    // getAllCocktail controller
    getAllCocktail: async (req, res) => {
      const cocktail =  await cocktailMapper.getAllCocktail();
      res.json(cocktail);
    },

    // getOneCocktail controller
    getOneCocktail: async (req, res) =>{
        const {id} = req.params;

        try {
            const cocktail = await  cocktailMapper.getOneCocktail(id);
            res.json(cocktail);
        } catch (err) {
            res.status(404).json(err.message);
        }
    },

    // saveNewCocktail controller
    saveNewCocktail: async (req, res) => {
        try {
            const newCocktail = new Cocktail(req.body);

            if (newCocktail.name === null || newCocktail.describe === null || newCocktail.recipe === null || newCocktail.category === null || newCocktail.user_id === null) {
                return res.status(400).json({'error': 'Missing field, please fill in all fields'})
            }

            await cocktailMapper.saveNewCocktail(newCocktail);

            res.status(201).json(newCocktail.id);
        } catch (err) {
            res.status(403).json(err.message);
        }
    },

    // updateCocktail controller
    updateCocktail: async (req, res) => {
        try {
            const { id } = req.params;
            const cocktailData = req.body;
            const cocktail = await cocktailMapper.getOneCocktail(id);

            if (cocktail) {
                for (let field in cocktailData){
                    cocktail[field] = cocktailData[field];
                }
            }
            const updateCocktail = new  Cocktail(cocktail);
            await cocktailMapper.updateCocktail(updateCocktail);
            res.json(updateCocktail);
        } catch (err) {
            res.status(404).send(err.message);
        }
    },

    // deleteCocktail controller
    deleteSoft: async (req, res) => {
        const { id } = req.params;

        try {
            const soft = await cocktailMapper.deleteCocktail(id);
            res.json(soft);
        } catch (err) {
            res.status(404).json(err.message);
        }
    }
}

module.exports = cocktailController;
