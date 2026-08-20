import React from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const StockTable = ({ stocks, isLoading, selectedIds, onSelectChange, onSelectAll, onViewHistory, onIncoming, onEdit }) => {

  const getExpiryDisplay = (daysUntilExpiry) => {
    if (daysUntilExpiry === null || daysUntilExpiry === undefined) return _jsxDEV("span", { className: "text-gray-400", children: "-" }, void 0, false);

    const isNearExpiry = daysUntilExpiry >= 0 && daysUntilExpiry <= 7;
    return (
      _jsxDEV("span", { className: `font-medium ${isNearExpiry ? 'text-[#ff4d4f] font-bold' : 'text-gray-600'}`, children: [
        daysUntilExpiry, "일"] }, void 0, true
      ));

  };

  const getStatusBadge = (currentStock, safetyStock, daysUntilExpiry) => {

    if (currentStock === 0) {
      return (
        _jsxDEV("span", { className: "px-2.5 py-1 rounded-full text-[11px] font-bold border bg-red-50 text-red-600 border-red-100", children: "품절" }, void 0, false

        ));

    }


    const isLowStock = currentStock > 0 && currentStock <= safetyStock;

    const isNearExpiry = daysUntilExpiry !== null && daysUntilExpiry !== undefined && daysUntilExpiry >= 0 && daysUntilExpiry <= 7;

    return (
      _jsxDEV("div", { className: "flex flex-wrap gap-1 justify-center", children: [
        isLowStock &&
        _jsxDEV("span", { className: "px-2.5 py-1 rounded-full text-[11px] font-bold border bg-amber-50 text-amber-600 border-amber-100", children: "재고부족" }, void 0, false

        ),

        isNearExpiry &&
        _jsxDEV("span", { className: "px-2.5 py-1 rounded-full text-[11px] font-bold border bg-red-50 text-[#ff4d4f] border-red-100", children: "임박" }, void 0, false

        ),

        !isLowStock && !isNearExpiry &&
        _jsxDEV("span", { className: "px-2.5 py-1 rounded-full text-[11px] font-bold border bg-emerald-50 text-emerald-600 border-emerald-100", children: "정상" }, void 0, false

        )] }, void 0, true

      ));

  };

  if (isLoading) {
    return (
      _jsxDEV("div", { className: "bg-white rounded-2xl border border-gray-200 p-12 text-center", children: [
        _jsxDEV("div", { className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mb-4" }, void 0, false),
        _jsxDEV("p", { className: "text-gray-500 text-sm font-medium", children: "재고 데이터를 불러오는 중..." }, void 0, false)] }, void 0, true
      ));

  }

  return (
    _jsxDEV("div", { className: "bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden", children:
      _jsxDEV("div", { className: "overflow-x-auto", children:
        _jsxDEV("table", { className: "w-full text-left border-collapse", children: [
          _jsxDEV("thead", { children:
            _jsxDEV("tr", { className: "bg-gray-50/50 border-b border-gray-100", children: [
              _jsxDEV("th", { className: "px-6 py-5 w-14 text-center", children:
                _jsxDEV("input", {
                  type: "checkbox",
                  checked: stocks.length > 0 && selectedIds.length === stocks.length,
                  onChange: onSelectAll,
                  className: "w-5 h-5 accent-emerald-600 rounded-lg cursor-pointer transition-all" }, void 0, false
                ) }, void 0, false
              ),
              _jsxDEV("th", { className: "px-4 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.1em]", children: "Code" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.1em]", children: "품목 정보" }, void 0, false),
              _jsxDEV("th", { className: "px-4 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] text-center", children: "카테고리" }, void 0, false),
              _jsxDEV("th", { className: "px-4 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] text-center", children: "현재재고" }, void 0, false),
              _jsxDEV("th", { className: "px-4 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] text-center", children: "안전재고" }, void 0, false),
              _jsxDEV("th", { className: "px-4 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] text-center", children: "소비기한" }, void 0, false),
              _jsxDEV("th", { className: "px-4 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] text-center", children: "상태" }, void 0, false),
              _jsxDEV("th", { className: "px-4 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] text-center", children: "업무" }, void 0, false),
              _jsxDEV("th", { className: "px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] text-center", children: "관리" }, void 0, false)] }, void 0, true
            ) }, void 0, false
          ),
          _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
            stocks.length > 0 ?
            stocks.map((stock) =>
            _jsxDEV("tr", { className: `group hover:bg-emerald-50/20 transition-all ${selectedIds.includes(stock.stockSeq) ? 'bg-emerald-50/40' : ''}`, children: [
              _jsxDEV("td", { className: "px-6 py-5 text-center", children:
                _jsxDEV("input", {
                  type: "checkbox",
                  checked: selectedIds.includes(stock.stockSeq),
                  onChange: () => onSelectChange(stock.stockSeq),
                  className: "w-5 h-5 accent-emerald-600 rounded-lg cursor-pointer transition-all" }, void 0, false
                ) }, void 0, false
              ),
              _jsxDEV("td", { className: "px-4 py-5 text-xs font-bold text-gray-300", children: ["#", stock.stockSeq] }, void 0, true),
              _jsxDEV("td", { className: "px-6 py-5", children:
                _jsxDEV("div", { className: "flex flex-col", children: [
                  _jsxDEV("span", { className: "text-[15px] font-black text-gray-900 group-hover:text-emerald-700 transition-colors", children: stock.stockName }, void 0, false),
                  _jsxDEV("span", { className: "text-[11px] text-gray-400 mt-0.5 font-medium", children: [stock.unit || 'EA', " 기준"] }, void 0, true)] }, void 0, true
                ) }, void 0, false
              ),
              _jsxDEV("td", { className: "px-4 py-5 text-center", children:
                _jsxDEV("span", { className: "inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-lg uppercase tracking-tight", children:
                  stock.category }, void 0, false
                ) }, void 0, false
              ),
              _jsxDEV("td", { className: "px-4 py-5 text-center", children:
                _jsxDEV("div", { className: "text-[16px] font-black text-gray-900 tabular-nums", children:
                  stock.currentStock.toLocaleString() }, void 0, false
                ) }, void 0, false
              ),
              _jsxDEV("td", { className: "px-4 py-5 text-center text-[13px] font-bold text-gray-400 tabular-nums", children:
                stock.safetyStock.toLocaleString() }, void 0, false
              ),
              _jsxDEV("td", { className: "px-4 py-5 text-center text-[13px] font-bold tabular-nums", children:
                getExpiryDisplay(stock.daysUntilExpiry) }, void 0, false
              ),
              _jsxDEV("td", { className: "px-4 py-5 text-center", children:
                getStatusBadge(stock.currentStock, stock.safetyStock, stock.daysUntilExpiry) }, void 0, false
              ),
              _jsxDEV("td", { className: "px-4 py-5 text-center", children:
                _jsxDEV("div", { className: "flex items-center justify-center gap-2", children: [
                  _jsxDEV("button", {
                    onClick: () => onIncoming(stock),
                    className: "px-4 py-2 bg-white border-2 border-emerald-100 text-emerald-600 text-[11px] font-black rounded-2xl hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm active:scale-95", children:
                    "입/출고" }, void 0, false

                  ),
                  _jsxDEV("button", {
                    onClick: () => onViewHistory(stock),
                    className: "px-4 py-2 bg-white border-2 border-emerald-100 text-emerald-600 text-[11px] font-black rounded-2xl hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm active:scale-95",
                    title: "이력 보기", children:
                    "이력" }, void 0, false

                  )] }, void 0, true
                ) }, void 0, false
              ),
              _jsxDEV("td", { className: "px-6 py-5 text-center", children:
                _jsxDEV("button", {
                  onClick: () => onEdit(stock),
                  className: "px-4 py-2 bg-gray-900 text-white text-[11px] font-black rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-gray-200 active:scale-95", children:
                  "수정" }, void 0, false

                ) }, void 0, false
              )] }, stock.stockSeq, true
            )
            ) :

            _jsxDEV("tr", { children:
              _jsxDEV("td", { colSpan: "11", className: "px-6 py-20 text-center", children: [
                _jsxDEV("div", { className: "text-4xl mb-4", children: "📦" }, void 0, false),
                _jsxDEV("p", { className: "text-gray-500 font-medium", children: "등록된 재고가 없습니다." }, void 0, false)] }, void 0, true
              ) }, void 0, false
            ) }, void 0, false

          )] }, void 0, true
        ) }, void 0, false
      ) }, void 0, false
    ));

};

export default StockTable;