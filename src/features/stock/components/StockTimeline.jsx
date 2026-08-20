import React from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const StockTimeline = ({ timeline }) => {
  return (
    _jsxDEV("div", { className: "bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 flex flex-col h-full", children: [
      _jsxDEV("div", { className: "flex items-center justify-between mb-8", children: [
        _jsxDEV("h3", { className: "text-xl font-black text-gray-900 tracking-tight", children: "재고 타임라인" }, void 0, false),
        _jsxDEV("span", { className: "text-[11px] font-bold text-gray-400 uppercase tracking-widest", children: "Live Feed" }, void 0, false

        )] }, void 0, true
      ),

      _jsxDEV("div", { className: "relative space-y-6 overflow-y-auto pr-2 max-h-[520px] scrollbar-hide px-1", children: [

        _jsxDEV("div", { className: "absolute left-[17px] top-2 bottom-2 w-0.5 bg-gray-100" }, void 0, false),

        timeline.map((event) =>
        _jsxDEV("div", {

          className: "relative pl-10 group cursor-default", children: [


          _jsxDEV("div", { className: `absolute left-0 top-1.5 w-9 h-9 rounded-full border-4 border-white shadow-sm z-10 transition-transform group-hover:scale-110 flex items-center justify-center text-[10px] ${event.dotColor} text-white font-black`, children:
            event.type === 'CRITICAL' ? '!' : event.type === 'WARNING' ? '?' : 'i' }, void 0, false
          ),

          _jsxDEV("div", { className: "bg-gray-50/50 p-5 rounded-[1.5rem] border border-transparent hover:border-emerald-100 hover:bg-white hover:shadow-md transition-all", children: [
            _jsxDEV("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
              _jsxDEV("h4", { className: "text-[15px] font-black text-gray-900 group-hover:text-emerald-600 transition-colors", children:
                event.title }, void 0, false
              ),
              _jsxDEV("span", { className: "text-[11px] font-bold text-gray-400 whitespace-nowrap bg-white px-2 py-1 rounded-lg border border-gray-100", children:
                event.time?.replace('T', ' ') }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("p", { className: "text-[13px] text-gray-500 font-medium leading-relaxed", children:
              event.message }, void 0, false
            ),


            _jsxDEV("div", { className: "mt-4 flex items-center gap-4", children: [
              _jsxDEV("div", { className: "h-px flex-1 bg-gray-100/50" }, void 0, false),
              _jsxDEV("span", { className: "text-[10px] font-black text-gray-200 uppercase tracking-widest italic", children: "Stock Event" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          )] }, event.id, true
        )
        )] }, void 0, true
      ),

      _jsxDEV("button", { className: "w-full mt-6 py-4 bg-gray-900 text-white hover:bg-emerald-600 text-[12px] font-black rounded-2xl transition-all shadow-lg shadow-gray-200 hover:shadow-emerald-100 active:scale-95", children: "과거 타임라인 더 불러오기" }, void 0, false

      )] }, void 0, true
    ));

};

export default StockTimeline;