import axiosInstance from './axiosConfig';


export const insertAccount = async (accountData) => {
  const resp = await axiosInstance.post('/account/accountSystem', accountData);
  return resp.data;
};


export const accountList = async (storeSeq) => {
  const resp = await axiosInstance.get('/account/accountList', {
    params: { storeSeq }
  });
  return resp.data;
};


export const accountDel = async (accountSeq) => {
  const resp = await axiosInstance.delete(`/account/accountDel/${accountSeq}`);
  return resp.data;
};


export const autoSchedule = async (storeSeq) => {
  const resp = await axiosInstance.get("/account/autoPaymentSchedule", {
    params: { storeSeq }
  });
  return resp.data;
};




export const registerPaymentCard = async (cardData) => {
  const response = await axiosInstance.post("/account/cards", cardData);
  return response.data;
};



export const getPaymentCards = async (storeSeq) => {
  const response = await axiosInstance.get("/account/cards", {
    params: { storeSeq }
  });
  return response.data;
};



export const deletePaymentCard = async (cardSeq) => {
  const response = await axiosInstance.delete(`/account/cards/${cardSeq}`);
  return response.data;
};



export const setDefaultPaymentCard = async (storeSeq, cardSeq) => {
  const response = await axiosInstance.patch(
    `/account/cards/${cardSeq}/default`,
    null,
    {
      params: { storeSeq }
    }
  );
  return response.data;
};


export const insertExpense = async (storeSeq, data) => {
  const response = await axiosInstance.post(`/expense/${storeSeq}`, data);
  return response.data;
};


export const getExpenseTotal = async (storeSeq, month) => {
  const response = await axiosInstance.get(`/expense/${storeSeq}/total`, {
    params: { month }
  });

  return response.data;
};


export const categoryCost = async (storeSeq, month) => {
  const response = await axiosInstance.get(`/expense/${storeSeq}/categoryCost`, {
    params: { month }
  });

  return response.data;
};


export const ExpenseDetails = async (storeSeq, month, categorySeq) => {
  const response = await axiosInstance.get(`/expense/${storeSeq}/details`, {
    params: {
      month,
      categorySeq
    }
  });

  return response.data;
};


export const getMyPartners = async (storeSeq) => {
  const response = await axiosInstance.get(`/api/account/my-partners`, {
    params: { storeSeq }
  });

  return response.data;
};




export const payOrdersByCard = async (data) => {
  const response = await axiosInstance.post("/account/order/pay", data);


  return response.data;
};




export const getRecentPayments = async (options) => {


  const params =
  typeof options === 'object' ?
  options :
  {
    storeSeq: options
  };


  const response = await axiosInstance.get('/account/recent-payments', {
    params: {

      storeSeq: params.storeSeq,


      period: params.period || 'week',


      startDate: params.startDate || '',


      endDate: params.endDate || '',


      keyword: params.keyword || ''
    }
  });


  return response.data;
};





export const getCollectionDashboard = async (storeSeq) => {

  const response = await axiosInstance.get('/account/collection', {
    params: {
      storeSeq: storeSeq
    }
  });


  return response.data;
};


export const getGeneralOrdersForExpense = async (storeSeq, partnerStoreSeq) => {
  const response = await axiosInstance.get(`/expense/${storeSeq}/general-orders`, {
    params: { partnerStoreSeq }
  });

  return response.data;
};


export const updateExpenseMemo = async (storeSeq, expenseSeq, memo) => {
  const response = await axiosInstance.put(
    `/expense/${storeSeq}/${expenseSeq}/memo`,
    { memo }
  );

  return response.data;
};


export const deleteExpense = async (storeSeq, expenseSeq) => {
  const response = await axiosInstance.delete(
    `/expense/${storeSeq}/${expenseSeq}`
  );

  return response.data;
};