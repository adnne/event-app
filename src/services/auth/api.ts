import axiosInterceptor from "@/utils/axiosInterceptor";
import { get } from "lodash";


export const AuthService = {
  login: (data: any) => {
    return axiosInterceptor.post("/auth/login/", data);
  },

  register: (data: any) => {
    return axiosInterceptor.post("/auth/registration/", data);
  },

  getUser : () => {
    return axiosInterceptor.get("/auth/user/");
  }
}