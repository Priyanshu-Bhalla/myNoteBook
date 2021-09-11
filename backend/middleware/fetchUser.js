var jwt = require('jsonwebtoken');
const JWT_SECRET = "thisisthesecretjwtstring";

const fetchUser = (req, res, next) => {
    const token = req.header('authen-token');
    if (!token) {
        res.status(401).send({ error: 'Please authenticate with a valid token' });
    }
    try {
        const decode = jwt.verify(token, JWT_SECRET);
        req.user = decode.user;
    } catch (error) {
        res.status(401).send({ error: 'Invalid Token' });
    }
    next();
}
module.exports = fetchUser;