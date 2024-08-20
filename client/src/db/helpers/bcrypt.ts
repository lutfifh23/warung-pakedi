import bcrypt from 'bcryptjs'

export const hashPassword = (password: string) => {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export const checkPassword = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
}