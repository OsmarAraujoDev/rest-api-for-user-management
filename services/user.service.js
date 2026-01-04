const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const User = require('../models/User');
const { createError } = require('../utils/createError');

class UserService {

    static async create(data) {
        const { nickname, email, phone, password } = data;

        const existing = await User.findOne({
            where: { email: email }
        });
        if (existing) throw createError('this email is already in use', 409);

        const password_hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

        const created = await User.create({
            nickname,
            email,
            phone,
            password_hash
        });

        return {
            id: created.id,
            nickname: created.nickname,
            email: created.email,
            phone: created.phone,
            created_at: created.created_at
        };
    }

    static async getOne(id) {
        const user = await User.findByPk(id, {
            attributes: ['id', 'nickname', 'email', 'phone', 'created_at', 'updated_at']
        });

        if (!user) throw createError(`user not found`, 404);

        return user;
    }

    static async getAll(params) {
        const {
            limit = 100,
            offset = 0,
            sort_by = 'id',
            sort_order = 'DESC',
            id,
            nickname,
            email,
            phone,
        } = params;

        const whereClauses = {};

        if (id) whereClauses.id = id;

        if (nickname) whereClauses.nickname = nickname;

        if (email) whereClauses.email = email;

        if (phone) whereClauses.phone = phone;

        const users = await User.findAll({
            where: whereClauses,
            order: [[sort_by, sort_order]],
            limit,
            offset
        });

        return users;
    }

    static async update(data) {
        const { id, nickname, email, phone, password } = data;

        const existing = await User.findByPk(id);
        if (!existing) throw createError(`user not found`, 404);

        const setClauses = {};

        if (nickname) setClauses.nickname = nickname;

        if (email) {
            const verifyEmail = await User.findOne({
                where: {
                    email,
                    id: { [Op.ne]: id }
                }
            });

            if (verifyEmail) {
                throw createError('this email is already in use', 409);
            }

            setClauses.email = email;
        }

        if (phone) setClauses.phone = phone;

        if (password) setClauses.password_hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

        const [updated] = await User.update(setClauses, { where: { id } });

        return updated === 1;
    }

    static async delete(id) {
        const existing = await User.findByPk(id);
        if (!existing) throw createError(`user not found`, 404);

        const deleted = await User.destroy({ where: { id } });

        return deleted === 1;
    }

}

module.exports = UserService