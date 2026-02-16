import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";

export class AuthService {
    static generateToken(payload: object): string {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            return null;
        }
    }
}
