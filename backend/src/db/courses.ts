import { Pool, QueryResult } from "pg";
import { Course } from "../models/course";

// create course
// update course
// delete course
// get courses

const pool = new Pool();

async function createCourse (courseData: Course){
    const res = await pool.query(`INSERT INTO course (name, professor_id) VALUES ($1, $2)`, [courseData.name, courseData.professorId])
    return res.rows[0];
}   

async function deleteCourse (courseId: number){
    const res = await pool.query(`DELETE from course WHERE id = $1`, [courseId]);
    return res.rowCount === 1;
}

async function updateCourse (courseName: string){
    const res = await pool.query(`UPDATE course SET name = $1`, [courseName]);
    return res.rowCount === 1;
}

// async function getCourses () {
    
// }

export {createCourse, deleteCourse, updateCourse}