import { useState, useEffect } from 'react';
import { getPartnerProfileApi } from '../../../apis/memberApi';





export const usePartnerInfo = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartnerInfo = async () => {
      try {
        setIsLoading(true);
        const result = await getPartnerProfileApi();
        setData(result);
        setIsLoading(false);
      } catch (err) {
        console.error('업체 정보 조회 실패:', err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchPartnerInfo();
  }, []);


  const formattedDate = data?.createdAt ?
  new Date(data.createdAt).toLocaleDateString('ko-KR') :
  '-';


  const formattedOpeningDate = data?.openingDate ?
  new Date(data.openingDate).toLocaleDateString('ko-KR') :
  '-';


  const fullAddress = data ?
  `(${data.zonecode || ''}) ${data.address1 || ''} ${data.address2 || ''}`.trim() :
  '-';

  const sysNamesArray = data?.storeSysNames ? data.storeSysNames.split(',') : [];


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