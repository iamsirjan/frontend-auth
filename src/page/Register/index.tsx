import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { IRegisterValues } from "./interface";
import { defaultValues, schema } from "./constant";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../component/Input/TextField";
import ButtonComponent from "../../component/Button";
import { NAVIGATION_ROUTES } from "../../routes/routes.constant";
import { Link } from "react-router-dom";
import { useSignUpUser } from "../../service/service-auth";

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterValues>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const register = useSignUpUser();
  const onSubmit = (data: IRegisterValues) => {
    register.mutateAsync({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
    });
  };
  return (
    <Box
      bgcolor="#74E1E8ff"
      height={"100vh"}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box display={"flex"} width={"60%"}>
        <Box
          width="40%"
          padding="20px"
          boxShadow="0px 0px 10px 0px #888888"
          bgcolor="#3786BE"
        >
          <Typography fontSize={"30px"} fontWeight={600} color="#fff">
            Information
          </Typography>
          <Typography mt={5} color="#fff" fontWeight={100}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>

          <Typography mt={2} color="#fff" fontWeight={100}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
          </Typography>

          <Box mt={5} />
          <Link to={NAVIGATION_ROUTES.base}>
            <ButtonComponent
              title="Have an Account"
              background="#fff"
              color="#000"
              width="fit-content"
            />
          </Link>
        </Box>
        <Box
          width="45%"
          padding="20px"
          boxShadow="0px 0px 10px 0px #888888"
          bgcolor="white"
        >
          <Typography fontSize={"30px"} fontWeight={"600"} color={"#498FBFff"}>
            Register Form
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              name="firstname"
              errors={errors}
              control={control}
              label="Enter your first  name"
              type={"text"}
              placeholder="First Name"
            />

            <InputField
              name="lastname"
              errors={errors}
              control={control}
              label="Enter your last name"
              type="text"
              placeholder="Last Name"
            />

            <InputField
              name="email"
              errors={errors}
              control={control}
              label="Enter your email"
              type="text"
              placeholder="email"
            />

            <InputField
              name="password"
              errors={errors}
              control={control}
              label="Enter your password"
              type="password"
              placeholder="password"
            />
            <InputField
              name="confirm_password"
              errors={errors}
              control={control}
              label="Confirm Password"
              type="password"
              placeholder="confirm password"
            />

            <Box mt={3}></Box>
            <ButtonComponent title="Register" />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
