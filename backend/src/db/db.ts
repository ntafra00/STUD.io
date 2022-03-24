import { Pool } from "pg";

const pool: Pool = new Pool()

async function createTables() {

    await pool.query(`
    CREATE TABLE IF NOT EXISTS user (
        id serial primary key not null,
        full_name text not null,
        password text not null,
        email text not null,
        role text not null
    )`)

    await pool.query(`
    CREATE TABLE IF NOT EXISTS course (
        id serial primary key not null,
        name text not null,
        professor_id integer REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
    )`)

    await pool.query(`
    CREATE TABLE IF NOT EXISTS student_course (
        student_id integer not null,
        course_id integer not null
    )`)

    await pool.query(`
    CREATE TABLE IF NOT EXISTS task (
        id serial primary key not null,
        name text not null,
        expiration_date timestamp not null,
        course_id integer REFERENCES course(id) ON DELETE CASCADE ON UPDATE CASCADE
    )`)

    await pool.query(`
    CREATE TABLE IF NOT EXISTS solution (
        id serial primary key not null,
        file_name text not null,
        mark integer not null,
        task_id integer REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE
    )`)

    console.log("Tables in DB created");

    await insertDummyData();
}

async function insertDummyData() {
    await pool.query(`
    INSERT INTO student (full_name, password, email, is_demonstrator)
    VALUES ('Nikola Tafra', 'abcdefg', 'ntafra00@fesb.hr', 'true')`)
}


export { createTables }