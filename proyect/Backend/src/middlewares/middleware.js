import bcrypt from 'bcrypt';

const validateToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        const decryptedMessage = await bcrypt.compare('I know your secret', token);
        if (!decryptedMessage) {
            return res.status(401).send({ error: 'Access denied. Invalid token.' });
        }
        next();
    } catch {
        res.status(400).send({ error: 'Invalid token.' });
    }
};

export default validateToken;
