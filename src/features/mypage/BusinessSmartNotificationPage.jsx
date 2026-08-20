




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/soso로고.png";
import authStore from "../../store/authStore";
import { useBusinessSmartNotification } from './hooks/useBusinessSmartNotification';
import { useStores } from '../../hooks/useStores';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";




const NotificationRow = ({ title, desc, isOn, onToggle, disabled }) =>
_jsxDEV("div", { className: `flex items-center justify-between py-5 border-b border-gray-50 last:border-0 transition-opacity ${disabled ? 'opacity-40 pointer-events-none' : 'opacity-100'}`, children: [
  _jsxDEV("div", { className: "flex-1 pr-4", children: [
    _jsxDEV("h4", { className: "text-sm font-bold text-gray-800", children: title }, void 0, false),
    _jsxDEV("p", { className: "text-xs text-gray-400 mt-1 leading-relaxed", children: desc }, void 0, false)] }, void 0, true
  ),
  _jsxDEV(ToggleSwitch, { isOn: isOn, onToggle: onToggle }, void 0, false)] }, void 0, true
);





const ToggleSwitch = ({ isOn, onToggle, theme = "emerald" }) => {
  const bgColor = theme === "white" ?
  isOn ? "bg-white" : "bg-emerald-700" :
  isOn ? "bg-emerald-500" : "bg-gray-200";

  const circleColor = theme === "white" ?
  isOn ? "bg-emerald-600" : "bg-emerald-200" :
  "bg-white";

  return (
    _jsxDEV("div", {
      onClick: onToggle,
      className: `relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ${bgColor}`, children:

      _jsxDEV("div", {
        className: `absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-200 shadow-sm ${circleColor} ${
        isOn ? 'translate-x-6' : 'translate-x-0'}` }, void 0, false

      ) }, void 0, false
    ));

};

const SmartNotificationTab = () => {
  const { settings, isSubmitting, toggleSetting, handleSave } = useBusinessSmartNotification();

  return (
    _jsxDEV("div", { className: "bg-white border border-emerald-100 rounded-lg p-8 shadow-sm", children: [
      _jsxDEV("h2", { className: "text-xl font-bold mb-2", children: "스마트 알림 설정" }, void 0, false),
      _jsxDEV("p", { className: "text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4", children: "사장님에게 꼭 필요한 소식만 골라서 알려드립니다." }, void 0, false),

      _jsxDEV("div", { className: "space-y-8", children: [

        _jsxDEV("div", { className: "bg-emerald-600 rounded-2xl p-6 shadow-lg shadow-emerald-100 flex items-center justify-between text-white", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("h3", { className: "font-bold text-lg", children: "전체 푸시 알림" }, void 0, false),
            _jsxDEV("p", { className: "text-emerald-50 text-xs mt-1", children: "앱에서 보내는 모든 스마트 알림을 켜거나 끕니다." }, void 0, false)] }, void 0, true
          ),
          _jsxDEV(ToggleSwitch, {
            isOn: settings.pushEnabled,
            onToggle: () => toggleSetting('pushEnabled'),
            theme: "white" }, void 0, false
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "space-y-6", children: [
          _jsxDEV("h3", { className: "font-bold text-gray-800 flex items-center gap-2 text-base", children: [
            _jsxDEV("span", { className: "w-1.5 h-6 bg-emerald-500 rounded-full inline-block" }, void 0, false), "서비스별 상세 알림"] }, void 0, true

          ),

          _jsxDEV("div", { className: "bg-gray-50/50 rounded-2xl p-6 border border-gray-100", children: [
            _jsxDEV(NotificationRow, {
              title: "발주 및 배송 알림",
              desc: "식자재 발주 확인, 배송 시작 등 물류 상태를 실시간으로 알려드려요.",
              isOn: settings.orderAlert,
              onToggle: () => toggleSetting('orderAlert'),
              disabled: !settings.pushEnabled }, void 0, false
            ),

            _jsxDEV(NotificationRow, {
              title: "재고 부족 알림",
              desc: "설정해둔 안전 재고 수량보다 적어지면 즉시 알려드려요.",
              isOn: settings.stockAlert,
              onToggle: () => toggleSetting('stockAlert'),
              disabled: !settings.pushEnabled }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "space-y-6", children: [
          _jsxDEV("h3", { className: "font-bold text-gray-800 flex items-center gap-2 text-base", children: [
            _jsxDEV("span", { className: "w-1.5 h-6 bg-emerald-500 rounded-full inline-block" }, void 0, false), "혜택 및 에티켓 설정"] }, void 0, true

          ),

          _jsxDEV("div", { className: "bg-gray-50/50 rounded-2xl p-6 border border-gray-100", children: [
            _jsxDEV(NotificationRow, {
              title: "이벤트 및 마케팅 알림",
              desc: "SoSo에서 제공하는 공동 발주 특가, 할인 쿠폰 소식을 알려드려요.",
              isOn: settings.marketingAlert,
              onToggle: () => toggleSetting('marketingAlert'),
              disabled: !settings.pushEnabled }, void 0, false
            ),
            _jsxDEV(NotificationRow, {
              title: "야간 수신 제한 (매너 타임)",
              desc: "밤 9시부터 다음 날 아침 8시까지는 모든 알림을 소리 없이 보관함에만 저장해요.",
              isOn: settings.nightAlert,
              onToggle: () => toggleSetting('nightAlert'),
              disabled: !settings.pushEnabled }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ),

      _jsxDEV("div", { className: "mt-12 pt-8 border-t border-gray-50 flex justify-end", children:
        _jsxDEV("button", {
          onClick: handleSave,
          disabled: isSubmitting,
          className: "px-10 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-100 transition-all active:scale-[0.98] disabled:bg-gray-300", children:

          isSubmitting ? '설정 저장 중...' : '💾 알림 설정 저장하기' }, void 0, false
        ) }, void 0, false
      )] }, void 0, true
    ));

};

function BusinessSmartNotificationPage() {
  const { logout, user_type, user_nickname, bizname, selectedStoreSeq, setSelectedStore } = authStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('스마트 알림 설정');
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
          activeTab === '스마트 알림 설정' ?
          _jsxDEV(SmartNotificationTab, {}, void 0, false) :

          _jsxDEV("div", { className: "bg-white border border-gray-100 rounded-lg p-12 text-center text-gray-400", children: [
            _jsxDEV("h2", { className: "font-bold text-lg mb-2", children: activeTab }, void 0, false),
            _jsxDEV("p", { children: "콘텐츠 준비 중입니다." }, void 0, false)] }, void 0, true
          ) }, void 0, false

        )] }, void 0, true
      ) }, void 0, false
    ));

}

export default BusinessSmartNotificationPage;