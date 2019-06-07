import database from "../db";

const date = new Date();

export default class Offices {
  static async findAll(req, res) {
    try {
      const QUERY_STRING = "SELECT * FROM offices";
      const results = await database.query(QUERY_STRING);
      return res.json({ offices: results });
    } catch (error) {
      return res.json({ message: "some error", error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { title, term } = req.body;
      const data = [title, term, date, date];
      const QUERY_STRING = `
        INSERT INTO offices(title, term, created_at, updated_at)
        VALUES($1, $2, $3, $4)
        returning *
        `;
      const results = await database.query(QUERY_STRING, data);
      return res.status(201).json({
        message: "Office created successfully",
        office: results[0]
      });
    } catch (error) {
      return res.status(500).json({ message: "error", error: error.message });
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params;
      const QUERY_STRING = "SELECT * FROM offices WHERE id = $1";
      const results = await database.query(QUERY_STRING, [id]);
      if (!results[0]) {
        return res.status(404).json({ message: "Office not found" });
      }
      return res.json({ office: results[0] });
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
      const office = await database.query(
        "SELECT * FROM offices WHERE id = $1",
        [id]
      );
      if (!office[0]) {
        return res.status(404).json({ message: "Office not found" });
      }
      const updatBody = { ...office[0], ...body };
      const QUERY_STRING =
        "UPDATE offices SET title = $1, term = $2, updated_at = $3 WHERE id = $4 returning *";
      const data = [updatBody.title, updatBody.term, date, id];
      const results = await database.query(QUERY_STRING, data);

      return res
        .status(201)
        .json({ message: "Updated successfully", office: results[0] });
    } catch (error) {
      return res.status(500).json({ message: "error", error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const QUERY_STRING = "DELETE FROM offices WHERE id = $1 returning id";
      const results = await database.query(QUERY_STRING, [id]);
      if (!results[0]) {
        return res.status(404).json({ message: "Office not found" });
      }
      return res.status(200).json({ message: "Office deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Error", error: error.message });
    }
  }
}
