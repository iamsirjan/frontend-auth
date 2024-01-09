import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { ILoginValues } from "./interface";
import { defaultValues, schema } from "./constant";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../component/Input/TextField";
import ButtonComponent from "../../component/Button";
import { NAVIGATION_ROUTES } from "../../routes/routes.constant";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../service/service-auth";

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginValues>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const loginUser = useLoginMutation();
  const onSubmit = (data: ILoginValues) => {
    loginUser.mutateAsync({
      email: data.email,
      password: data.password,
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

          <Typography mt={2} color="#fff" fontWeight={100}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
          </Typography>

          <Typography mt={2} color="#fff" fontWeight={100}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
          </Typography>

          <Box mt={5} />
          <Link to={NAVIGATION_ROUTES.register}>
            <ButtonComponent
              title="Dont Have an Account?"
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
            Login Form
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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

            <Box mt={3}></Box>
            <ButtonComponent title="Login" />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
