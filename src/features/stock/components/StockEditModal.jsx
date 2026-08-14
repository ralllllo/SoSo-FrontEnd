import React, { useState, useEffect } from 'react';
import { getCategories } from '../../../apis/stockApi';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const StockEditModal = ({ isOpen, onClose, stock, onEdit }) => {
  const initialFormState = {
    stockName: '',
    category: '',
    unit: '',
    safetyStock: '',
    defaultExpiryDays: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    if (isOpen && stock) {

      getCategories().then((response) => {
        setCategories(response);
      }).catch((err) => console.error('카테고리 로드 실패:', err));

      setFormData({
        stockName: stock.stockName || '',
        category: stock.categorySeq || '',
        unit: stock.unit || '',
        safetyStock: stock.safetyStock || 0,
        defaultExpiryDays: stock.defaultExpiryDays || 0
      });
    } else if (!isOpen) {
      setFormData(initialFormState);
    }
  }, [isOpen, stock]);

  if (!isOpen || !stock) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.safetyStock !== '' && Number(formData.safetyStock) <= 0) {
      alert('안전 재고 수량은 1개 이상으로 설정해야 합니다.');
      return;
    }
    if (formData.defaultExpiryDays !== '' && Number(formData.defaultExpiryDays) <= 0) {
      alert('기본 소비기한은 1일 이상으로 설정해야 합니다.');
      return;
    }

    onEdit(stock.stockSeq, formData);
    onClose();
  };

  const labelStyle = "block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 ml-1";
  const inputStyle = "w-full h-12 px-5 bg-gray-50 border-2 border-transparent rounded-2xl text-[14px] font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all placeholder:text-gray-300";

  return (
    _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in", children:
      _jsxDEV("div", { className: "bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-up border border-white/20", children: [

        _jsxDEV("div", { className: "px-8 pt-8 pb-4 flex items-center justify-between", children: [
          _jsxDEV("div", { children:

            _jsxDEV("h3", { className: "text-2xl font-black text-gray-900 tracking-tight", children: "품목 정보 수정" }, void 0, false) }, void 0, false
          ),
          _jsxDEV("button", {
            onClick: onClose,
            className: "w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all active:scale-90", children:

            _jsxDEV("span", { className: "text-xl", children: "✕" }, void 0, false) }, void 0, false
          )] }, void 0, true
        ),


        _jsxDEV("form", { onSubmit: handleSubmit, className: "px-8 pb-8 pt-4 space-y-5", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: labelStyle, children: ["품목명 ", _jsxDEV("span", { className: "text-rose-500", children: "*" }, void 0, false)] }, void 0, true),
            _jsxDEV("input", {
              type: "text",
              name: "stockName",
              value: formData.stockName,
              onChange: handleChange,
              className: inputStyle,
              required: true }, void 0, false
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: labelStyle, children: ["카테고리 ", _jsxDEV("span", { className: "text-rose-500", children: "*" }, void 0, false)] }, void 0, true),
              _jsxDEV("select", {
                name: "category",
                value: formData.category,
                onChange: handleChange,
                className: inputStyle,
                required: true, children: [

                _jsxDEV("option", { value: "", children: "선택하세요" }, void 0, false),
                categories.map((cat) =>
                _jsxDEV("option", { value: cat.categorySeq, children:
                  cat.categoryName }, cat.categorySeq, false
                )
                )] }, void 0, true
              )] }, void 0, true
            ),
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: labelStyle, children: ["관리 단위 ", _jsxDEV("span", { className: "text-rose-500", children: "*" }, void 0, false)] }, void 0, true),
              _jsxDEV("input", {
                type: "text",
                name: "unit",
                value: formData.unit,
                onChange: handleChange,
                className: inputStyle,
                required: true }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: labelStyle, children: "안전 재고 수량" }, void 0, false),
              _jsxDEV("input", {
                type: "number",
                name: "safetyStock",
                value: formData.safetyStock,
                onChange: handleChange,
                className: inputStyle,
                min: "1" }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: labelStyle, children: "기본 소비기한" }, void 0, false),
              _jsxDEV("div", { className: "relative", children: [
                _jsxDEV("input", {
                  type: "number",
                  name: "defaultExpiryDays",
                  value: formData.defaultExpiryDays,
                  onChange: handleChange,
                  className: `${inputStyle} pr-12`,
                  min: "1" }, void 0, false
                ),
                _jsxDEV("span", { className: "absolute right-5 top-1/2 -translate-y-1/2 text-xs font-black text-gray-400", children: "DAYS" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ),


          _jsxDEV("div", { className: "flex gap-3 pt-4", children: [
            _jsxDEV("button", {
              type: "button",
              onClick: onClose,
              className: "flex-1 h-14 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[14px] font-black rounded-2xl transition-all active:scale-95", children:
              "취소" }, void 0, false

            ),
            _jsxDEV("button", {
              type: "submit",
              className: "flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-black rounded-2xl transition-all shadow-xl shadow-emerald-100 active:scale-95", children:
              "정보 수정하기" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default StockEditModal;