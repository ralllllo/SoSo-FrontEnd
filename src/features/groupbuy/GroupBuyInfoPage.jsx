import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useGroupBuy } from './hooks/useGroupBuy';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const GroupBuyInfoPage = () => {
  const { seq } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { groupBuys, isLoading } = useGroupBuy();
  const [item, setItem] = useState(location.state?.item || null);

  useEffect(() => {
    if (!item && groupBuys && groupBuys.length > 0) {
      const found = groupBuys.find((g) => String(g.seq) === String(seq) || String(g.groupBuySeq) === String(seq));
      setItem(found);
    }
  }, [seq, groupBuys, item]);

  if (!item && isLoading) {
    return (
      _jsxDEV("div", { className: "min-h-screen flex flex-col items-center justify-center font-black text-gray-400 bg-[#F8F9FA] space-y-4", children: [
        _jsxDEV("div", { className: "w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" }, void 0, false),
        _jsxDEV("p", { className: "tracking-widest uppercase", children: "Fetching Details..." }, void 0, false)] }, void 0, true
      ));

  }

  if (!item) {
    return (
      _jsxDEV("div", { className: "min-h-screen flex flex-col items-center justify-center font-black text-gray-900 bg-[#F8F9FA] pb-24 space-y-4", children: [
        _jsxDEV("div", { className: "text-5xl mb-2", children: "📄" }, void 0, false),
        _jsxDEV("p", { className: "text-xl", children: "해당 그룹의 상세 정보를 찾을 수 없습니다." }, void 0, false),
        _jsxDEV("button", { onClick: () => navigate('/group-buy'), className: "px-8 py-3.5 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100", children: "목록으로 가기" }, void 0, false

        )] }, void 0, true
      ));

  }

  const progress = Math.min(Math.round(item.currentParticipants / item.targetParticipants * 100), 100) || 0;


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

  const displayStatus = translateStatus(item.status);

  return (
    _jsxDEV("div", { className: "min-h-screen bg-[#F8F9FA] pb-24 font-sans text-gray-900", children:
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
            _jsxDEV("p", { className: "text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]", children: "Detail History" }, void 0, false),
            _jsxDEV("h1", { className: "text-lg font-black text-gray-900", children: "상세 내역 조회" }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { className: "w-12" }, void 0, false), " "] }, void 0, true
        ),


        _jsxDEV("div", { className: "bg-white rounded-[40px] shadow-xl shadow-gray-200/40 border border-gray-50 overflow-hidden relative", children: [

          _jsxDEV("div", { className: "absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-full opacity-50 pointer-events-none" }, void 0, false),

          _jsxDEV("div", { className: "p-8 sm:p-10 relative z-10", children: [

            _jsxDEV("div", { className: "flex flex-wrap items-center gap-2 mb-6", children: [
              _jsxDEV("span", { className: "px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black border border-emerald-100", children:
                item.category || '기타' }, void 0, false
              ),
              _jsxDEV("span", { className: "px-4 py-1.5 bg-gray-900 text-white rounded-xl text-xs font-black shadow-md shadow-gray-200", children:
                item.dDay || 'D-Day' }, void 0, false
              ),
              _jsxDEV("span", { className: "px-4 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-black border border-blue-100", children:
                displayStatus }, void 0, false
              )] }, void 0, true
            ),


            _jsxDEV("h2", { className: "text-3xl sm:text-4xl font-black mb-3 leading-tight tracking-tight", children:
              item.groupName }, void 0, false
            ),
            _jsxDEV("p", { className: "text-sm font-bold text-gray-400 flex items-center gap-2 mb-10", children: [
              _jsxDEV("span", { className: "w-1.5 h-1.5 bg-gray-300 rounded-full" }, void 0, false),
              item.partnerName || '미지정 사업자'] }, void 0, true
            ),


            _jsxDEV("div", { className: "bg-gray-50 p-6 rounded-[24px] border border-gray-100 shadow-sm mb-6", children: [
              _jsxDEV("div", { className: "flex justify-between items-end mb-3", children: [
                _jsxDEV("span", { className: "text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5", children: [
                  _jsxDEV("span", { className: "text-emerald-500", children: "🔥" }, void 0, false), " 모집 현황"] }, void 0, true
                ),
                _jsxDEV("div", { className: "text-right", children: [
                  _jsxDEV("span", { className: "text-2xl font-black text-emerald-600", children: item.currentParticipants || 0 }, void 0, false),
                  _jsxDEV("span", { className: "text-sm font-bold text-gray-400", children: [" / ", item.targetParticipants || 0, "명"] }, void 0, true)] }, void 0, true
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "w-full bg-gray-200 h-2.5 rounded-full overflow-hidden", children:
                _jsxDEV("div", {
                  className: "bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out relative",
                  style: { width: `${progress}%` }, children:

                  _jsxDEV("div", { className: "absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse" }, void 0, false) }, void 0, false
                ) }, void 0, false
              )] }, void 0, true
            ),


            _jsxDEV("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [
              _jsxDEV("div", { className: "p-6 bg-white border border-gray-100 rounded-[24px] shadow-sm flex flex-col justify-center", children: [
                _jsxDEV("p", { className: "text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2", children: "단가" }, void 0, false),
                _jsxDEV("p", { className: "text-xl font-black text-gray-900 tracking-tight", children: ["₩", item.unitPrice?.toLocaleString() || '0'] }, void 0, true)] }, void 0, true
              ),
              _jsxDEV("div", { className: "p-6 bg-white border border-gray-100 rounded-[24px] shadow-sm flex flex-col justify-center", children: [
                _jsxDEV("p", { className: "text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2", children: "수량 / 묶음" }, void 0, false),
                _jsxDEV("p", { className: "text-xl font-black text-gray-900 tracking-tight", children: [item.quantity || '1', "개"] }, void 0, true)] }, void 0, true
              )] }, void 0, true
            ),


            _jsxDEV("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [
              _jsxDEV("div", { className: "p-6 bg-white border border-gray-100 rounded-[24px] shadow-sm flex flex-col justify-center", children: [
                _jsxDEV("p", { className: "text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2", children: "총 결제/목표 금액" }, void 0, false),
                _jsxDEV("p", { className: "text-xl font-black text-gray-900 tracking-tight", children: ["₩",
                  item.totalAmount?.toLocaleString() || 0] }, void 0, true
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "p-6 bg-white border border-gray-100 rounded-[24px] shadow-sm flex flex-col justify-center", children: [
                _jsxDEV("p", { className: "text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2", children: "마감 일자" }, void 0, false),
                _jsxDEV("p", { className: "text-xl font-black text-gray-900 tracking-tight", children:
                  item.endDate ? item.endDate.split('T')[0] : '미지정' }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            ),


            _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: [
              _jsxDEV("div", { className: "p-6 bg-blue-50/30 rounded-[24px] border border-blue-50 shadow-sm", children: [
                _jsxDEV("h3", { className: "text-[11px] font-black text-blue-500 uppercase tracking-widest mb-3 flex items-center gap-2", children: [
                  _jsxDEV("span", { className: "p-2 bg-blue-100 rounded-xl text-base", children: "📍" }, void 0, false), " 픽업 장소"] }, void 0, true
                ),
                _jsxDEV("p", { className: "text-base font-bold text-gray-800 leading-relaxed pl-1 break-keep", children:
                  item.pickupLocation || '지정된 픽업 장소가 없습니다.' }, void 0, false
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "p-6 bg-purple-50/30 rounded-[24px] border border-purple-50 shadow-sm", children: [
                _jsxDEV("h3", { className: "text-[11px] font-black text-purple-500 uppercase tracking-widest mb-3 flex items-center gap-2", children: [
                  _jsxDEV("span", { className: "p-2 bg-purple-100 rounded-xl text-base", children: "⏰" }, void 0, false), " 픽업 시간"] }, void 0, true
                ),
                _jsxDEV("p", { className: "text-base font-bold text-gray-800 leading-relaxed pl-1 break-keep", children:
                  item.pickupTime || '상시 픽업 가능 (상세 미지정)' }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            ),


            item.notice &&
            _jsxDEV("div", { className: "p-6 bg-gray-50 rounded-[24px] border border-gray-100 shadow-sm", children: [
              _jsxDEV("h3", { className: "text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2", children: [
                _jsxDEV("span", { className: "p-2 bg-gray-200 rounded-xl text-base", children: "📌" }, void 0, false), " 유의사항"] }, void 0, true
              ),
              _jsxDEV("p", { className: "text-base font-bold text-gray-700 leading-relaxed break-keep whitespace-pre-wrap pl-1", children:
                item.notice }, void 0, false
              )] }, void 0, true
            )] }, void 0, true

          )] }, void 0, true
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default GroupBuyInfoPage;