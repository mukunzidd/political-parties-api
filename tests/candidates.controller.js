import "@babel/polyfill";
import chai, { expect } from "chai";
import chaiHTTP from "chai-http";
import server from "../server";
// import database from "../db";

chai.use(chaiHTTP);

// const QUERY_STRING = `
// INSERT INTO candidates(fname, lname, dob, verified, party_id, created_at, updated_at)
// VALUES($1, $2, $3, $4, $5, $6, $6, $7)
// returning *
// `;
// const data = ["john", "doe", new Date(), false, 1, new Date(), new Date()];
describe.skip("Candidates Controller", () => {
  //   let candidate;
  //   before(async () => {
  //     await database.query(QUERY_STRING, data);
  //   });
  //   after(async () => {
  //     await database.query("TRUNCATE TABLE candidates RESTART IDENTITY");
  //   });
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
  it("should fetch one candidate");
  it("should create one candidate");
});
