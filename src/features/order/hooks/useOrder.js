import { useState, useCallback, useEffect } from 'react';
import { orderList } from '../../../apis/orderApi';





export const useOrder = () => {


  const [orders, setOrders] = useState([]);

  const [filterStatus, setFilterStatus] = useState('전체');
  const [dateRange, setDateRange] = useState('7일');
  const [keyword, setKeyword] = useState('');

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getDateRange = (range) => {
    const today = new Date();

    const start = new Date(today);

    if (range === '오늘') {

    } else if (range === '7일') {
      start.setDate(today.getDate() - 7);
    } else if (range === '1개월') {
      start.setMonth(today.getMonth() - 1);
    } else if (range === '3개월') {
      start.setMonth(today.getMonth() - 3);
    }

    return {
      startDate: formatDate(start),
      endDate: formatDate(today)
    };
  };

  const getStatusValue = (status) => {
    const statusMap = {
      전체: '',
      대기중: 'REQUESTED',
      접수완료: 'ACCEPTED',
      배송중: 'SHIPPING',
      배송완료: 'DELIVERED'
    };

    return statusMap[status] || '';
  };


  const fetchSearch = async () => {
    fetchOrderList(keyword);
  };


  const handleKeywordChange = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);


  const reset = async () => {
    setKeyword('');
    setFilterStatus('전체');
    setDateRange('7일');

    await fetchOrderList('', '전체', '7일');
  };








  useEffect(() => {
    fetchOrderList('', '전체', '7일');
  }, []);



  const fetchOrderList = async (
  searchKeyword = keyword,
  nextStatus = filterStatus,
  nextDateRange = dateRange) =>
  {
    try {
      const storeSeq = Number(JSON.parse(localStorage.getItem('soso-auth-storage'))?.state?.selectedStoreSeq);

      if (!storeSeq) {
        setOrders([]);
        return;
      }

      const { startDate, endDate } = getDateRange(nextDateRange);
      const status = getStatusValue(nextStatus);

      const data = await orderList(
        storeSeq,
        searchKeyword,
        status,
        startDate,
        endDate
      );

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('발주 목록 조회 실패:', error);
      setOrders([]);
    }
  };





























  const handleFilterChange = useCallback((status) => {
    setFilterStatus(status);
    fetchOrderList(keyword, status, dateRange);
  }, [keyword, dateRange]);




  const handleDateRangeChange = useCallback((range) => {
    setDateRange(range);
    fetchOrderList(keyword, filterStatus, range);
  }, [keyword, filterStatus]);




  return {
    orders,
    setOrders,
    filterStatus,
    dateRange,
    handleFilterChange,
    handleDateRangeChange,
    fetchSearch,
    keyword,
    handleKeywordChange,
    reset
  };
};