import React from "react"
import { useForm} from "react-hook-form";
import API from "../../../utils/api/api"
import IconButton from "@mui/material/IconButton";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box } from "@mui/system";

interface IProps {
    id: number;
}

const FileForm: React.FC<IProps> = ({id}) => {

    const {register, handleSubmit} = useForm({
        mode: "onSubmit",
    });

    const onSubmit = async (data) => {
        const solutionData = new FormData();
        solutionData.append("file", data.file[0]);
        solutionData.append("mark", "Not given");
        solutionData.append("description", "Not given");
        solutionData.append("taskId", String(id));
        solutionData.append("checked", "false");
        try {
            let response = await API.post("/solution", solutionData)
        } catch (error) {
            console.log(error);
        }
        // console.log(data.file[0]);
    }

    return (  
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <input {...register("file")} type="file"></input>
                <IconButton type="submit"><UploadFileIcon></UploadFileIcon></IconButton>
            </Box>
        </form>
    )
}

export default FileForm;