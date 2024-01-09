export const api = {
  login: "login",
  register: "register",
};

export interface APIResponse<T = any> {
  data: T;
  status: 0 | 1;
  token: string;
  message: string;
}
