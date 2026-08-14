import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { groupBuyApi } from '../../apis/groupBuyApi';
import authStore from '../../store/authStore';
import GroupBuyStatusModal from './components/GroupBuyStatusModal';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";










const GroupBuyDeliveryPage = () => {
  const { seq } = useParams();
  const navigate = useNavigate();
  const [groupBuy, setGroupBuy] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const { user_seq } = authStore();

  const fetchGroupBuyData = async () => {
    setIsLoading(true);
    try {

      const data = await groupBuyApi.getGroupBuyDetail(seq);
      setGroupBuy({
        ...data,
        groupBuySeq: data.groupBuySeq || seq,

        title: data.groupName,
        status: data.status,
        delivery_note: data.notice || '등록된 배송 유의사항이 없습니다.',
        pickup_location: data.pickupLocation,
        supplier_name: data.partnerName,
        arrival_time: data.pickupTime || '미정',
        userSeq: data.userSeq
      });
    } catch (error) {
      console.error('Failed to fetch real delivery info, using mock:', error);

      setGroupBuy({
        groupBuySeq: seq,
        userSeq: 1,
        title: '한우 등심 (1+ 등급, 10kg)',
        status: 'SHIPPING',
        delivery_note: '정문 앞 무인 택배함 03번에 보관 예정입니다.',
        pickup_location: '서울특별시 강남구 테헤란로 123 소소빌딩 1층 정문 택배함',
        supplier_name: '상생 농장',
        arrival_time: '오늘 오후 4시 도착 예정'
      });
    }

    try {
      const participantData = await groupBuyApi.getParticipants(seq);
      setParticipants(participantData || [
      { bizname: '강남 김치찌개', user_nickname: '김사장' },
      { bizname: '서초 파스타', user_nickname: '이사장' },
      { bizname: '역삼 베이커리', user_nickname: '박사장' }]
      );
    } catch (error) {
      console.error('Failed to fetch participants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupBuyData();
  }, [seq]);

  const handleUpdateStatus = async (groupBuySeq, status) => {
    try {
      await groupBuyApi.updateGroupBuyStatus(groupBuySeq, status);
      alert('상태가 변경되었습니다.');
      fetchGroupBuyData();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('상태 변경에 실패했습니다.');
    }
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

  if (isLoading) return (
    _jsxDEV("div", { className: "min-h-screen flex items-center justify-center bg-[#F8F9FA]", children:
      _jsxDEV("div", { className: "flex flex-col items-center gap-4", children: [
        _jsxDEV("div", { className: "w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" }, void 0, false),
        _jsxDEV("p", { className: "text-gray-400 font-black text-sm tracking-widest uppercase", children: "Loading Pickup Info" }, void 0, false)] }, void 0, true
      ) }, void 0, false
    ));


  return (
    _jsxDEV("div", { className: "min-h-screen bg-[#F8F9FA] pb-24 font-sans text-gray-900", children: [
      _jsxDEV("main", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12", children: [

        _jsxDEV("div", { className: "flex items-center justify-between mb-8", children: [
          _jsxDEV("button", {
            onClick: () => navigate(-1),
            className: "p-3.5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all group", children:

            _jsxDEV("svg", { className: "w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-colors", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children:
              _jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M15 19l-7-7 7-7" }, void 0, false) }, void 0, false
            ) }, void 0, false
          ),
          _jsxDEV("div", { className: "text-center", children: [
            _jsxDEV("p", { className: "text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]", children: "Delivery Info" }, void 0, false),
            _jsxDEV("h1", { className: "text-lg font-black text-gray-900", children: "배송 안내" }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { className: "w-12" }, void 0, false), " "] }, void 0, true
        ),


        _jsxDEV("div", { className: "bg-white rounded-[40px] shadow-xl shadow-gray-200/40 border border-gray-50 overflow-hidden relative", children: [

          _jsxDEV("div", { className: "bg-gray-900 p-8 sm:p-10 text-white relative overflow-hidden", children: [
            _jsxDEV("div", { className: "absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-bl-full pointer-events-none" }, void 0, false),
            _jsxDEV("div", { className: "relative z-10", children: [
              _jsxDEV("div", { className: "flex justify-between items-center mb-6", children: [
                _jsxDEV("span", { className: "text-[10px] font-black uppercase tracking-[0.3em] text-gray-400", children: "Pickup Status" }, void 0, false),
                _jsxDEV("div", { className: "flex items-center gap-2", children: [
                  _jsxDEV("span", { className: "w-2 h-2 bg-emerald-500 rounded-full animate-pulse" }, void 0, false),
                  _jsxDEV("span", { className: "text-xs font-black text-emerald-500", children: translateStatus(groupBuy.status) }, void 0, false)] }, void 0, true
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "flex justify-between items-start gap-4", children:
                _jsxDEV("h2", { className: "text-3xl sm:text-4xl font-black mb-4 leading-tight tracking-tight", children: groupBuy.title }, void 0, false) }, void 0, false
              ),
              _jsxDEV("div", { className: "flex items-center gap-4 text-gray-300 text-sm font-bold", children: [
                _jsxDEV("span", { className: "flex items-center gap-1.5", children: [
                  _jsxDEV("span", { className: "text-base", children: "🏢" }, void 0, false), " ", groupBuy.supplier_name] }, void 0, true
                ),
                _jsxDEV("span", { className: "w-1 h-1 bg-gray-600 rounded-full" }, void 0, false),
                _jsxDEV("span", { className: "text-emerald-400", children: groupBuy.arrival_time }, void 0, false)] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "p-8 sm:p-10 space-y-10", children: [

            _jsxDEV("section", { children: [
              _jsxDEV("h3", { className: "text-[11px] font-black text-gray-400 uppercase tracking-widest mb-8 text-center", children: "진행 단계" }, void 0, false),
              _jsxDEV("div", { className: "flex justify-between items-start relative px-4", children: [

                _jsxDEV("div", { className: "absolute top-7 left-10 right-10 h-1 bg-gray-50 -z-0 rounded-full" }, void 0, false),

                _jsxDEV("div", {
                  className: "absolute top-7 left-10 h-1 bg-emerald-500 transition-all duration-1000 rounded-full shadow-sm",
                  style: {
                    width: ['RECRUITING', 'RECRUITED'].includes(groupBuy.status) ? '0%' :
                    groupBuy.status === 'SHIPPING' ? '25%' :
                    groupBuy.status === 'RECEIVED' ? '50%' :
                    groupBuy.status === 'DISTRIBUTING' ? '75%' : 'calc(100% - 60px)'
                  } }, void 0, false
                ),

                [
                { label: '배송중', icon: '🚚', active: ['SHIPPING', 'RECEIVED', 'DISTRIBUTING', 'COMPLETED'].includes(groupBuy.status) },
                { label: '수령', icon: '🏢', active: ['RECEIVED', 'DISTRIBUTING', 'COMPLETED'].includes(groupBuy.status) },
                { label: '배분중', icon: '🛍️', active: ['DISTRIBUTING', 'COMPLETED'].includes(groupBuy.status) },
                { label: '완료', icon: '✅', active: groupBuy.status === 'COMPLETED' }].
                map((step, i) =>
                _jsxDEV("div", { className: "flex flex-col items-center gap-4 relative z-10 bg-white px-2", children: [
                  _jsxDEV("div", { className: `w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 ${step.active ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-200 ring-4 ring-emerald-50' : 'bg-gray-50 text-gray-200 border border-gray-100'}`, children:
                    step.icon }, void 0, false
                  ),
                  _jsxDEV("span", { className: `text-[11px] font-black ${step.active ? 'text-emerald-600' : 'text-gray-300'}`, children: step.label }, void 0, false)] }, i, true
                )
                )] }, void 0, true
              )] }, void 0, true
            ),


            _jsxDEV("section", { className: "space-y-4", children: [
              _jsxDEV("div", { className: "flex items-center gap-2 mb-2", children: [
                _jsxDEV("span", { className: "w-1 h-3 bg-emerald-500 rounded-full" }, void 0, false),
                _jsxDEV("h3", { className: "text-[11px] font-black text-gray-500 uppercase tracking-widest", children: "수령 정보" }, void 0, false)] }, void 0, true
              ),
              _jsxDEV("div", { className: "grid grid-cols-1 gap-4", children: [
                _jsxDEV("div", { className: "p-6 bg-gray-50 rounded-[24px] border border-gray-100 shadow-sm group hover:border-emerald-200 transition-colors", children:
                  _jsxDEV("div", { className: "flex items-start gap-4", children: [
                    _jsxDEV("div", { className: "w-10 h-10 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm border border-gray-100", children: "📍" }, void 0, false),
                    _jsxDEV("div", { className: "flex-1", children: [
                      _jsxDEV("p", { className: "text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-widest", children: "Pickup Location" }, void 0, false),
                      _jsxDEV("p", { className: "text-base font-black text-gray-900 leading-relaxed mb-3", children: groupBuy.pickup_location }, void 0, false),
                      _jsxDEV("button", { className: "text-[11px] font-black text-emerald-500 flex items-center gap-1.5 hover:gap-2 transition-all", children: ["지도에서 위치 확인하기",

                        _jsxDEV("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children:
                          _jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 8l4 4m0 0l-4 4m4-4H3" }, void 0, false) }, void 0, false
                        )] }, void 0, true
                      )] }, void 0, true
                    )] }, void 0, true
                  ) }, void 0, false
                ),

                _jsxDEV("div", { className: "p-6 bg-emerald-50/30 rounded-[24px] border border-emerald-100/50 shadow-sm", children:
                  _jsxDEV("div", { className: "flex items-start gap-4", children: [
                    _jsxDEV("div", { className: "w-10 h-10 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm border border-emerald-100/50", children: "📝" }, void 0, false),
                    _jsxDEV("div", { children: [
                      _jsxDEV("p", { className: "text-[11px] font-black text-emerald-600 uppercase mb-1.5 tracking-widest", children: "Delivery Notes" }, void 0, false),
                      _jsxDEV("p", { className: "text-base font-bold text-gray-700 leading-relaxed", children: groupBuy.delivery_note }, void 0, false)] }, void 0, true
                    )] }, void 0, true
                  ) }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true



























          )] }, void 0, true
        )] }, void 0, true
      ),


      isStatusModalOpen &&
      _jsxDEV(GroupBuyStatusModal, {
        groupBuy: groupBuy,
        onClose: () => setIsStatusModalOpen(false),
        onUpdate: handleUpdateStatus }, void 0, false
      )] }, void 0, true

    ));

};

export default GroupBuyDeliveryPage;