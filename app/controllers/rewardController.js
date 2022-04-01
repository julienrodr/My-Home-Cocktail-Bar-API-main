require('dotenv').config();

const RewardController = require('../models/reward');
const rewardMapper = require('../models/rewardMapper');

const rewardControllers = {

    // getAllReward controller
    getAllRewards: async (req, res) => {
        const rewards = await rewardMapper.getAllRewards();
        res.json(rewards);
    },

    // getOneReward controller
    getOneReward: async (req, res) => {

        const {id} = req.params;

        try {
            const reward = await rewardMapper.getOneReward(id);
            res.json(reward);
        } catch (err) {
            res.status(404).json(err.message);
        }
    },

    // saveNewReward controller
    saveNewReward: async (req, res) => {
      try {
          const newReward = new RewardController(req.body);

          if (newReward.name === null || newReward.describe === null) {
              return res.status(400).json({'error': 'Missing field, please fill in all fields'});
          }

          await rewardMapper.saveNewReward(newReward);
          res.status(201).json(newReward.id);

      }  catch (err) {
          res.status(403).json(err.message);
      }
    },

    // updateReward controller
    updateReward: async (req, res) => {
        try {
            const {id} = req.params;
            const rewardData = req.body;
            const reward = await rewardMapper.getOneReward(id);

            if (reward) {
                for (let field in rewardData){
                    reward[field] = rewardData[field];
                }
            }

            const updateReward = new RewardController(reward);
            await rewardMapper.updateReward(updateReward);
            res.json(updateReward);
        } catch (err) {
            res.status(404).send(err.message);
        }
    },

    // deleteReward controller
    deleteReward: async  (req, res) => {
        const { id } = req.params;

        try {
            const reward = await rewardMapper.deleteReward(id);
            res.json(reward);
        } catch (err) {
            res.status(404).json(err.message);
        }
    },
};

module.exports = rewardControllers
