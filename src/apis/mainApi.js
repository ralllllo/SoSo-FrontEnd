import maxios from './axiosConfig.js';






export const fetchBusinessDashboard = async (storeSeq, userSeq) => {
  const resp = await maxios.get('/api/business/dashboard', {
    params: { storeSeq, userSeq }
  });
  return resp.data;
};