import express, { Request, Response } from "express";
import { createTables } from "./db/db";
import session from "express-session"
import { authRouter } from "./routes/auth";
import cors from "cors"

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

// json middleware
app.use(express.json());

// cors setup

app.use(cors({
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    origin: ["http://localhost:3000"],
}));

// different routes

app.use("/api/auth", authRouter);

// for(let route of routes)
// {
//     app.use(`${route}`, import(`.routes/${route}`))
// }

app.listen(8080, () => {
    console.log("Application is listening on port 8080.");
})  