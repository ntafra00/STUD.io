import { Pool, QueryResult } from "pg";
import { User } from "../models/inputs/user/user";
import { Course } from "../models/inputs/course/course";
import { Solution } from "../models/inputs/solution/solution";
import { Task } from "../models/inputs/task/task";
import { updatedCourse } from "../models/inputs/course/updateCourse";
import { updatedTask } from "../models/inputs/task/updateTask";
import { checkSolution } from "../models/inputs/solution/checkSolution";
import { updatedStudent } from "../models/inputs/updatedStudent";
import { markSolution } from "../models/inputs/solution/markSolution";

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
            checked boolean not null,
            task_id integer REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE,
            student_id integer REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`);
}

// user queries 

async function createUser(userData: User) {
    const res: QueryResult = await pool.query(
        `INSERT INTO users (full_name, email, password, role)
        VALUES ($1, $2, $3, $4) RETURNING *`
        , [userData.fullName, userData.email, userData.password, userData.role])

    return res.rowCount ? res.rows[0] : null; 
}

async function deleteUser(userId: number) {
    const res: QueryResult = await pool.query(`
    DELETE FROM users WHERE id = $1`, [userId]);

    return res.rowCount === 1
}

async function getUser(userEmail: string){
    const res: QueryResult = await pool.query(`
    SELECT * FROM users WHERE email = $1`, [userEmail]);

    return res.rowCount ? res.rows[0] : null;
}

async function getUsers(role: string){
    const res: QueryResult = await pool.query(`
    SELECT id, full_name, email FROM users WHERE role = $1 ORDER BY full_name ASC`, [role]);

    return res.rowCount ? res.rows : null;
}

async function updateUser(password: string, id: number) {
    const res: QueryResult = await pool.query(`
    UPDATE users SET password = $1 WHERE id = $2`, [password, id]);

    return res.rowCount === 1;
}

async function updateStudent (newData: updatedStudent) {
    const res: QueryResult = await pool.query(`UPDATE users SET email = $1, full_name = $2 WHERE id = $3`, [newData.email, newData.fullName, newData.id]);

    return res.rowCount === 1;
}

// course queries

async function getCourse (courseName: string) {
    const res: QueryResult = await pool.query(`SELECT * FROM course WHERE name = $1`, [courseName])
    return res.rowCount ? res.rows[0] : null;
}

async function  getCourseById (courseId: number) {
    const res: QueryResult = await pool.query(`SELECT * FROM course WHERE id = $1`, [courseId]);
    return res.rowCount ? res.rows[0] : null;
}

async function createCourse (courseData: Course){
    const res: QueryResult = await pool.query(`INSERT INTO course (name, professor_id) VALUES ($1, $2) RETURNING *`, [courseData.name, courseData.professorId])
    return res.rowCount ? res.rows[0] : null;
}   

async function deleteCourse (courseId: number){
    const res: QueryResult = await pool.query(`DELETE from course WHERE id = $1`, [courseId]);
    return res.rowCount === 1;
}

async function updateCourse (courseData: updatedCourse){
    const res: QueryResult = await pool.query(`UPDATE course SET name = $1 WHERE id = $2`, [courseData.name, courseData.id]);
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
        `SELECT id, name FROM course WHERE professor_id = $1`, [professorId]);
    return res.rowCount ? res.rows : null;
}

async function getStudentCourses (studentId: number) {
    const res: QueryResult = await pool.query(
        `SELECT id, name FROM course AS co 
        INNER join student_course AS sco ON co.id = sco.course_id 
        WHERE sco.student_id = $1`, [studentId]);
    return res.rowCount ? res.rows : null;
}

async function getStudentCourseById (studentId: number, courseId: number) {
    const res: QueryResult = await pool.query(
        `SELECT * FROM student_course WHERE student_id = $1 AND course_id = $2`, [studentId, courseId]
    )
    
    return res.rowCount === 1;

}

// solution queries

async function createSolution (solution: Solution) {
    const res: QueryResult = await pool.query(
        `INSERT INTO solution (file_name, mark, description, checked, task_id, student_id) VALUES ($1, $2, $3, $4, $5 ,$6) 
        RETURNING *`, [solution.fileName, solution.mark, solution.description, solution.checked, solution.taskId, solution.studentId])

    return res.rowCount ? res.rows[0] : null;
}

async function deleteSolution (solutionId: number) {
    const res: QueryResult = await pool.query(
        `DELETE FROM solution WHERE id = $1`, [solutionId]);
    return res.rowCount === 1;
}

async function getSolution (solutionData: checkSolution) {
    const res: QueryResult = await pool.query(
        `SELECT * FROM solution WHERE task_id = $1 AND student_id = $2`, [solutionData.taskId, solutionData.studentId]);

    return res.rowCount ? res.rows[0] : null;
}

async function markSolution (solutionData: markSolution) {
    const res: QueryResult = await pool.query(
        `UPDATE solution SET mark = $1, description = $2 WHERE id = $3`, [solutionData.mark, solutionData.description, solutionData.id]
    )

    return res.rowCount === 1;
}

async function setSolutionAsChecked (id: number) {
    const res: QueryResult = await pool.query(
        `UPDATE solution SET checked = true WHERE id = $1`, [id]);
    
    return res.rowCount === 1;
}

async function getSolutionById (solutionId: number) {
    const res: QueryResult = await pool.query(
        `SELECT * FROM solution WHERE id = $1`, [solutionId]);
    
    return res.rowCount ? res.rows[0] : null;
}

async function getSolutionByTaskId (taskId: number) {
    const res: QueryResult = await pool.query(
        `SELECT * FROM solution WHERE task_id = $1`, [taskId]);
    
    return res.rowCount ? res.rows : null;
}

async function getAllSolutions (mark: string) {
    const res: QueryResult = await pool.query(
        `SELECT u.full_name, s.file_name, s.id, s.task_id FROM users AS u INNER JOIN solution AS s ON u.id = s.student_id WHERE s.mark = $1`, [mark]);
    
    return res.rowCount ? res.rows : null;
}

async function getStudentSolutions (studentId: number) {
    const res: QueryResult = await pool.query(
        `SELECT * FROM solution WHERE student_id = $1`, [studentId]);
    return res.rowCount ? res.rows : null;
}

async function getSolutionGraphData (studentId: number) {
    const res: QueryResult = await pool.query(
        `SELECT s.id, s.mark, t.expiration_date FROM solution AS s INNER JOIN task AS t ON s.task_id = t.id WHERE s.mark != 'Not given' AND s.student_id = $1`, [studentId])
    return res.rowCount ? res.rows : null;
}

// task queries

async function createTask (task: Task) {
    const res: QueryResult = await pool.query(
        `INSERT INTO task (name, expiration_date, course_id) VALUES ($1, $2, $3) RETURNING *`, [task.name, task.expirationDate, task.courseId]);
    return res.rowCount ? res.rows[0] : null;    
}

async function deleteTask (taskId: number) {
    const res: QueryResult = await pool.query(
        `DELETE FROM task WHERE id = $1 RETURNING *`, [taskId]);
    return res.rowCount === 1;
}

async function updateTask (task: updatedTask) {
    const res: QueryResult = await pool.query(
        `UPDATE task SET name = $1, expiration_date = $2 WHERE id = $3`, [task.name, task.expirationDate, task.id]);
    return res.rowCount === 1;
}

async function getTasks (courseId: number) {
    const res: QueryResult = await pool.query(
        `SELECT id, name, expiration_date FROM task WHERE course_id = $1`, [courseId]);
    return res.rowCount ? res.rows : null;
}

async function getTask (taskName: string) {
    const res: QueryResult = await pool.query(
        `SELECT * FROM task WHERE name = $1`, [taskName]);
    return res.rowCount ? res.rows[0] : null;
}

async function checkForTask (taskName: string, taskId: number) {
    const res: QueryResult = await pool.query(
        `SELECT * FROM task WHERE name = $1 AND id != $2`, [taskName, taskId]
    )
    return res.rowCount ? res.rows[0] : null;
}

async function getTaskById (taskId: number) {
    const res: QueryResult = await pool.query(
        `SELECT * FROM task WHERE id = $1`, [taskId]);

    return res.rowCount ? res.rows[0] : null;
}

export { createTables, getUser, deleteUser, createUser, createCourse, deleteCourse, updateCourse, getProfessorCourses, getStudentCourses, getUsers, createSolution, getCourse, deleteSolution, addStudentToCourse, createTask, deleteTask, getTasks, getCourseById, getTask, getTaskById , updateTask, getSolution, getSolutionById, getStudentCourseById, getSolutionByTaskId, updateStudent, updateUser, getAllSolutions, getStudentSolutions, markSolution, setSolutionAsChecked, getSolutionGraphData, checkForTask}
