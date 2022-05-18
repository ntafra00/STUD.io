import React from "react"
import Card from "@mui/material/Card"
import { CardContent, FormControlLabel, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/system";
import FileForm from "../../components/Forms/fileForm/index"

interface IProps {
    name: string,
    expiration_date: Date,
    id: number,
}

const TaskCard: React.FC<IProps> = ({name, expiration_date, id}) => {

    const convertDate = (date: Date) => {
        let dateToString = date.toString();
        return `${dateToString.split("T")[0]} ${dateToString.split("T")[1].split(".")[0]}`
    }   

    return(
        <Card sx={{ maxWidth: 400 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                    <Typography variant="body2" color="text.secondary">
                        Upload until: <strong>{convertDate(expiration_date)}</strong>
                    </Typography>
                </Box>
                <Box sx={{marginTop: "30px"}}>
                    <FileForm id={id}></FileForm>
                </Box>
            </CardContent>
        </Card>
    )
}

export default TaskCard;