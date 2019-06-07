import "@babel/polyfill";
import chai, { expect } from "chai";
import chaiHTTP from "chai-http";
import server from "../server";
import database from "../db";

chai.use(chaiHTTP);

const QUERY_STRING = `
INSERT INTO offices(title, term, created_at, updated_at)
VALUES($1, $2, $3, $4)
returning *
`;
const data = ["secretary of state", 26, new Date(), new Date()];
describe("Offices Controller", () => {
  let office;
  before(async () => {
    office = await database.query(QUERY_STRING, data);
  });
  after(async () => {
    await database.query("TRUNCATE TABLE offices RESTART IDENTITY");
  });
  it("should fetch all offices", done => {
    chai
      .request(server)
      .get("/api/v1/offices")
      .end((err, res) => {
        expect(res.status).equals(200);
        expect(res.body).to.be.an("object");
        expect(res.body.offices.length).equal(1);
        done();
      });
  });
  it("should fetch one office", done => {
    chai
      .request(server)
      .get(`/api/v1/offices/${office[0].id}`)
      .end((err, res) => {
        expect(res.status).equals(200);
        expect(res.body).to.be.an("object");
        expect(res.body.office.id).equal(office[0].id);
        done();
      });
  });
  it("should create one office", done => {
    chai
      .request(server)
      .post(`/api/v1/offices`)
      .send({
        title: "PRESIDENT",
        term: 60
      })
      .end((err, res) => {
        expect(res.status).equals(201);
        expect(res.body).to.be.an("object");
        expect(res.body.office.title).equal("PRESIDENT");
        expect(res.body.office.term).equal(60);
        done();
      });
  });
});
