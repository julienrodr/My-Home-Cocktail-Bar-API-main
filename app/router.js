const { Router } = require('express');

const router = Router();

// Import service
const { validateBody } = require('./services/validator');

// Import Controllers
const userController = require('./controllers/userController');
const rewardController = require('./controllers/rewardController');
const softController = require('./controllers/softController');
const garnishController = require('./controllers/garnishController');
const alcoholController = require('./controllers/alcoholController');
const cocktailController  = require('./controllers/cocktailController');


// Import schemas
const { userSchema, postUserSchema } = require('./shemas/user');
const { softSchema, postSoftSchema } = require('./shemas/soft');
const { rewardSchema, postRewardSchema  } = require('./shemas/reward');
const { garnishSchema, postGarnishSchema } = require('./shemas/garnish');
const { alcoholSchema, postAlcoholSchema } = require('./shemas/alcohol');
const { cocktailSchema, postCocktailSchema } = require('./shemas/cocktail');

// v1
// Users CRUD

router.get('/users', userController.getAllUsers);

router.get('/user/:id(\\d+)', userController.getOneUser);

router.post('/user/register', validateBody(postUserSchema), userController.saveNewUser);

router.patch('/user/:id(\\d+)', validateBody(userSchema), userController.updateUser);

router.delete('/user/:id(\\d+)', userController.deleteUser);

router.post('/user/login', userController.userLogin);

router.get('/user/logout', userController.logout);

// Reward CRUD

router.get('/rewards', rewardController.getAllRewards);

router.get('/reward/:id(\\d+)', rewardController.getOneReward);

router.post('/reward/register', validateBody(postRewardSchema), rewardController.saveNewReward);

router.patch('/reward/:id(\\d+)', validateBody(rewardSchema), rewardController.updateReward);

router.delete('/reward/:id(\\d+)', alcoholController.deleteAlcohol);

// Soft CRUD

router.get('/softs', softController.getAllSofts);

router.get('/soft/:id(\\d+)', softController.getOneSoft);

router.post('/soft/register', validateBody(postSoftSchema), softController.saveNewSoft);

router.patch('/soft/:id(\\d+)', validateBody(softSchema), softController.updateSoft);

router.delete('/soft/:id(\\d+)', softController.deleteSoft);

// Garnish CRUD

router.get('/garnish', garnishController.getAllGarnish);

router.get('/garnish/:id(\\d+)', garnishController.getOneGarnish);

router.post('/garnish/register', validateBody(postGarnishSchema), garnishController.saveNewGarnish);

router.patch('/garnish/:id(\\d+)', validateBody(garnishSchema), garnishController.updateGarnish);

router.delete('/garnish/:id(\\d+)', garnishController.deleteGarnish);

// Alcohol CRUD

router.get('/alcohols', alcoholController.getAllAlcohols);

router.get('/alcohol/:id(\\d+)', alcoholController.getOneAlcohol);

router.post('/alcohol/register', validateBody(postAlcoholSchema), alcoholController.saveNewAlcohol);

router.patch('/alcohol/:id(\\d+)', validateBody(alcoholSchema), alcoholController.updateAlcohol);

router.delete('/alcohol/:id(\\d+)', alcoholController.deleteAlcohol);

// Cocktail CRUD

router.get('/cocktails', cocktailController.getAllCocktail);

router.get('/cocktail/:id(\\d+)', cocktailController.getOneCocktail);

router.post('/cocktail/register',validateBody(postCocktailSchema), cocktailController.saveNewCocktail);

router.patch('/cocktail/:id(\\d+)', validateBody(cocktailSchema), cocktailController.updateCocktail);

router.delete('/cocktail/:id(\\d+)', cocktailController.deleteSoft);




module.exports = router;
