const bcrypt = require('bcrypt');

const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS ?? ''));
}

const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}

export { hashPassword, comparePassword };