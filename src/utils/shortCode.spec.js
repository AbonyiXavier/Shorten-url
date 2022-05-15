import chai, { expect } from "chai";

import generateShortCode from './shortCode';

chai.should();

describe('Generate Short Code function', () => { 
    it('should generate a random 6 digit short code by default', () => {
        const shortcode = generateShortCode();
        expect(shortcode).to.be.a.string(shortcode);
        expect(shortcode.length).length.to.equals(6);
    });

    it('should generate a random 6 digit short code by parameter', () => {
        const shortcode = generateShortCode(6);
        expect(shortcode).to.be.a.string(shortcode);
        expect(shortcode.length).length.to.equals(6);
    });

    it('should generate a random 4 digit short code', () => {
        const shortcode = generateShortCode(4);
        expect(shortcode).to.be.a.string(shortcode);
        expect(shortcode.length).length.to.equals(4);
    });

    it('should generate a random 4 digit short code', () => {
        const shortcode = generateShortCode(0);
        expect(shortcode).to.not.be.null;
    });
 })


