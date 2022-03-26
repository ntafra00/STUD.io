import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt"
import { getUser, createUser } from "../db/users";
import { Session } from "../models/session";
// import middleware from "../helpers/middleware"

const router: Router = Router();

router.post('/register', async (req: Request, res: Response) => {

    // 1.) provjera je li postoji korisnik s danim emailom u bazi podataka
    // -> ako postoji, vrati bad request
    // 2.) izvuci password iz req.body-a i enkriptiraj ga
    // 3.) jednom kad se user kreira, postavi session objekt

    let userExists: boolean = await getUser(req.body.email);
    if(userExists)
    {
        return res.status(400).send({
            "message": "Invalid data"
        })
    }

    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    const userData = {...req.body, password: encryptedPassword};

    let insertionResult = await createUser(userData);

})

router.post('/login', async (req: Request, res: Response) => {
    
})

// router.get('/logout', authMi , async (req: Request, res: Response, next: NextFunction))


export {router}