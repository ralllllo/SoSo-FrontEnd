import React from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const DashboardHistoryTable = ({ history, isLoading }) => {
  return (
    _jsxDEV("div", { className: "bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm", children:
      _jsxDEV("div", { className: "overflow-x-auto w-full", children:
        _jsxDEV("table", { className: "w-full text-left border-collapse min-w-[600px]", children: [
          _jsxDEV("thead", { className: "bg-gray-50/50 border-b border-gray-100 whitespace-nowrap", children:
            _jsxDEV("tr", { children: [
              _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "일시" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "구분" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "품목명" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "변동수량" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "최종재고" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "사유" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "메모" }, void 0, false)] }, void 0, true
            ) }, void 0, false
          ),
          _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
            isLoading ?
            _jsxDEV("tr", { children:
              _jsxDEV("td", { colSpan: "7", className: "px-6 py-10 text-center text-gray-400 font-medium", children: "데이터를 불러오는 중..." }, void 0, false) }, void 0, false
            ) :
            history && history.length > 0 ?
            history.
            filter((hist) => hist.transactionType !== 'ALERT').
            map((hist) =>
            _jsxDEV("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
              _jsxDEV("td", { className: "px-6 py-4 text-[11px] text-gray-400 text-center font-bold uppercase whitespace-nowrap", children:
                hist.createdAt?.replace('T', ' ') }, void 0, false
              ),
              _jsxDEV("td", { className: "px-6 py-4 text-center whitespace-nowrap", children:
                _jsxDEV("span", { className: `px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  hist.transactionType === 'INCOMING' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  hist.transactionType === 'OUTBOUND' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                  'bg-amber-50 text-amber-600 border-amber-100'}`, children:

                  hist.transactionType === 'INCOMING' ? '입고' :
                  hist.transactionType === 'OUTBOUND' ? '출고' : '조정' }, void 0, false
                ) }, void 0, false
              ),
              _jsxDEV("td", { className: "px-6 py-4 text-sm text-gray-900 text-center font-bold whitespace-nowrap", children:
                hist.detailStockName || '-' }, void 0, false
              ),
              _jsxDEV("td", { className: `px-6 py-4 text-center font-black whitespace-nowrap ${
                hist.transactionType === 'INCOMING' ? 'text-blue-600' :
                hist.transactionType === 'OUTBOUND' ? 'text-rose-500' : 'text-amber-500'}`, children:

                _jsxDEV("span", { className: "text-[16px]", children:
                  hist.transactionType === 'INCOMING' ? `+${hist.changeQuantity}` : hist.changeQuantity }, void 0, false
                ) }, void 0, false
              ),
              _jsxDEV("td", { className: "px-6 py-4 text-[16px] font-black text-gray-900 text-center whitespace-nowrap", children:
                hist.currentTotalStock?.toLocaleString() || 0 }, void 0, false
              ),
              _jsxDEV("td", { className: "px-6 py-4 text-sm text-gray-500 text-center font-medium whitespace-nowrap", children:
                hist.reason || '-' }, void 0, false
              ),
              _jsxDEV("td", { className: "px-6 py-4 text-sm text-gray-500 text-center font-medium truncate max-w-[150px]", title: hist.memo, children:
                hist.memo || '-' }, void 0, false
              )] }, hist.historySeq, true
            )
            ) :

            _jsxDEV("tr", { children:
              _jsxDEV("td", { colSpan: "7", className: "px-6 py-20 text-center", children: [
                _jsxDEV("div", { className: "text-4xl mb-4 opacity-20", children: "📊" }, void 0, false),
                _jsxDEV("p", { className: "text-gray-400 font-medium", children: "최근 변동 이력이 없습니다." }, void 0, false)] }, void 0, true
              ) }, void 0, false
            ) }, void 0, false

          )] }, void 0, true
        ) }, void 0, false
      ) }, void 0, false
    ));

};

export default DashboardHistoryTable;