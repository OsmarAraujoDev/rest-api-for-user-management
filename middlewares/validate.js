const validate = (schema, property = 'body') => (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
        abortEarly: true,
        stripUnknown: true
    });

    if (error) {
        return res.status(400).json({
            ok: false,
            message: error.details[0].message,
            data: null
        });
    }

    req.validated = value;
    next();
};

module.exports = { validate }