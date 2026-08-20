import React, { useState, useEffect } from 'react';
import { useStockStatus } from './hooks/useStockStatus';
import { useStockHistory } from './hooks/useStockHistory';
import StockAutoRules from './components/StockAutoRules';
import DashboardTimelineFeed from './components/DashboardTimelineFeed';
import DashboardHistoryTable from './components/DashboardHistoryTable';
import HistoryModal from './components/HistoryModal';
import { Link, useLocation } from 'react-router-dom';
import authStore from '../../store/authStore';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const StockStatusPage = () => {
  const bizname = authStore((state) => state.bizname);
  const { autoRules, toggleRule } = useStockStatus();
  const {
    dashboardHistory,
    isDashboardLoading,
    fetchDashboardHistory,
    modalHistoryData,
    isModalLoading,
    fetchModalHistory
  } = useStockHistory();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    fetchDashboardHistory();
  }, [fetchDashboardHistory]);


  const handleOpenModal = () => {
    setIsModalOpen(true);
    fetchModalHistory(1, 10);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handlePageChange = (pageIndex) => {
    fetchModalHistory(pageIndex, 10);
  };

  return (
    _jsxDEV("div", { className: "min-h-screen bg-gray-50 pb-20", children: [


      _jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [

        _jsxDEV("div", { className: "mb-12", children: [
          _jsxDEV("div", { className: "flex items-center gap-2 mb-2", children:
            _jsxDEV("span", { className: "px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full", children: ["현재 매장: ",
              bizname || '상호명 미등록'] }, void 0, true
            ) }, void 0, false
          ),
          _jsxDEV("h1", { className: "text-4xl font-black text-gray-900 tracking-tight mb-3", children: "자동 재고 제어 관리" }, void 0, false),
          _jsxDEV("p", { className: "text-[15px] text-gray-400 font-medium", children: "자동 차감, 자동 발주 연동, 실시간 변동 타임라인" }, void 0, false)] }, void 0, true
        ),


        _jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16", children: [

          _jsxDEV("section", { children: [
            _jsxDEV("div", { className: "flex items-center gap-2 mb-4 ml-2", children:
              _jsxDEV("span", { className: "text-[12px] font-black text-gray-400 uppercase tracking-widest", children: "자동 재고 관리 규칙" }, void 0, false) }, void 0, false
            ),
            _jsxDEV(StockAutoRules, { rules: autoRules, onToggle: toggleRule }, void 0, false)] }, void 0, true
          ),


          _jsxDEV("section", { children: [
            _jsxDEV("div", { className: "flex items-center gap-2 mb-4 ml-2", children:
              _jsxDEV("span", { className: "text-[12px] font-black text-gray-400 uppercase tracking-widest", children: "재고 타임라인 피드" }, void 0, false) }, void 0, false
            ),
            _jsxDEV(DashboardTimelineFeed, {
              history: dashboardHistory,
              isLoading: isDashboardLoading,
              onOpenModal: handleOpenModal }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("section", { children: [
          _jsxDEV("div", { className: "flex items-center gap-2 mb-4 ml-2", children:
            _jsxDEV("span", { className: "text-[12px] font-black text-gray-400 uppercase tracking-widest", children: "최근 재고 이력" }, void 0, false) }, void 0, false
          ),
          _jsxDEV(DashboardHistoryTable, {
            history: dashboardHistory,
            isLoading: isDashboardLoading }, void 0, false
          )] }, void 0, true
        )] }, void 0, true
      ),


      _jsxDEV(HistoryModal, {
        isOpen: isModalOpen,
        onClose: handleCloseModal,
        data: modalHistoryData,
        isLoading: isModalLoading,
        onPageChange: handlePageChange }, void 0, false
      )] }, void 0, true
    ));

};

export default StockStatusPage;