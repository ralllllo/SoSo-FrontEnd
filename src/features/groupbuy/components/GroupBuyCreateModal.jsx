import React, { useState, useEffect } from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";











const GroupBuyCreateModal = ({ onClose, onSubmit, isPartner }) => {
  const [formData, setFormData] = useState({
    groupName: '',
    description: '',
    partnerName: '',
    itemName: '',
    category: '',
    quantity: 1,
    unitPrice: 0,
    targetParticipants: 2,
    currentParticipants: 1,
    endDate: '',
    pickupZipCode: '',
    pickupAddress: '',
    pickupDetailAddress: '',
    pickupTime: '',
    notice: ''
  });


  const searchAddress = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setFormData((prev) => ({
          ...prev,
          pickupZipCode: data.zonecode,
          pickupAddress: data.roadAddress
        }));
      }
    }).open();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['quantity', 'unitPrice', 'targetParticipants'].includes(name) ?
      value === '' ? '' : Number(value) :
      value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (formData.targetParticipants < 2) {
      alert("모집 인원은 최소 2명 이상으로 설정해야 합니다.");
      return;
    }


    const selectedDate = new Date(formData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("마감 기한은 이미 지났습니다. 오늘 혹은 미래 날짜로 설정해주세요.");
      return;
    }


    const combinedPickupLocation = `(${formData.pickupZipCode}) ${formData.pickupAddress} ${formData.pickupDetailAddress}`.trim();


    const submitData = {
      ...formData,
      pickupLocation: combinedPickupLocation,
      totalAmount: formData.quantity * formData.unitPrice
    };


    if (submitData.endDate && !submitData.endDate.includes('T')) {
      submitData.endDate = `${submitData.endDate}T23:59:59`;
    }

    onSubmit(submitData);
    onClose();
  };

  return (
    _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children:
      _jsxDEV("div", { className: "bg-white w-full max-w-2xl mx-auto rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300", children: [

        _jsxDEV("div", { className: "px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50", children: [
          _jsxDEV("div", { children:
            _jsxDEV("h3", { className: "text-2xl font-black text-gray-900", children:
              isPartner ? '거래처 공동그룹 생성' : '사업자 공동그룹 생성' }, void 0, false
            ) }, void 0, false
          ),
          _jsxDEV("button", { onClick: onClose, className: "p-2 hover:bg-white rounded-full transition-colors group", children:
            _jsxDEV("svg", { className: "w-6 h-6 text-gray-300 group-hover:text-gray-900", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children:
              _jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }, void 0, false) }, void 0, false
            ) }, void 0, false
          )] }, void 0, true
        ),

        _jsxDEV("form", { onSubmit: handleSubmit, className: "p-10 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar", children: [


          _jsxDEV("section", { className: "space-y-4", children: [
            _jsxDEV("div", { className: "flex items-center gap-2 mb-2", children: [
              _jsxDEV("span", { className: "w-1 h-3 bg-purple-500 rounded-full" }, void 0, false),
              _jsxDEV("h4", { className: "text-sm font-black text-gray-900 uppercase", children: "기본 정보" }, void 0, false)] }, void 0, true
            ),

            _jsxDEV("div", { className: "space-y-2", children: [
              _jsxDEV("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "공동구매그룹명" }, void 0, false),
              _jsxDEV("input", {
                required: true,
                name: "groupName",
                value: formData.groupName,
                onChange: handleChange,
                className: "w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm focus:border-emerald-500 focus:bg-white outline-none font-black transition-all",
                placeholder: "공동구매그룹명을 입력하세요" }, void 0, false
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "space-y-2", children: [
              _jsxDEV("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "상세설명" }, void 0, false),
              _jsxDEV("textarea", {
                name: "description",
                value: formData.description,
                onChange: handleChange,
                className: "w-full bg-gray-50 border-2 border-gray-50 rounded-[28px] px-6 py-5 text-sm focus:border-emerald-500 focus:bg-white outline-none font-bold h-24 resize-none transition-all",
                placeholder: "공동구매에 대한 상세 설명을 입력하세요" }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ),


          _jsxDEV("section", { className: "space-y-4 pt-4 border-t border-gray-50", children: [
            _jsxDEV("div", { className: "flex items-center gap-2 mb-2", children: [
              _jsxDEV("span", { className: "w-1 h-3 bg-emerald-500 rounded-full" }, void 0, false),
              _jsxDEV("h4", { className: "text-sm font-black text-gray-900 uppercase", children: "상품 및 모집 정보" }, void 0, false)] }, void 0, true
            ),

            _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
              _jsxDEV("div", { className: "space-y-2", children: [
                _jsxDEV("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "거래처명" }, void 0, false),
                _jsxDEV("input", {
                  required: true,
                  name: "partnerName",
                  value: formData.partnerName,
                  onChange: handleChange,
                  className: "w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm focus:border-emerald-500 focus:bg-white outline-none font-black transition-all",
                  placeholder: "예: 상생 농장" }, void 0, false
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "space-y-2", children: [
                _jsxDEV("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "품목명" }, void 0, false),
                _jsxDEV("input", {
                  required: true,
                  name: "itemName",
                  value: formData.itemName,
                  onChange: handleChange,
                  className: "w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm focus:border-emerald-500 focus:bg-white outline-none font-black transition-all",
                  placeholder: "예: 한우 등심 (1+ 등급)" }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
              _jsxDEV("div", { className: "space-y-2", children: [
                _jsxDEV("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "카테고리" }, void 0, false),
                _jsxDEV("input", {
                  required: true,
                  name: "category",
                  value: formData.category,
                  onChange: handleChange,
                  className: "w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm focus:border-emerald-500 focus:bg-white outline-none font-black transition-all",
                  placeholder: "예: 육류, 채소류" }, void 0, false
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "space-y-2", children: [
                _jsxDEV("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "수량" }, void 0, false),
                _jsxDEV("input", {
                  required: true,
                  type: "number",
                  name: "quantity",
                  value: formData.quantity,
                  onChange: handleChange,
                  min: "1",
                  className: "w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm focus:border-emerald-500 focus:bg-white outline-none font-black transition-all" }, void 0, false
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "space-y-2", children: [
                _jsxDEV("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "단가 (₩)" }, void 0, false),
                _jsxDEV("input", {
                  required: true,
                  type: "number",
                  name: "unitPrice",
                  value: formData.unitPrice,
                  onChange: handleChange,
                  min: "0",
                  className: "w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm focus:border-emerald-500 focus:bg-white outline-none font-black transition-all",
                  placeholder: "단가 입력" }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
              _jsxDEV("div", { className: "space-y-2", children: [
                _jsxDEV("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "모집인원 (명)" }, void 0, false),
                _jsxDEV("input", {
                  required: true,
                  type: "number",
                  name: "targetParticipants",
                  value: formData.targetParticipants,
                  onChange: handleChange,
                  min: "2",
                  className: "w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm focus:border-emerald-500 focus:bg-white outline-none font-black transition-all" }, void 0, false
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "space-y-2", children: [
                _jsxDEV("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "마감 기한" }, void 0, false),
                _jsxDEV("input", {
                  required: true,
                  type: "date",
                  name: "endDate",
                  min: new Date().toISOString().split('T')[0],
                  value: formData.endDate.split('T')[0],
                  onChange: handleChange,
                  className: "w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm focus:border-emerald-500 focus:bg-white outline-none font-black transition-all" }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "space-y-2", children: [
              _jsxDEV("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "총 결제 금액 (₩)" }, void 0, false),
              _jsxDEV("div", { className: "relative", children: [
                _jsxDEV("input", {
                  readOnly: true,
                  type: "number",
                  value: formData.quantity * formData.unitPrice,
                  className: "w-full bg-gray-100 border-2 border-gray-50 rounded-[20px] px-6 py-5 text-xl outline-none font-black text-gray-500 pl-12" }, void 0, false
                ),
                _jsxDEV("span", { className: "absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xl", children: "₩" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ),


          _jsxDEV("section", { className: "space-y-4 pt-4 border-t border-gray-50", children: [
            _jsxDEV("div", { className: "flex items-center gap-2 mb-2", children: [
              _jsxDEV("span", { className: "w-1 h-3 bg-blue-500 rounded-full" }, void 0, false),
              _jsxDEV("h4", { className: "text-sm font-black text-gray-900 uppercase", children: "픽업 및 유의사항 정보" }, void 0, false)] }, void 0, true
            ),

            _jsxDEV("div", { className: "space-y-2", children: [
              _jsxDEV("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "픽업 장소" }, void 0, false),
              _jsxDEV("div", { className: "flex gap-2", children: [
                _jsxDEV("input", {
                  required: true,
                  name: "pickupZipCode",
                  value: formData.pickupZipCode,
                  readOnly: true,
                  className: "w-1/3 bg-gray-100 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm font-bold text-gray-500 outline-none",
                  placeholder: "우편번호" }, void 0, false
                ),
                _jsxDEV("button", {
                  type: "button",
                  onClick: searchAddress,
                  className: "w-1/3 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-md active:scale-95", children:
                  "주소검색" }, void 0, false

                )] }, void 0, true
              ),
              _jsxDEV("input", {
                required: true,
                name: "pickupAddress",
                value: formData.pickupAddress,
                readOnly: true,
                className: "w-full bg-gray-100 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm font-bold text-gray-500 outline-none",
                placeholder: "도로명 주소" }, void 0, false
              ),
              _jsxDEV("input", {
                required: true,
                name: "pickupDetailAddress",
                value: formData.pickupDetailAddress,
                onChange: handleChange,
                className: "w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm focus:border-emerald-500 focus:bg-white outline-none font-bold transition-all",
                placeholder: "상세주소를 입력하세요" }, void 0, false
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "space-y-2", children: [
              _jsxDEV("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "픽업 가능 시간" }, void 0, false),
              _jsxDEV("div", { className: "relative", children: [
                _jsxDEV("input", {
                  required: true,
                  name: "pickupTime",
                  value: formData.pickupTime,
                  onChange: handleChange,
                  className: "w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm focus:border-emerald-500 focus:bg-white outline-none font-bold transition-all pl-12",
                  placeholder: "예: 매일 14:00 ~ 18:00" }, void 0, false
                ),
                _jsxDEV("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-lg", children: "⏰" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "space-y-2", children: [
              _jsxDEV("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "유의사항" }, void 0, false),
              _jsxDEV("textarea", {
                name: "notice",
                value: formData.notice,
                onChange: handleChange,
                className: "w-full bg-gray-50 border-2 border-gray-50 rounded-[28px] px-6 py-5 text-sm focus:border-emerald-500 focus:bg-white outline-none font-bold h-32 resize-none transition-all",
                placeholder: "참여자들에게 전달할 유의사항을 입력해 주세요." }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "pt-6", children:
            _jsxDEV("button", {
              type: "submit",
              className: "w-full bg-emerald-600 text-white py-6 rounded-[30px] font-black text-xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-100 active:scale-[0.98] hover:-translate-y-1", children:
              "공동그룹 생성하기" }, void 0, false

            ) }, void 0, false
          )] }, void 0, true
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default GroupBuyCreateModal;