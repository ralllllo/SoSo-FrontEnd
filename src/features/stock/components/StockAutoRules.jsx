import React from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const StockAutoRules = ({ rules, onToggle }) => {
  return (
    _jsxDEV("div", { className: "bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 flex flex-col h-full", children: [
      _jsxDEV("div", { className: "flex items-center justify-between mb-8", children: [
        _jsxDEV("h3", { className: "text-xl font-black text-gray-900 tracking-tight", children: "자동 관리 설정" }, void 0, false),
        _jsxDEV("span", { className: "text-[11px] font-bold text-gray-400 uppercase tracking-wider", children: "변동 발생 시 자동 적용" }, void 0, false)] }, void 0, true
      ),

      _jsxDEV("div", { className: "space-y-4 flex-1", children:
        rules.map((rule) =>
        _jsxDEV("div", {

          className: `p-6 rounded-[2rem] border-2 transition-all flex items-center justify-between gap-4 ${
          rule.enabled ? 'border-emerald-100 bg-emerald-50/20' : 'border-gray-50 bg-gray-50/30'}`, children: [


          _jsxDEV("div", { className: "flex-1", children: [
            _jsxDEV("h4", { className: `text-[15px] font-black mb-1 transition-colors ${rule.enabled ? 'text-gray-900' : 'text-gray-400'}`, children:
              rule.title }, void 0, false
            ),
            _jsxDEV("p", { className: "text-[12px] text-gray-400 font-medium leading-relaxed", children:
              rule.description }, void 0, false
            )] }, void 0, true
          ),


          _jsxDEV("button", {
            onClick: () => onToggle(rule.id),
            className: `relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            rule.enabled ? 'bg-emerald-500' : 'bg-gray-200'}`, children:


            _jsxDEV("span", {
              className: `pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              rule.enabled ? 'translate-x-6' : 'translate-x-0'}` }, void 0, false

            ) }, void 0, false
          )] }, rule.id, true
        )
        ) }, void 0, false
      )] }, void 0, true
    ));

};

export default StockAutoRules;