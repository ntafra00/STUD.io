import * as Yup from "yup"

const studentValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email input").required("This field is required"),
    fullName: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required").min(8)
})

export default studentValidation;