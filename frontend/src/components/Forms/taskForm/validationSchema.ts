import * as Yup from "yup"

const taskValidation = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    expirationDate: Yup.date().required("This field is required")
})

export default taskValidation;