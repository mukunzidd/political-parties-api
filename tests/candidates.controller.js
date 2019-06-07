import "@babel/polyfill";
import chai, { expect } from "chai";
import chaiHTTP from "chai-http";
import server from "../server";
import database from "../db";

chai.use(chaiHTTP);

const QUERY_STRING = `
INSERT INTO candidates(fname, lname, dob, created_at, updated_at)
VALUES($1, $2, $3, $4, $5)
returning *
`;
const data = ["john", "doe", new Date(), new Date(), new Date()];
describe("Candidates Controller", () => {
  let candidate;
  before(async () => {
    candidate = await database.query(QUERY_STRING, data);
  });
  after(async () => {
    await database.query("TRUNCATE TABLE candidates RESTART IDENTITY");
  });
  it("should fetch all candidates", done => {
    chai
      .request(server)
      .get("/api/v1/candidates")
      .end((err, res) => {
        expect(res.status).equals(200);
        expect(res.body).to.be.an("object");
        expect(res.body.candidates.length).equal(1);
        done();
      });
  });
  it("should fetch one candidate", done => {
    chai
      .request(server)
      .get(`/api/v1/candidates/${candidate[0].id}`)
      .end((err, res) => {
        expect(res.status).equals(200);
        expect(res.body).to.be.an("object");
        expect(res.body.candidate.id).equal(candidate[0].id);
        done();
      });
  });
  it("should create one candidate", done => {
    chai
      .request(server)
      .post(`/api/v1/candidates`)
      .send({
        fname: "dev",
        lname: "X",
        dob: "01/01/1999"
      })
      .end((err, res) => {
        expect(res.status).equals(201);
        expect(res.body).to.be.an("object");
        expect(res.body.candidate.fname).equal("dev");
        expect(res.body.candidate.lname).equal("X");
        expect(res.body.candidate.verified).equal(false);
        done();
      });
  });
});
