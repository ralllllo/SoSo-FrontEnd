import React from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";



export const EditField = ({ label, type = "text", value, onChange, name, disabled, placeholder, error }) =>
_jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
  _jsxDEV("label", { className: "text-xs font-bold text-gray-400 ml-1", children: label }, void 0, false),
  _jsxDEV("input", {
    type: type,
    name: name,
    value: value,
    onChange: onChange,
    disabled: disabled,
    placeholder: placeholder,
    className: `h-10 px-4 rounded-xl text-sm border outline-none transition-all ${
    disabled ?
    'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed' :
    error ?
    'bg-white text-gray-800 border-red-500 focus:border-red-600' :
    'bg-white text-gray-800 border-gray-200 focus:border-emerald-500'}` }, void 0, false

  ),
  error && _jsxDEV("span", { className: "text-[10px] text-red-500 ml-1 font-medium", children: error }, void 0, false)] }, void 0, true
);





export const PhotoSlot = ({ label, preview, onRemove }) =>
_jsxDEV("div", { className: "w-full aspect-video md:aspect-[4/3] bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center relative group overflow-hidden shadow-inner", children: [
  _jsxDEV("img", { src: preview, alt: label, className: "w-full h-full object-cover" }, void 0, false),
  _jsxDEV("button", {
    onClick: onRemove,
    className: "absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white text-lg hover:bg-black/70 transition-colors z-10", children:
    "×" }, void 0, false

  ),
  _jsxDEV("div", { className: "absolute bottom-0 left-0 right-0 bg-black/40 py-2 backdrop-blur-[2px]", children:
    _jsxDEV("p", { className: "text-[11px] text-white font-bold text-center tracking-tight", children: label }, void 0, false) }, void 0, false
  )] }, void 0, true
);





export const AddPhotoBtn = ({ label, onClick }) =>
_jsxDEV("div", {
  onClick: onClick,
  className: "w-full aspect-video md:aspect-[4/3] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group", children: [

  _jsxDEV("span", { className: "text-3xl text-gray-300 group-hover:text-emerald-500 transition-transform group-hover:scale-110 duration-200", children: "+" }, void 0, false),
  _jsxDEV("span", { className: "text-[11px] text-gray-400 font-bold mt-2 group-hover:text-emerald-600 transition-colors", children: [label, " 추가"] }, void 0, true)] }, void 0, true
);