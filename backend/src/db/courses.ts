import { Pool, QueryResult } from "pg";
import { Course } from "../models/inputs/course";

// create course
// update course
// delete course
// get courses

const pool = new Pool({
    user: "dev",
    host: "localhost",
    database: "student",
    password: "student",
    port: 5432
});

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

export {createCourse, deleteCourse, updateCourse, addStudentToCourse, getProfessorCourses, getStudentCourses}