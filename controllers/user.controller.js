const UserService = require('../services/user.service');

class UserController {

    static async create(req, res, next) {
        try {
            const result = await UserService.create({
                nickname: req.validated.nickname,
                email: req.validated.email.trim().toLowerCase(),
                phone: req.validated.phone,
                password: req.validated.password
            });

            return res.status(201).json({
                ok: true,
                message: `id: ${result.id}`,
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    static async getOne(req, res, next) {
        const userId = Number(req.params.id);

        if (!Number.isInteger(userId)) {
            return res.status(400).json({
                ok: false,
                message: 'id is required and must be number integer',
                data: null
            });
        }

        try {
            const result = await UserService.getOne(userId);

            return res.status(200).json({
                ok: true,
                message: 'user found',
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    static async getAll(req, res, next) {
        try {
            const result = await UserService.getAll(req.validated);

            return res.status(200).json({
                ok: true,
                message: 'users found',
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        const userId = Number(req.params.id);

        if (!Number.isInteger(userId)) {
            return res.status(400).json({
                ok: false,
                message: 'id is required and must be a number integer',
                data: null
            });
        }

        try {
            await UserService.update({ ...req.validated, id: userId });

            return res.status(204);
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {

        const userId = Number(req.params.id);

        if (!Number.isInteger(userId)) {
            return res.status(400).json({
                ok: false,
                message: 'id is required and must be a number integer',
                data: null
            });
        }

        try {
            const result = await UserService.delete(userId);

            if (!result) {
                return res.status(500).json({
                    ok: false,
                    message: `user is not deleted`,
                    data: null
                });
            }

            return res.status(204);
        } catch (err) {
            next(err);
        }
    }

}

module.exports = UserController;