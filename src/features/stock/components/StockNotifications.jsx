import React from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const StockNotifications = ({ notifications }) => {
  const unconfirmedCount = 5;

  return (
    _jsxDEV("div", { className: "bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 flex flex-col h-full", children: [
      _jsxDEV("div", { className: "flex items-center justify-between mb-8", children: [
        _jsxDEV("h3", { className: "text-xl font-black text-gray-900 tracking-tight", children: "알림" }, void 0, false),
        _jsxDEV("span", { className: "px-3 py-1 bg-rose-50 text-rose-600 text-[11px] font-black rounded-full border border-rose-100", children: [
          unconfirmedCount, " 미확인"] }, void 0, true
        )] }, void 0, true
      ),

      _jsxDEV("div", { className: "space-y-3 overflow-y-auto pr-1 max-h-[480px] scrollbar-hide", children:
        notifications.map((note) =>
        _jsxDEV("div", {

          className: "p-5 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow group cursor-pointer", children:

          _jsxDEV("div", { className: "flex gap-4", children: [
            _jsxDEV("div", { className: `w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${note.dotColor} animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.1)]` }, void 0, false),
            _jsxDEV("div", { className: "flex-1", children: [
              _jsxDEV("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
                _jsxDEV("h4", { className: "text-[14px] font-black text-gray-900 group-hover:text-emerald-600 transition-colors", children:
                  note.title }, void 0, false
                ),
                _jsxDEV("span", { className: "text-[11px] font-bold text-gray-300 whitespace-nowrap", children:
                  note.time?.replace('T', ' ') }, void 0, false
                )] }, void 0, true
              ),
              _jsxDEV("p", { className: "text-[12px] text-gray-500 font-medium leading-relaxed", children:
                note.message }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ) }, note.id, false
        )
        ) }, void 0, false
      ),

      _jsxDEV("button", { className: "w-full mt-6 py-4 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 text-[12px] font-black rounded-2xl transition-all", children: "전체 알림 보기" }, void 0, false

      )] }, void 0, true
    ));

};

export default StockNotifications;