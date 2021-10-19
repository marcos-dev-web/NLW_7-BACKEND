import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

import router from "./routes";

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer);

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: "*",
  }),
);

io.on("connection", socket => {
  console.log(`user ${socket.id} connected`);
});

app.use("/v1", router);

app.get("/github", (_, response) => {
  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;

  return response.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`);
});

app.get("/sign/callback", (request, response) => {
  const { code } = request.query;

  return response.status(200).json(code);
});

export { httpServer, io };
