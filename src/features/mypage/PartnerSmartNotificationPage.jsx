



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePartnerSmartNotification } from './hooks/usePartnerSmartNotification';
import { usePartnerInfo } from './hooks/usePartnerInfo';
import authStore from '../../store/authStore';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";


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


const NotificationRow = ({ title, desc, isOn, onToggle, disabled }) =>
_jsxDEV("div", { className: `flex items-center justify-between py-1 transition-opacity ${disabled ? 'opacity-40 pointer-events-none' : 'opacity-100'}`, children: [
  _jsxDEV("div", { className: "flex-1 pr-4", children: [
    _jsxDEV("h4", { className: "text-sm font-bold text-gray-800", children: title }, void 0, false),
    _jsxDEV("p", { className: "text-[11px] text-gray-400 mt-0.5 leading-relaxed", children: desc }, void 0, false)] }, void 0, true
  ),
  _jsxDEV(ToggleSwitch, { isOn: isOn, onToggle: onToggle }, void 0, false)] }, void 0, true
);



const NotificationTab = ({ settings, isSubmitting, toggleSetting, handleSave }) => {
  return (
    _jsxDEV("div", { className: "bg-white border border-emerald-100 rounded-lg p-8 shadow-sm", children: [
      _jsxDEV("h2", { className: "text-xl font-bold mb-2", children: "스마트 알림 설정" }, void 0, false),
      _jsxDEV("p", { className: "text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4", children: "꼭 필요한 소식만 스마트하게 받아보세요." }, void 0, false),

      _jsxDEV("div", { className: "space-y-6", children: [

        _jsxDEV("div", { className: "bg-emerald-600 rounded-2xl p-6 shadow-md shadow-emerald-100 flex items-center justify-between transition-all active:scale-[0.99]", children: [
          _jsxDEV("div", { className: "text-white", children: [
            _jsxDEV("h3", { className: "font-bold text-lg", children: "전체 푸시 알림" }, void 0, false),
            _jsxDEV("p", { className: "text-emerald-50 text-xs mt-1", children: "앱에서 보내는 모든 알림을 제어합니다." }, void 0, false)] }, void 0, true
          ),
          _jsxDEV(ToggleSwitch, {
            isOn: settings.pushEnabled,
            onToggle: () => toggleSetting('pushEnabled'),
            theme: "white" }, void 0, false
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "bg-white rounded-2xl border border-gray-100 p-6 shadow-sm", children: [
          _jsxDEV("div", { className: "flex items-center gap-2 text-gray-800 font-bold mb-4", children: [
            _jsxDEV("span", { className: "text-emerald-600", children: "🔔" }, void 0, false), "서비스별 세부 설정"] }, void 0, true

          ),
          _jsxDEV("div", { className: "space-y-4", children: [
            _jsxDEV(NotificationRow, {
              title: "주문 상태 알림",
              desc: "주문 접수, 배송 시작 등 상태 변화를 알려드려요.",
              isOn: settings.orderAlert,
              onToggle: () => toggleSetting('orderAlert'),
              disabled: !settings.pushEnabled }, void 0, false
            ),

            _jsxDEV(NotificationRow, {
              title: "재고 부족 알림",
              desc: "즐겨찾는 상품의 재고가 부족할 때 알려드려요.",
              isOn: settings.stockAlert,
              onToggle: () => toggleSetting('stockAlert'),
              disabled: !settings.pushEnabled }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "bg-white rounded-2xl border border-gray-100 p-6 shadow-sm", children: [
          _jsxDEV("div", { className: "flex items-center gap-2 text-gray-800 font-bold mb-4", children: [
            _jsxDEV("span", { className: "text-emerald-600", children: "🎁" }, void 0, false), "혜택 및 에티켓 설정"] }, void 0, true

          ),
          _jsxDEV("div", { className: "space-y-4", children: [
            _jsxDEV(NotificationRow, {
              title: "마케팅 혜택 알림",
              desc: "할인 쿠폰, 특가 상품 등 다양한 혜택을 알려드려요.",
              isOn: settings.marketingAlert,
              onToggle: () => toggleSetting('marketingAlert'),
              disabled: !settings.pushEnabled }, void 0, false
            ),
            _jsxDEV(NotificationRow, {
              title: "야간 수신 제한",
              desc: "밤 9시 ~ 아침 8시 사이에는 알림을 받지 않습니다.",
              isOn: settings.nightAlert,
              onToggle: () => toggleSetting('nightAlert'),
              disabled: !settings.pushEnabled }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "pt-4", children:
          _jsxDEV("button", {
            onClick: handleSave,
            disabled: isSubmitting,
            className: "w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:bg-gray-300", children:

            isSubmitting ? '저장 중...' : '💾 설정 완료' }, void 0, false
          ) }, void 0, false
        )] }, void 0, true
      )] }, void 0, true
    ));

};

const PartnerSmartNotificationPage = () => {
  const { bizname } = authStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('스마트 알림 설정');

  const partnerInfo = usePartnerInfo();
  const ceoName = partnerInfo.profile?.repName || partnerInfo.profile?.ceoName || '';

  const { settings, isSubmitting, toggleSetting, handleSave } = usePartnerSmartNotification();

  const menuGroups = [
  { title: '계정', items: ['업체 정보 확인', '업체 정보 수정', '회원 탈퇴'] },
  { title: '설정', items: ['스마트 알림 설정'] }];


  return (
    _jsxDEV("div", { className: "min-h-screen bg-[#FAFAFA] flex flex-col font-sans", children:
      _jsxDEV("main", { className: "flex-grow w-full max-w-6xl mx-auto px-4 py-10 flex gap-8", children: [

        _jsxDEV("aside", { className: "w-64 shrink-0 flex flex-col gap-6", children: [
          _jsxDEV("div", { className: "bg-white border border-emerald-100 rounded-lg p-6 shadow-sm", children: [
            _jsxDEV("h2", { className: "font-bold text-gray-900", children: bizname || '거래처 업체' }, void 0, false),
            _jsxDEV("p", { className: "text-xs text-gray-500 mt-1", children: ["거래처 회원 ", ceoName && `| ${ceoName} 대표`] }, void 0, true)] }, void 0, true
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
          activeTab === '스마트 알림 설정' ?
          _jsxDEV(NotificationTab, {
            settings: settings, isSubmitting: isSubmitting, toggleSetting: toggleSetting, handleSave: handleSave }, void 0, false
          ) :

          _jsxDEV("div", { className: "bg-white border border-gray-100 rounded-lg p-12 text-center text-gray-400", children: [
            _jsxDEV("h2", { className: "font-bold text-lg mb-2", children: activeTab }, void 0, false),
            _jsxDEV("p", { children: "콘텐츠 준비 중입니다." }, void 0, false)] }, void 0, true
          ) }, void 0, false

        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default PartnerSmartNotificationPage;