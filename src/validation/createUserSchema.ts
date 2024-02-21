import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  password: yup.string().required("Password is required").min(6).max(24),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  firstName: yup.string().required("Please enter your name"),
  lastName: yup.string().required("Please enter your lastname"),
});
