import axiosInterceptor from "@/utils/axiosInterceptor";
import { create, get } from "lodash";


export const EventService = {
    list: (params = {}) => {
      return axiosInterceptor.get<API.Pagination<API.Event>>(
        `/events/`,
        { params },
      );
    },

    create: (data) => {
      return axiosInterceptor.post<API.Event>(`/events/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    get: (id:string) => {
      return axiosInterceptor.get<API.Event>(`/events/${id}`);
    },
   
  };
  