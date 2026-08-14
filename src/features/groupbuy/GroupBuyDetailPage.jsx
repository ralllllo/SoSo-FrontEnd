import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGroupBuy } from './hooks/useGroupBuy';

import { groupBuyApi } from '../../apis/groupBuyApi';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";








const GroupBuyDetailPage = () => {
  const { seq } = useParams();
  const navigate = useNavigate();
  const { handleJoinGroupBuy } = useGroupBuy();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await groupBuyApi.getGroupBuyDetail(seq);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const end = new Date(data.endDate);
        end.setHours(0, 0, 0, 0);
        let dDay = 'D-Day';
        if (!isNaN(end.getTime())) {
          const diffTime = end.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays > 0) dDay = `D-${diffDays}`;else
          if (diffDays < 0) dDay = `D+${Math.abs(diffDays)}`;
        }
        setItem({
          ...data,
          d_day: dDay
        });
      } catch (error) {
        console.error('Failed to fetch group buy detail:', error);
        alert('상세 정보를 불러오는데 실패했습니다.');
        navigate('/group-buy', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [seq, navigate]);

  if (isLoading) return _jsxDEV("div", { className: "min-h-screen flex items-center justify-center font-black text-gray-400", children: "LOADING..." }, void 0, false);

  const progress = Math.min(Math.round(item.currentParticipants / item.targetParticipants * 100), 100);

  return (
    _jsxDEV("div", { className: "min-h-screen bg-[#F8F9FA] pb-24 font-sans text-gray-900", children:
      _jsxDEV("main", { className: "max-w-2xl mx-auto px-6 py-12", children: [
        _jsxDEV("button", { onClick: () => navigate(-1), className: "mb-8 p-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all", children:
          _jsxDEV("svg", { className: "w-6 h-6 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children:
            _jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }, void 0, false) }, void 0, false
          ) }, void 0, false
        ),

        _jsxDEV("div", { className: "bg-white rounded-[48px] shadow-2xl shadow-gray-200/50 border border-gray-50 overflow-hidden", children:
          _jsxDEV("div", { className: "p-12 space-y-10", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("div", { className: "flex gap-2 mb-4", children: [
                _jsxDEV("span", { className: "px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-wider", children: item.category }, void 0, false),
                _jsxDEV("span", { className: "px-3 py-1 bg-red-500 text-white rounded-lg text-[10px] font-black", children: item.d_day }, void 0, false)] }, void 0, true
              ),
              _jsxDEV("h2", { className: "text-3xl font-black mb-2", children: item.groupName }, void 0, false),
              _jsxDEV("p", { className: "text-gray-400 font-bold", children: item.partnerName }, void 0, false)] }, void 0, true
            ),

            _jsxDEV("div", { className: "space-y-4", children: [
              _jsxDEV("div", { className: "flex justify-between items-end", children: [
                _jsxDEV("span", { className: "text-xs font-black text-gray-400 uppercase tracking-widest", children: "Recruitment Progress" }, void 0, false),
                _jsxDEV("div", { className: "text-right", children: [
                  _jsxDEV("span", { className: "text-2xl font-black text-emerald-600", children: item.currentParticipants }, void 0, false),
                  _jsxDEV("span", { className: "text-sm font-bold text-gray-300", children: [" / ", item.targetParticipants, "명"] }, void 0, true)] }, void 0, true
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "w-full bg-gray-50 h-3 rounded-full overflow-hidden border border-gray-100", children:
                _jsxDEV("div", { className: "bg-emerald-500 h-full rounded-full transition-all duration-1000", style: { width: `${progress}%` } }, void 0, false) }, void 0, false
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "grid grid-cols-2 gap-4 py-6 border-y border-dashed border-gray-100", children: [
              _jsxDEV("div", { children: [
                _jsxDEV("p", { className: "text-[10px] font-black text-gray-300 uppercase mb-1", children: "단가 / 총 결제금액" }, void 0, false),
                _jsxDEV("p", { className: "text-lg font-black", children: ["₩", item.unitPrice?.toLocaleString(), " ", _jsxDEV("span", { className: "text-sm text-gray-400 font-bold", children: ["/ ₩", item.totalAmount?.toLocaleString()] }, void 0, true)] }, void 0, true)] }, void 0, true
              ),
              _jsxDEV("div", { children: [
                _jsxDEV("p", { className: "text-[10px] font-black text-gray-300 uppercase mb-1", children: "마감 일자" }, void 0, false),
                _jsxDEV("p", { className: "text-lg font-black", children: item.endDate }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              _jsxDEV("div", { className: "p-5 bg-blue-50/50 rounded-[24px] border border-blue-100", children: [
                _jsxDEV("h3", { className: "text-[10px] font-black text-blue-500 uppercase tracking-wider mb-2 flex items-center gap-1.5", children: [_jsxDEV("span", { className: "text-sm", children: "📍" }, void 0, false), " 픽업 장소"] }, void 0, true),
                _jsxDEV("p", { className: "text-sm font-bold text-gray-800", children: item.pickupLocation }, void 0, false)] }, void 0, true
              ),
              _jsxDEV("div", { className: "p-5 bg-purple-50/50 rounded-[24px] border border-purple-100", children: [
                _jsxDEV("h3", { className: "text-[10px] font-black text-purple-500 uppercase tracking-wider mb-2 flex items-center gap-1.5", children: [_jsxDEV("span", { className: "text-sm", children: "⏰" }, void 0, false), " 픽업 가능 시간"] }, void 0, true),
                _jsxDEV("p", { className: "text-sm font-bold text-gray-800", children: item.pickupTime }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "space-y-4", children: [
              _jsxDEV("h3", { className: "text-sm font-black uppercase tracking-wider flex items-center gap-2", children: [
                _jsxDEV("span", { className: "w-1 h-3 bg-emerald-500 rounded-full" }, void 0, false), "유의사항"] }, void 0, true

              ),
              _jsxDEV("div", { className: "p-6 bg-gray-50 rounded-[32px] border border-gray-100", children:
                _jsxDEV("p", { className: "text-sm font-bold text-gray-600 leading-relaxed", children: item.notice }, void 0, false) }, void 0, false
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "pt-6", children:
              _jsxDEV("button", {
                onClick: () => {
                  handleJoinGroupBuy(item.groupBuySeq || item.seq);
                  navigate('/group-buy');
                },
                className: "w-full py-6 bg-emerald-600 text-white rounded-[28px] font-black text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95 hover:-translate-y-1", children:
                "공동구매 참여하기" }, void 0, false

              ) }, void 0, false
            )] }, void 0, true
          ) }, void 0, false
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default GroupBuyDetailPage;