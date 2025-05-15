import { error } from "console";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const authenticateJWT = (req, res, next) => {
    try {const bearerToken = req.headers["authorization"];
    if(!bearerToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("Bearer Token: ", bearerToken);
    const token = bearerToken.split(" ")[1];
    if(!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("Decoded Token: ", decoded);

    req.user = decoded;
    next();



}
    
    catch(err) {
        return res.status(401).json({ message: "Error authenticateJWT", error: err });
    }


}
export const AuthenticationMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = decoded;
            console.log('User authenticated:', req.user);
            next();
        });
        next();
    } catch (error) {
        next(error);
    }
}
