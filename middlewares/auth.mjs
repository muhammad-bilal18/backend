
import config from 'config';
import jwt from 'jsonwebtoken';

export function auth(req, res, next) {
    
    try {
        const token = req.header('x-auth-token');
        if(token === null || token === 'null') return res.status(401).send({message: 'Access denied'});
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch(ex) {
        return res.status(400).send({message: 'Invalid token'});
    }
}