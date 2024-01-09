import { RouteObject, useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import LoginPage from "../page/Login";
import RegisterPage from "../page/Register";
import Home from "../page/Home";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { useAuthentication } from "../service/service-auth";

const openRoutes: RouteObject[] = [
  {
    path: NAVIGATION_ROUTES.base,
    element: <LoginPage />,
  },
  {
    path: NAVIGATION_ROUTES.register,
    element: <RegisterPage />,
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: NAVIGATION_ROUTES.base,
    element: <Home />,
  },
];

const AppRoutes = () => {
  const { data: isAuthenticated, isLoading } = useAuthentication();

  const element = useRoutes(isAuthenticated ? protectedRoutes : openRoutes);

  if (isLoading) {
    return <CircularProgress />;
  }

  return <Suspense fallback={<CircularProgress />}>{element}</Suspense>;
};

export default AppRoutes;
