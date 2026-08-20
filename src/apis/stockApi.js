import axiosInstance from './axiosConfig.js';








export const getStockList = async (params) => {
  const response = await axiosInstance.get('/api/stocks', { params });
  return response.data;
};



export const createStockMaster = async (stockData) => {

  const response = await axiosInstance.post('/api/stocks', stockData);
  return response.data;
};



export const getStockBatches = async (stockSeq) => {
  const response = await axiosInstance.get(`/api/stocks/${stockSeq}/batches`);
  return response.data;
};



export const getStockHistories = async (stockSeq) => {
  const response = await axiosInstance.get(`/api/stocks/${stockSeq}/histories`);
  return response.data;
};














export const createIncomingStock = async (storeSeq, data) => {
  const response = await axiosInstance.post(
    "/api/stocks/incoming",
    data,
    {
      params: {
        storeSeq: Number(storeSeq)
      }
    }
  );

  return response.data;
};



export const createOutboundStock = async (data) => {

  const response = await axiosInstance.post('/api/stocks/outbound', data);
  return response.data;
};



export const createAdjustStock = async (data) => {

  const response = await axiosInstance.post('/api/stocks/adjust', data);
  return response.data;
};


export const getStockExpiringSoonCountApi = async (stockId) => {
  const response = await axiosInstance.get(`/api/stocks/countExpiringSoon`);
  return response.data;
};

export const updateStock = async (stockId, stockData) => {
  const response = await axiosInstance.put(`/api/stocks/${stockId}`, stockData);
  return response.data;
};

export const deleteStock = async (stockId) => {
  const response = await axiosInstance.delete(`/api/stocks/${stockId}`);
  return response.data;
};







export const getStockHistoryDashboard = async (storeSeq) => {
  const response = await axiosInstance.get('/api/stock-history/dashboard', {
    params: { storeSeq }
  });
  return response.data;
};



export const getStockHistoryModal = async (params) => {
  const response = await axiosInstance.get('/api/stock-history/modal', { params });
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get('/api/categories');
  return response.data;
};







export const getRecentNotifications = async (storeSeq) => {
  const response = await axiosInstance.get('/api/notifications/recent', {
    params: { storeSeq }
  });
  return response.data;
};



export const markNotificationAsRead = async (notificationSeq) => {
  const response = await axiosInstance.patch(`/api/notifications/${notificationSeq}/read`);
  return response.data;
};