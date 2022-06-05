import * as Yup from "yup"

const markedSolutionValidation = Yup.object().shape({
    mark: Yup.string().required("This field is required").matches(/^[0-5]{1}$/, "From 1 to 5"),
    description: Yup.string().required("This field is required").max(20, "Maximum 20 characters")
})

export default markedSolutionValidation;