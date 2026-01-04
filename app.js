const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    console.error('Error: ', err);
    return res.status(500).json({
        ok: false,
        message: 'internal server error'
    });
});

module.exports = app;