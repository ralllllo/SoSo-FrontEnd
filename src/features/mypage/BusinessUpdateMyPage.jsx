




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/soso로고.png";
import authStore from "../../store/authStore";
import { useBusinessUpdate } from './hooks/useBusinessUpdate';
import { useStores } from '../../hooks/useStores';import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";


const PasswordChangeModal = ({ isOpen, onClose, form, errors, onChange, onSubmit, isSubmitting }) => {
  if (!isOpen) return null;

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit();
    if (success) onClose();
  };

  return (
    _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4", children:
      _jsxDEV("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up", children: [
        _jsxDEV("div", { className: "p-6 border-b border-gray-100 flex justify-between items-center bg-emerald-50", children: [
          _jsxDEV("h3", { className: "text-lg font-bold text-emerald-800", children: "비밀번호 변경" }, void 0, false),
          _jsxDEV("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600 text-2xl", children: "×" }, void 0, false)] }, void 0, true
        ),
        _jsxDEV("form", { onSubmit: handleFinalSubmit, className: "p-6 flex flex-col gap-5", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-bold text-gray-500 mb-2", children: "현재 비밀번호" }, void 0, false),
            _jsxDEV("input", {
              type: "password",
              name: "currentPassword",
              placeholder: "현재 비밀번호를 입력하세요",
              value: form.currentPassword,
              onChange: onChange,
              className: "w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm",
              required: true }, void 0, false
            )] }, void 0, true
          ),
          _jsxDEV("div", { className: "border-t border-gray-50 pt-4", children: [
            _jsxDEV("label", { className: "block text-xs font-bold text-gray-500 mb-2", children: "새 비밀번호" }, void 0, false),
            _jsxDEV("input", {
              type: "password",
              name: "newPassword",
              placeholder: "새 비밀번호를 입력하세요",
              value: form.newPassword,
              onChange: onChange,
              className: `w-full p-3 bg-gray-50 border ${errors.newPassword ? 'border-red-300' : 'border-gray-100'} rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm`,
              required: true }, void 0, false
            ),
            errors.newPassword && _jsxDEV("p", { className: "text-[10px] text-red-500 mt-1 ml-1", children: errors.newPassword }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-bold text-gray-500 mb-2", children: "새 비밀번호 확인" }, void 0, false),
            _jsxDEV("input", {
              type: "password",
              name: "confirmPassword",
              placeholder: "새 비밀번호를 다시 입력하세요",
              value: form.confirmPassword,
              onChange: onChange,
              className: `w-full p-3 bg-gray-50 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-100'} rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm`,
              required: true }, void 0, false
            ),
            errors.confirmPassword && _jsxDEV("p", { className: "text-[10px] text-red-500 mt-1 ml-1", children: errors.confirmPassword }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { className: "mt-4 flex gap-2", children: [
            _jsxDEV("button", {
              type: "button",
              onClick: onClose,
              className: "flex-1 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors",
              disabled: isSubmitting, children:
              "취소" }, void 0, false

            ),
            _jsxDEV("button", {
              type: "submit",
              className: "flex-1 py-3 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-100",
              disabled: isSubmitting, children:

              isSubmitting ? '변경 중...' : '변경 완료' }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ) }, void 0, false
    ));

};

const UserUpdateTab = () => {
  const navigate = useNavigate();
  const [isPwModalOpen, setIsPwModalOpen] = useState(false);

  const {
    formData,
    isBizVerified,
    passwordForm,
    errors,
    passwordErrors,
    isLoading,
    isSubmitting,
    isPasswordSubmitting,
    handleChange,
    handlePasswordChange,
    handleFileChange,
    handleAddressSearch,
    handleVerifyBusiness,
    handleSubmit,
    handlePasswordSubmit
  } = useBusinessUpdate();

  if (isLoading) return _jsxDEV("div", { className: "p-8 text-center text-gray-500", children: "정보를 불러오는 중입니다..." }, void 0, false);

  return (
    _jsxDEV(_Fragment, { children: [
      _jsxDEV("form", { onSubmit: handleSubmit, className: "bg-white border border-emerald-100 rounded-lg p-8 shadow-sm", children: [
        _jsxDEV("h2", { className: "text-xl font-bold mb-2", children: "개인정보 수정" }, void 0, false),
        _jsxDEV("p", { className: "text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4", children: "회원님의 정보를 최신 상태로 유지하세요." }, void 0, false),


        _jsxDEV("div", { className: "mb-10", children: [
          _jsxDEV("div", { className: "flex justify-between items-center mb-4", children: [
            _jsxDEV("h3", { className: "font-bold text-emerald-700 flex items-center gap-2", children: "기본 계정 정보 수정" }, void 0, false

            ),
            _jsxDEV("button", {
              type: "button",
              onClick: () => setIsPwModalOpen(true),
              className: "px-4 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-100", children:
              "비밀번호 변경" }, void 0, false

            )] }, void 0, true
          ),
          _jsxDEV("div", { className: "grid grid-cols-2 gap-x-6 gap-y-6 text-sm", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "아이디 (변경 불가)" }, void 0, false),
              _jsxDEV("div", { className: "p-2 border-b bg-gray-50 text-gray-400", children: formData.userId }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "닉네임" }, void 0, false),
              _jsxDEV("input", {
                type: "text",
                name: "nickname",
                value: formData.nickname,
                onChange: handleChange,
                className: "w-full p-2 border-b border-gray-200 focus:border-emerald-500 outline-none transition-colors",
                required: true }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "전화번호" }, void 0, false),
              _jsxDEV("input", {
                type: "text",
                name: "phone",
                value: formData.phone,
                onChange: handleChange,
                placeholder: "010-XXXX-XXXX",
                className: `w-full p-2 border-b ${errors.phone ? 'border-red-300' : 'border-gray-200'} focus:border-emerald-500 outline-none transition-colors`,
                required: true }, void 0, false
              ),
              errors.phone && _jsxDEV("p", { className: "text-[10px] text-red-500 mt-1", children: errors.phone }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "이메일" }, void 0, false),
              _jsxDEV("input", {
                type: "email",
                name: "email",
                value: formData.email,
                onChange: handleChange,
                className: `w-full p-2 border-b ${errors.email ? 'border-red-300' : 'border-gray-200'} focus:border-emerald-500 outline-none transition-colors`,
                required: true }, void 0, false
              ),
              errors.email && _jsxDEV("p", { className: "text-[10px] text-red-500 mt-1", children: errors.email }, void 0, false)] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "mb-10", children: [
          _jsxDEV("h3", { className: "font-bold text-emerald-700 flex items-center gap-2 mb-4", children: "사업자 정보 수정" }, void 0, false

          ),
          _jsxDEV("div", { className: "grid grid-cols-2 gap-x-6 gap-y-6 text-sm", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "대표자명 (실명)" }, void 0, false),
              _jsxDEV("input", {
                type: "text",
                name: "ceoName",
                value: formData.ceoName,
                onChange: handleChange,
                placeholder: "국세청 등록 대표자명",
                className: "w-full p-2 border-b border-gray-200 focus:border-emerald-500 outline-none transition-colors",
                required: true }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "사업자 번호" }, void 0, false),
              _jsxDEV("div", { className: "flex gap-2 items-end", children: [
                _jsxDEV("input", {
                  type: "text",
                  name: "bizNumber",
                  value: formData.bizNumber,
                  onChange: handleChange,
                  placeholder: "000-00-00000",
                  className: "flex-grow p-2 border-b border-gray-200 focus:border-emerald-500 outline-none transition-colors" }, void 0, false
                ),
                _jsxDEV("button", {
                  type: "button",
                  onClick: handleVerifyBusiness,
                  disabled: isBizVerified,
                  className: `px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  isBizVerified ?
                  'bg-emerald-100 text-emerald-600' :
                  'bg-gray-800 text-white hover:bg-black'}`, children:


                  isBizVerified ? '✅ 인증 완료' : '사업자 인증하기' }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            ),
            _jsxDEV("div", { className: "col-span-2", children:
              !isBizVerified && _jsxDEV("p", { className: "text-[10px] text-orange-500 -mt-4 ml-1", children: "* 사업자 정보 변경 시 실명 인증이 필요합니다." }, void 0, false) }, void 0, false
            ),
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "상호명" }, void 0, false),
              _jsxDEV("input", {
                type: "text",
                name: "bizname",
                value: formData.bizname,
                onChange: handleChange,
                className: "w-full p-2 border-b border-gray-200 focus:border-emerald-500 outline-none transition-colors",
                required: true }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "오픈일자" }, void 0, false),
              _jsxDEV("input", {
                type: "date",
                name: "openingDate",
                value: formData.openingDate,
                onChange: handleChange,
                className: "w-full p-2 border-b border-gray-200 focus:border-emerald-500 outline-none transition-colors" }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("div", { className: "col-span-2", children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "가게 주소" }, void 0, false),
              _jsxDEV("div", { className: "flex gap-2 mb-2", children: [
                _jsxDEV("input", {
                  type: "text",
                  name: "zonecode",
                  placeholder: "우편번호",
                  value: formData.zonecode || "",
                  readOnly: true,
                  className: "w-32 p-2 border-b border-gray-200 bg-gray-50 outline-none text-gray-500" }, void 0, false
                ),
                _jsxDEV("button", {
                  type: "button",
                  onClick: handleAddressSearch,
                  className: "px-3 py-1 bg-gray-100 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors", children:
                  "주소 검색" }, void 0, false

                )] }, void 0, true
              ),
              _jsxDEV("input", {
                type: "text",
                name: "address1",
                placeholder: "주소 검색을 이용해 주세요",
                value: formData.address1 || "",
                readOnly: true,
                className: "w-full p-2 border-b border-gray-200 bg-gray-50 outline-none text-gray-500 mb-2" }, void 0, false
              ),
              _jsxDEV("input", {
                type: "text",
                name: "address2",
                placeholder: "상세 주소를 입력하세요",
                value: formData.address2 || "",
                onChange: handleChange,
                className: "w-full p-2 border-b border-gray-200 focus:border-emerald-500 outline-none transition-colors" }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "mb-10", children: [
          _jsxDEV("h3", { className: "font-bold text-emerald-700 flex items-center gap-2 mb-4", children: "가게 사진 수정" }, void 0, false

          ),
          _jsxDEV("div", { className: "grid grid-cols-2 gap-8", children: [

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-3", children: "가게 외관" }, void 0, false),
              _jsxDEV("div", { className: "relative group", children: [
                _jsxDEV("div", { className: "w-full aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-emerald-100 bg-gray-50 flex items-center justify-center", children:
                  formData.exteriorPreview ?
                  _jsxDEV("img", { src: formData.exteriorPreview, alt: "Exterior Preview", className: "w-full h-full object-cover" }, void 0, false) :

                  _jsxDEV("span", { className: "text-gray-400 text-xs", children: "사진을 선택해 주세요" }, void 0, false) }, void 0, false

                ),
                _jsxDEV("label", { className: "absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl", children: [
                  _jsxDEV("span", { className: "text-white text-xs font-bold bg-emerald-500 px-4 py-2 rounded-full shadow-lg", children: "사진 변경" }, void 0, false),
                  _jsxDEV("input", { type: "file", className: "hidden", accept: "image/*", onChange: (e) => handleFileChange(e, 'exterior') }, void 0, false)] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-3", children: "가게 내관" }, void 0, false),
              _jsxDEV("div", { className: "relative group", children: [
                _jsxDEV("div", { className: "w-full aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-emerald-100 bg-gray-50 flex items-center justify-center", children:
                  formData.interiorPreview ?
                  _jsxDEV("img", { src: formData.interiorPreview, alt: "Interior Preview", className: "w-full h-full object-cover" }, void 0, false) :

                  _jsxDEV("span", { className: "text-gray-400 text-xs", children: "사진을 선택해 주세요" }, void 0, false) }, void 0, false

                ),
                _jsxDEV("label", { className: "absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl", children: [
                  _jsxDEV("span", { className: "text-white text-xs font-bold bg-emerald-500 px-4 py-2 rounded-full shadow-lg", children: "사진 변경" }, void 0, false),
                  _jsxDEV("input", { type: "file", className: "hidden", accept: "image/*", onChange: (e) => handleFileChange(e, 'interior') }, void 0, false)] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ),

        _jsxDEV("div", { className: "flex justify-end gap-3 mt-8", children: [
          _jsxDEV("button", {
            type: "button",
            onClick: () => navigate("/business-mypage"),
            className: "px-6 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors", children:
            "취소" }, void 0, false

          ),
          _jsxDEV("button", {
            type: "submit",
            disabled: isSubmitting || !isBizVerified,
            className: `px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-lg ${
            !isBizVerified ?
            'bg-gray-200 text-gray-400 cursor-not-allowed' :
            'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-100'}`, children:


            isSubmitting ? '저장 중...' : '저장하기' }, void 0, false
          )] }, void 0, true
        )] }, void 0, true
      ),

      _jsxDEV(PasswordChangeModal, {
        isOpen: isPwModalOpen,
        onClose: () => setIsPwModalOpen(false),
        form: passwordForm,
        errors: passwordErrors,
        onChange: handlePasswordChange,
        onSubmit: handlePasswordSubmit,
        isSubmitting: isPasswordSubmitting }, void 0, false
      )] }, void 0, true
    ));

};

function BusinessUpdateMyPage() {
  const { logout, user_type, user_nickname, bizname, selectedStoreSeq, setSelectedStore } = authStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('개인정보 수정');
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
          activeTab === '개인정보 수정' ?
          _jsxDEV(UserUpdateTab, {}, void 0, false) :

          _jsxDEV("div", { className: "bg-white border border-gray-100 rounded-lg p-12 text-center text-gray-400", children: [
            _jsxDEV("h2", { className: "font-bold text-lg mb-2", children: activeTab }, void 0, false),
            _jsxDEV("p", { children: "콘텐츠 준비 중입니다." }, void 0, false)] }, void 0, true
          ) }, void 0, false

        )] }, void 0, true
      ) }, void 0, false
    ));

}

export default BusinessUpdateMyPage;