import axiosInstance from './axiosConfig.js';







export const getFinanceList = async (params) => {
  const response = await axiosInstance.get('/api/finance/list', { params });
  return response.data;
};


export const getDailySummary = async (yearMonth, storeSeq) => {
  const response = await axiosInstance.get('/api/finance/daily-summary', {
    params: { yearMonth, storeSeq }
  });
  return response.data;
};


export const insertFinance = async (data) => {
  const response = await axiosInstance.post('/api/finance', data);
  return response.data;
};