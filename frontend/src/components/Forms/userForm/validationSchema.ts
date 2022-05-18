import * as Yup from "yup"

const userValidation = Yup.object().shape({
    password: Yup.string().required("This field is required").min(8, "Minimum 8 characters"),
    repeatedPassword: Yup.string().required("This field is required").min(8, "Minimum 8 characters") 
})

export default userValidation;