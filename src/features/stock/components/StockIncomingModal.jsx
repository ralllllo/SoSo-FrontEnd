import React, { useState, useEffect } from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const StockIncomingModal = ({ isOpen, onClose, stock, onIncoming, isLoading }) => {
  const [formData, setFormData] = useState({
    detailStockName: '',
    quantity: '',
    incomingPrice: '',
    memo: ''
  });

  useEffect(() => {
    if (isOpen && stock) {
      setFormData((prev) => ({
        ...prev,
        detailStockName: stock.stockName || ''
      }));
    }
  }, [isOpen, stock]);

  if (!isOpen || !stock) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.quantity || !formData.incomingPrice) {
      alert('필수 입력 항목(수량, 단가)을 확인해주세요.');
      return;
    }
    onIncoming(formData);
  };

  const labelStyle = "block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1";
  const inputStyle = "w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm";

  return (
    _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in", children:
      _jsxDEV("div", { className: "bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-scale-up flex flex-col max-h-[90vh]", children: [

        _jsxDEV("div", { className: "px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("h2", { className: "text-lg font-black text-gray-900", children: "재고 입고 등록" }, void 0, false),
            _jsxDEV("p", { className: "text-xs text-gray-500 mt-0.5", children: [stock.stockName, " (", stock.category, ")"] }, void 0, true)] }, void 0, true
          ),
          _jsxDEV("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600 transition-colors", children:
            _jsxDEV("span", { className: "text-2xl", children: "×" }, void 0, false) }, void 0, false
          )] }, void 0, true
        ),


        _jsxDEV("form", { onSubmit: handleSubmit, className: "flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide", children: [
          _jsxDEV("div", { className: "bg-emerald-50 rounded-2xl p-4 flex justify-between items-center border border-emerald-100 mb-2", children: [
            _jsxDEV("span", { className: "text-sm font-bold text-emerald-700", children: "현재 총 재고" }, void 0, false),
            _jsxDEV("span", { className: "text-lg font-black text-emerald-700", children: [
              stock.currentStock?.toLocaleString(), " ", stock.unit || '개'] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: labelStyle, children: ["상세 품목명 ", _jsxDEV("span", { className: "text-rose-500", children: "*" }, void 0, false)] }, void 0, true),
            _jsxDEV("input", {
              name: "detailStockName",
              value: formData.detailStockName,
              onChange: handleChange,
              placeholder: "예: A유통 국내산 냉동 삼겹살",
              className: inputStyle,
              required: true }, void 0, false
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: labelStyle, children: ["입고 수량 ", _jsxDEV("span", { className: "text-rose-500", children: "*" }, void 0, false)] }, void 0, true),
              _jsxDEV("input", {
                type: "number",
                name: "quantity",
                value: formData.quantity,
                onChange: handleChange,
                placeholder: "0",
                className: inputStyle,
                required: true }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: labelStyle, children: ["입고 단가 (원) ", _jsxDEV("span", { className: "text-rose-500", children: "*" }, void 0, false)] }, void 0, true),
              _jsxDEV("input", {
                type: "number",
                name: "incomingPrice",
                value: formData.incomingPrice,
                onChange: handleChange,
                placeholder: "0",
                className: inputStyle,
                required: true }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: labelStyle, children: "메모" }, void 0, false),
            _jsxDEV("textarea", {
              name: "memo",
              value: formData.memo,
              onChange: handleChange,
              placeholder: "추가 전달 사항 입력",
              rows: "3",
              className: `${inputStyle} resize-none` }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "px-6 py-5 bg-gray-50 border-t border-gray-100 flex gap-3", children: [
          _jsxDEV("button", {
            type: "button",
            onClick: onClose,
            className: "flex-1 px-6 py-3 bg-white border border-gray-200 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 transition-all text-sm", children:
            "취소" }, void 0, false

          ),
          _jsxDEV("button", {
            type: "submit",
            disabled: isLoading,
            className: "flex-[2] px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all text-sm disabled:opacity-50", children:

            isLoading ? '처리 중...' : '입고 등록 완료' }, void 0, false
          )] }, void 0, true
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default StockIncomingModal;