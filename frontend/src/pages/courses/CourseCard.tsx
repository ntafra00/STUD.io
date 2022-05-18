import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from "../../assets/courses/SRP.jpg";
import Course from "../../models/course"
import API from '../../utils/api/api';

interface IProps {
    courses: Course[],
    id: number,
    setCourse: React.Dispatch<React.SetStateAction<Course[]>>,
    text: string,
    dialogState: boolean,
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const CourseCard: React.FC<IProps> = ({text, dialogState, setDialogState, courses, setCourse, id}) => {
  
  const handleDelete = async (id: number) => {
    try {
      let response = await API.delete(`/course/${id}`);
      if(response.status === 200)
        setCourse(courses.filter((course) => course.id !== id));
    } catch (error) {
        console.log(error);
        return;
    }
  }

  return (
    <Card sx={{ width: "40%" }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="SRP"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => setDialogState(true)}>Add task</Button>
        <Button onClick={() => handleDelete(id)}>Delete</Button>
      </CardActions>
    </Card>
  );
}

export default CourseCard;  
