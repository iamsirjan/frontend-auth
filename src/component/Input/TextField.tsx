import {
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FC, useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { IInputField } from "./interface";

const CustomInput: FC<{
  field: ControllerRenderProps<FieldValues, string>;
  props: IInputField;
}> = ({ field, props }) => {
  const {
    name,
    placeholder = " ",
    type = "text",
    maxLengthInput,
    color = "#959595",
    ...otherProps
  } = props;

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  if (props.type === "password") {
    return (
      <FormControl fullWidth variant="standard">
        <InputLabel htmlFor={name} style={{ color }}>
          {props.label}
        </InputLabel>
        <Input
          id={name}
          placeholder={placeholder}
          {...field}
          {...otherProps}
          type={passwordVisible ? "text" : type}
          inputProps={{
            maxLength: maxLengthInput,
            style: { color },
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel htmlFor={name} style={{ color }}>
        {props.label}
      </InputLabel>
      <Input
        id={name}
        placeholder={placeholder}
        {...field}
        type={type}
        {...otherProps}
        inputProps={{
          maxLength: maxLengthInput,
          style: { color },
        }}
      />
    </FormControl>
  );
};

const InputField: FC<IInputField> = (props) => {
  const { errors, name, control, helperText } = props;

  return (
    <FormControl fullWidth margin="normal" error={!!errors?.[name]}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <CustomInput field={field} props={props} />
            <FormHelperText>{helperText}</FormHelperText>
            <FormHelperText sx={{ marginRight: "0px" }}>
              {error?.message}
            </FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
};

export default InputField;
