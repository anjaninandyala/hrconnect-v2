import axiosInstance from "./axiosInstance";

export const applyLeave =
  async (leaveData) => {

    const { data } =
      await axiosInstance.post(
        "/leaves/apply",
        leaveData
      );

    return data;
  };

export const getMyLeaves =
  async () => {

    const { data } =
      await axiosInstance.get(
        "/leaves/my"
      );

    return data;
  };