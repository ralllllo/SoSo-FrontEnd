import { useState, useEffect } from 'react';
import { getAllStoresApi } from '../apis/memberApi';
import authStore from '../store/authStore';





export const useStores = () => {
  const { user_type } = authStore();
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    if (user_type === 'BUSINESS') {
      const fetchStores = async () => {
        try {
          setIsLoading(true);
          const data = await getAllStoresApi();
          setStores(data);
        } catch (error) {
          console.error("매장 목록 로드 실패:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchStores();
    }
  }, [user_type]);

  return { stores, isLoading };
};