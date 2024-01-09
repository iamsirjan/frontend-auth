import { IRegisterValues } from "./interface";
import * as yup from "yup";
export const schema = yup.object().shape({
  firstname: yup.string().required("first name is required."),
  lastname: yup.string().required("lastname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters long.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least one letter and one number."
    ),
  confirm_password: yup
    .string()
    .required("password is required")
    .oneOf(
      [yup.ref("password"), ""],
      "password and confirm password must match"
    ),
});

export const defaultValues: IRegisterValues = {
  email: "",
  firstname: "",
  lastname: "",
  password: "",
  confirm_password: "",
};
