import * as Yup from "yup"

const loginValidation = Yup.object().shape({
    email: Yup.string().required("This field is required").email("Invalid email"),
    password: Yup.string().required("This field is required")
})

export default loginValidation;
