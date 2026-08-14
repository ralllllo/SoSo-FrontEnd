import axiosInstance from './axiosConfig';






const GROUP_BUY_BASE_URL = '/api/group-buys';

export const groupBuyApi = {




  getGroupBuys: async (filter = 'all') => {
    const response = await axiosInstance.get(GROUP_BUY_BASE_URL, {
      params: { filter }
    });
    return response.data;
  },




  getParticipatedGroupBuys: async () => {
    const response = await axiosInstance.get(`${GROUP_BUY_BASE_URL}/participated`);
    return response.data;
  },




  getCreatedCount: async () => {
    const response = await axiosInstance.get(`${GROUP_BUY_BASE_URL}/created/count`);
    return response.data;
  },




  getParticipatedCount: async () => {
    const response = await axiosInstance.get(`${GROUP_BUY_BASE_URL}/participated/count`);
    return response.data;
  },




  getCompletedCount: async () => {
    const response = await axiosInstance.get(`${GROUP_BUY_BASE_URL}/completed/count`);
    return response.data;
  },




  getCompletedGroupBuys: async () => {
    const response = await axiosInstance.get(`${GROUP_BUY_BASE_URL}/completed`);
    return response.data;
  },




  getCreatedGroupBuys: async () => {
    const response = await axiosInstance.get(`${GROUP_BUY_BASE_URL}/created`);
    return response.data;
  },





  getGroupBuyDetail: async (seq) => {
    const response = await axiosInstance.get(`${GROUP_BUY_BASE_URL}/${seq}`);
    return response.data;
  },





  createGroupBuy: async (data) => {
    const response = await axiosInstance.post(GROUP_BUY_BASE_URL, data);
    return response.data;
  },





  joinGroupBuy: async (seq) => {
    const response = await axiosInstance.post(`${GROUP_BUY_BASE_URL}/${seq}/join`);
    return response.data;
  },






  updateGroupBuyStatus: async (seq, status) => {
    const response = await axiosInstance.patch(`${GROUP_BUY_BASE_URL}/${seq}/status`, { status });
    return response.data;
  },





  getParticipants: async (seq) => {
    const response = await axiosInstance.get(`${GROUP_BUY_BASE_URL}/${seq}/participants`);
    return response.data;
  },



  getGroupBuyHistory: async (storeSeq) => {
    const response = await axiosInstance.get('/api/group-buys/history', {
      params: { storeSeq }
    });
    return response.data;
  }
};