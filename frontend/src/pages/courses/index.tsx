import React, {useState} from "react"
import Drawer from "../../components/Drawer/Drawer";
import { ContentWrapper, StyledContainer } from "../../index.styled";
import Heading from "../../components/Heading";

const Courses: React.FC = () => {

    const [dialogState, setDialogState] = useState<boolean>(false);


    return(
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Courses"></Heading>
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Courses;