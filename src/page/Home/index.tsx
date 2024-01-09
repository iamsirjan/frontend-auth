import { Box, Typography } from "@mui/material";
import ButtonComponent from "../../component/Button";
import { useLogoutMutation } from "../../service/service-auth";

const Home = () => {
  const logout = useLogoutMutation();
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
        <Typography>Hello User</Typography>
        <ButtonComponent title="logout" onClick={handleLogout} />
      </Box>
    </Box>
  );
};

export default Home;
