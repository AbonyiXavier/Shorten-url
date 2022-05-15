import RandExp from "randexp";

const generateShortCode = (length = 6) => {
  const regex = `^[0-9a-zA-Z_]{${length}}$`;
  return new RandExp(regex).gen();
};
export default generateShortCode;
