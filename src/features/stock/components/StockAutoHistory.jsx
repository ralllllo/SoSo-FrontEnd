import React from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const StockAutoHistory = ({ history }) => {
  return (
    _jsxDEV("div", { className: "bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50", children: [
      _jsxDEV("div", { className: "flex items-center justify-between mb-8", children: [
        _jsxDEV("h3", { className: "text-xl font-black text-gray-900 tracking-tight", children: "최근 자동 처리 이력" }, void 0, false),
        _jsxDEV("button", { className: "text-[11px] font-bold text-gray-400 hover:text-emerald-600 transition-colors uppercase tracking-widest", children: "전체 기록 조회 →" }, void 0, false

        )] }, void 0, true
      ),

      _jsxDEV("div", { className: "overflow-x-auto", children:
        _jsxDEV("table", { className: "w-full text-left border-collapse", children: [
          _jsxDEV("thead", { children:
            _jsxDEV("tr", { className: "border-b border-gray-50", children: [
              _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-300 uppercase tracking-wider text-center", children: "일시" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-300 uppercase tracking-wider text-center", children: "구분" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-300 uppercase tracking-wider text-center", children: "품목명" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-300 uppercase tracking-wider text-center", children: "변동수량" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-300 uppercase tracking-wider text-center", children: "최종재고" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-300 uppercase tracking-wider text-center", children: "사유" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-300 uppercase tracking-wider text-center", children: "메모" }, void 0, false)] }, void 0, true
            ) }, void 0, false
          ),
          _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
            history.map((hist) =>
            _jsxDEV("tr", { className: "group hover:bg-emerald-50/10 transition-colors", children: [
              _jsxDEV("td", { className: "px-6 py-5 text-[11px] font-bold text-gray-400 text-center uppercase tracking-tighter", children:
                hist.createdAt?.replace('T', ' ') }, void 0, false
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
              )] }, hist.id, true
            )
            ) }, void 0, false
          )] }, void 0, true
        ) }, void 0, false
      )] }, void 0, true
    ));

};

export default StockAutoHistory;