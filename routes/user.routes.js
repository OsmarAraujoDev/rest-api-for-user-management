const express = require('express');
const UserController = require('../controllers/user.controller');
const { validate } = require('../middlewares/validate');
const userValidations = require('../validations/user.validations');
const router = express.Router();

router.post('/', validate(userValidations.create, 'body'), UserController.create);

router.get('/:id', UserController.getOne);

router.get('/', validate(userValidations.getAll, 'query'), UserController.getAll);

router.put('/:id', validate(userValidations.update, 'body') ,UserController.update);

router.delete('/:id', UserController.delete);

module.exports = router;