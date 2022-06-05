import React, { useContext, useEffect, useState } from "react"
import Drawer from "../../components/Drawer/Drawer";
import { StyledContainer, ContentWrapper } from "../../index.styled";
import Heading from "../../components/Heading";
import { ReportsContext } from "../../context/contexts/reportContext";
import { UserContext } from "../../context/contexts/userContext";
import ReportsList from "./ReportsList";
import MarkSolutionDialog from "../../components/Dialogs/MarkSolutionDialog"
import Options from "./Options";
import { TestWrapper } from "./index.styled";

const Reports: React.FC = () => {

    const {actions} = useContext(ReportsContext)
    const {user} = useContext(UserContext)
    const [dialogState, setDialogState] = useState<boolean>(false);

    useEffect(() => {
        actions.getReports();
    }, [user])

    return (
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Reports"></Heading>
                <TestWrapper>
                    <Options/>
                    <ReportsList dialogState={dialogState} setDialogState={setDialogState}></ReportsList>
                </TestWrapper>
                <MarkSolutionDialog dialogState={dialogState} setDialogState={setDialogState}/>
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Reports;
