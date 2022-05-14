import RandExp from "randexp";

const generateShortCode = () => {
    return new RandExp(/^[0-9a-zA-Z_]{6}$/).gen();
}
export default generateShortCode;

