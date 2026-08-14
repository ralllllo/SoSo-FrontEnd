



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/soso로고.png";
import authStore from "../../store/authStore";
import { useBusinessWithdrawal } from './hooks/useBusinessWithdrawal';

const WithdrawalSection = () => {
  const navigate = useNavigate();
  const {
    reason,
    setReason,
    customReason,
    setCustomReason,
    isChecked,
    setIsChecked,
    isSubmitting,
    reasons,
    handleWithdrawal
  } = useBusinessWithdrawal();

  return (
    _jsxDEV("div", { className: "bg-white border border-red-100 rounded-lg p-8 shadow-sm", children: [
      _jsxDEV("div", { className: "flex justify-between items-center mb-2", children: [
        _jsxDEV("h2", { className: "text-xl font-bold text-gray-900", children: "회원 탈퇴" }, void 0, false),
        _jsxDEV("span", { className: "px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full", children: "주의 사항 확인 필수" }, void 0, false)] }, void 0, true
      ),
      _jsxDEV("p", { className: "text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4", children: "SoSo 서비스를 탈퇴하시기 전 아래 내용을 확인해 주세요." }, void 0, false),

      _jsxDEV("div", { className: "space-y-8", children: [

        _jsxDEV("div", { className: "bg-red-50/30 rounded-2xl p-6 border border-red-100", children: [
          _jsxDEV("h3", { className: "font-bold text-red-700 flex items-center gap-2 mb-4 text-base", children: [
            _jsxDEV("span", { className: "w-1.5 h-6 bg-red-500 rounded-full inline-block" }, void 0, false), "탈퇴 시 유의사항"] }, void 0, true

          ),
          _jsxDEV("ul", { className: "text-sm text-gray-600 space-y-3 list-disc pl-5", children: [
            _jsxDEV("li", { children: "탈퇴 시 계정 정보 및 SoSo에서 제공하는 모든 서비스 이용 기록이 즉시 삭제됩니다." }, void 0, false),
            _jsxDEV("li", { children: "진행 중인 발주, 수금 건이 있는 경우 탈퇴가 불가능할 수 있으니 확인 후 진행해 주세요." }, void 0, false),
            _jsxDEV("li", { children: "탈퇴한 계정의 데이터(매장 정보, 통계 데이터 등)는 복구가 불가능합니다." }, void 0, false),
            _jsxDEV("li", { children: "관련 법령에 따라 일정 기간 보관이 필요한 정보는 별도로 보관될 수 있습니다." }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { children: [
          _jsxDEV("h3", { className: "font-bold text-gray-800 flex items-center gap-2 mb-6 text-base", children: [
            _jsxDEV("span", { className: "w-1.5 h-6 bg-emerald-500 rounded-full inline-block" }, void 0, false), "탈퇴 사유 선택"] }, void 0, true

          ),
          _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children:
            reasons.map((r) =>
            _jsxDEV("label", {

              className: `flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
              reason === r ?
              'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' :
              'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100'}`, children: [


              _jsxDEV("input", {
                type: "radio",
                name: "reason",
                value: r,
                checked: reason === r,
                onChange: (e) => setReason(e.target.value),
                className: "w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300" }, void 0, false
              ),
              _jsxDEV("span", { className: "text-sm font-medium", children: r }, void 0, false)] }, r, true
            )
            ) }, void 0, false
          ),

          reason === '기타 (직접 입력)' &&
          _jsxDEV("textarea", {
            placeholder: "탈퇴하시는 사유를 상세히 적어주시면 서비스 개선에 큰 도움이 됩니다.",
            value: customReason,
            onChange: (e) => setCustomReason(e.target.value),
            className: "w-full mt-4 p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:bg-white focus:border-emerald-500 min-h-[120px] transition-all" }, void 0, false
          )] }, void 0, true

        ),


        _jsxDEV("div", { className: "pt-6 border-t border-gray-50", children: [
          _jsxDEV("label", { className: "flex items-center gap-3 cursor-pointer group mb-8", children: [
            _jsxDEV("input", {
              type: "checkbox",
              checked: isChecked,
              onChange: (e) => setIsChecked(e.target.checked),
              className: "w-6 h-6 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded-lg cursor-pointer" }, void 0, false
            ),
            _jsxDEV("span", { className: "text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors", children: "안내사항을 모두 확인하였으며, 이에 동의합니다." }, void 0, false

            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "flex justify-end gap-3", children: [
            _jsxDEV("button", {
              type: "button",
              onClick: () => navigate("/business-mypage"),
              className: "px-8 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors", children:
              "취소" }, void 0, false

            ),
            _jsxDEV("button", {
              type: "button",
              onClick: handleWithdrawal,
              disabled: isSubmitting || !isChecked || !reason,
              className: `px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95 ${
              isChecked && reason && !isSubmitting ?
              'bg-red-500 text-white hover:bg-red-600 shadow-red-100' :
              'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`, children:


              isSubmitting ? '탈퇴 처리 중...' : '회원 탈퇴하기' }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      )] }, void 0, true
    ));

};

import { useStores } from '../../hooks/useStores';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

function BusinessWithdrawalPage() {
  const { logout, user_type, user_nickname, bizname, selectedStoreSeq, setSelectedStore } = authStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('회원 탈퇴');
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
          activeTab === '회원 탈퇴' ?
          _jsxDEV(WithdrawalSection, {}, void 0, false) :

          _jsxDEV("div", { className: "bg-white border border-gray-100 rounded-lg p-12 text-center text-gray-400", children: [
            _jsxDEV("h2", { className: "font-bold text-lg mb-2", children: activeTab }, void 0, false),
            _jsxDEV("p", { children: "콘텐츠 준비 중입니다." }, void 0, false)] }, void 0, true
          ) }, void 0, false

        )] }, void 0, true
      ) }, void 0, false
    ));

}

export default BusinessWithdrawalPage;