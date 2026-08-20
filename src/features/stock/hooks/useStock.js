import { useState, useEffect, useCallback } from 'react';
import authStore from '../../../store/authStore';
import {
  getStockList,
  createStockMaster,
  getStockBatches,
  getStockHistories,
  deleteStock,
  updateStock,
  getStockExpiringSoonCountApi,
  getCategories } from
'../../../apis/stockApi';





export const useStock = () => {
  const selectedStoreSeq = authStore((state) => state.selectedStoreSeq);
  const [stocks, setStocks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: 'ALL',
    status: 'ALL'
  });


  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (err) {
      console.error('Fetch Categories Error:', err);
    }
  }, []);


  const fetchStocks = useCallback(async (searchFilters = filters) => {
    setIsLoading(true);
    try {

      const data = await getStockList(searchFilters);
      setStocks(data || []);
      setError(null);
    } catch (err) {
      console.error('Fetch Stocks Error:', err);
      setError('재고 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [filters, selectedStoreSeq]);


  const registerStock = async (stockData) => {
    setIsLoading(true);
    try {

      const payload = {
        ...stockData,
        storeSeq: selectedStoreSeq
      };
      await createStockMaster(payload);
      alert('새 품목이 등록되었습니다.');
      await fetchStocks();
      return true;
    } catch (err) {
      console.error('Register Stock Error:', err);
      if (err.response && err.response.data) {

        const errorMsg = typeof err.response.data === 'string' ? err.response.data : err.response.data.message;
        if (errorMsg) {
          alert(errorMsg);
          return false;
        }
      }
      alert('품목 등록에 실패했습니다.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };


  const getStockDetailData = async (stockSeq) => {
    try {
      const [batches, histories] = await Promise.all([
      getStockBatches(stockSeq),
      getStockHistories(stockSeq)]
      );
      return { batches, histories };
    } catch (err) {
      console.error('Get Stock Detail Error:', err);
      throw new Error('상세 정보를 불러오는 중 오류가 발생했습니다.');
    }
  };


  const editStock = async (stockId, stockData) => {
    try {
      await updateStock(stockId, stockData);
      alert('품목 정보가 수정되었습니다.');
      await fetchStocks();
      return true;
    } catch (err) {
      console.error('Edit Stock Error:', err);
      alert('수정에 실패했습니다.');
      return false;
    }
  };


  const deleteStocks = async (ids) => {
    if (!ids || ids.length === 0) return false;
    if (!window.confirm(`${ids.length}개의 항목을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.`)) return false;

    setIsLoading(true);
    try {

      await Promise.all(ids.map((id) => deleteStock(id)));

      alert('선택한 항목이 모두 삭제되었습니다.');

      await fetchStocks();
      return true;
    } catch (err) {
      console.error('Delete Stocks Error:', err);
      setError('항목 삭제 중 오류가 발생했습니다. 일부 항목이 삭제되지 않았을 수 있습니다.');
      alert('삭제 중 오류가 발생했습니다.');

      await fetchStocks();
      return false;
    } finally {
      setIsLoading(false);
    }
  };


  const getExpiringSoonCount = useCallback(async () => {
    try {

      const count = await getStockExpiringSoonCountApi();

      return count;
    } catch (err) {
      console.error('Calculate Expiry Error:', err);
      return 0;
    }
  }, [selectedStoreSeq]);

  useEffect(() => {

    if (selectedStoreSeq) {
      fetchStocks();
      fetchCategories();
    }

  }, [selectedStoreSeq, fetchCategories]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => {
      const nextFilters = { ...prev, [name]: value };


      if (name === 'category' || name === 'status') {
        fetchStocks(nextFilters);
      }

      return nextFilters;
    });
  };

  const handleSearch = (keyword) => {

    const searchKeyword = keyword !== undefined ? keyword : filters.search;
    const latestFilters = { ...filters, search: searchKeyword };
    fetchStocks(latestFilters);
  };

  return {
    stocks,
    categories,
    isLoading,
    error,
    filters,
    handleFilterChange,
    handleSearch,
    fetchStocks,
    deleteStocks,
    registerStock,
    editStock,
    getStockDetailData,
    getExpiringSoonCount
  };
};