import CryptoJS from "crypto-js";

const SECRET_KEY = "askhdjiaqjwhtuqehwgaoishj9812u3uewosd";

export const encryptText = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptText = (cipherText: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
