import axiosInstance from './axiosConfig.js';











export const searchAccounts = async (searchTerm) => {
  try {
    const response = await axiosInstance.get('/api/account/search', {
      params: { searchTerm }
    });
    return response.data;
  } catch (error) {
    console.error('거래처 검색 중 오류 발생:', error);
    throw error;
  }
};






export const getAllPartners = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/api/account/all-partners', { params });
    return response.data;
  } catch (error) {
    console.error('전체 거래처 조회 중 오류 발생:', error);
    throw error;
  }
};






export const registerPartnerAccount = async (relationData) => {
  try {
    const response = await axiosInstance.post('/api/account/register', relationData);
    return response.data;
  } catch (error) {
    console.error('거래처 등록 중 오류 발생:', error);
    throw error;
  }
};







export const getRegisteredAccounts = async (businessSeq, params = {}) => {
  try {
    const response = await axiosInstance.get('/api/account/list', {
      params: { businessSeq, ...params }
    });
    return response.data;
  } catch (error) {
    console.error('거래처 목록 조회 중 오류 발생:', error);
    throw error;
  }
};






export const getPartnerItems = async (partnerSeq) => {
  try {
    const response = await axiosInstance.get('/api/account/items', {
      params: { partnerSeq }
    });
    return response.data;
  } catch (error) {
    console.error('거래처 품목 조회 중 오류 발생:', error);
    throw error;
  }
};






export const getPartnerDetail = async (partnerSeq) => {
  try {
    const response = await axiosInstance.get(`/api/account/partner/${partnerSeq}`);
    return response.data;
  } catch (error) {
    console.error('거래처 상세 정보 조회 중 오류 발생:', error);
    throw error;
  }
};






export const deletePartnerAccount = async (relationSeq) => {
  try {
    const response = await axiosInstance.delete(`/api/account/${relationSeq}`);
    return response.data;
  } catch (error) {
    console.error('거래처 삭제 중 오류 발생:', error);
    throw error;
  }
};






export const getFirstStoreSeq = async (userSeq) => {
  try {
    const response = await axiosInstance.get(`/api/account/first-store/${userSeq}`);
    return response.data;
  } catch (error) {
    console.error('첫 번째 매장 시퀀스 조회 중 오류 발생:', error);
    throw error;
  }
};