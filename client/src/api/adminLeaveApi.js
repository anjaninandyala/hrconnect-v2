import axiosInstance from "./axiosInstance";

export const getAllLeaves =
  async () => {

    const { data } =
      await axiosInstance.get(
        "/leaves/all"
      );

    return data;
  };

export const approveLeave =
  async (id) => {

    const { data } =
      await axiosInstance.put(
        `/leaves/approve/${id}`
      );

    return data;
  };

export const rejectLeave =
  async (id) => {

    const { data } =
      await axiosInstance.put(
        `/leaves/reject/${id}`
      );

    return data;
  };