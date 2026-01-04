const Joi = require('joi');

const userValidations = {
    create: Joi.object({
        nickname: Joi.string().min(1).max(100).required(),
        email: Joi.string().email().max(150).required(),
        phone: Joi.string().pattern(/^\d{13}$/).optional(),
        password: Joi.string().min(8).max(255).pattern(/[A-Z]/).pattern(/[a-z]/).pattern(/[0-9]/).required()
    }),

    getAll: Joi.object({
        limit: Joi.number().integer().max(1000).optional(),
        offset: Joi.number().integer().min(0).max(1000).optional(),
        sort_by: Joi.string().valid('id', 'nickname', 'email', 'created_at', 'updated_at').optional(),
        sort_order: Joi.string().valid('ASC', 'DESC').optional(),
        id: Joi.number().integer().min(1).max(9999).optional(),
        nickname: Joi.string().min(1).max(100).optional(),
        email: Joi.string().email().max(150).optional(),
        phone: Joi.string().pattern(/^\d{13}$/).optional(),
    }),

    update: Joi.object({
        nickname: Joi.string().min(1).max(100).optional(),
        email: Joi.string().email().max(150).optional(),
        phone: Joi.string().pattern(/^\d{13}$/).optional(),
        password: Joi.string().min(8).max(255).pattern(/[A-Z]/).pattern(/[a-z]/).pattern(/[0-9]/).optional()
    })
};

module.exports = userValidations;