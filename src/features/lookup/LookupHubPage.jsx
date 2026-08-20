import React from 'react';
import { useNavigate } from 'react-router-dom';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const LookupHubPage = () => {
  const navigate = useNavigate();

  const cards = [
  {
    title: '재고 변동 이력',
    desc: '입고, 출고, 재고 조정 내역 확인',
    icon: '📦',
    path: '/lookup/stock',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: '발주 이력 조회',
    desc: '과거 발주서 및 거래 현황 아카이브',
    icon: '📄',
    path: '/lookup/orders',
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    title: '공동구매 이력',
    desc: '참여한 공동구매 및 비용 절감 리포트',
    icon: '🤝',
    path: '/lookup/group-orders',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    title: '영업 일지 기록',
    desc: '매일의 특이사항 및 업무 일지 확인',
    icon: '📝',
    path: '/lookup/business-logs',
    color: 'bg-amber-50 text-amber-600'
  }];


  return (
    _jsxDEV("div", { className: "p-10 max-w-6xl mx-auto", children: [
      _jsxDEV("header", { className: "mb-12", children: [
        _jsxDEV("h1", { className: "text-4xl font-black text-gray-900 tracking-tight mb-3", children: "무엇을 도와드릴까요?" }, void 0, false),
        _jsxDEV("p", { className: "text-[17px] text-gray-400 font-medium", children: "서비스 내 모든 기록을 한눈에 조회하고 관리하세요." }, void 0, false)] }, void 0, true
      ),

      _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children:
        cards.map((card) =>
        _jsxDEV("button", {

          onClick: () => navigate(card.path),
          className: "group bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2 transition-all text-left flex flex-col justify-between h-72", children: [

          _jsxDEV("div", { children: [
            _jsxDEV("div", { className: `w-16 h-16 rounded-[1.5rem] ${card.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`, children:
              card.icon }, void 0, false
            ),
            _jsxDEV("h3", { className: "text-2xl font-black text-gray-900 mb-2", children: card.title }, void 0, false),
            _jsxDEV("p", { className: "text-gray-400 font-medium", children: card.desc }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { className: "flex items-center gap-2 text-[13px] font-black text-gray-900 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity", children: ["바로가기 ",
            _jsxDEV("span", { className: "text-lg", children: "→" }, void 0, false)] }, void 0, true
          )] }, card.path, true
        )
        ) }, void 0, false
      )] }, void 0, true
    ));

};

export default LookupHubPage;