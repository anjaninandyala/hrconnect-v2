import axiosInstance from "./axiosInstance";

export const getEmployees =
  async () => {
    const { data } =
      await axiosInstance.get(
        "/admin/employees"
      );

    return data;
  };
export const getEmployeeById =
  async (id) => {

    const { data } =
      await axiosInstance.get(
        `/admin/employees/${id}`
      );

    return data;
  };
export const getEmployeeStatus =
  async () => {
    const response =
      await axiosInstance.get(
        "/employee/status"
      );

    return response.data;
  };

export const getMyProfile = async () => {
  const response =
    await axiosInstance.get(
      "/employee/me"
    );

  return response.data;
};