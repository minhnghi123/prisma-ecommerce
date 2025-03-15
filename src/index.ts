import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes/index.route";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors.middleware";
const app: Express = express();
app.use(express.json());
app.use("/api", rootRouter);
app.use(errorMiddleware);
export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
