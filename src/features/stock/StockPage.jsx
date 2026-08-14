import React, { useState, useEffect } from 'react';
import { useStock } from './hooks/useStock';
import StockHeader from './components/StockHeader';
import StockFilter from './components/StockFilter';
import StockTable from './components/StockTable';
import StockHistoryModal from './components/StockHistoryModal';
import StockRegistrationModal from './components/StockRegistrationModal';
import StockTransactionModal from './components/StockTransactionModal';
import StockActionBar from './components/StockActionBar';
import StockEditModal from './components/StockEditModal';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const StockPage = () => {
  const {
    stocks,
    categories,
    isLoading,
    filters,
    handleFilterChange,
    handleSearch,
    fetchStocks,
    deleteStocks,
    getStockDetailData,
    registerStock,
    editStock,
    getExpiringSoonCount
  } = useStock();

  const [selectedIds, setSelectedIds] = useState([]);
  const [expiringSoonCount, setExpiringSoonCount] = useState(0);


  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedStockForHistory, setSelectedStockForHistory] = useState(null);
  const [selectedStockForTransaction, setSelectedStockForTransaction] = useState(null);
  const [selectedStockForEdit, setSelectedStockForEdit] = useState(null);


  useEffect(() => {
    const updateExpiringCount = async () => {
      const count = await getExpiringSoonCount();
      setExpiringSoonCount(count);
    };
    if (stocks.length > 0) updateExpiringCount();
  }, [stocks, getExpiringSoonCount]);

  const handleAddStock = () => setIsRegisterModalOpen(true);
  const handleRegister = (formData) => registerStock(formData);
  const handleEdit = (stockId, formData) => editStock(stockId, formData);
  const handleEditClick = (stock) => {
    setSelectedStockForEdit(stock);
    setIsEditModalOpen(true);
  };

  const handleSelectChange = (code) => {
    setSelectedIds((prev) =>
    prev.includes(code) ? prev.filter((item) => item !== code) : [...prev, code]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === stocks.length && stocks.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(stocks.map((stock) => stock.stockSeq));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    deleteStocks(selectedIds).then((success) => {
      if (success) setSelectedIds([]);
    });
  };

  const handleViewHistory = (stock) => {
    setSelectedStockForHistory(stock);
    setIsHistoryModalOpen(true);
  };

  const handleTransactionClick = (stock) => {
    setSelectedStockForTransaction(stock);
    setIsTransactionModalOpen(true);
  };

  const handleTransactionSuccess = () => fetchStocks();


  const lowStockCount = stocks.filter((s) => s.currentStock > 0 && s.currentStock <= s.safetyStock).length;
  const outOfStockCount = stocks.filter((s) => s.currentStock === 0).length;

  return (
    _jsxDEV("div", { className: "min-h-screen bg-gray-50 pb-12", children: [
      _jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
        _jsxDEV(StockHeader, { onAddClick: handleAddStock }, void 0, false),


        _jsxDEV("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [
          _jsxDEV("div", { className: "bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow", children: [
            _jsxDEV("div", { className: "flex items-center gap-3 mb-3", children: [
              _jsxDEV("div", { className: "w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-xl", children: "📦" }, void 0, false),
              _jsxDEV("div", { className: "text-[12px] font-bold text-gray-400 uppercase tracking-wider", children: "전체 품목" }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("div", { className: "text-3xl font-black text-gray-900 leading-none", children: [
              stocks.length, _jsxDEV("span", { className: "text-sm font-medium text-gray-400 ml-1", children: "건" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow", children: [
            _jsxDEV("div", { className: "flex items-center gap-3 mb-3", children: [
              _jsxDEV("div", { className: "w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-xl", children: "⚠️" }, void 0, false),
              _jsxDEV("div", { className: "text-[12px] font-bold text-amber-500 uppercase tracking-wider", children: "재고 부족" }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("div", { className: "text-3xl font-black text-amber-500 leading-none", children: [
              lowStockCount, _jsxDEV("span", { className: "text-sm font-medium text-amber-300 ml-1", children: "건" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow", children: [
            _jsxDEV("div", { className: "flex items-center gap-3 mb-3", children: [
              _jsxDEV("div", { className: "w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-xl", children: "🚫" }, void 0, false),
              _jsxDEV("div", { className: "text-[12px] font-bold text-rose-500 uppercase tracking-wider", children: "품절 임박" }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("div", { className: "text-3xl font-black text-rose-500 leading-none", children: [
              outOfStockCount, _jsxDEV("span", { className: "text-sm font-medium text-rose-300 ml-1", children: "건" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "bg-gradient-to-br from-red-500 to-rose-600 p-5 rounded-3xl shadow-lg shadow-red-200", children: [
            _jsxDEV("div", { className: "flex items-center gap-3 mb-3", children: [
              _jsxDEV("div", { className: "w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl", children: "⏰" }, void 0, false),
              _jsxDEV("div", { className: "text-[12px] font-bold text-white/80 uppercase tracking-wider", children: "유통기한 임박" }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("div", { className: "text-3xl font-black text-white leading-none", children: [
              expiringSoonCount, _jsxDEV("span", { className: "text-sm font-medium text-white/60 ml-1", children: "건" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ),

        _jsxDEV(StockFilter, {
          filters: filters,
          categories: categories,
          onFilterChange: handleFilterChange,
          onSearch: handleSearch }, void 0, false
        ),
        _jsxDEV(StockTable, {
          stocks: stocks,
          isLoading: isLoading,
          selectedIds: selectedIds,
          onSelectChange: handleSelectChange,
          onSelectAll: handleSelectAll,
          onViewHistory: handleViewHistory,
          onIncoming: handleTransactionClick,
          onEdit: handleEditClick }, void 0, false
        )] }, void 0, true
      ),

      _jsxDEV(StockActionBar, {
        selectedCount: selectedIds.length,
        onCancel: () => setSelectedIds([]),
        onDelete: handleDeleteSelected,
        isLoading: isLoading }, void 0, false
      ),

      _jsxDEV(StockHistoryModal, {
        isOpen: isHistoryModalOpen,
        onClose: () => setIsHistoryModalOpen(false),
        stock: selectedStockForHistory,
        fetchDetailData: getStockDetailData }, void 0, false
      ),
      _jsxDEV(StockRegistrationModal, {
        isOpen: isRegisterModalOpen,
        onClose: () => setIsRegisterModalOpen(false),
        onRegister: handleRegister }, void 0, false
      ),
      _jsxDEV(StockTransactionModal, {
        isOpen: isTransactionModalOpen,
        onClose: () => setIsTransactionModalOpen(false),
        selectedStock: selectedStockForTransaction,
        onSuccess: handleTransactionSuccess }, void 0, false
      ),
      _jsxDEV(StockEditModal, {
        isOpen: isEditModalOpen,
        onClose: () => setIsEditModalOpen(false),
        stock: selectedStockForEdit,
        onEdit: handleEdit }, void 0, false
      )] }, void 0, true
    ));

};

export default StockPage;