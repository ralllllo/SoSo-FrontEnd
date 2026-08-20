



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePartnerWithdrawal } from './hooks/usePartnerWithdrawal';
import { usePartnerInfo } from './hooks/usePartnerInfo';
import authStore from '../../store/authStore';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";


const WithdrawalTab = ({
  reason,
  setReason,
  customReason,
  setCustomReason,
  isChecked,
  setIsChecked,
  isSubmitting,
  reasons,
  handleWithdrawal
}) => {
  return (
    _jsxDEV("div", { className: "bg-white border border-emerald-100 rounded-lg p-8 shadow-sm", children: [
      _jsxDEV("h2", { className: "text-xl font-bold mb-2", children: "회원 탈퇴" }, void 0, false),
      _jsxDEV("p", { className: "text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4", children: "SoSo 서비스를 탈퇴하시기 전 아래 내용을 확인해 주세요." }, void 0, false),

      _jsxDEV("div", { className: "space-y-8", children: [

        _jsxDEV("div", { className: "bg-white rounded-xl border border-red-100 p-6 shadow-sm", children: [
          _jsxDEV("div", { className: "flex items-center gap-2 text-red-600 font-bold mb-4", children: [
            _jsxDEV("span", { children: "⚠️" }, void 0, false), "탈퇴 시 유의사항"] }, void 0, true

          ),
          _jsxDEV("ul", { className: "text-sm text-gray-600 space-y-3 list-disc pl-4", children: [
            _jsxDEV("li", { children: "탈퇴 시 계정 정보 및 SoSo에서 제공하는 모든 서비스 이용 기록이 즉시 삭제됩니다." }, void 0, false),
            _jsxDEV("li", { children: "진행 중인 거래 건이 있는 경우 탈퇴가 불가능할 수 있으니 확인 후 진행해 주세요." }, void 0, false),
            _jsxDEV("li", { children: "탈퇴한 계정의 데이터(거래 내역, 업체 정보 등)는 복구가 불가능합니다." }, void 0, false),
            _jsxDEV("li", { children: "관련 법령에 따라 일정 기간 보관이 필요한 정보는 별도로 보관될 수 있습니다." }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { children: [
          _jsxDEV("div", { className: "flex items-center gap-2 text-gray-800 font-bold mb-4", children: [
            _jsxDEV("span", { className: "text-emerald-600", children: "📝" }, void 0, false), "탈퇴하시는 사유가 무엇인가요?"] }, void 0, true

          ),
          _jsxDEV("div", { className: "space-y-3", children:
            reasons.map((r) =>
            _jsxDEV("label", { className: "flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors", children: [
              _jsxDEV("input", {
                type: "radio",
                name: "reason",
                value: r,
                checked: reason === r,
                onChange: (e) => setReason(e.target.value),
                className: "w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300" }, void 0, false
              ),
              _jsxDEV("span", { className: "text-sm font-medium text-gray-700", children: r }, void 0, false)] }, r, true
            )
            ) }, void 0, false
          ),

          reason === '기타 (직접 입력)' &&
          _jsxDEV("textarea", {
            placeholder: "사유를 입력해 주세요.",
            value: customReason,
            onChange: (e) => setCustomReason(e.target.value),
            className: "w-full mt-4 p-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 min-h-[100px] transition-colors" }, void 0, false
          )] }, void 0, true

        ),


        _jsxDEV("div", { className: "pt-4 flex flex-col gap-4", children: [
          _jsxDEV("label", { className: "flex items-center gap-2 cursor-pointer group px-1", children: [
            _jsxDEV("input", {
              type: "checkbox",
              checked: isChecked,
              onChange: (e) => setIsChecked(e.target.checked),
              className: "w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" }, void 0, false
            ),
            _jsxDEV("span", { className: "text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors", children: "안내사항을 모두 확인하였으며, 이에 동의합니다." }, void 0, false

            )] }, void 0, true
          ),

          _jsxDEV("button", {
            onClick: handleWithdrawal,
            disabled: isSubmitting || !isChecked || !reason,
            className: `w-full h-12 rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] ${
            isChecked && reason && !isSubmitting ?
            'bg-red-500 hover:bg-red-600 text-white' :
            'bg-gray-200 text-gray-400 cursor-not-allowed'}`, children:


            isSubmitting ? '탈퇴 처리 중...' : '👤 회원 탈퇴하기' }, void 0, false
          )] }, void 0, true
        )] }, void 0, true
      )] }, void 0, true
    ));

};

const PartnerWithdrawalPage = () => {
  const { bizname } = authStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('회원 탈퇴');

  const partnerInfo = usePartnerInfo();
  const ceoName = partnerInfo.profile?.repName || partnerInfo.profile?.ceoName || '';

  const {
    reason, setReason, customReason, setCustomReason, isChecked, setIsChecked,
    isSubmitting, reasons, handleWithdrawal
  } = usePartnerWithdrawal();

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
          activeTab === '회원 탈퇴' ?
          _jsxDEV(WithdrawalTab, {
            reason: reason, setReason: setReason, customReason: customReason, setCustomReason: setCustomReason,
            isChecked: isChecked, setIsChecked: setIsChecked, isSubmitting: isSubmitting,
            reasons: reasons, handleWithdrawal: handleWithdrawal }, void 0, false
          ) :

          _jsxDEV("div", { className: "bg-white border border-gray-100 rounded-lg p-12 text-center text-gray-400", children: [
            _jsxDEV("h2", { className: "font-bold text-lg mb-2", children: activeTab }, void 0, false),
            _jsxDEV("p", { children: "콘텐츠 준비 중입니다." }, void 0, false)] }, void 0, true
          ) }, void 0, false

        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default PartnerWithdrawalPage;