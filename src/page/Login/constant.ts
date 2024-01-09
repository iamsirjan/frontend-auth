import { ILoginValues } from "./interface";
import * as yup from "yup";
export const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters long.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least one letter and one number."
    ),
});

export const defaultValues: ILoginValues = {
  email: "",

  password: "",
};
