import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_encrypt_decrypt_secret_key;

export const encryptMessage = (plainText) => {
  return CryptoJS.AES.encrypt(plainText, secretKey).toString();
};

export const decryptMessage = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
