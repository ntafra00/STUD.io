import * as Yup from "yup"

const taskValidation = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    expirationDate: Yup.string().required("This field is required").matches(/^[1-12]{1}\/[1-31]{1}\/202[2-9]{1}\ (0[1-9]{1} | [10-12]{1}):(0[0-9]{1} | [10-59]{1}) (PM | AM)$/)
})

export default taskValidation;