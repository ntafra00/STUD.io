import * as Yup from "yup"

const loginValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email input").required("This field is required"),
    password: Yup.string().required("This field is required")
})

export default loginValidation;