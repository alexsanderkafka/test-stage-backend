import "dotenv/config"
import jwt from 'jsonwebtoken';
import AppError from "../error/AppError";

export default abstract class TokenJWT {

    static generateToken(email: string): string {
        const secret = process.env.JWT_SECRET_KEY as string;
        
        return jwt.sign({ email }, secret, { expiresIn: 30000 });
    }

    static generateRefreshToken(email: string): string{
        const secret = process.env.JWT_SECRET_KEY as string;
        
        return jwt.sign({ email }, secret, { expiresIn: 60000 });
    }

    static verifyToken(token: string): void{
        const secret = process.env.JWT_SECRET_KEY as string;
    
        try{
            jwt.verify(token, secret);
            return;
        }catch(err){
            throw new AppError("Token inválido", 401);
        }
    }

}