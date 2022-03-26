import { Pool, QueryResult } from "pg";
import { User } from "../models/inputs/user";
import { Course } from "../models/inputs/course";

const pool = new Pool();

async function createTables() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id serial primary key not null,
            full_name text not null,
            email text not null,
            password text not null,
            role text not null
        )`);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS course(
            id serial primary key not null,
            name text not null,
            professor_id integer REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS student_course (
            student_id integer not null,
            course_id integer not null
        )`);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS task (
            id serial primary key not null,
            name text not null,
            expiration_date timestamp not null,
            course_id integer REFERENCES course(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS solution (
            id serial primary key not null,
            file_name text not null,
            mark varchar(20) not null,
            description text not null,
            task_id integer REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE,
            student_id integer REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`);
}


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

async function getUser(userEmail: string){
    const res: QueryResult = await pool.query(`
    SELECT * FROM users WHERE email = $1`, [userEmail]);

    return res.rowCount ? res.rows[0] : null;
}

async function getUsers(role: string){
    const res: QueryResult = await pool.query(`
    SELECT id, full_name, email FROM users WHERE role = $1`, [role]);

    return res.rowCount ? res.rows : null;
}

async function createCourse (courseData: Course){
    const res: QueryResult = await pool.query(`INSERT INTO course (name, professor_id) VALUES ($1, $2)`, [courseData.name, courseData.professorId])
    return res.rows[0];
}   

async function deleteCourse (courseId: number){
    const res: QueryResult = await pool.query(`DELETE from course WHERE id = $1`, [courseId]);
    return res.rowCount === 1;
}

async function updateCourse (courseName: string){
    const res: QueryResult = await pool.query(`UPDATE course SET name = $1`, [courseName]);
    return res.rowCount === 1;
}

async function addStudentToCourse(studentId: number, courseId: number) {
    const res: QueryResult = await pool.query(
        `INSERT INTO student_course (student_id, course_id) 
        VALUES ($1, $2)`
        , [studentId, courseId]);

    return res.rowCount === 1;

}

async function getProfessorCourses (professorId: number) {
    const res: QueryResult = await pool.query(
        `SELECT * FROM courses WHERE professor_id = $1`, [professorId]);
    return res.rowCount ? res.rows : null;
}

async function getStudentCourses (studentId: number) {
    const res: QueryResult = await pool.query(
        `SELECT * FROM courses AS co 
        INNER join student_course AS sco ON co.id = sco.course_id 
        WHERE sco.student_id = $1`, [studentId]);
    return res.rowCount ? res.rows : null;
}

export { createTables, getUser, deleteUser, createUser, createCourse, deleteCourse, updateCourse, getProfessorCourses, getStudentCourses, getUsers}
