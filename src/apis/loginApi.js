import axiosInstance from './axiosConfig';


























































export const loginApi = (loginData) => {
  return axiosInstance.post('/auth/login', loginData);
};







export const findIdApi = (findIdData) => {
  return axiosInstance.post('/find/findId', findIdData);
};







export const checkCodeApi = (checkCodeData) => {
  return axiosInstance.post('/find/check-code', checkCodeData);
};







export const findPasswordSendCodeApi = (findPasswordData) => {
  return axiosInstance.post('/find/findPw', findPasswordData);
};







export const checkPasswordCodeApi = (checkCodeData) => {
  return axiosInstance.post('/find/password/check-code', checkCodeData);
};








export const resetPasswordApi = (resetPasswordData) => {
  return axiosInstance.put('/find/password/reset', resetPasswordData);
};




export const logoutApi = () => {
  return axiosInstance.post('/auth/logout');
};