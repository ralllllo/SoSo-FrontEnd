import React, { useEffect, useState } from 'react';
import { useGroupBuyLookup } from './hooks/useGroupBuyLookup';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const GroupOrderLookupPage = () => {
  const { history, isLoading, fetchHistory } = useGroupBuyLookup();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [history]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(history.length / itemsPerPage) || 1;
  const displayedHistory = history.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    _jsxDEV("div", { className: "p-8 max-w-7xl mx-auto", children: [
      _jsxDEV("header", { className: "mb-8 flex justify-between items-end", children:
        _jsxDEV("div", { children: [
          _jsxDEV("div", { className: "flex items-center gap-2 mb-2", children: [
            _jsxDEV("span", { className: "w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 text-sm", children: "🤝" }, void 0, false),
            _jsxDEV("span", { className: "text-[11px] font-black text-purple-500 uppercase tracking-widest", children: "Group Buy" }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("h1", { className: "text-3xl font-black text-gray-900 tracking-tight", children: "공동구매 참여 이력" }, void 0, false),
          _jsxDEV("p", { className: "text-sm text-gray-400 font-medium mt-1", children: "참여한 모든 공동구매의 진행 상태와 이력을 확인합니다." }, void 0, false)] }, void 0, true
        ) }, void 0, false
      ),


      _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [
        _jsxDEV("div", { className: "bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm", children: [
          _jsxDEV("div", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2", children: "전체 참여 건수" }, void 0, false),
          _jsxDEV("div", { className: "text-2xl font-black text-gray-900", children: [history.length, "건"] }, void 0, true)] }, void 0, true
        ),
        _jsxDEV("div", { className: "bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm", children: [
          _jsxDEV("div", { className: "text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2", children: "완료된 구매" }, void 0, false),
          _jsxDEV("div", { className: "text-2xl font-black text-emerald-600", children: [
            history.filter((h) => h.status === 'COMPLETED').length, "건"] }, void 0, true
          )] }, void 0, true
        ),
        _jsxDEV("div", { className: "bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm", children: [
          _jsxDEV("div", { className: "text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2", children: "진행 중인 구매" }, void 0, false),
          _jsxDEV("div", { className: "text-2xl font-black text-blue-600", children: [
            history.filter((h) => h.status !== 'COMPLETED' && h.status !== 'CLOSED').length, "건"] }, void 0, true
          )] }, void 0, true
        ),
        _jsxDEV("div", { className: "bg-purple-600 p-6 rounded-[2rem] shadow-lg shadow-purple-100", children: [
          _jsxDEV("div", { className: "text-[10px] font-black text-white/50 uppercase tracking-widest mb-2", children: "누적 절감액" }, void 0, false),
          _jsxDEV("div", { className: "text-2xl font-black text-white", children: [(history.length * 15200).toLocaleString(), "원"] }, void 0, true)] }, void 0, true
        )] }, void 0, true
      ),

      _jsxDEV("div", { className: "bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden", children:
        _jsxDEV("table", { className: "w-full text-left border-collapse", children: [
          _jsxDEV("thead", { children:
            _jsxDEV("tr", { className: "bg-gray-50/50 border-b border-gray-100", children: [
              _jsxDEV("th", { className: "px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "참여일" }, void 0, false),
              _jsxDEV("th", { className: "px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "상태" }, void 0, false),
              _jsxDEV("th", { className: "px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider", children: "공동구매 품목" }, void 0, false),
              _jsxDEV("th", { className: "px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "목표 대비 달성" }, void 0, false),
              _jsxDEV("th", { className: "px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "마감일" }, void 0, false)] }, void 0, true
            ) }, void 0, false
          ),
          _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
            isLoading ?
            _jsxDEV("tr", { children: _jsxDEV("td", { colSpan: "5", className: "px-8 py-20 text-center text-gray-400 font-bold animate-pulse", children: "데이터를 불러오는 중..." }, void 0, false) }, void 0, false) :
            displayedHistory.length > 0 ?
            displayedHistory.map((gb) =>
            _jsxDEV("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
              _jsxDEV("td", { className: "px-8 py-6 text-sm font-bold text-gray-400 text-center", children:
                gb.createdAt?.split('T')[0] }, void 0, false
              ),
              _jsxDEV("td", { className: "px-8 py-6 text-center", children:
                _jsxDEV("span", { className: `px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  gb.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' :
                  gb.status === 'RECRUITING' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`, children:

                  gb.status }, void 0, false
                ) }, void 0, false
              ),
              _jsxDEV("td", { className: "px-8 py-6", children:
                _jsxDEV("div", { className: "text-[15px] font-black text-gray-900", children: gb.itemName }, void 0, false) }, void 0, false
              ),
              _jsxDEV("td", { className: "px-8 py-6 text-center", children: [
                _jsxDEV("div", { className: "w-full max-w-[120px] mx-auto bg-gray-100 h-2 rounded-full overflow-hidden mb-1", children:
                  _jsxDEV("div", {
                    className: "bg-emerald-500 h-full rounded-full transition-all",
                    style: { width: `${Math.min(100, (gb.currentParticipants || 0) / (gb.targetParticipants || 1) * 100)}%` } }, void 0, false
                  ) }, void 0, false
                ),
                _jsxDEV("span", { className: "text-[11px] font-bold text-gray-400", children: [
                  gb.currentParticipants || 0, " / ", gb.targetParticipants || 0] }, void 0, true
                )] }, void 0, true
              ),
              _jsxDEV("td", { className: "px-8 py-6 text-sm font-bold text-rose-500 text-center uppercase", children:
                gb.endDate?.split('T')[0] }, void 0, false
              )] }, gb.groupBuySeq, true
            )
            ) :

            _jsxDEV("tr", { children:
              _jsxDEV("td", { colSpan: "5", className: "px-8 py-32 text-center", children: [
                _jsxDEV("div", { className: "text-5xl mb-6 opacity-20", children: "🤝" }, void 0, false),
                _jsxDEV("p", { className: "text-gray-400 font-bold", children: "참여한 공동구매 이력이 없습니다." }, void 0, false)] }, void 0, true
              ) }, void 0, false
            ) }, void 0, false

          )] }, void 0, true
        ) }, void 0, false
      ),


      !isLoading && history.length > 0 &&
      _jsxDEV("div", { className: "mt-8 flex justify-center items-center gap-2", children: [
        _jsxDEV("button", {
          onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
          disabled: currentPage === 1,
          className: "w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-all", children:
          "←" }, void 0, false

        ),
        (() => {
          const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
          const endPage = Math.min(startPage + 9, totalPages);
          const pageButtons = [];
          for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
              _jsxDEV("button", {

                onClick: () => setCurrentPage(i),
                className: `w-10 h-10 rounded-xl font-black text-sm transition-all ${
                currentPage === i ?
                'bg-purple-600 text-white shadow-lg shadow-purple-200' :
                'bg-white text-gray-400 hover:text-gray-900 border border-gray-100'}`, children:


                i }, i, false
              )
            );
          }
          return pageButtons;
        })(),
        _jsxDEV("button", {
          onClick: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)),
          disabled: currentPage === totalPages,
          className: "w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-all", children:
          "→" }, void 0, false

        )] }, void 0, true
      )] }, void 0, true

    ));

};

export default GroupOrderLookupPage;