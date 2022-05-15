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

describe("Shorten endpoint", () => {
    before(async () => {
      await UrlShorten.deleteMany({});
    });

    it("it should create successfully", async () => {
      const result = await chai
        .request(server)
        .post(`${url}/shorten`)
        .set("Accept", "application/json")
        .send(data);
        
      expect(result.status).to.equal(201);
      expect(result.body.status).to.equal(true);
      expect(result.body.message).to.be.equal("Created successfully");
    });

    it("it should get short code", (done) => {
      const shortCode = "example"
     chai
        .request(server)
        .get(`${url}/${shortCode}`)
        .set("Accept", "application/json")
        .redirects(0)
        .end((res) => {
          res.should.have.status(302);
          done();
        });
    });

    it("it should get short code stats", async () => {
      const shortCode = data.shortCode;
      const result = await chai
        .request(server)
        .get(`${url}/${shortCode}/stats`)
        .set("Accept", "application/json")
        
      expect(result.status).to.equal(200);
    });

  });