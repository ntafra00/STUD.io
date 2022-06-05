import React, {useContext, useEffect} from "react"
import { useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import { TextField, Button } from "@mui/material";
import MarkedSolution from "../../../inputs/markedSolution";
import markedSolutionValidation from "./validationSchema"
import { ReportsContext } from "../../../context/contexts/reportContext";
import { FieldWrapper, ButtonWrapper } from "../index.styled";
import { stat } from "fs";


interface IProps {
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const SolutionForm: React.FC<IProps> = ({setDialogState}) => {
    const {register, handleSubmit, setError, reset, formState } = useForm<MarkedSolution>({
        mode: "onSubmit",
        resolver: yupResolver(markedSolutionValidation),
        shouldFocusError: true
    });

    const {state, actions} = useContext(ReportsContext);

    const onSubmit = (data) => {
        let solutionData = {...data, id: state.selectedReport.id}
        let error = actions.postReview(solutionData);
    
        console.log(error);
        setDialogState(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldWrapper>
                <TextField
                    {...register("mark")}
                    fullWidth
                    variant="standard"
                    label="Mark"
                    type="text"
                    error={!!formState.errors.mark?.message}
                    helperText={formState.errors.mark?.message}
                />
            </FieldWrapper>
            <FieldWrapper>
                <TextField
                    {...register("description")}
                    fullWidth
                    variant="standard"
                    label="Description"
                    type="text"
                    error={!!formState.errors.description?.message}
                    helperText={formState.errors.description?.message}
                />
            </FieldWrapper>
            <ButtonWrapper>
                <Button onClick={() => {setDialogState(false); actions.removeSelectedReport()}}>Close</Button>
                <Button type="submit">Add</Button>
            </ButtonWrapper>
        </form>
    )
}

export default SolutionForm;