import * as nCrypto from 'crypto';

function generateSecureCode() {
    const buffer = nCrypto.randomBytes(4); // Generate a secure random byte buffer
    const hex = buffer.toString('hex'); // Convert to hexadecimal
    const decimal = parseInt(hex, 16); // Then to decimal
    const code = decimal % 1000000; // Ensure the code is in the range 000000-999999

    // 6 digits, left-padded with 0s
    return code.toString().padStart(6, '0');
}

export { generateSecureCode };