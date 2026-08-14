import { useState, useCallback } from 'react';
import { getStockHistoryDashboard, getStockHistoryModal } from '../../../apis/stockApi';
import authStore from '../../../store/authStore.js';





export const useStockHistory = () => {

  const [dashboardHistory, setDashboardHistory] = useState([]);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const { selectedStoreSeq } = authStore();


  const [modalHistoryData, setModalHistoryData] = useState({
    historyList: [],
    totalPages: 0,
    totalCount: 0,
    currentPage: 1
  });
  const [isModalLoading, setIsModalLoading] = useState(false);


  const fetchDashboardHistory = useCallback(async () => {
    setIsDashboardLoading(true);
    try {
      const data = await getStockHistoryDashboard(selectedStoreSeq);
      setDashboardHistory(data || []);
    } catch (error) {
      console.error('대시보드 이력을 불러오는데 실패했습니다.', error);
    } finally {
      setIsDashboardLoading(false);
    }
  }, [selectedStoreSeq]);


  const fetchModalHistory = useCallback(async (page = 1, size = 10) => {
    setIsModalLoading(true);
    const safePage = Math.max(1, page);
    try {
      const data = await getStockHistoryModal({ page: safePage, size, storeSeq: selectedStoreSeq });


      setModalHistoryData(data || {
        historyList: [],
        totalPages: 0,
        totalCount: 0,
        currentPage: 1
      });
    } catch (error) {
      console.error('모달 이력을 불러오는데 실패했습니다.', error);
    } finally {
      setIsModalLoading(false);
    }
  }, []);

  return {
    dashboardHistory,
    isDashboardLoading,
    fetchDashboardHistory,
    modalHistoryData,
    isModalLoading,
    fetchModalHistory
  };
};