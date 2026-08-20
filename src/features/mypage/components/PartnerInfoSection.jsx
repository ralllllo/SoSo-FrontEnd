import React from 'react';import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";





export const InfoItem = ({ label, value }) =>
_jsxDEV("div", { className: "flex flex-col space-y-1.5", children: [
  _jsxDEV("span", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider ml-1", children: label }, void 0, false),
  _jsxDEV("div", { className: "w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 font-medium break-all", children:
    value || '-' }, void 0, false
  )] }, void 0, true
);






export const SectionTitle = ({ title, colorClass = "border-blue-500" }) =>
_jsxDEV("div", { className: `border-l-4 ${colorClass} pl-3 mb-6`, children:
  _jsxDEV("h3", { className: "text-lg font-bold text-gray-800", children: title }, void 0, false) }, void 0, false
);






export const StoreImage = ({ exteriorImg, interiorImg }) =>
_jsxDEV("div", { className: "w-full space-y-4", children: [
  _jsxDEV("div", { className: "flex items-center justify-between", children: [
    _jsxDEV("span", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider ml-1", children: "가게 사진 확인" }, void 0, false),
    _jsxDEV("span", { className: "text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-full", children: "📡 실시간 연동 중" }, void 0, false)] }, void 0, true
  ),
  _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [

    _jsxDEV("div", { className: "flex flex-col gap-2", children:
      _jsxDEV("div", { className: "aspect-video md:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-inner flex items-center justify-center relative group", children:
        exteriorImg ?
        _jsxDEV(_Fragment, { children: [
          _jsxDEV("img", {
            src: exteriorImg,
            alt: "가게 외관",
            className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }, void 0, false
          ),
          _jsxDEV("div", { className: "absolute bottom-0 left-0 right-0 bg-black/40 py-2 backdrop-blur-[2px]", children:
            _jsxDEV("p", { className: "text-[11px] text-white font-bold text-center tracking-tight", children: "가게 외관" }, void 0, false) }, void 0, false
          )] }, void 0, true
        ) :

        _jsxDEV(NoImagePlaceholder, { label: "가게 외관" }, void 0, false) }, void 0, false

      ) }, void 0, false
    ),


    _jsxDEV("div", { className: "flex flex-col gap-2", children:
      _jsxDEV("div", { className: "aspect-video md:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-inner flex items-center justify-center relative group", children:
        interiorImg ?
        _jsxDEV(_Fragment, { children: [
          _jsxDEV("img", {
            src: interiorImg,
            alt: "가게 내부",
            className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }, void 0, false
          ),
          _jsxDEV("div", { className: "absolute bottom-0 left-0 right-0 bg-black/40 py-2 backdrop-blur-[2px]", children:
            _jsxDEV("p", { className: "text-[11px] text-white font-bold text-center tracking-tight", children: "가게 내부" }, void 0, false) }, void 0, false
          )] }, void 0, true
        ) :

        _jsxDEV(NoImagePlaceholder, { label: "가게 내부" }, void 0, false) }, void 0, false

      ) }, void 0, false
    )] }, void 0, true
  )] }, void 0, true
);


const NoImagePlaceholder = ({ label }) =>
_jsxDEV("div", { className: "flex flex-col items-center text-gray-300", children: [
  _jsxDEV("svg", { className: "w-10 h-10 mb-2 opacity-50", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children:
    _jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }, void 0, false) }, void 0, false
  ),
  _jsxDEV("span", { className: "text-[11px] font-bold", children: [label, " 사진 없음"] }, void 0, true)] }, void 0, true
);