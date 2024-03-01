const jwt = require('jsonwebtoken') ;
function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Failed to authenticate token' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({ error: 'No token provided' });
    }
}
module.exports = ensureToken ;