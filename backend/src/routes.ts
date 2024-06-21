import express from "express";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const dbPath = path.resolve(__dirname, "db.json");

const getNextId = () => {
  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  const submissions = dbData.submissions;
  let maxId = 0;
  for (let submission of submissions) {
      if (submission.id > maxId) {
          maxId = submission.id;
      }
  }
  return maxId + 1;
};

router.get("/ping", async(req: Request, res: Response) => {
  res.status(200).json({ message: true})
})

router.get("/readByEmail", async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    
    const dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    const submission = dbData.submissions.find((sub: any) => sub.email === email);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json(submission);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/submit", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, github_link, stop_watch } = req.body;

    if (!(name && email && phone && github_link && stop_watch)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const new_Sub = { 
      id: getNextId(), 
      name, 
      email, 
      phone, 
      github_link, 
      stop_watch 
    };

    const dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    dbData.submissions.push(new_Sub);

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(200).json({ message: "Submission Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});


router.get('/read', (req: Request, res: Response) => {
  try {
      const { index } = req.query;
      if (index === undefined) {
          return res.status(400).json({ message: "Index is required" });
      }

      const dbData = JSON.parse(fs.readFileSync('src/db.json', 'utf-8'));
      const submissions = dbData.submissions;

      const submissionIndex = parseInt(index as string, 10);
      if (isNaN(submissionIndex) || submissionIndex < 0 || submissionIndex >= submissions.length) {
          return res.status(400).json({ message: "Invalid index" });
      }

      const submission = submissions[submissionIndex];
      res.status(200).json(submission);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
