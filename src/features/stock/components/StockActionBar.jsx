import React from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const StockActionBar = ({ selectedCount, onCancel, onDelete, isLoading }) => {
  if (selectedCount === 0) return null;

  return (
    _jsxDEV("div", { className: "fixed bottom-8 left-1/2 -translate-x-1/2 z-50", children:
      _jsxDEV("div", { className: "bg-white px-7 py-4 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center gap-10 border border-gray-200", children: [


        _jsxDEV("div", { className: "flex items-center gap-4", children: [
          _jsxDEV("div", { className: "w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center", children:
            _jsxDEV("span", { className: "text-[12px] font-black text-emerald-600 leading-none", children:
              selectedCount }, void 0, false
            ) }, void 0, false
          ),
          _jsxDEV("div", { className: "flex flex-col", children:
            _jsxDEV("span", { className: "text-[13px] font-bold text-gray-900 tracking-tight", children: "항목 선택됨" }, void 0, false) }, void 0, false
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "h-6 w-px bg-gray-200" }, void 0, false),


        _jsxDEV("div", { className: "flex items-center gap-5", children: [
          _jsxDEV("button", {
            onClick: onCancel,
            disabled: isLoading,
            className: "px-2 py-1 text-[13px] font-bold text-gray-500 hover:text-gray-800 transition-colors disabled:opacity-50", children:
            "선택 해제" }, void 0, false

          ),

          _jsxDEV("button", {
            onClick: onDelete,
            disabled: isLoading,
            className: `px-6 py-2.5 rounded-2xl transition-colors flex items-center gap-2 ${
            isLoading ?
            'bg-gray-100 text-gray-400 cursor-not-allowed' :
            'bg-rose-50 hover:bg-rose-100 text-rose-600'}`, children: [


            isLoading ?
            _jsxDEV("div", { className: "w-3.5 h-3.5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" }, void 0, false) :

            _jsxDEV("svg", {
              className: "w-3.5 h-3.5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: "2.5", children:

              _jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }, void 0, false) }, void 0, false
            ),

            _jsxDEV("span", { className: "text-[13px] font-bold tracking-tight", children:
              isLoading ? '삭제 중...' : '선택 삭제' }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default StockActionBar;