import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import TokenService, { TokenInfo } from "./service-token";

import { BroadcastChannel } from "broadcast-channel";
import { HttpClient } from "./service-axios";
import { NAVIGATION_ROUTES } from "../routes/routes.constant";
import { toastFail, toastSuccess } from "./service-toast";
import { APIResponse, api } from "./service-api";
import { IRegisterValues } from "../page/Register/interface";

const logoutChannel = new BroadcastChannel("logout");
const loginChannel = new BroadcastChannel("login");
const loginBroadcast = "logged_in";

export interface LoginDetails {
  email: string;
  password: string;
}

export interface IUserResponse {
  firstname: string;
  lastname: string;
  email: string;
}
export const authTokenKey = "authToken";
export const auth = "userInfo";
const authTokenDetails = "authTokenDetails";

const initLogout = () => {
  try {
    TokenService.clearToken();
    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve(false);
  }
};

const useLogoutMutation = (noToast?: boolean) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(initLogout, {
    onSuccess: () => {
      logoutChannel.postMessage("Logout");
      queryClient.clear();
      queryClient.setQueryData(authTokenKey, () => false);

      navigate(NAVIGATION_ROUTES.base, { replace: true });
      !noToast && toastSuccess("Logged out Succesfully");
    },
  });
};

const initLogin = (loginData: LoginDetails) => {
  return HttpClient.post<APIResponse<IUserResponse>>(api.login, loginData);
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(initLogin, {
    onSuccess: (response) => {
      loginChannel.postMessage(loginBroadcast);
      const tokens = {
        token: response.data.token,
      };
      TokenService.setToken(tokens.token);
      localStorage.setItem("userDetails", JSON.stringify(response.data));
      queryClient.setQueryData(authTokenKey, () => true);
      navigate("/");
      toastSuccess("Login Successful!!");
    },
    onError: (error) => {
      const loginErr = error as AxiosError<{ message: string; error: string }>;
      toastFail(
        loginErr.response?.data?.message ??
          loginErr.response?.data?.error ??
          "Login failed !"
      );
    },
  });
};

const signUpUser = async (data: IRegisterValues) => {
  const response = await HttpClient.post<APIResponse<IUserResponse>>(
    api.register,
    data
  );
  return response;
};

export const useSignUpUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(signUpUser, {
    onSuccess: (response) => {
      const tokens = {
        token: response.data.token,
      };
      loginChannel.postMessage(loginBroadcast);
      TokenService.setToken(tokens.token);
      localStorage.setItem("userDetails", JSON.stringify(response.data));

      queryClient.setQueryData(authTokenKey, () => true);
      navigate(NAVIGATION_ROUTES.base);
    },
    onError: (error) => {
      const loginErr = error as AxiosError<{ message: string; error: string }>;
      toastFail(
        loginErr.response?.data?.message ??
          loginErr.response?.data?.error ??
          "Registration failed !"
      );
    },
  });
};

const checkAuthentication = async () => {
  if (TokenService.getTokenDetails()) {
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
};

/**
 * Check if user is authenticated
 * @returns boolean
 */
const useAuthentication = () => {
  const queryClient = useQueryClient();

  return useQuery(authTokenKey, checkAuthentication, {
    onSuccess: () => {
      const tokenDetails = TokenService.getTokenDetails();
      if (tokenDetails) {
        queryClient.setQueryData<TokenInfo>(authTokenDetails, {
          ...tokenDetails,
        });
      }
    },
  });
};

const useLoginTokenDetailQuery = () => {
  return useQuery<unknown, unknown, TokenInfo>(authTokenDetails);
};

export {
  useAuthentication,
  useLoginMutation,
  useLoginTokenDetailQuery,
  useLogoutMutation,
};
