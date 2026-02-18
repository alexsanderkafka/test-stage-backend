import "dotenv/config";
import bcrypt from "bcrypt";

export default class Password{

    public static async encode(password: string): Promise<string> {
        const salt: any = await bcrypt.genSalt(parseInt(process.env.PASSWORD_SALT_ROUNDS || "10"));
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }

    public static async comparePassword(password: string, hashedPassword: string): Promise<boolean>{
        return bcrypt.compare(password, hashedPassword);
    }

}