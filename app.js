const express = require('express');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
    console.error('Error: ', err);
    return res.status(err.status).json({
        ok: false,
        message: err.message,
        data: null
    });
});

module.exports = app;