import express, { Request, Response } from "express";
import { createTables } from "./db/db"

const app = express();

//creating tables in DB
createTables()
    .then()
    .catch((err) => console.log(err))

app.get('/', (req: Request, res: Response) => {
    return res.send("Hello World.,,,,,");
})

app.listen(8080, () => {
    console.log("Application is listening on port 8080.");
})  