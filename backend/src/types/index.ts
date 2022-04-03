import {Session} from "express-session"
import { SessionObject } from "../models/session"

declare module 'express-session' {
    interface SessionData {
        user: SessionObject;
    }
}