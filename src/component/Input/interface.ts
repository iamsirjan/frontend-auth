import { InputProps } from "@mui/material";
import { Control, FieldErrorsImpl } from "react-hook-form";

export interface IInputField extends InputProps {
  control: Control<any, any>;
  errors: Partial<FieldErrorsImpl<Record<string, any>>>;
  name: string;
  label: string;
  placeholder?: string;
  helperText?: string;
  maxLengthInput?: number;
}
