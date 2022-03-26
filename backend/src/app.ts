import express, { Request, Response } from "express";
<<<<<<< HEAD
import { createTables } from "./db/db"
=======
import { createTables } from "./db/db";
import session from "express-session"
>>>>>>> 07fec92 (add backend routes)

const app = express();

//creating tables in DB
createTables()
    .then()
    .catch((err) => console.log(err))

<<<<<<< HEAD
app.get('/', (req: Request, res: Response) => {
    return res.send("Hello World.,,,,,");
=======
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

app.get('/', (req: Request, res: Response) => {
    return res.send("Hello World..............");
>>>>>>> 07fec92 (add backend routes)
})

app.listen(8080, () => {
    console.log("Application is listening on port 8080.");
})  