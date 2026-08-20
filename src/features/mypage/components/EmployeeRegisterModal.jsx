import React, { useState } from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const EmployeeRegisterModal = ({ isOpen, onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    empName: '',
    phone: '',
    workStartTime: '09:00',
    workEndTime: '18:00'
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };


  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let formatted = value;
    if (value.length > 3 && value.length <= 7) {
      formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 7) {
      formatted = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.empName.trim()) newErrors.empName = '직원 이름을 입력해주세요.';
    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요.';
    } else if (!/^010-\d{3,4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = '올바른 휴대폰 번호 형식을 입력해주세요. (010-XXXX-XXXX)';
    }
    if (!formData.workStartTime) newErrors.workStartTime = '출근 시간을 선택해주세요.';
    if (!formData.workEndTime) newErrors.workEndTime = '퇴근 시간을 선택해주세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;


    const payload = {
      ...formData,
      workStartTime: formData.workStartTime + ':00',
      workEndTime: formData.workEndTime + ':00'
    };

    const success = await onRegister(payload);
    if (success) {

      setFormData({
        empName: '',
        phone: '',
        workStartTime: '09:00',
        workEndTime: '18:00'
      });
      onClose();
    }
  };

  return (
    _jsxDEV("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4", children:
      _jsxDEV("div", { className: "bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-fade-in border border-gray-100", children: [
        _jsxDEV("div", { className: "bg-emerald-500 px-6 py-4 flex justify-between items-center text-white", children: [
          _jsxDEV("h3", { className: "font-bold text-lg", children: "➕ 신규 직원 등록" }, void 0, false),
          _jsxDEV("button", { onClick: onClose, className: "text-white hover:text-emerald-100 text-xl font-bold cursor-pointer", children: "×" }, void 0, false

          )] }, void 0, true
        ),

        _jsxDEV("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [

          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-bold text-gray-500 mb-1", children: "직원 이름 *" }, void 0, false),
            _jsxDEV("input", {
              type: "text",
              name: "empName",
              value: formData.empName,
              onChange: handleChange,
              placeholder: "예: 홍길동",
              className: `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.empName ? 'border-red-400' : 'border-gray-200'}` }, void 0, false

            ),
            errors.empName && _jsxDEV("p", { className: "text-[10px] text-red-500 mt-1", children: errors.empName }, void 0, false)] }, void 0, true
          ),


          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-bold text-gray-500 mb-1", children: "연락처 *" }, void 0, false),
            _jsxDEV("input", {
              type: "text",
              name: "phone",
              maxLength: "13",
              value: formData.phone,
              onChange: handlePhoneChange,
              placeholder: "010-XXXX-XXXX",
              className: `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.phone ? 'border-red-400' : 'border-gray-200'}` }, void 0, false

            ),
            errors.phone && _jsxDEV("p", { className: "text-[10px] text-red-500 mt-1", children: errors.phone }, void 0, false)] }, void 0, true
          ),

          _jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-xs font-bold text-gray-500 mb-1", children: "출근 시간 *" }, void 0, false),
              _jsxDEV("input", {
                type: "time",
                name: "workStartTime",
                value: formData.workStartTime,
                onChange: handleChange,
                className: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" }, void 0, false
              )] }, void 0, true
            ),


            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-xs font-bold text-gray-500 mb-1", children: "퇴근 시간 *" }, void 0, false),
              _jsxDEV("input", {
                type: "time",
                name: "workEndTime",
                value: formData.workEndTime,
                onChange: handleChange,
                className: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "pt-4 border-t border-gray-50 flex gap-3", children: [
            _jsxDEV("button", {
              type: "button",
              onClick: onClose,
              className: "flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all cursor-pointer", children:
              "취소" }, void 0, false

            ),
            _jsxDEV("button", {
              type: "submit",
              className: "flex-1 py-3 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all shadow-md shadow-emerald-100 cursor-pointer", children:
              "등록 완료" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default EmployeeRegisterModal;