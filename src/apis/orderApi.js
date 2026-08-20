import axiosInstance from './axiosConfig.js';
import maxios from './axiosConfig.js';


export const check = async (itemName, storeSeq) => {
  const resp = await maxios.get('/order/check', {
    params: { itemName, storeSeq }
  });
  return resp.data;
};


export const items = async (itemName = '') => {
  const resp = await maxios.get('/order/items', {
    params: { itemName }
  });
  return resp.data;
};


export const identityCheck = async (storeSeq) => {
  const resp = await maxios.get('/order/identity', {
    params: { storeSeq }
  });
  return resp.data;
};


export const orderForm = async (orderData) => {
  const resp = await maxios.post('/order/form', orderData);
  return resp.data;
};


export const orderList = async (
storeSeq,
keyword = '',
status = '',
startDate = '',
endDate = '') =>
{
  const resp = await maxios.get('/order/list', {
    params: {
      storeSeq,
      keyword,
      status,
      startDate,
      endDate
    }
  });
  return resp.data;
};











export const suppliers = async (storeSeq) => {
  const resp = await maxios.get('/api/account/my-partners', {
    params: { storeSeq }
  });
  return resp.data;
};


export const getOrderDetail = async (orderSeq) => {
  const resp = await maxios.get(`/order/list/${orderSeq}`);
  return resp.data;
};


export const webSocketMe = async () => {
  const resp = await maxios.get('/order/me');
  return resp.data;
};




export const fetchPartnerOrders = async (sellerSeq, keyword = '', status = '') => {
  const resp = await maxios.get('/api/partner/orders', {
    params: {
      sellerSeq,
      keyword,
      status
    }
  });
  return resp.data;
};




export const fetchPartnerOrderDetail = async (orderSeq) => {
  const resp = await maxios.get(`/api/partner/orders/${orderSeq}`);
  return resp.data;
};




export const updatePartnerOrderStatus = async (orderSeq, status) => {
  const resp = await maxios.put(`/api/partner/orders/${orderSeq}/status`, status, {
    headers: { 'Content-Type': 'text/plain' }
  });
  return resp.data;
};



export const unpaidOrders = async (storeSeq, partnerSeq) => {
  const response = await axiosInstance.get("/order/unpaid", {
    params: { storeSeq, partnerSeq }
  });

  return response.data;
};




export const fetchPartnerDashboard = async (sellerSeq) => {
  const resp = await maxios.get('/api/partner/orders/dashboard', {
    params: { sellerSeq }
  });
  return resp.data;
};