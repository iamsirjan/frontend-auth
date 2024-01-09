import { Box, Typography } from "@mui/material";
import ButtonComponent from "../../component/Button";
import { useLogoutMutation } from "../../service/service-auth";
import TokenService from "../../service/service-token";

const Home = () => {
  const logout = useLogoutMutation();
  const userDetails = TokenService.getTokenDetails();
  console.log(userDetails);
  console.log(userDetails);
  const handleLogout = () => {
    logout.mutateAsync();
  };
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      height="100vh"
    >
      <Box>
        <Typography>This is home page</Typography>
        <Typography>Hello {userDetails?.email}</Typography>
        <ButtonComponent title="logout" onClick={handleLogout} />
      </Box>
    </Box>
  );
};

export default Home;
