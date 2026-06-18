import axiosInstance from "./axiosInstance";

/*
----------------------------------
DASHBOARD
----------------------------------
*/

export const getDashboardStats =
  async () => {
    const response =
      await axiosInstance.get(
        "/admin/dashboard"
      );

    return response.data;
  };

/*
----------------------------------
PENDING EMPLOYEES
----------------------------------
*/

export const getPendingEmployees =
  async () => {
    const response =
      await axiosInstance.get(
        "/admin/pending"
      );

    return response.data;
  };

/*
----------------------------------
APPROVE EMPLOYEE
----------------------------------
*/

export const approveEmployee =
  async (id, department) => {

    const response =
      await axiosInstance.put(
        `/admin/approve/${id}`,
        {
          department,
        }
      );

    return response.data;
  };

/*
----------------------------------
REJECT EMPLOYEE
----------------------------------
*/

export const rejectEmployee =
  async (id) => {
    const response =
      await axiosInstance.put(
        `/admin/reject/${id}`
      );

    return response.data;
  };

/*
----------------------------------
APPROVED EMPLOYEES
----------------------------------
*/

export const getEmployees =
  async () => {
    const response =
      await axiosInstance.get(
        "/admin/employees"
      );

    return response.data;
  };

/*
----------------------------------
EMPLOYEE DETAILS
----------------------------------
*/

export const getEmployeeById =
  async (id) => {
    const response =
      await axiosInstance.get(
        `/admin/employees/${id}`
      );

    return response.data;
  };


