const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if (token) {
        jwt.verify(token, req.app.get('api_secret_key'), (err, decodedDate) => {
            if (err) {
                res.json({
                    errorCode: '01',
                    message: 'failed to authhenticate token'
                })
            } else {
                req.decode = decodedDate;
                next();
            }
        })
    } else {
        res.json({
            errorCode: '01',
            message: 'no token provider'
        })
    }
}