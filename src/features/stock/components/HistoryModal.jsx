import React, { useEffect } from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const HistoryModal = ({ isOpen, onClose, data, isLoading, onPageChange }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const { historyList, totalPages, currentPage } = data;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    _jsxDEV("div", {
      className: "fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-md animate-fade-in",
      onClick: handleOverlayClick, children:

      _jsxDEV("div", { className: "bg-white w-full max-w-5xl rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden animate-scale-up flex flex-col max-h-[90vh] border border-white/20", children: [


        _jsxDEV("div", { className: "px-6 py-6 sm:px-10 sm:py-8 flex items-center justify-between border-b border-gray-50", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("h3", { className: "text-2xl sm:text-3xl font-black text-gray-900 tracking-tight", children: "전체 재고 변동 이력" }, void 0, false),
            _jsxDEV("p", { className: "text-[13px] sm:text-[15px] text-gray-400 font-medium mt-1", children: "모든 품목의 재고 변동 타임라인 내역입니다." }, void 0, false

            )] }, void 0, true
          ),
          _jsxDEV("button", {
            onClick: onClose,
            className: "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-[1rem] sm:rounded-[1.25rem] bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all active:scale-90", children:

            _jsxDEV("span", { className: "text-xl sm:text-2xl", children: "✕" }, void 0, false) }, void 0, false
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "flex-1 overflow-y-auto px-6 py-6 sm:px-10 sm:py-8", children:
          _jsxDEV("div", { className: "bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm", children:
            _jsxDEV("div", { className: "overflow-x-auto w-full", children:
              _jsxDEV("table", { className: "w-full text-left border-collapse min-w-[700px]", children: [
                _jsxDEV("thead", { className: "bg-gray-50/50 border-b border-gray-100 whitespace-nowrap", children:
                  _jsxDEV("tr", { children: [
                    _jsxDEV("th", { className: "px-4 sm:px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "일시" }, void 0, false),
                    _jsxDEV("th", { className: "px-4 sm:px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "구분" }, void 0, false),
                    _jsxDEV("th", { className: "px-4 sm:px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "품목명" }, void 0, false),
                    _jsxDEV("th", { className: "px-4 sm:px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "변동수량" }, void 0, false),
                    _jsxDEV("th", { className: "px-4 sm:px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "최종재고" }, void 0, false),
                    _jsxDEV("th", { className: "px-4 sm:px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "사유" }, void 0, false),
                    _jsxDEV("th", { className: "px-4 sm:px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "메모" }, void 0, false)] }, void 0, true
                  ) }, void 0, false
                ),
                _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
                  isLoading ?
                  _jsxDEV("tr", { children:
                    _jsxDEV("td", { colSpan: "7", className: "px-6 py-20 text-center text-gray-400 font-medium", children: "데이터를 불러오는 중..." }, void 0, false) }, void 0, false
                  ) :
                  historyList && historyList.length > 0 ?
                  historyList.map((hist) =>
                  _jsxDEV("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
                    _jsxDEV("td", { className: "px-4 sm:px-6 py-4 text-[11px] text-gray-400 text-center font-bold uppercase whitespace-nowrap", children:
                      hist.createdAt?.replace('T', ' ') }, void 0, false
                    ),
                    _jsxDEV("td", { className: "px-4 sm:px-6 py-4 text-center whitespace-nowrap", children:
                      _jsxDEV("span", { className: `px-2 sm:px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        hist.transactionType === 'INCOMING' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        hist.transactionType === 'OUTBOUND' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                        hist.transactionType === 'ALERT' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                        'bg-amber-50 text-amber-600 border-amber-100'}`, children:

                        hist.transactionType === 'INCOMING' ? '입고' :
                        hist.transactionType === 'OUTBOUND' ? '출고' :
                        hist.transactionType === 'ALERT' ? '알림' : '조정' }, void 0, false
                      ) }, void 0, false
                    ),
                    _jsxDEV("td", { className: "px-4 sm:px-6 py-4 text-[13px] sm:text-sm text-gray-900 text-center font-bold whitespace-nowrap", children:
                      hist.detailStockName || '-' }, void 0, false
                    ),
                    _jsxDEV("td", { className: `px-4 sm:px-6 py-4 text-center font-black whitespace-nowrap ${
                      hist.transactionType === 'INCOMING' ? 'text-blue-600' :
                      hist.transactionType === 'OUTBOUND' ? 'text-rose-500' :
                      hist.transactionType === 'ALERT' ? 'text-gray-300' : 'text-amber-500'}`, children:

                      _jsxDEV("span", { className: "text-[14px] sm:text-[16px]", children:
                        hist.transactionType === 'ALERT' ? '-' : hist.transactionType === 'INCOMING' ? `+${hist.changeQuantity}` : hist.changeQuantity }, void 0, false
                      ) }, void 0, false
                    ),
                    _jsxDEV("td", { className: "px-4 sm:px-6 py-4 text-[14px] sm:text-[16px] font-black text-gray-900 text-center whitespace-nowrap", children:
                      hist.currentTotalStock?.toLocaleString() || 0 }, void 0, false
                    ),
                    _jsxDEV("td", { className: "px-4 sm:px-6 py-4 text-[13px] sm:text-sm text-gray-500 text-center font-medium whitespace-nowrap", children:
                      hist.reason || '-' }, void 0, false
                    ),
                    _jsxDEV("td", { className: "px-4 sm:px-6 py-4 text-[13px] sm:text-sm text-gray-500 text-center font-medium truncate max-w-[150px]", title: hist.memo, children:
                      hist.memo || '-' }, void 0, false
                    )] }, hist.historySeq, true
                  )
                  ) :

                  _jsxDEV("tr", { children:
                    _jsxDEV("td", { colSpan: "7", className: "px-6 py-20 text-center", children: [
                      _jsxDEV("div", { className: "text-4xl mb-4 opacity-20", children: "📂" }, void 0, false),
                      _jsxDEV("p", { className: "text-gray-400 font-medium", children: "전체 변동 이력이 없습니다." }, void 0, false)] }, void 0, true
                    ) }, void 0, false
                  ) }, void 0, false

                )] }, void 0, true
              ) }, void 0, false
            ) }, void 0, false
          ) }, void 0, false
        ),


        _jsxDEV("div", { className: "px-6 py-4 sm:px-10 sm:py-6 bg-gray-50/50 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
          _jsxDEV("div", { className: "flex gap-2", children:
            [...Array(totalPages || 0)].map((_, i) => {
              const pageNum = i + 1;
              return (
                _jsxDEV("button", {

                  onClick: () => onPageChange(pageNum),
                  className: `w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-[13px] sm:text-[14px] font-black transition-all ${
                  currentPage === pageNum ?
                  'bg-emerald-600 text-white shadow-md' :
                  'bg-white text-gray-400 hover:bg-gray-100 border border-gray-200'}`, children:


                  pageNum }, i, false
                ));

            }) }, void 0, false
          ),

          _jsxDEV("button", {
            onClick: onClose,
            className: "w-full sm:w-auto px-8 py-3 bg-gray-900 text-white text-[14px] font-black rounded-xl hover:bg-gray-800 transition-all shadow-md active:scale-95", children:
            "닫기" }, void 0, false

          )] }, void 0, true
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default HistoryModal;