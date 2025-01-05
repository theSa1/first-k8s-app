import express from "express";
import { db } from "./lib/db";

const app = express();

app.get("/", async (req, res) => {
  console.log("GET /");
  const notes = await db.note.findMany();

  const resString =
    notes.length === 0
      ? "No Notes"
      : notes
          .map((note) => {
            return `${note.id}: ${note.note}`;
          })
          .join("\n");

  res.send(resString);
});

app.get("/create/:note", async (req, res) => {
  const note = req.params.note;
  console.log("GET /create/:note", note);

  if (!note) {
    res.send("No note provided");
    return;
  }

  await db.note.create({
    data: {
      note,
    },
  });

  res.send("Note created");
});

app.listen(8080, "0.0.0.0", () => {
  console.log("Server running on http://0.0.0.0:8080");
});
