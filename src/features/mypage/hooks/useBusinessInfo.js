import { useState, useEffect } from 'react';
import { getBusinessProfileApi } from '../../../apis/memberApi';
import authStore from '../../../store/authStore';






export const useBusinessInfo = () => {

  const { selectedStoreSeq } = authStore();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        setIsLoading(true);

        const result = await getBusinessProfileApi(selectedStoreSeq);
        setData(result);
        setIsLoading(false);
      } catch (err) {
        console.error('사업자 정보 조회 실패:', err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchBusinessInfo();
  }, [selectedStoreSeq]);


  const formattedDate = data?.createdAt ?
  new Date(data.createdAt).toLocaleDateString('ko-KR').replace(/\. /g, '/').replace('.', '') :
  '정보 없음';


  const formattedOpeningDate = data?.openingDate ?
  new Date(data.openingDate).toLocaleDateString('ko-KR').replace(/\. /g, '/').replace('.', '') :
  '정보 없음';


  const fullAddress = data ?
  `${data.address1 || ''} ${data.address2 || ''}`.trim() :
  '정보 없음';

  const sysNamesArray = data?.profileImageUrl ? data.profileImageUrl.split(',') : [];


  const storeImg1 = sysNamesArray[0] ?
  `https://storage.googleapis.com/study_jcr/${sysNamesArray[0]}` :
  '/images/default-store.png';


  const storeImg2 = sysNamesArray[1] ?
  `https://storage.googleapis.com/study_jcr/${sysNamesArray[1]}` :
  '/images/default-store.png';

  return {
    profile: data,
    isLoading,
    error,
    formattedDate,
    formattedOpeningDate,
    fullAddress,
    storeImg1,
    storeImg2
  };
};