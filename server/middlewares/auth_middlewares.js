

import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';

const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            req.user = user;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired" });
            }
            return res.status(401).json({ message: "Please authenticate" });
        }
    } else {
        return res.status(401).json({ message: "Unauthorized user" });
    }
};

export default checkUserAuth;
