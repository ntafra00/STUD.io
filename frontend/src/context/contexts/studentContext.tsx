import React, {createContext, useState} from "react"
import Student from "../../models/student"
import API from "../../utils/api/api"
import StudentInput from "../../inputs/student"
import {generatePassword} from "../../utils/helpers"

interface IStudentsContext {
    state: {
        students: Student[] | null;
        selectedStudent: Student | null;
    } | null
    actions: {
        getStudents: Function;
        removeStudent: Function;
        addStudent: Function;
        setSelectedStudent: Function;
        removeSelectedStudent: Function;
        editStudent: Function;
    } | null
}

interface IProviderProps {
    children: React.ReactNode
}

export const StudentsContext = createContext<IStudentsContext>({
    state: null,
    actions: null,
})

const initialValue = {
    students: [],
    selectedStudent: null
}

const StudentsProvider: React.FC<IProviderProps> = ({children}) => {
    const [state, setState] = useState(initialValue);
    
    const getStudents = async () => {
        try {
            let response = await API.get("/student");
            if(response.status === 200)
                setState({...state, students: response.data.data});
        } catch (error) {
            console.log(error);
        }
    }

    const removeStudent = async (id: number) => {
        try {
            let response = await API.delete(`/student/?id=${id}`)
            if(response.status === 200)
            {
                let newStudents = state!.students!.filter((student) => student.id !== id);
                setState({...state, students: newStudents});
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addStudent =  async (studentData: StudentInput) => {

        console.log(studentData);
        try {
            let response = await API.post("/student", {
                email: studentData.email,
                fullName: studentData.fullName,
                password: generatePassword(studentData.fullName)
            })

            if(response.status === 200)
            {
                let newStudent: Student = {...response.data.data}
                let currentStudents = state.students;
                currentStudents.push(newStudent);
                setState({...state, students: currentStudents})
            }
        } catch (error) {
            return error;
        }
    }

    const setSelectedStudent = (id: number) => {
        let foundStudent = state.students.find((student) => student.id === id)
        setState({...state, selectedStudent: foundStudent})
    }

    const removeSelectedStudent = () => {
        setState({...state, selectedStudent: null})
    }

    const editStudent = async (studentData: StudentInput) => {
        try {
            let response = await API.put(`/student/?id=${state.selectedStudent.id}`, {
                email: studentData.email,
                fullName: studentData.fullName
            })
            if(response.status === 200)
            {
                let studentIndex = state.students.findIndex((student) => student.id === state.selectedStudent.id)
                let updatedStudents = state.students;
                updatedStudents[studentIndex] = {...updatedStudents[studentIndex],email: studentData.email, full_name: studentData.fullName};
                setState({...state, students: updatedStudents})
            }
        } catch (error) {
            return error;
        }
    }

    return (
        <StudentsContext.Provider value={{state: state, actions: {getStudents, removeStudent, addStudent, setSelectedStudent, removeSelectedStudent, editStudent} }}>
            {children}
        </StudentsContext.Provider>
    )
}

export default StudentsProvider;
