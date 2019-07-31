import database from "../db";

const date = new Date();

export default class Parties {
  static async findAll(req, res) {
    try {
      // const QUERY_STRING = "SELECT * FROM parties";
      // const results = await database.query(QUERY_STRING);
      const results = [
        { id: 1, name: "RPF" },
        { id: 1, name: "Liberal" },
        { id: 1, name: "Republican" }
      ];
      return res.json({ parties: results });
    } catch (error) {
      return res.json({ message: "Error", error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { name, tagline, supporters } = req.body;
      const data = [name, tagline, supporters, date, date];
      const QUERY_STRING = `
        INSERT INTO parties(name, tagline, supporters, created_at, updated_at)
        VALUES($1, $2, $3, $4, $5)
        returning *
        `;
      const results = await database.query(QUERY_STRING, data);
      return res.status(201).json({
        message: "Party created successfully",
        party: results[0]
      });
    } catch (error) {
      return res.status(500).json({ message: "error", error: error.message });
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params;
      const QUERY_STRING = "SELECT * FROM parties WHERE id = $1";
      const results = await database.query(QUERY_STRING, [id]);
      if (!results[0]) {
        return res.status(404).json({ message: "Party not found" });
      }
      return res.json({ party: results[0] });
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
      const party = await database.query(
        "SELECT * FROM parties WHERE id = $1",
        [id]
      );
      if (!party[0]) {
        return res.status(404).json({ message: "Party not found" });
      }
      const updatBody = { ...party[0], ...body };
      const QUERY_STRING =
        "UPDATE parties SET name = $1, tagline = $2, supporters = $3, updated_at = $4 WHERE id = $5 returning *";
      const data = [
        updatBody.name,
        updatBody.tagline,
        updatBody.supporters,
        date,
        id
      ];
      const results = await database.query(QUERY_STRING, data);

      return res
        .status(201)
        .json({ message: "Updated successfully", party: results[0] });
    } catch (error) {
      return res.status(500).json({ message: "error", error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const QUERY_STRING = "DELETE FROM parties WHERE id = $1 returning id";
      const results = await database.query(QUERY_STRING, [id]);
      if (!results[0]) {
        return res.status(404).json({ message: "Party not found" });
      }
      return res.status(200).json({ message: "Party deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Error", error: error.message });
    }
  }
}
