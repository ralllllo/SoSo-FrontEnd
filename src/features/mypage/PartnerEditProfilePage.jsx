



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePartnerEditProfile } from './hooks/usePartnerEditProfile';
import authStore from '../../store/authStore';
import { AddPhotoBtn, EditField, PhotoSlot } from './components/PartnerEditProfileSection';import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";


const EditProfileTab = ({
  formData,
  passwordForm,
  errors,
  passwordErrors,
  isLoading,
  isSubmitting,
  isPasswordSubmitting,
  handleChange,
  handlePasswordChange,
  handleFileChange,
  handleRemovePhoto,
  handleAddressSearch,
  handleSubmit,
  handlePasswordSubmit,
  setIsModalOpen,
  exteriorInputRef,
  interiorInputRef
}) => {
  if (isLoading) {
    return (
      _jsxDEV("div", { className: "flex justify-center items-center p-20", children:
        _jsxDEV("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" }, void 0, false) }, void 0, false
      ));

  }

  return (
    _jsxDEV(_Fragment, { children:
      _jsxDEV("div", { className: "bg-white border border-emerald-100 rounded-lg p-8 shadow-sm", children: [
        _jsxDEV("h2", { className: "text-xl font-bold mb-2", children: "업체 정보 수정" }, void 0, false),
        _jsxDEV("p", { className: "text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4", children: "수정할 항목을 변경한 후 저장하세요." }, void 0, false),

        _jsxDEV("div", { className: "space-y-8", children: [

          _jsxDEV("div", { children: [
            _jsxDEV("h3", { className: "font-bold text-emerald-700 flex items-center gap-2 mb-4", children: "👤 기존 계정 정보 변경" }, void 0, false

            ),
            _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
              _jsxDEV(EditField, { label: "닉네임", name: "nickname", value: formData.nickname, onChange: handleChange, error: errors.nickname }, void 0, false),
              _jsxDEV(EditField, { label: "휴대전화", name: "phone", value: formData.phone, onChange: handleChange, error: errors.phone }, void 0, false),
              _jsxDEV(EditField, { label: "이메일", name: "email", value: formData.email, onChange: handleChange, error: errors.email }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("button", {
              onClick: () => setIsModalOpen(true),
              className: "mt-2 h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 flex items-center gap-2 hover:bg-gray-100 transition-colors", children: [

              _jsxDEV("span", { children: "✏️" }, void 0, false), " 비밀번호 변경하기 ", _jsxDEV("span", { children: "→" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "h-px bg-gray-100" }, void 0, false),


          _jsxDEV("div", { children: [
            _jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
              _jsxDEV("h3", { className: "font-bold text-emerald-700 flex items-center gap-2", children: "🏢 업체 정보 수정" }, void 0, false

              ),
              _jsxDEV("span", { className: "text-[10px] bg-gray-100 text-gray-400 px-2 py-1 rounded-full flex items-center gap-1 font-bold", children: "🔒 인증 데이터 잠금" }, void 0, false

              )] }, void 0, true
            ),
            _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
              _jsxDEV(EditField, { label: "사업자 번호", value: formData.bizNumber, disabled: true }, void 0, false),
              _jsxDEV(EditField, { label: "상호명", value: formData.companyName, disabled: true }, void 0, false),
              _jsxDEV(EditField, { label: "대표자명", value: formData.representativeName, disabled: true }, void 0, false),
              _jsxDEV(EditField, { label: "개업일자", value: formData.openingDate, disabled: true }, void 0, false)] }, void 0, true
            ),

            _jsxDEV("div", { className: "space-y-3", children: [
              _jsxDEV("label", { className: "text-xs font-bold text-gray-400 ml-1", children: "가게 주소" }, void 0, false),
              _jsxDEV("div", { className: "flex gap-2", children: [
                _jsxDEV("input", {
                  type: "text",
                  placeholder: "우편번호",
                  value: formData.zonecode,
                  readOnly: true,
                  className: "w-32 h-10 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm outline-none" }, void 0, false
                ),
                _jsxDEV("button", {
                  onClick: handleAddressSearch,
                  className: "h-10 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 flex items-center gap-2 hover:bg-gray-100 transition-colors", children:
                  "📍 주소 검색" }, void 0, false

                )] }, void 0, true
              ),
              _jsxDEV("input", {
                type: "text",
                placeholder: "도로명 주소 자동 입력",
                value: formData.address1,
                readOnly: true,
                className: "w-full h-10 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm text-gray-400 outline-none" }, void 0, false
              ),
              _jsxDEV("input", {
                type: "text",
                name: "address2",
                placeholder: "상세 주소 직접 입력",
                value: formData.address2,
                onChange: handleChange,
                className: "w-full h-10 bg-white border border-gray-200 rounded-xl px-4 text-sm outline-none focus:border-emerald-500 transition-colors" }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "h-px bg-gray-100" }, void 0, false),


          _jsxDEV("div", { children: [
            _jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
              _jsxDEV("h3", { className: "font-bold text-emerald-700 flex items-center gap-2", children: "🖼️ 가게 사진 편집" }, void 0, false

              ),
              _jsxDEV("span", { className: "text-[10px] text-emerald-600 font-bold", children: "📡 GCS 실시간 연동" }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
              _jsxDEV("div", { className: "flex flex-col gap-2", children: [
                _jsxDEV("input", {
                  type: "file",
                  className: "hidden",
                  ref: exteriorInputRef,
                  accept: "image/*",
                  onChange: (e) => handleFileChange(e, 'exterior') }, void 0, false
                ),
                formData.exteriorPreview ?
                _jsxDEV(PhotoSlot, {
                  label: "가게 외관",
                  preview: formData.exteriorPreview,
                  onRemove: () => handleRemovePhoto('exterior') }, void 0, false
                ) :

                _jsxDEV(AddPhotoBtn, { label: "가게 외관", onClick: () => exteriorInputRef.current?.click() }, void 0, false)] }, void 0, true

              ),
              _jsxDEV("div", { className: "flex flex-col gap-2", children: [
                _jsxDEV("input", {
                  type: "file",
                  className: "hidden",
                  ref: interiorInputRef,
                  accept: "image/*",
                  onChange: (e) => handleFileChange(e, 'interior') }, void 0, false
                ),
                formData.interiorPreview ?
                _jsxDEV(PhotoSlot, {
                  label: "가게 내부",
                  preview: formData.interiorPreview,
                  onRemove: () => handleRemovePhoto('interior') }, void 0, false
                ) :

                _jsxDEV(AddPhotoBtn, { label: "가게 내부", onClick: () => interiorInputRef.current?.click() }, void 0, false)] }, void 0, true

              )] }, void 0, true
            ),
            _jsxDEV("p", { className: "text-[10px] text-gray-400 mt-4 font-medium italic", children: "ℹ️ JPG, PNG만 가능 (외관/내부 각 1장)" }, void 0, false)] }, void 0, true
          ),


          _jsxDEV("div", { className: "pt-4", children:
            _jsxDEV("button", {
              onClick: handleSubmit,
              disabled: isSubmitting,
              className: "w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:bg-gray-300", children:

              isSubmitting ? '저장 중...' : '💾 변경 사항 저장' }, void 0, false
            ) }, void 0, false
          )] }, void 0, true
        )] }, void 0, true
      ) }, void 0, false
    ));

};

const PartnerEditProfilePage = () => {
  const { bizname } = authStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('업체 정보 수정');

  const {
    formData, passwordForm, errors, passwordErrors, isLoading, isSubmitting, isPasswordSubmitting,
    handleChange, handlePasswordChange, handleFileChange, handleRemovePhoto, handleAddressSearch,
    handleSubmit, handlePasswordSubmit
  } = usePartnerEditProfile();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const exteriorInputRef = React.useRef(null);
  const interiorInputRef = React.useRef(null);

  const menuGroups = [
  { title: '계정', items: ['업체 정보 확인', '업체 정보 수정', '회원 탈퇴'] },
  { title: '설정', items: ['스마트 알림 설정'] }];


  const onPasswordSubmit = async () => {
    const success = await handlePasswordSubmit();
    if (success) setIsModalOpen(false);
  };

  return (
    _jsxDEV("div", { className: "min-h-screen bg-[#FAFAFA] flex flex-col font-sans", children: [
      _jsxDEV("main", { className: "flex-grow w-full max-w-6xl mx-auto px-4 py-10 flex gap-8", children: [

        _jsxDEV("aside", { className: "w-64 shrink-0 flex flex-col gap-6", children: [
          _jsxDEV("div", { className: "bg-white border border-emerald-100 rounded-lg p-6 shadow-sm", children: [
            _jsxDEV("h2", { className: "font-bold text-gray-900", children: bizname || '거래처 업체' }, void 0, false),
            _jsxDEV("p", { className: "text-xs text-gray-500 mt-1", children: ["거래처 회원 ", formData.representativeName && `| ${formData.representativeName} 대표`] }, void 0, true)] }, void 0, true
          ),
          menuGroups.map((group) =>
          _jsxDEV("div", { children: [
            _jsxDEV("h4", { className: "text-xs font-bold text-gray-400 mb-2 px-2", children: group.title }, void 0, false),
            _jsxDEV("ul", { className: "flex flex-col gap-1", children:
              group.items.map((item) =>
              _jsxDEV("li", { children:
                _jsxDEV("button", {
                  onClick: () => {
                    if (item === '업체 정보 확인') navigate("/partner-info");else
                    if (item === '업체 정보 수정') navigate("/partner-edit");else
                    if (item === '회원 탈퇴') navigate("/partner-withdrawal");else
                    if (item === '스마트 알림 설정') navigate("/partner-notification");else
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
          activeTab === '업체 정보 수정' ?
          _jsxDEV(EditProfileTab, {
            formData: formData, passwordForm: passwordForm, errors: errors, passwordErrors: passwordErrors,
            isLoading: isLoading, isSubmitting: isSubmitting, isPasswordSubmitting: isPasswordSubmitting,
            handleChange: handleChange, handlePasswordChange: handlePasswordChange, handleFileChange: handleFileChange,
            handleRemovePhoto: handleRemovePhoto, handleAddressSearch: handleAddressSearch, handleSubmit: handleSubmit,
            handlePasswordSubmit: handlePasswordSubmit, setIsModalOpen: setIsModalOpen,
            exteriorInputRef: exteriorInputRef, interiorInputRef: interiorInputRef }, void 0, false
          ) :

          _jsxDEV("div", { className: "bg-white border border-gray-100 rounded-lg p-12 text-center text-gray-400", children: [
            _jsxDEV("h2", { className: "font-bold text-lg mb-2", children: activeTab }, void 0, false),
            _jsxDEV("p", { children: "콘텐츠 준비 중입니다." }, void 0, false)] }, void 0, true
          ) }, void 0, false

        )] }, void 0, true
      ),


      isModalOpen &&
      _jsxDEV("div", { className: "fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4", children:
        _jsxDEV("div", { className: "bg-white w-full max-w-[360px] rounded-3xl p-6 animate-fade-in-up", children: [
          _jsxDEV("div", { className: "flex justify-between items-center mb-6", children: [
            _jsxDEV("h3", { className: "text-lg font-bold text-gray-900", children: "비밀번호 변경" }, void 0, false),
            _jsxDEV("button", { onClick: () => setIsModalOpen(false), className: "text-gray-400 hover:text-gray-600 text-xl", children: "×" }, void 0, false)] }, void 0, true
          ),

          _jsxDEV("div", { className: "space-y-4", children: [
            _jsxDEV(EditField, { label: "현재 비밀번호", type: "password", name: "currentPassword", value: passwordForm.currentPassword, onChange: handlePasswordChange, placeholder: "현재 비밀번호 입력", error: passwordErrors.currentPassword }, void 0, false),
            _jsxDEV(EditField, { label: "새 비밀번호", type: "password", name: "newPassword", value: passwordForm.newPassword, onChange: handlePasswordChange, placeholder: "새 비밀번호 입력", error: passwordErrors.newPassword }, void 0, false),
            _jsxDEV(EditField, { label: "새 비밀번호 확인", type: "password", name: "confirmPassword", value: passwordForm.confirmPassword, onChange: handlePasswordChange, placeholder: "새 비밀번호 재입력", error: passwordErrors.confirmPassword }, void 0, false)] }, void 0, true
          ),

          _jsxDEV("div", { className: "flex gap-3 mt-8", children: [
            _jsxDEV("button", { onClick: () => setIsModalOpen(false), className: "flex-1 h-11 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition-colors", children: "취소" }, void 0, false),
            _jsxDEV("button", { onClick: onPasswordSubmit, disabled: isPasswordSubmitting, className: "flex-1 h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors disabled:bg-gray-300", children:
              isPasswordSubmitting ? '변경 중...' : '확인' }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        ) }, void 0, false
      )] }, void 0, true

    ));

};

export default PartnerEditProfilePage;