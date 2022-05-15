import generateShortCode from "./shortCode";

export const validateAndRetrieveShortCode = (shortCode) => {
    if (shortCode) {
      let match = /^[0-9a-zA-Z_]{4,}$/.test(shortCode);
  
      if (!match) {
        throw "Short code must contain at least 4 characters";
      }
    } else {
      shortCode = generateShortCode();
    }
    return shortCode;
  }
  