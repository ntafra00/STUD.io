import { Pool, QueryResult } from "pg";
import { User } from "../models/user";

const pool = new Pool()

async function createUser(userData: User) {
    const res: QueryResult = await pool.query(
        `INSERT INTO users (full_name, email, password, role)
        VALUES ($1, $2, $3, $4)`
        , [userData.fullName, userData.email, userData.password, userData.role])

    return res.rows[0]
}

async function deleteUser(userEmail: string) {
    const res: QueryResult = await pool.query(`
    DELETE FROM users WHERE email = $1`, [userEmail]);

    return res.rowCount === 1
}

export { createUser, deleteUser }