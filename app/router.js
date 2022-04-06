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

/**
 * Récupére tout les users dans la bdd
 * @route GET /users
 * @group Users - Présentation des users
 * @returns {object} qui contient : id, first_name, last_name, mail, password 'Crypté',pseudo ,role
 */
router.get('/users', userController.getAllUsers);

/**
 * Récupére le user présent a l'id mentionné dans la bdd
 * @route GET /user/{id}
 * @group Users - Présentation des users
 * @param {number} id.path - id user
 * @returns {object} qui contient : id, first_name, last_name, mail, password 'Crypté',pseudo ,role
 */
router.get('/user/:id(\\d+)', userController.getOneUser);

/**
 * Ajoute un nouveaux user
 * @route POST /user/register
 * @group Users - Présentation des users
 * @param {postUserSchema.model} user.body.required  {"first_name" : "test","last_name" : "test","mail": "test@gmail.com","password": "test","pseudo" : "test"}
 * @produces application/json application/xml
 * @consumes application/json application/xml
 */
router.post('/user/register', validateBody(postUserSchema), userController.saveNewUser);

/**
 * Modifie un user dans la bdd avec les infomation fournie dans le body
 * @route PATCH /user/{id}
 * @group Users - Présentation des users
 * @param {number} id.path - id user
 * @param {userSchema.model} user.body.required - {"first_name" : "","last_name" : "","mail": "","password": "","pseudo" : ""}
 * @produces application/json application/xml
 * @consumes application/json application/xml
 */
router.patch('/user/:id(\\d+)', validateBody(userSchema), userController.updateUser);

/**
 * Suprime le user présent a l'id mentioné dans la bdd
 * @route DELETE /user/{id}
 * @group Users - Présentation des users
 * @param {number} id.path - L'id du user
 * @returns 200 - user suprimé de la bdd
 */
router.delete('/user/:id(\\d+)', userController.deleteUser);

/**
 * Route pour ce conecté
 * @route POST /user/login
 * @group Users - Présentation des users
 * @param {User.model} user.body.required - {"mail": "","password": ""}
 * @returns {object} 201 - le user et connecter
 */
router.post('/user/login', userController.userLogin);

/**
 * Route pour ce conecté
 * @route GET /user/logout
 * @group Users - Présentation des users
 * @returns {object} 201 - le user et déconnecter
 */
router.get('/user/logout', userController.logout);

// Reward CRUD

/**
 * Récupére toutes les rewards dans la bdd
 * @route GET /rewards
 * @group Rewards - Présentation des reward
 * @returns {object} qui contient : id, name, describe
 */
router.get('/rewards', rewardController.getAllRewards);

/**
 * Récupére le user présent a l'id mentionné dans la bdd
 * @route GET /reward/{id}
 * @group Rewards - Présentation des reward
 * @param {number} id.path - id user
 * @returns {object} qui contient : Toute les reward
 */
router.get('/reward/:id(\\d+)', rewardController.getOneReward);

/**
 * Ajoute un nouveaux user
 * @route POST /reward/register
 * @group Rewards - Présentation des reward
 * @param {rewardSchema.model} reward.body.required  {"name" : "test","describe" : "test"}
 * @produces application/json application/xml
 * @consumes application/json application/xml
 */
router.post('/reward/register', validateBody(postRewardSchema), rewardController.saveNewReward);

/**
 * Modifie une reward dans la bdd avec les infomation fournie dans le body
 * @route PATCH /reward/{id}
 * @group Rewards - Présentation des reward
 * @param {number} id.path - id reward
 * @param {rewardSchema.model} reward.body.required  {"name" : "test","describe" : "test"}
 * @produces application/json application/xml
 * @consumes application/json application/xml
 */
router.patch('/reward/:id(\\d+)', validateBody(rewardSchema), rewardController.updateReward);

/**
 * Suprime le reward présent a l'id mentioné dans la bdd
 * @route DELETE /reward/{id}
 * @group Rewards - Présentation des reward
 * @param {number} id.path - L'id du reward
 * @returns 200 - La reward supprimer de la bdd
 */
router.delete('/reward/:id(\\d+)', rewardController.deleteReward);

// Soft CRUD

/**
 * Récupére touts les softs dans la bdd
 * @route GET /softs
 * @group Softs - Présentation des softs
 * @returns {object} qui contient : id, name, describe
 */
router.get('/softs', softController.getAllSofts);

/**
 * Récupére touts les softs dans la bdd
 * @route GET /softs/{id}
 * @param {number} id.path - L'id du softs
 * @group Softs - Présentation des softs
 * @returns {object} qui contient : id, name, describe
 */
router.get('/soft/:id(\\d+)', softController.getOneSoft);

/**
 * Ajoute un nouveaux soft
 * @route POST /soft/register
 * @group Rewards - Présentation des reward
 * @param {postSoftSchema.model} reward.body.required  {"name" : "test","describe" : "test"}
 * @produces application/json application/xml
 * @consumes application/json application/xml
 */
router.post('/soft/register', validateBody(postSoftSchema), softController.saveNewSoft);

/**
 * Ajoute un update soft
 * @route PATCH /soft/{id}
 * @group Rewards - Présentation des reward
 * @param {number} id.path - L'id du softs
 * @param {postSoftSchema.model} reward.body.required  {"name" : "test","describe" : "test"}
 * @produces application/json application/xml
 * @consumes application/json application/xml
 */
router.patch('/soft/:id(\\d+)', validateBody(softSchema), softController.updateSoft);

/**
 * Suprime le soft présent a l'id mentioné dans la bdd
 * @route DELETE /soft/{id}
 * @group Rewards - Présentation des reward
 * @param {number} id.path - L'id du reward
 * @returns 200 - La reward supprimer de la bdd
 */
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
