import { expect } from "chai";

import { validateAndRetrieveShortCode } from "./validateAndRetrieveShortCode";

describe("Validate and retrieve a short code", () => {
  it("should validate an invalid short code", () => {
    const invalidShortCode = "exa";
    expect(function () {
      validateAndRetrieveShortCode(invalidShortCode);
    }).to.throw("Short code must contain at least 4 characters");
  });

  it("should generate a defined short code inputted", () => {
    const validCode = "mamahouse";
    const shortCode = validateAndRetrieveShortCode(validCode);

    expect(shortCode).to.be.a.string(shortCode);
    expect(shortCode.length).length.to.equals(validCode.length);
    expect(shortCode.length).to.be.greaterThan(6);
  });

  it("should generate any random short code value", () => {
    const shortcode = validateAndRetrieveShortCode();
    expect(shortcode).to.be.a.string(shortcode);
    expect(shortcode.length).length.to.equals(6);
  });
});
