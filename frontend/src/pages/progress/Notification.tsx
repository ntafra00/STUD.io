import { Typography } from "@mui/material";
import React from "react"
import ImageContainer from "./ImageContainer";

const Notification: React.FC = () => {
    return (
        <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <ImageContainer/>
            <div style={{width: "40%", display:"flex", justifyContent: "center"}}>
                <Typography variant="h4">No data to display</Typography>
            </div>
        </div>
    )
}

export default Notification;