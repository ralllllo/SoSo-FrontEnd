import axiosInstance from './axiosConfig.js';











export const checkIdApi = async (userId) => {
  const response = await axiosInstance.get('/api/member/check-id', {
    params: { userId }
  });
  return response.data;
};






export const checkNicknameApi = async (nickname) => {
  const response = await axiosInstance.get('/api/member/check-nickname', {
    params: { nickname }
  });
  return response.data;
};






export const checkEmailApi = async (email) => {
  const response = await axiosInstance.get('/api/member/check-email', {
    params: { email }
  });
  return response.data;
};










export const checkBusinessApi = async (bNo, startDt, pNm, bNm, isMultiProfile = false) => {

  const response = await axiosInstance.get('/api/biz/check', {
    params: {
      bNo,
      startDt,
      pNm,
      bNm,
      isMultiProfile
    }
  });
  return response.data;
};








export const signUpApi = async (signUpData, exteriorImg, interiorImg) => {
  const formData = new FormData();


  formData.append('joinData', JSON.stringify(signUpData));

  if (exteriorImg) {
    formData.append('exteriorImg', exteriorImg);
  }

  if (interiorImg) {
    formData.append('interiorImg', interiorImg);
  }

  const response = await axiosInstance.post('/api/member/signup', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};






export const getBusinessProfileApi = async (storeSeq = null) => {
  const response = await axiosInstance.get('/api/member/business/profile', {
    params: { storeSeq }
  });
  return response.data;
};





export const getAllStoresApi = async () => {
  const response = await axiosInstance.get('/api/member/business/stores');
  return response.data;
};








export const updateBusinessProfileApi = async (updateData, exteriorImg, interiorImg) => {
  const formData = new FormData();



  Object.keys(updateData).forEach((key) => {

    if (updateData[key] !== null && updateData[key] !== undefined) {
      formData.append(key, updateData[key]);
    }
  });


  if (exteriorImg instanceof File) {
    formData.append('exteriorImg', exteriorImg);
  }

  if (interiorImg instanceof File) {
    formData.append('interiorImg', interiorImg);
  }

  const response = await axiosInstance.put('/api/member/business/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};








export const registerMultiProfileApi = async (registerData, exteriorImg, interiorImg) => {
  const formData = new FormData();


  formData.append('registerData', JSON.stringify(registerData));

  if (exteriorImg instanceof File) {
    formData.append('exteriorImg', exteriorImg);
  }

  if (interiorImg instanceof File) {
    formData.append('interiorImg', interiorImg);
  }

  const response = await axiosInstance.post('/api/member/business/multiprofile/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};





export const getPartnerProfileApi = async () => {
  const response = await axiosInstance.get('/api/member/partner/profile');
  return response.data;
};








export const updatePartnerProfileApi = async (updateData, exteriorImg, interiorImg) => {
  const formData = new FormData();


  formData.append('updateData', JSON.stringify(updateData));

  if (exteriorImg instanceof File) {
    formData.append('exteriorImg', exteriorImg);
  }

  if (interiorImg instanceof File) {
    formData.append('interiorImg', interiorImg);
  }

  const response = await axiosInstance.put('/api/member/partner/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};






export const changePasswordApi = async (passwordData) => {
  const response = await axiosInstance.post('/api/member/change-password', passwordData);
  return response.data;
};






export const withdrawMemberApi = async (withdrawalData) => {
  const response = await axiosInstance.patch('/api/member/partner/withdraw', withdrawalData);
  return response.data;
};






export const getNotificationSettingsApi = async (storeSeq) => {
  const response = await axiosInstance.get('/api/member/business/notification-settings', {
    params: { storeSeq }
  });
  return response.data;
};







export const updateNotificationSettingsApi = async (storeSeq, settingsData) => {
  const response = await axiosInstance.put('/api/member/business/notification-settings', settingsData, {
    params: { storeSeq }
  });
  return response.data;
};