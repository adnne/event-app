import axiosInterceptor from "@/utils/axiosInterceptor";


export const EventService = {
    list: (params = {}) => {
      return axiosInterceptor.get<API.Pagination<API.Event>>(
        `/events/`,
        { params },
      );
    },
   
  };
  