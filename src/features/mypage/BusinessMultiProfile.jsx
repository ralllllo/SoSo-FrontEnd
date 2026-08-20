




import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/soso로고.png";
import authStore from "../../store/authStore";
import { useBusinessMultiProfile } from './hooks/useBusinessMultiProfile';
import { PhotoSlot, AddPhotoBtn } from './components/PartnerEditProfileSection';

const MultiProfileTab = () => {
  const navigate = useNavigate();
  const exteriorInputRef = useRef(null);
  const interiorInputRef = useRef(null);


  const {
    formData,
    isBizVerified,
    isSubmitting,
    handleChange,
    handleFileChange,
    handleRemovePhoto,
    handleAddressSearch,
    handleVerifyBusiness,
    handleSubmit
  } = useBusinessMultiProfile();

  return (
    _jsxDEV("form", { onSubmit: handleSubmit, className: "bg-white border border-emerald-100 rounded-lg p-8 shadow-sm", children: [
      _jsxDEV("div", { className: "flex justify-between items-center mb-2", children: [
        _jsxDEV("h2", { className: "text-xl font-bold", children: "다중 매장 관리" }, void 0, false),
        _jsxDEV("span", { className: "px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full", children: "최대 5개 등록 가능" }, void 0, false)] }, void 0, true
      ),
      _jsxDEV("p", { className: "text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4", children: "새로운 사업자 정보를 등록하여 매장을 추가로 관리할 수 있습니다." }, void 0, false),


      _jsxDEV("div", { className: "space-y-10", children: [
        _jsxDEV("div", { children: [
          _jsxDEV("h3", { className: "font-bold text-emerald-700 flex items-center gap-2 mb-6 text-base", children: [
            _jsxDEV("span", { className: "w-1.5 h-6 bg-emerald-500 rounded-full inline-block" }, void 0, false), "신규 매장 정보 입력"] }, void 0, true

          ),
          _jsxDEV("div", { className: "grid grid-cols-2 gap-x-6 gap-y-6 text-sm", children: [
            _jsxDEV("div", { className: "col-span-2 md:col-span-1", children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-2", children: "상호명" }, void 0, false),
              _jsxDEV("input", {
                type: "text",
                name: "b_nm",
                placeholder: "예: 소소마을 강남점",
                value: formData.b_nm,
                onChange: handleChange,
                className: "w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition-all",
                required: true }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("div", { className: "col-span-2 md:col-span-1", children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-2", children: "대표자명" }, void 0, false),
              _jsxDEV("input", {
                type: "text",
                name: "p_nm",
                placeholder: "실명을 입력하세요",
                value: formData.p_nm,
                onChange: handleChange,
                className: "w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition-all",
                required: true }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("div", { className: "col-span-2", children:
              _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                _jsxDEV("div", { children: [
                  _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-2", children: "오픈일자" }, void 0, false),
                  _jsxDEV("input", {
                    type: "date",
                    name: "start_dt",
                    value: formData.start_dt,
                    onChange: handleChange,
                    className: "w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition-all",
                    required: true }, void 0, false
                  )] }, void 0, true
                ),
                _jsxDEV("div", { children: [
                  _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-2", children: "사업자 번호" }, void 0, false),
                  _jsxDEV("div", { className: "flex gap-2", children: [
                    _jsxDEV("input", {
                      type: "text",
                      name: "b_no",
                      placeholder: "000-00-00000",
                      value: formData.b_no,
                      onChange: handleChange,
                      className: "flex-grow p-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition-all",
                      required: true }, void 0, false
                    ),
                    _jsxDEV("button", {
                      type: "button",
                      onClick: handleVerifyBusiness,
                      disabled: isBizVerified,
                      className: `px-4 text-xs font-bold rounded-xl transition-colors whitespace-nowrap ${
                      isBizVerified ?
                      'bg-emerald-100 text-emerald-600' :
                      'bg-gray-800 text-white hover:bg-black'}`, children:


                      isBizVerified ? '인증 완료' : '인증하기' }, void 0, false
                    )] }, void 0, true
                  )] }, void 0, true
                )] }, void 0, true
              ) }, void 0, false
            ),
            _jsxDEV("div", { className: "col-span-2", children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-2", children: "가게 주소" }, void 0, false),
              _jsxDEV("div", { className: "flex gap-2 mb-3", children: [
                _jsxDEV("input", {
                  type: "text",
                  name: "zipcode",
                  placeholder: "우편번호",
                  value: formData.zipcode,
                  readOnly: true,
                  className: "w-32 p-3 bg-gray-100 border border-gray-100 rounded-xl text-gray-500 outline-none" }, void 0, false
                ),
                _jsxDEV("button", {
                  type: "button",
                  onClick: handleAddressSearch,
                  className: "px-5 bg-gray-800 text-white text-xs font-bold rounded-xl hover:bg-black transition-colors whitespace-nowrap", children:
                  "주소 검색" }, void 0, false

                )] }, void 0, true
              ),
              _jsxDEV("input", {
                type: "text",
                name: "address1",
                placeholder: "주소 검색을 이용해 주세요",
                value: formData.address1,
                readOnly: true,
                className: "w-full p-3 bg-gray-100 border border-gray-100 rounded-xl text-gray-500 outline-none mb-3" }, void 0, false
              ),
              _jsxDEV("input", {
                type: "text",
                name: "address2",
                placeholder: "상세 주소를 입력하세요",
                value: formData.address2,
                onChange: handleChange,
                className: "w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition-all" }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { children: [
          _jsxDEV("h3", { className: "font-bold text-emerald-700 flex items-center gap-2 mb-6 text-base", children: [
            _jsxDEV("span", { className: "w-1.5 h-6 bg-emerald-500 rounded-full inline-block" }, void 0, false), "매장 사진 등록"] }, void 0, true

          ),
          _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [

            _jsxDEV("div", { className: "space-y-3", children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 ml-1", children: "가게 외부 사진" }, void 0, false),
              _jsxDEV("input", {
                type: "file",
                accept: "image/*",
                className: "hidden",
                ref: exteriorInputRef,
                onChange: (e) => handleFileChange(e, 'exterior') }, void 0, false
              ),
              formData.exteriorPreview ?
              _jsxDEV(PhotoSlot, {
                label: "외부 사진",
                preview: formData.exteriorPreview,
                onRemove: () => handleRemovePhoto('exterior') }, void 0, false
              ) :

              _jsxDEV(AddPhotoBtn, {
                label: "외부 사진",
                onClick: () => exteriorInputRef.current.click() }, void 0, false
              )] }, void 0, true

            ),


            _jsxDEV("div", { className: "space-y-3", children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 ml-1", children: "가게 내부 사진" }, void 0, false),
              _jsxDEV("input", {
                type: "file",
                accept: "image/*",
                className: "hidden",
                ref: interiorInputRef,
                onChange: (e) => handleFileChange(e, 'interior') }, void 0, false
              ),
              formData.interiorPreview ?
              _jsxDEV(PhotoSlot, {
                label: "내부 사진",
                preview: formData.interiorPreview,
                onRemove: () => handleRemovePhoto('interior') }, void 0, false
              ) :

              _jsxDEV(AddPhotoBtn, {
                label: "내부 사진",
                onClick: () => interiorInputRef.current.click() }, void 0, false
              )] }, void 0, true

            )] }, void 0, true
          ),
          _jsxDEV("p", { className: "text-[11px] text-gray-400 mt-4 ml-1 italic", children: "* 매장 홍보 시 고객들에게 노출되는 사진입니다. 선명한 사진을 등록해주세요." }, void 0, false)] }, void 0, true
        )] }, void 0, true
      ),

      _jsxDEV("div", { className: "flex justify-end gap-3 mt-12 pt-8 border-t border-gray-50", children: [
        _jsxDEV("button", {
          type: "button",
          onClick: () => navigate("/business-mypage"),
          className: "px-8 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors",
          disabled: isSubmitting, children:
          "취소" }, void 0, false

        ),
        _jsxDEV("button", {
          type: "submit",
          className: "px-8 py-3 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-100 disabled:bg-emerald-300",
          disabled: isSubmitting, children:

          isSubmitting ? '등록 중...' : '매장 등록하기' }, void 0, false
        )] }, void 0, true
      )] }, void 0, true
    ));

};

import { useStores } from '../../hooks/useStores';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

function BusinessMultiProfile() {
  const { logout, user_type, user_nickname, bizname, selectedStoreSeq, setSelectedStore } = authStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('다중 매장 관리');
  const [isProfileOpen, setIsProfileOpen] = useState(false);


  const { stores, isLoading: isStoresLoading } = useStores();

  const menuGroups = [
  { title: '계정', items: ['개인정보 확인', '개인정보 수정', '회원 탈퇴'] },
  { title: '설정', items: ['스마트 알림 설정'] },
  { title: '운영', items: ['다중 매장 관리', '직원 근태 관리'] }];


  const handleProfileClick = () => {
    if (user_type === 'BUSINESS') {
      navigate('/business-mypage');
      setIsProfileOpen(false);
    }
  };




  const handleStoreSwitch = (storeSeq, companyName) => {
    setSelectedStore(storeSeq, companyName);
    navigate('/business-mypage');
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      logout();
      navigate("/");
    }
  };

  return (
    _jsxDEV("div", { className: "min-h-screen bg-[#FAFAFA] flex flex-col font-sans", children:
      _jsxDEV("main", { className: "flex-grow w-full max-w-6xl mx-auto px-4 py-10 flex gap-8", children: [

        _jsxDEV("aside", { className: "w-64 shrink-0 flex flex-col gap-6", children: [
          _jsxDEV("div", { className: "bg-white border border-emerald-100 rounded-lg p-6 shadow-sm", children: [
            _jsxDEV("h2", { className: "font-bold text-gray-900", children: bizname || '소소마을' }, void 0, false),
            _jsxDEV("p", { className: "text-xs text-gray-500 mt-1", children: "사업자 회원" }, void 0, false)] }, void 0, true
          ),

          menuGroups.map((group) =>
          _jsxDEV("div", { children: [
            _jsxDEV("h4", { className: "text-xs font-bold text-gray-400 mb-2 px-2", children: group.title }, void 0, false),
            _jsxDEV("ul", { className: "flex flex-col gap-1", children:
              group.items.map((item) =>
              _jsxDEV("li", { children:
                _jsxDEV("button", {
                  onClick: () => {
                    if (item === '개인정보 확인') navigate("/business-mypage");else
                    if (item === '개인정보 수정') navigate("/business-update-mypage");else
                    if (item === '다중 매장 관리') navigate("/business-multiprofile");else
                    if (item === '회원 탈퇴') navigate("/business-withdrawal");else
                    if (item === '직원 근태 관리') navigate("/business-attendance");else
                    if (item === '스마트 알림 설정') navigate("/business-notification");else
                    setActiveTab(item);
                  },
                  className: `w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  activeTab === item ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-100'}`, children:


                  item }, void 0, false
                ) }, item, false
              )
              ) }, void 0, false
            )] }, group.title, true
          )
          )] }, void 0, true
        ),


        _jsxDEV("section", { className: "flex-grow", children:
          activeTab === '다중 매장 관리' ?
          _jsxDEV(MultiProfileTab, {}, void 0, false) :

          _jsxDEV("div", { className: "bg-white border border-gray-100 rounded-lg p-12 text-center text-gray-400", children: [
            _jsxDEV("h2", { className: "font-bold text-lg mb-2", children: activeTab }, void 0, false),
            _jsxDEV("p", { children: "콘텐츠 준비 중입니다." }, void 0, false)] }, void 0, true
          ) }, void 0, false

        )] }, void 0, true
      ) }, void 0, false
    ));

}

export default BusinessMultiProfile;