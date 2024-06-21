import express from "express";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const dbPath = path.resolve(__dirname, "db.json");


router.post("/submit", async (req: Request, res: Response) => {
  try {
    
    const { name, email, phone, github_link, stop_watch } = req.body;

    if (!(name || email || phone || github_link || stop_watch)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const new_Sub = { name, email, phone, github_link, stop_watch };
    const dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    dbData.submissions.push(new_Sub);

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(200).json({ message: "Submission Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something Went Wrong" });
  }
});

router.get("/read", async( req: Request, res: Response) => {
    try {
        const dbData = JSON .parse(fs.readFileSync(dbPath, 'utf-8'));
        res.status(200).json(dbData.submissions)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
})

export default router;
