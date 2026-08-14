import React, { useState } from 'react';
import { useGroupBuy } from './hooks/useGroupBuy';
import GroupBuyCreateModal from './components/GroupBuyCreateModal';
import GroupBuyStatusModal from './components/GroupBuyStatusModal';
import { useNavigate } from 'react-router-dom';import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";





const GroupBuyPage = () => {
  const navigate = useNavigate();
  const {
    groupBuys,
    isLoading,
    filter,
    setFilter,
    statusFilter,
    setStatusFilter,
    myCount,
    createdCount,
    globalStats,
    user_type,
    handleCreateGroupBuy,
    handleUpdateStatus
  } = useGroupBuy();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedGroupBuy, setSelectedGroupBuy] = useState(null);

  const isPartner = user_type === 'PARTNER';


  const displayGroupBuys = isPartner ?
  groupBuys.filter((item) => item.isOwner) :
  groupBuys;

  const statusColors = {
    '모집중': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    '모집완료': 'bg-blue-50 text-blue-600 border-blue-100',
    '배송중': 'bg-orange-50 text-orange-600 border-orange-100',
    '수령': 'bg-yellow-50 text-yellow-600 border-yellow-100',
    '배분중': 'bg-purple-50 text-purple-600 border-purple-100',
    '완료': 'bg-gray-100 text-gray-600 border-gray-200',
    '취소': 'bg-red-50 text-red-600 border-red-100'
  };


  const translateStatus = (status) => {
    if (status === 'RECRUITING') return '모집중';
    if (status === 'RECRUITED') return '모집완료';
    if (status === 'SHIPPING') return '배송중';
    if (status === 'RECEIVED') return '수령';
    if (status === 'DISTRIBUTING') return '배분중';
    if (status === 'COMPLETED') return '완료';
    if (status === 'CANCELED') return '취소';
    return status;
  };


  const formatEndDate = (dateStr) => {
    if (!dateStr) return '';

    return dateStr.split('T')[0].replace(/-/g, '-');
  };

  return (
    _jsxDEV("div", { className: "min-h-screen bg-[#F8F9FA] pb-24 font-sans", children: [
      _jsxDEV("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12", children: [

        _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12", children: [
          _jsxDEV("div", { className: "bg-white p-8 rounded-[32px] shadow-sm border border-gray-100", children: [
            _jsxDEV("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2", children: "참여 가능한 그룹" }, void 0, false),
            _jsxDEV("h3", { className: "text-3xl font-black text-gray-900", children: [globalStats.ongoing, "건"] }, void 0, true)] }, void 0, true
          ),
          _jsxDEV("div", { className: "bg-white p-8 rounded-[32px] shadow-sm border border-gray-100", children: [
            _jsxDEV("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2", children: "나의 참여 그룹" }, void 0, false),
            _jsxDEV("h3", { className: "text-3xl font-black text-emerald-600", children: [myCount, "건"] }, void 0, true)] }, void 0, true
          ),
          _jsxDEV("div", { className: "bg-white p-8 rounded-[32px] shadow-sm border border-gray-100", children: [
            _jsxDEV("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2", children: "내가 개설한 그룹" }, void 0, false),
            _jsxDEV("h3", { className: "text-3xl font-black text-purple-600", children: [createdCount, "건"] }, void 0, true)] }, void 0, true
          ),
          _jsxDEV("div", { className: "bg-white p-8 rounded-[32px] shadow-sm border border-gray-100", children: [
            _jsxDEV("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2", children: "완료된 그룹" }, void 0, false),
            _jsxDEV("h3", { className: "text-3xl font-black text-blue-600", children: [globalStats.delivered, "건"] }, void 0, true)] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10", children: [
          _jsxDEV("div", { className: "space-y-2", children:
            _jsxDEV("div", { className: "flex items-center gap-3", children: [
              _jsxDEV("span", { className: "w-2.5 h-10 bg-emerald-500 rounded-full" }, void 0, false),
              _jsxDEV("h2", { className: "text-3xl sm:text-4xl font-black text-gray-900 tracking-tight", children:
                isPartner ? '공동구매 관리' : '공동구매 현황' }, void 0, false
              )] }, void 0, true
            ) }, void 0, false
          ),

          _jsxDEV("div", { className: "flex items-center gap-4 w-full sm:w-auto", children:

            _jsxDEV("button", {
              onClick: () => setIsCreateModalOpen(true),
              className: `flex-1 sm:flex-none px-10 py-4 rounded-2xl font-black transition-all shadow-xl active:scale-95 ${
              isPartner ? 'bg-gray-900 text-white hover:bg-black shadow-gray-200' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100'}`, children:

              "+ 공동그룹 생성" }, void 0, false

            ) }, void 0, false
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-[22px] shadow-sm border border-gray-100 w-fit mb-10", children: [
          _jsxDEV("button", {
            onClick: () => setFilter('all'),
            className: `px-6 sm:px-8 py-3 rounded-[16px] text-sm font-black transition-all ${
            filter === 'all' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'text-gray-400 hover:text-gray-600'}`, children:

            "참여 가능한 그룹" }, void 0, false

          ),
          _jsxDEV("button", {
            onClick: () => setFilter('my'),
            className: `px-6 sm:px-8 py-3 rounded-[16px] text-sm font-black transition-all ${
            filter === 'my' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'text-gray-400 hover:text-gray-600'}`, children:

            "나의 참여 그룹" }, void 0, false

          ),
          _jsxDEV("button", {
            onClick: () => setFilter('created'),
            className: `px-6 sm:px-8 py-3 rounded-[16px] text-sm font-black transition-all ${
            filter === 'created' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'text-gray-400 hover:text-gray-600'}`, children:

            "내가 개설한 그룹" }, void 0, false

          ),
          _jsxDEV("button", {
            onClick: () => setFilter('completed'),
            className: `px-6 sm:px-8 py-3 rounded-[16px] text-sm font-black transition-all ${
            filter === 'completed' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'text-gray-400 hover:text-gray-600'}`, children:

            "완료된 그룹" }, void 0, false

          )] }, void 0, true


















        ),


        isLoading ?
        _jsxDEV("div", { className: "flex flex-col items-center justify-center py-32 space-y-4", children: [
          _jsxDEV("div", { className: "w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" }, void 0, false),
          _jsxDEV("p", { className: "text-gray-400 font-black text-sm tracking-widest uppercase", children: "Fetching Groups..." }, void 0, false)] }, void 0, true
        ) :

        _jsxDEV("div", { className: "flex flex-col space-y-6", children:
          displayGroupBuys.map((item) => {
            const progress = Math.min(Math.round(item.currentParticipants / item.targetParticipants * 100), 100);
            const isJoined = item.isJoined;
            const displayStatus = translateStatus(item.status);

            return (
              _jsxDEV("div", {

                className: `group bg-white rounded-[24px] border-2 transition-all duration-500 flex flex-col lg:flex-row overflow-hidden hover:-translate-y-1 ${
                item.status === 'COMPLETED' ?
                'border-red-400 bg-gray-50/80 grayscale-[20%] opacity-90 shadow-[0_5px_15px_rgba(248,113,113,0.15)]' :
                item.isOwner ?
                'border-purple-400 shadow-[0_10px_30px_rgba(168,85,247,0.15)] bg-purple-50/10' :
                isJoined ?
                'border-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.15)] bg-emerald-50/5' :
                'border-gray-50 shadow-sm hover:shadow-lg'}`, children: [



                _jsxDEV("div", { className: "p-5 flex-1 flex flex-col justify-between relative", children: [

                  item.status === 'COMPLETED' &&
                  _jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden", children:
                    _jsxDEV("span", { className: "text-gray-200/40 text-7xl font-black -rotate-12 transform scale-150 select-none", children: "COMPLETED" }, void 0, false) }, void 0, false
                  ),


                  _jsxDEV("div", { className: "relative z-10", children: [
                    _jsxDEV("div", { className: "flex flex-wrap items-center justify-between gap-3 mb-3", children: [
                      _jsxDEV("div", { className: "flex flex-wrap gap-2 items-center", children: [
                        _jsxDEV("span", { className: `px-3 py-1 rounded-lg text-[10px] font-black border tracking-wider transition-colors ${statusColors[displayStatus] || 'bg-gray-100 text-gray-600'}`, children:
                          displayStatus }, void 0, false
                        ),
                        item.isOwner &&
                        _jsxDEV("span", { className: "bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-[10px] font-black border border-purple-200 shadow-sm flex items-center gap-1", children: [
                          _jsxDEV("span", { children: "👑" }, void 0, false), " 내가 개설한 그룹"] }, void 0, true
                        ),












                        item.paymentStatus && item.paymentStatus.toUpperCase() !== 'PENDING' &&
                        _jsxDEV("span", { className: "bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-black border border-indigo-100 shadow-sm", children: ["💳 ",
                          item.paymentStatus] }, void 0, true
                        ),

                        item.deliveryStatus && item.deliveryStatus.toUpperCase() !== 'PENDING' &&
                        _jsxDEV("span", { className: "bg-teal-50 text-teal-600 px-3 py-1 rounded-lg text-[10px] font-black border border-teal-100 shadow-sm", children: ["📦 ",
                          item.deliveryStatus] }, void 0, true
                        )] }, void 0, true

                      ),
                      _jsxDEV("span", { className: "text-[10px] font-black text-gray-300 bg-gray-50 px-2 py-1 rounded-md border border-gray-100", children:
                        item.category }, void 0, false
                      )] }, void 0, true
                    ),

                    _jsxDEV("h3", { className: "text-lg sm:text-xl font-black text-gray-900 mb-1.5 group-hover:text-emerald-600 transition-colors line-clamp-1", children:
                      item.groupName }, void 0, false
                    ),
                    !isPartner &&
                    _jsxDEV("p", { className: "text-xs font-bold text-gray-400 mb-4 flex items-center gap-1.5", children: [
                      _jsxDEV("span", { className: "w-1 h-1 bg-gray-300 rounded-full" }, void 0, false),
                      item.partnerName] }, void 0, true
                    ),



                    _jsxDEV("div", { className: "flex flex-col sm:flex-row gap-2 mb-4 text-xs font-bold text-gray-500", children: [
                      _jsxDEV("div", { className: "flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100", children: [
                        _jsxDEV("span", { className: "text-sm", children: "⏰" }, void 0, false),
                        _jsxDEV("span", { children: ["마감: ", _jsxDEV("span", { className: "text-gray-900", children: formatEndDate(item.endDate) }, void 0, false)] }, void 0, true)] }, void 0, true
                      ),
                      _jsxDEV("div", { className: "flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 flex-1", children: [
                        _jsxDEV("span", { className: "text-sm", children: "📍" }, void 0, false),
                        _jsxDEV("span", { className: "line-clamp-1", children: ["픽업: ", _jsxDEV("span", { className: "text-gray-900", children: item.pickupLocation || '미지정' }, void 0, false)] }, void 0, true)] }, void 0, true
                      )] }, void 0, true
                    )] }, void 0, true
                  ),

                  _jsxDEV("div", { className: "space-y-2 mt-auto relative z-10", children: [
                    _jsxDEV("div", { className: "flex justify-between items-end", children: [
                      _jsxDEV("span", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Progress" }, void 0, false),
                      _jsxDEV("div", { className: "text-right", children: [
                        _jsxDEV("span", { className: `text-lg font-black ${item.status === 'COMPLETED' ? 'text-gray-500' : item.isOwner ? 'text-purple-600' : 'text-emerald-600'}`, children: item.currentParticipants }, void 0, false),
                        _jsxDEV("span", { className: "text-xs font-bold text-gray-300", children: [" / ", item.targetParticipants, "명"] }, void 0, true)] }, void 0, true
                      )] }, void 0, true
                    ),
                    _jsxDEV("div", { className: "w-full bg-gray-100 h-1.5 rounded-full overflow-hidden border border-gray-50", children:
                      _jsxDEV("div", {
                        className: `${item.status === 'COMPLETED' ? 'bg-gray-400' : item.isOwner ? 'bg-purple-500' : 'bg-emerald-500'} h-full rounded-full transition-all duration-1000`,
                        style: { width: `${progress}%` } }, void 0, false
                      ) }, void 0, false
                    )] }, void 0, true
                  )] }, void 0, true
                ),


                _jsxDEV("div", { className: `w-full lg:w-[260px] p-5 border-t lg:border-t-0 lg:border-l flex flex-col justify-center shrink-0 relative z-10 ${
                  item.status === 'COMPLETED' ? 'bg-gray-100/50 border-red-200' : item.isOwner ? 'bg-purple-50/50 border-purple-100' : 'bg-gray-50/50 border-gray-100'}`, children: [

                  !isPartner &&
                  _jsxDEV("div", { className: "mb-4", children: [
                    _jsxDEV("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1", children: "총 참여 금액" }, void 0, false),
                    _jsxDEV("span", { className: "text-2xl font-black text-gray-900 tracking-tight", children: ["₩", item.totalAmount?.toLocaleString()] }, void 0, true)] }, void 0, true
                  ),


                  _jsxDEV("div", { className: "grid grid-cols-1 gap-2 mt-auto", children: [
                    !isPartner && displayStatus === '모집중' && !isJoined ?
                    _jsxDEV("button", {
                      onClick: () => navigate(`/group-buy/${item.groupBuySeq || item.seq}`),
                      className: "w-full py-3 bg-emerald-600 text-white rounded-[14px] font-black text-sm hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 active:scale-95", children:
                      "그룹 참여하기" }, void 0, false

                    ) :

                    _jsxDEV(_Fragment, { children:
                      _jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [
                        _jsxDEV("button", {
                          onClick: () => navigate(`/group-buy/${item.groupBuySeq || item.seq}/info`, { state: { item } }),
                          className: `py-2.5 rounded-xl font-black text-xs transition-all ${
                          item.status === 'COMPLETED' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' :
                          item.isOwner ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' :
                          'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`, children:

                          "상세 정보 내역" }, void 0, false

                        ),
                        _jsxDEV("button", {
                          onClick: () => navigate(`/group-buy/${item.groupBuySeq || item.seq}/delivery`),
                          className: "py-2.5 bg-gray-900 text-white rounded-xl font-black text-xs hover:bg-black transition-all shadow-md", children:
                          "배송 안내" }, void 0, false

                        )] }, void 0, true
                      ) }, void 0, false








                    ),


                    item.isOwner && item.status !== 'COMPLETED' &&
                    _jsxDEV("button", {
                      onClick: () => {
                        setSelectedGroupBuy(item);
                        setIsStatusModalOpen(true);
                      },
                      className: "w-full py-2.5 bg-orange-50 text-orange-600 rounded-xl font-black text-xs hover:bg-orange-100 transition-all mt-1 border border-orange-100", children:
                      "상태 업데이트" }, void 0, false

                    )] }, void 0, true

                  )] }, void 0, true
                )] }, item.groupBuySeq, true
              ));

          }) }, void 0, false
        )] }, void 0, true

      ),

      isCreateModalOpen && _jsxDEV(GroupBuyCreateModal, { onClose: () => setIsCreateModalOpen(false), onSubmit: handleCreateGroupBuy, isPartner: isPartner }, void 0, false),
      isStatusModalOpen &&
      _jsxDEV(GroupBuyStatusModal, {
        groupBuy: selectedGroupBuy,
        onClose: () => setIsStatusModalOpen(false),
        onUpdate: handleUpdateStatus }, void 0, false
      )] }, void 0, true

    ));

};

export default GroupBuyPage;