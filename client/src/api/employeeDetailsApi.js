import axiosInstance from "./axiosInstance";

export const getEmployeeById =
  async (id) => {

    const { data } =
      await axiosInstance.get(
        `/admin/employees/${id}`
      );

    return data;
  };