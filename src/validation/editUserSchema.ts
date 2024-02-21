import * as yup from "yup";

export const editUserSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  firstName: yup.string().required("Please enter your name"),
  lastName: yup.string().required("Please enter your lastname"),
});
