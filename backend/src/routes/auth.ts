import { Router, Request, Response   } from "express";
import bcrypt from "bcrypt"
import { getUser, createUser, updateUser } from "../db/db";
import {authMiddleware} from "../helpers/middleware"
import { UserResult } from "../models/dbResults/user";

const authRouter: Router = Router();

authRouter.post('/create', async (req: Request, res:Response) => {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    let userData = {...req.body, password: encryptedPassword};
    const createdUser:UserResult = await createUser(userData);
    return res.sendStatus(200);
})


authRouter.post('/login', async (req: Request, res: Response) => {

    const existingUser: UserResult = await getUser(req.body.email);

    if(!existingUser)
        return res.status(400).send({
            "message": "Invalid data"
        })

    let passwordCheck = await bcrypt.compare(req.body.password, existingUser.password);

    if(passwordCheck)
    {
        req.session.user = {id: existingUser.id, email: existingUser.email, role: existingUser.role, fullName: existingUser.full_name};
        return res.status(200).send({
            "message": "Success",
            "data": {
                "id": existingUser.id,
                "fullName": existingUser.full_name,
                "email": existingUser.email,
                "role": existingUser.role
            }
        })
        
    }else
        return res.status(400).send({
            "message": "Invalid data"
        })

})

authRouter.get('/logout', authMiddleware, async (req: Request, res: Response) => {
    req.session.destroy(err => {
        if (err) {
            return res.sendStatus(500);
        }
    })
    return res.sendStatus(200);
})

authRouter.get("/", authMiddleware, async (req: Request, res: Response) => {
    res.status(200).send({
        "message": "Success",
        "data": req.session.user
    })
})

authRouter.put("/", authMiddleware, async (req: Request, res: Response) => {
    const id = req.session.user!.id;
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    let passwordChanged = await updateUser(encryptedPassword, id);

    if(!passwordChanged)
        return res.status(400).send({
            "message": "Password not changed properly"
        })

    res.status(200).send({
        "message": "Password changed"
    })
})

export {authRouter}
