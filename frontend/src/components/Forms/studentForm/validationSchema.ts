import * as Yup from "yup"

const studentValidation = Yup.object().shape({
    email: Yup.string().required("This field is required").email("Invalid email input"),
    fullName: Yup.string().required("This field is required"),
})

export default studentValidation;