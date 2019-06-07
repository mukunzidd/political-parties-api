import "@babel/polyfill";
import chai, { expect } from "chai";
import chaiHTTP from "chai-http";
import server from "../server";
import database from "../db";

chai.use(chaiHTTP);

const QUERY_STRING = `
INSERT INTO parties(name, tagline, supporters, created_at, updated_at)
VALUES($1, $2, $3, $4, $5)
returning *
`;
const data = ["some", "world", 30, new Date(), new Date()];
describe("Parties Controller", () => {
  let party;
  before(async () => {
    party = await database.query(QUERY_STRING, data);
  });
  after(async () => {
    await database.query("TRUNCATE TABLE parties RESTART IDENTITY");
  });
  it("should fetch all parties", done => {
    chai
      .request(server)
      .get("/api/v1/parties")
      .end((err, res) => {
        expect(res.status).equals(200);
        expect(res.body).to.be.an("object");
        expect(res.body.parties.length).equal(1);
        done();
      });
  });
  it("should fetch one party", done => {
    chai
      .request(server)
      .get(`/api/v1/parties/${party[0].id}`)
      .end((err, res) => {
        expect(res.status).equals(200);
        expect(res.body).to.be.an("object");
        expect(res.body.party.id).equal(party[0].id);
        expect(res.body.party.name).equal(data[0]);
        done();
      });
  });
  it("should create one party", done => {
    chai
      .request(server)
      .post(`/api/v1/parties`)
      .send({
        name: "PDF",
        tagline: "aho",
        supporters: 30
      })
      .end((err, res) => {
        expect(res.status).equals(201);
        expect(res.body).to.be.an("object");
        expect(res.body.message).equal("Party created successfully");
        expect(res.body.party.name).equal("PDF");
        expect(res.body.party.supporters).equal(30);
        expect(res.body.party.tagline).equal("aho");
        done();
      });
  });
});
