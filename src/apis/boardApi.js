import axiosInstance from './axiosConfig.js';











export const getBoardsByType = async (type) => {
  try {
    const response = await axiosInstance.get('/api/boards', {
      params: { type }
    });
    return response.data;
  } catch (error) {
    console.error(`게시글 목록(${type}) 조회 중 오류 발생:`, error);
    throw error;
  }
};






export const getMyInquiries = async (userSeq) => {
  try {
    const response = await axiosInstance.get('/api/boards/my-inquiries', {
      params: { userSeq }
    });
    return response.data;
  } catch (error) {
    console.error('내 문의 내역 조회 중 오류 발생:', error);
    throw error;
  }
};






export const submitInquiry = async (inquiryData) => {
  try {
    const response = await axiosInstance.post('/api/boards/inquiry', inquiryData);
    return response.data;
  } catch (error) {
    console.error('문의 등록 중 오류 발생:', error);
    throw error;
  }
};