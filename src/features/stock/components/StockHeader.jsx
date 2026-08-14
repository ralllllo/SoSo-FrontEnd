import React from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const StockHeader = ({ onAddClick }) => {
  return (
    _jsxDEV("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10", children: [
      _jsxDEV("div", { children: [
        _jsxDEV("div", { className: "flex items-center gap-2 mb-2" }, void 0, false

        ),
        _jsxDEV("h1", { className: "text-4xl font-black text-gray-900 tracking-tight", children: "재고 관리" }, void 0, false),
        _jsxDEV("p", { className: "text-[15px] text-gray-400 mt-2 font-medium", children: "실시간 재고 현황을 파악하고 스마트하게 관리하세요." }, void 0, false)] }, void 0, true
      ),
      _jsxDEV("div", { className: "flex items-center gap-3", children:
        _jsxDEV("button", {
          onClick: onAddClick,
          className: "group relative flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-[1.5rem] text-sm font-black hover:bg-emerald-600 transition-all shadow-xl shadow-gray-200 hover:shadow-emerald-200 active:scale-95 overflow-hidden", children: [

          _jsxDEV("span", { className: "relative z-10", children: "+ 새 품목 등록" }, void 0, false),
          _jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" }, void 0, false)] }, void 0, true
        ) }, void 0, false
      )] }, void 0, true
    ));

};

export default StockHeader;