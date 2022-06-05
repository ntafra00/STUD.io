import React, {useEffect, useState} from "react"
import Drawer from "../../components/Drawer/Drawer";
import { ContentWrapper, StyledContainer } from "../../index.styled";
import Heading from "../../components/Heading";
import CourseCard from "./CourseCard";
import AddTaskDialog from "../../components/Dialogs/AddTaskDialog"
import Course from "../../models/course"
import API from "../../utils/api/api";
import { CourseCardsWrapper } from "./index.styled";

const Courses: React.FC = () => {

    const [courses, setCourses] = useState<Course[]>([]);
    const [dialogState, setDialogState] = useState<boolean>(false);

    useEffect(() => {
        const getCourses =  async () => {
            try {
                let response = await API.get("/course");
                console.log(response);    
                if(response.status === 200)
                    setCourses([...courses, ...response.data.data]);    
            } catch (error) {
                console.log(error);
            }
        }
            getCourses(); 
            console.log(courses); 
    }, [])

    return(
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Courses"></Heading>
                <CourseCardsWrapper>
                    {courses?.map((course => {
                        return (
                            <CourseCard text={course.name} dialogState={dialogState} key={course.id} setDialogState={setDialogState} courses={courses} setCourse={setCourses} id={course.id}></CourseCard>
                        )
                    }))}
                </CourseCardsWrapper>
                <AddTaskDialog dialogState={dialogState} setDialogState={setDialogState}></AddTaskDialog>
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Courses;