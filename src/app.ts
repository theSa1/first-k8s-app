import { Hono } from "hono";
import { db } from "./lib/db";
import { createNotesSchema, deleteNotesSchema } from "./lib/schema";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.get("/notes", async (c) => {
  console.log("GET /");
  const notes = await db.note.findMany();

  return c.json(notes);
});

app.post("/create", async (c) => {
  console.log("POST /create");
  const body = createNotesSchema.safeParse(await c.req.json());

  if (!body.success) {
    console.log(body.error);
    return c.json({
      success: false,
      errors: "Invalid body",
    });
  }

  const { content } = body.data;

  await db.note.create({
    data: {
      note: content,
    },
  });

  return c.json({
    success: true,
  });
});

app.post("/delete", async (c) => {
  console.log("POST /delete");
  const body = deleteNotesSchema.safeParse(await c.req.json());

  if (!body.success) {
    return c.json({
      success: false,
      errors: "Invalid body",
    });
  }

  const { id } = body.data;

  await db.note.delete({
    where: {
      id,
    },
  });

  return c.json({
    success: true,
  });
});

app.get("*", serveStatic({ path: "./public" }));

export default {
  port: 8080,
  fetch: app.fetch,
};
