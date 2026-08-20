import { useState, useEffect, useCallback } from 'react';
import { fetchPartnerOrders, fetchPartnerOrderDetail, webSocketMe, updatePartnerOrderStatus } from '../../../apis/orderApi';





export const usePartnerOrder = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userSeq, setUserSeq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [keyword, setKeyword] = useState('');
  const [filterStatus, setFilterStatus] = useState('전체');


  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await webSocketMe();
        setUserSeq(data);
      } catch (err) {
        console.error('사용자 정보 조회 실패:', err);
      }
    };
    getUserInfo();
  }, []);


  const fetchAllOrders = useCallback(async () => {
    if (!userSeq) return;
    setLoading(true);
    try {
      const data = await fetchPartnerOrders(userSeq, '', '');
      setAllOrders(data);
      setFilteredOrders(data);
    } catch (err) {
      console.error('발주 목록 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  }, [userSeq]);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);


  useEffect(() => {
    let result = [...allOrders];


    if (filterStatus !== '전체') {
      const statusMap = {
        '발주신청': 'REQUESTED',
        '준비중': 'PREPARING',
        '배송중': 'SHIPPING',
        '배송완료': 'DELIVERED'
      };
      const targetStatus = statusMap[filterStatus];

      if (filterStatus === '준비중') {
        result = result.filter((o) => o.status === 'PREPARING' || o.status === 'ACCEPTED');
      } else {
        result = result.filter((o) => o.status === targetStatus);
      }
    }


    if (keyword.trim() !== '') {
      const lowerKeyword = keyword.toLowerCase();
      result = result.filter((o) =>
      o.orderNo.toLowerCase().includes(lowerKeyword) ||
      o.companyName.toLowerCase().includes(lowerKeyword)
      );
    }

    setFilteredOrders(result);
  }, [allOrders, keyword, filterStatus]);


  const handleKeywordChange = (e) => setKeyword(e.target.value);
  const handleFilterChange = (status) => setFilterStatus(status);

  const openOrderDetail = async (orderSeq) => {
    try {
      const data = await fetchPartnerOrderDetail(orderSeq);
      setSelectedOrderDetails(data);


      const order = allOrders.find((o) => o.orderSeq === orderSeq);
      setSelectedOrder(order);

      setIsModalOpen(true);
    } catch (err) {
      console.error('상세 내역 조회 실패:', err);
      alert('상세 내역을 불러오는데 실패했습니다.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderDetails([]);
    setSelectedOrder(null);
  };


  const handleStatusChange = async (orderSeq, newStatus) => {
    try {
      await updatePartnerOrderStatus(orderSeq, newStatus);

      fetchAllOrders();
    } catch (err) {
      console.error('상태 변경 실패:', err);
      alert('상태 변경에 실패했습니다.');
    }
  };

  return {
    orders: filteredOrders,
    allOrders,
    loading,
    keyword,
    filterStatus,
    handleKeywordChange,
    handleFilterChange,
    fetchOrders: fetchAllOrders,
    openOrderDetail,
    isModalOpen,
    closeModal,
    selectedOrderDetails,
    selectedOrder,
    handleStatusChange
  };
};