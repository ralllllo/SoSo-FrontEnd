import axiosInstance from './axiosConfig.js';








export const getEmployeeList = async (storeSeq) => {
  const response = await axiosInstance.get('/api/employees', {
    params: { storeSeq }
  });
  return response.data;
};



export const registerEmployee = async (employeeData) => {

  const response = await axiosInstance.post('/api/employees', employeeData);
  return response.data;
};



export const checkInEmployee = async (employeeSeq) => {
  const response = await axiosInstance.post(`/api/employees/${employeeSeq}/check-in`);
  return response.data;
};



export const checkOutEmployee = async (employeeSeq) => {
  const response = await axiosInstance.post(`/api/employees/${employeeSeq}/check-out`);
  return response.data;
};



export const getAttendanceHistory = async (employeeSeq, yearMonth) => {
  const response = await axiosInstance.get(`/api/employees/${employeeSeq}/attendance`, {
    params: { yearMonth }
  });
  return response.data;
};