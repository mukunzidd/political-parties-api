import database from "../db";

const date = new Date();

export default class Candidates {
  static async findAll(req, res) {
    try {
      const QUERY_STRING = "SELECT * FROM candidates";
      const results = await database.query(QUERY_STRING);
      return res.json({ candidates: results });
    } catch (error) {
      return res.json({ message: "some error", error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { fname, lname, dob } = req.body;
      const data = [fname, lname, dob, date, date];
      const QUERY_STRING = `
        INSERT INTO candidates(fname, lname, dob, created_at, updated_at)
        VALUES($1, $2, $3, $4, $5)
        returning *
        `;
      const results = await database.query(QUERY_STRING, data);
      return res.status(201).json({
        message: "Candidate created successfully",
        candidate: results[0]
      });
    } catch (error) {
      return res.status(500).json({ message: "error", error: error.message });
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params;
      const QUERY_STRING = "SELECT * FROM candidates WHERE id = $1";
      const results = await database.query(QUERY_STRING, [id]);
      if (!results[0]) {
        return res.status(404).json({ message: "Candidate not found" });
      }
      return res.json({ candidate: results[0] });
    } catch (error) {
      return res.status(500).json({ message: "error", error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const {
        params: { id },
        body
      } = req;
      const candidate = await database.query(
        "SELECT * FROM candidates WHERE id = $1",
        [id]
      );
      if (!candidate[0]) {
        return res.status(404).json({ message: "candidate not found" });
      }
      const updatBody = { ...candidate[0], ...body };
      const QUERY_STRING =
        "UPDATE candidates SET fname = $1, lname = $2, dob = $3, verified = $4,updated_at = $5 WHERE id = $6 returning *";
      const data = [
        updatBody.fname,
        updatBody.lname,
        updatBody.dob,
        updatBody.verified,
        date,
        id
      ];
      const results = await database.query(QUERY_STRING, data);

      return res
        .status(201)
        .json({ message: "Updated successfully", candidate: results[0] });
    } catch (error) {
      return res.status(500).json({ message: "error", error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const QUERY_STRING = "DELETE FROM candidates WHERE id = $1 returning id";
      const results = await database.query(QUERY_STRING, [id]);
      if (!results[0]) {
        return res.status(404).json({ message: "Candidate not found" });
      }
      return res.status(200).json({ message: "Candidate deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Error", error: error.message });
    }
  }
}
