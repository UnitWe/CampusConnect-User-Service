import * as bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
  
export async function checkPassword(insertedPassword: string, storedPassword: string): Promise<boolean>{
    return  bcrypt.compare(insertedPassword, storedPassword);
}