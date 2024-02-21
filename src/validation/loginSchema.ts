import * as yup from "yup";

export const loginSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
});
