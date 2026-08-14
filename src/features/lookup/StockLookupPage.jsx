import React, { useState, useEffect } from 'react';
import { useStockLookup } from './hooks/useStockLookup';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return '-';
  try {
    let isoStr = dateTimeStr.replace(' ', 'T');
    if (!isoStr.endsWith('Z') && !isoStr.includes('+') && !isoStr.includes('-')) {
      isoStr += 'Z';
    }
    const date = new Date(isoStr);
    if (isNaN(date.getTime())) {
      return dateTimeStr.replace('T', ' ');
    }
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  } catch (e) {
    return dateTimeStr.replace('T', ' ');
  }
};

const StockLookupPage = () => {
  const [params, setParams] = useState({
    page: 1,
    size: 10,
    transactionType: 'ALL',
    startDate: '',
    endDate: '',
    keyword: ''
  });

  const { historyData, isLoading, fetchHistory } = useStockLookup();

  useEffect(() => {
    fetchHistory(params);
  }, [fetchHistory, params]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  return (
    _jsxDEV("div", { className: "p-8 max-w-7xl mx-auto", children: [
      _jsxDEV("header", { className: "mb-8 flex justify-between items-end", children:
        _jsxDEV("div", { children: [
          _jsxDEV("div", { className: "flex items-center gap-2 mb-2", children: [
            _jsxDEV("span", { className: "w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm", children: "📦" }, void 0, false),
            _jsxDEV("span", { className: "text-[11px] font-black text-blue-500 uppercase tracking-widest", children: "History" }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("h1", { className: "text-3xl font-black text-gray-900 tracking-tight", children: "재고 변동 이력 조회" }, void 0, false),
          _jsxDEV("p", { className: "text-sm text-gray-400 font-medium mt-1", children: "입고, 출고 및 모든 재고 조정 내역을 통합 조회합니다." }, void 0, false)] }, void 0, true
        ) }, void 0, false
      ),


      _jsxDEV("div", { className: "bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-5 gap-4 items-end", children: [
        _jsxDEV("div", { className: "md:col-span-2", children: [
          _jsxDEV("label", { className: "block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 ml-1", children: "조회 기간" }, void 0, false),
          _jsxDEV("div", { className: "flex items-center gap-3", children: [
            _jsxDEV("input", {
              type: "date",
              name: "startDate",
              value: params.startDate,
              onChange: handleFilterChange,
              className: "flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 min-w-[130px]" }, void 0, false
            ),
            _jsxDEV("span", { className: "text-gray-300 shrink-0 font-bold", children: "~" }, void 0, false),
            _jsxDEV("input", {
              type: "date",
              name: "endDate",
              value: params.endDate,
              onChange: handleFilterChange,
              className: "flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 min-w-[130px]" }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        ),
        _jsxDEV("div", { className: "md:col-span-1", children: [
          _jsxDEV("label", { className: "block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 ml-1", children: "변동 구분" }, void 0, false),
          _jsxDEV("select", {
            name: "transactionType",
            value: params.transactionType,
            onChange: handleFilterChange,
            className: "w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 appearance-none", children: [

            _jsxDEV("option", { value: "ALL", children: "전체 보기" }, void 0, false),
            _jsxDEV("option", { value: "INCOMING", children: "입고 (+)" }, void 0, false),
            _jsxDEV("option", { value: "OUTBOUND", children: "출고 (-)" }, void 0, false),
            _jsxDEV("option", { value: "ADJUST", children: "재고 조정" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ),
        _jsxDEV("div", { className: "md:col-span-2", children: [
          _jsxDEV("label", { className: "block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 ml-1", children: "검색어 (품목명/사유)" }, void 0, false),
          _jsxDEV("input", {
            type: "text",
            name: "keyword",
            placeholder: "검색어를 입력하세요...",
            value: params.keyword,
            onChange: handleFilterChange,
            className: "w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-blue-500" }, void 0, false
          )] }, void 0, true
        )] }, void 0, true
      ),


      _jsxDEV("div", { className: "bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden", children:
        _jsxDEV("table", { className: "w-full text-left border-collapse", children: [
          _jsxDEV("thead", { children:
            _jsxDEV("tr", { className: "bg-gray-50/50 border-b border-gray-100", children: [
              _jsxDEV("th", { className: "px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "일시" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "구분" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "상세 품목명" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "변동 수량" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "최종 재고" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "사유" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "메모" }, void 0, false)] }, void 0, true
            ) }, void 0, false
          ),
          _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
            isLoading ?
            _jsxDEV("tr", { children: _jsxDEV("td", { colSpan: "7", className: "px-6 py-20 text-center text-gray-400 font-bold animate-pulse", children: "데이터를 불러오는 중..." }, void 0, false) }, void 0, false) :
            historyData.historyList?.length > 0 ?
            historyData.historyList.map((hist) =>
            _jsxDEV("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
              _jsxDEV("td", { className: "px-6 py-5 text-[11px] font-bold text-gray-400 text-center uppercase tracking-tighter", children:
                formatDateTime(hist.createdAt) }, void 0, false
              ),
              _jsxDEV("td", { className: "px-6 py-5 text-center", children:
                _jsxDEV("span", { className: `px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  hist.transactionType === 'INCOMING' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  hist.transactionType === 'OUTBOUND' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                  'bg-amber-50 text-amber-600 border-amber-100'}`, children:

                  hist.transactionType === 'INCOMING' ? '입고' :
                  hist.transactionType === 'OUTBOUND' ? '출고' : '조정' }, void 0, false
                ) }, void 0, false
              ),
              _jsxDEV("td", { className: "px-6 py-5 text-[14px] font-black text-gray-900 text-center", children:
                hist.detailStockName || '-' }, void 0, false
              ),
              _jsxDEV("td", { className: `px-6 py-5 text-[15px] font-black text-center ${
                hist.transactionType === 'INCOMING' ? 'text-blue-600' : 'text-rose-500'}`, children:

                hist.transactionType === 'INCOMING' ? `+${hist.changeQuantity}` : hist.changeQuantity }, void 0, false
              ),
              _jsxDEV("td", { className: "px-6 py-5 text-[15px] font-black text-gray-900 text-center", children:
                hist.currentTotalStock.toLocaleString() }, void 0, false
              ),
              _jsxDEV("td", { className: "px-6 py-5 text-[13px] font-medium text-gray-500 text-center", children:
                hist.reason || '-' }, void 0, false
              ),
              _jsxDEV("td", { className: "px-6 py-5 text-[13px] font-medium text-gray-400 text-center italic", children:
                hist.memo || '-' }, void 0, false
              )] }, hist.historySeq, true
            )
            ) :

            _jsxDEV("tr", { children:
              _jsxDEV("td", { colSpan: "7", className: "px-6 py-32 text-center", children: [
                _jsxDEV("div", { className: "text-5xl mb-6 opacity-20", children: "📂" }, void 0, false),
                _jsxDEV("p", { className: "text-gray-400 font-bold", children: "조회된 이력이 없습니다." }, void 0, false)] }, void 0, true
              ) }, void 0, false
            ) }, void 0, false

          )] }, void 0, true
        ) }, void 0, false
      ),


      _jsxDEV("div", { className: "mt-8 flex justify-center items-center gap-2", children: [
        _jsxDEV("button", {
          onClick: () => handlePageChange(params.page - 1),
          disabled: params.page === 1,
          className: "w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-all", children:
          "←" }, void 0, false

        ),
        (() => {
          const startPage = Math.floor((params.page - 1) / 10) * 10 + 1;
          const endPage = Math.min(startPage + 9, historyData.totalPages);
          const pageButtons = [];
          for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
              _jsxDEV("button", {

                onClick: () => handlePageChange(i),
                className: `w-10 h-10 rounded-xl font-black text-sm transition-all ${
                params.page === i ?
                'bg-blue-500 text-white shadow-lg shadow-blue-200' :
                'bg-white text-gray-400 hover:text-gray-900 border border-gray-100'}`, children:


                i }, i, false
              )
            );
          }
          return pageButtons;
        })(),
        _jsxDEV("button", {
          onClick: () => handlePageChange(params.page + 1),
          disabled: params.page === historyData.totalPages,
          className: "w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-all", children:
          "→" }, void 0, false

        )] }, void 0, true
      )] }, void 0, true
    ));

};

export default StockLookupPage;