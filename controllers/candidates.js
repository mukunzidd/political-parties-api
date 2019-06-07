import database from "../db";

// const date = new Date();

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
      return res.status(201).json({
        message: "Candidate created successfully"
      });
    } catch (error) {
      return res.status(500).json({ message: "error", error: error.message });
    }
  }

  static async find(req, res) {
    try {
      return res.json({ message: "Candidate found" });
    } catch (error) {
      return res.status(500).json({ message: "error", error: error.message });
    }
  }

  static async update(req, res) {
    try {
      return res.status(201).json({ message: "Updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: "error", error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      return res.status(203).json({ message: "Candidate deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Error", error: error.message });
    }
  }
}
