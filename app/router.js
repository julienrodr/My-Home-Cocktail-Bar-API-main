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
 * @group Softs - Présentation des softs
 * @param {postSoftSchema.model} reward.body.required  {"name" : "test","describe" : "test"}
 * @produces application/json application/xml
 * @consumes application/json application/xml
 */
router.post('/soft/register', validateBody(postSoftSchema), softController.saveNewSoft);

/**
 * Ajoute un update soft
 * @route PATCH /soft/{id}
 * @group Softs - Présentation des softs
 * @param {number} id.path - L'id du softs
 * @param {postSoftSchema.model} soft.body.required  {"name" : "test","describe" : "test"}
 * @produces application/json application/xml
 * @consumes application/json application/xml
 */
router.patch('/soft/:id(\\d+)', validateBody(softSchema), softController.updateSoft);

/**
 * Suprime le soft présent a l'id mentioné dans la bdd
 * @route DELETE /soft/{id}
 * @group Softs - Présentation des softs
 * @param {number} id.path - L'id du soft
 * @returns 200 - Le soft supprimer de la bdd
 */
router.delete('/soft/:id(\\d+)', softController.deleteSoft);

// Garnish CRUD
/**
 * Récupére touts les garnishs dans la bdd
 * @route GET /garnish
 * @group Garnishs - Présentation des Garnish
 * @returns {object} qui contient : id, name, describe
 */
router.get('/garnish', garnishController.getAllGarnish);

/**
 * Récupére touts les garnishs dans la bdd
 * @route GET /garnish/{id}
 * @group Garnishs - Présentation des Garnish
 * @param {number} id.path - L'id du garnish
 * @returns {object} qui contient : id, name, describe
 */
router.get('/garnish/:id(\\d+)', garnishController.getOneGarnish);

/**
 * Ajoute un nouveaux garnish
 * @route POST /garnish/register
 * @group Garnishs - Présentation des garnishs
 * @param {postGarnishSchema.model} garnish.body.required  {"name" : "test","describe" : "test"}
 * @produces application/json application/xml
 * @consumes application/json application/xml
 */
router.post('/garnish/register', validateBody(postGarnishSchema), garnishController.saveNewGarnish);

/**
 * Ajoute un update garnish
 * @route PATCH /garnish/{id}
 * @group Garnishs - Présentation des garnish
 * @param {number} id.path - L'id du garnish
 * @param {postGarnishSchema.model} garnish.body.required  {"name" : "test","describe" : "test"}
 * @produces application/json application/xml
 * @consumes application/json application/xml
 */
router.patch('/garnish/:id(\\d+)', validateBody(garnishSchema), garnishController.updateGarnish);

/**
 * Suprime le garnish présent a l'id mentioné dans la bdd
 * @route DELETE /garnish/{id}
 * @group Garnishs - Présentation des garnish
 * @param {number} id.path - L'id du garnish
 * @returns 200 - Le garnish supprimer de la bdd
 */
router.delete('/garnish/:id(\\d+)', garnishController.deleteGarnish);

// Alcohol CRUD

/**
 * Récupére touts les alcohol dans la bdd
 * @route GET /alcohol
 * @group Alcohols - Présentation des Alcohol
 * @returns {object} qui contient : id, name, describe
 */
router.get('/alcohols', alcoholController.getAllAlcohols);

/**
 * Récupére touts les alcohol dans la bdd
 * @route GET /alcohol/{id}
 * @group Alcohols - Présentation des alcohol
 * @param {number} id.path - L'id du alcohol
 * @returns {object} qui contient : id, name, describe
 */
router.get('/alcohol/:id(\\d+)', alcoholController.getOneAlcohol);

/**
 * Ajoute un nouveaux alcohol
 * @route POST /alcohol/register
 * @group Alcohols - Présentation des alcohols
 * @param {postAlcoholSchema.model} garnish.body.required  {"name" : "test","describe" : "test", "localisation": "test", "category": "test", "nose": "test", "brand": "test" }
 * @produces application/json application/xml
 * @consumes application/json application/xml
 */
router.post('/alcohol/register', validateBody(postAlcoholSchema), alcoholController.saveNewAlcohol);

/**
 * Ajoute un update alcohol
 * @route PATCH /alcohol/{id}
 * @group Alcohols - Présentation des alcohols
 * @param {number} id.path - L'id du alcohol
 * @param {postAlcoholSchema.model} soft.body.required  {"name" : "test","describe" : "test", "localisation": "test", "category": "test", "nose": "test", "brand": "test" }
 * @produces application/json application/xml
 * @consumes application/json application/xml
 */
router.patch('/alcohol/:id(\\d+)', validateBody(alcoholSchema), alcoholController.updateAlcohol);

/**
 * Suprime le alcohol présent a l'id mentioné dans la bdd
 * @route DELETE /alcohol/{id}
 * @group Alcohols - Présentation des alcohols
 * @param {number} id.path - L'id du alcohols
 * @returns 200 - Le alcohol supprimer de la bdd
 */
router.delete('/alcohol/:id(\\d+)', alcoholController.deleteAlcohol);

// Cocktail CRUD

/**
 * Récupére touts les Cocktail dans la bdd
 * @route GET /cocktail
 * @group Cocktail - Présentation des Cocktail
 * @returns {object} qui contient : id, name, describe, recipe, category, user_id
 */
router.get('/cocktails', cocktailController.getAllCocktail);

/**
 * Récupére touts les cocktail dans la bdd
 * @route GET /cocktail/{id}
 * @group Cocktail - Présentation des cocktail
 * @param {number} id.path - L'id du cocktail
 * @returns {object} qui contient :  id, name, describe, recipe, category, user_id
 */
router.get('/cocktail/:id(\\d+)', cocktailController.getOneCocktail);

/**
 * Ajoute un nouveaux cocktail
 * @route POST /cocktail/register
 * @group Cocktail - Présentation des cocktails
 * @param {postCocktailSchema.model} garnish.body.required  {"name" : "test","describe" : "test", "recipe": "test", "category": "test", "user_id": "1" }
 * @produces application/json application/xml
 * @consumes application/json application/xml
 */
router.post('/cocktail/register',validateBody(postCocktailSchema), cocktailController.saveNewCocktail);

/**
 * Ajoute un nouveaux cocktail
 * @route POST /cocktail/{id}
 * @group Cocktail - Présentation des cocktails
 * @param {number} id.path - L'id du alcohol
 * @param {postCocktailSchema.model} garnish.body.required  {"name" : "test","describe" : "test", "recipe": "test", "category": "test", "user_id": "1" }
 * @produces application/json application/xml
 * @consumes application/json application/xml
 */
router.patch('/cocktail/:id(\\d+)', validateBody(cocktailSchema), cocktailController.updateCocktail);

/**
 * Suprime le cocktail présent a l'id mentioné dans la bdd
 * @route DELETE /cocktail/{id}
 * @group Cocktail - Présentation des cocktail
 * @param {number} id.path - L'id du cocktail
 * @returns 200 - Le cocktail supprimer de la bdd
 */
router.delete('/cocktail/:id(\\d+)', cocktailController.deleteSoft);

module.exports = router;
