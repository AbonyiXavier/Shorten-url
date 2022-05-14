import chai from "chai";
import chatHttp from "chai-http";
import UrlShorten from "../../model/urlShorten.model";

import server from "../../index";

chai.use(chatHttp);
const { expect } = chai;

const url = "/api/v1";

const data = {
    url: "http://example.com",
    shortCode: "example"
}

let shortCode;

describe("Shorten endpoind", () => {
    before(async () => {
      await UrlShorten.deleteMany({});
    });

    it("it should create successfully", async () => {
      const result = await chai
        .request(server)
        .post(`${url}/shorten`)
        .set("Accept", "application/json")
        .send(data);
        
        console.log("result", result.body.data.shortCode);
        shortCode = result.body.data.shortCode
      expect(result.status).to.equal(201);
      expect(result.body.status).to.equal(true);
      expect(result.body.message).to.be.equal("Created successfully");
    });

  });