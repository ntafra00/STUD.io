import express, { Request, Response } from "express";
import { createTables } from "./db/db";
import session from "express-session"
import { authRouter } from "./routes/auth";
import { solutionRouter } from "./routes/solution";
import { courseRouter } from "./routes/course";
import { taskRouter } from "./routes/task";
import { studentRouter } from "./routes/student";
import { dashboardRouter } from "./routes/dashboard";
import cors from "cors";
import morgan from "morgan"
import fileUpload from "express-fileupload";
import { fileRouter } from "./routes/file";

const app = express();

//creating tables in DB
createTables()
    .then()
    .catch((err) => console.log(err))


// session    
app.use(session({
    secret: "kJhGohECA5C3x8P8yqWYUbwkluKeHBUx",
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 20
    }
}))

// file upload middleware

app.use(
    fileUpload({
      limits: { fileSize: 100 * 1024 * 1024 },
    })
  );

// json middleware
app.use(express.json());

// cors setup

app.use(cors({
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    origin: ["http://localhost:3000"],
}));

// logger

app.use(
    morgan(function (tokens, req, res) {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
    })
  );

// different routes

app.use("/api/auth", authRouter);
app.use("/api/solution", solutionRouter);
app.use("/api/course", courseRouter);
app.use("/api/task", taskRouter);
app.use("/api/student", studentRouter)
app.use("/api/dashboard", dashboardRouter);
app.use("/api/file", fileRouter)

app.listen(8080, () => {
    console.log("Application is listening on port 8080.");
})  