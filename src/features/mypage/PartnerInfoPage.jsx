





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authStore from "../../store/authStore";
import { usePartnerInfo } from './hooks/usePartnerInfo';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";


const UserProfileTab = ({ profile, isLoading, error, formattedDate, formattedOpeningDate, fullAddress, storeImg1, storeImg2 }) => {
  if (isLoading) return _jsxDEV("div", { className: "p-8 text-center text-gray-500", children: "정보를 불러오는 중입니다..." }, void 0, false);
  if (error) return _jsxDEV("div", { className: "p-8 text-center text-red-500", children: "정보를 불러오는데 실패했습니다." }, void 0, false);


  const userData = {
    id: profile?.userId || '정보 없음',
    nickname: profile?.nickname || '정보 없음',
    name: profile?.name || '정보 없음',
    joinDate: formattedDate,
    phone: profile?.phone || '정보 없음',
    email: profile?.email || '정보 없음',
    bizNumber: profile?.bizNumber?.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3') || '정보 없음',
    bizName: profile?.companyName || '정보 없음',
    ceoName: profile?.repName || profile?.ceoName || '정보 없음',
    address: fullAddress,
    openDate: formattedOpeningDate
  };

  return (
    _jsxDEV("div", { className: "bg-white border border-emerald-100 rounded-lg p-8 shadow-sm", children: [
      _jsxDEV("h2", { className: "text-xl font-bold mb-2", children: "업체 정보 확인" }, void 0, false),
      _jsxDEV("p", { className: "text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4", children: "가입 시 등록된 마이페이지 상세 정보를 확인합니다." }, void 0, false),


      _jsxDEV("div", { className: "mb-10", children: [
        _jsxDEV("h3", { className: "font-bold text-emerald-700 flex items-center gap-2 mb-4", children: "기본 계정 정보" }, void 0, false

        ),
        _jsxDEV("div", { className: "grid grid-cols-2 gap-x-6 gap-y-6 text-sm", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "아이디" }, void 0, false),
            _jsxDEV("div", { className: "p-2 border-b", children: userData.id }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "닉네임" }, void 0, false),
            _jsxDEV("div", { className: "p-2 border-b", children: userData.nickname }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "이름 (서비스 실명)" }, void 0, false),
            _jsxDEV("div", { className: "p-2 border-b", children: userData.name }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "가입 일자" }, void 0, false),
            _jsxDEV("div", { className: "p-2 border-b", children: userData.joinDate }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "휴대전화" }, void 0, false),
            _jsxDEV("div", { className: "p-2 border-b", children: userData.phone }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "이메일" }, void 0, false),
            _jsxDEV("div", { className: "p-2 border-b", children: userData.email }, void 0, false)] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ),


      _jsxDEV("div", { className: "mb-10", children: [
        _jsxDEV("h3", { className: "font-bold text-emerald-700 flex items-center gap-2 mb-4", children: "사업자 정보" }, void 0, false

        ),
        _jsxDEV("div", { className: "grid grid-cols-2 gap-x-6 gap-y-6 text-sm", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "대표자명 (실명)" }, void 0, false),
            _jsxDEV("div", { className: "p-2 border-b", children: userData.ceoName }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "사업자 번호" }, void 0, false),
            _jsxDEV("div", { className: "p-2 border-b", children: userData.bizNumber }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "상호명" }, void 0, false),
            _jsxDEV("div", { className: "p-2 border-b", children: userData.bizName }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "개업일자" }, void 0, false),
            _jsxDEV("div", { className: "p-2 border-b", children: userData.openDate }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { className: "col-span-2", children: [
            _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-1", children: "가게 주소" }, void 0, false),
            _jsxDEV("div", { className: "p-2 border-b", children: userData.address }, void 0, false)] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ),


      _jsxDEV("div", { children: [
        _jsxDEV("h3", { className: "font-bold text-emerald-700 flex items-center gap-2 mb-4", children: "가게 사진" }, void 0, false

        ),
        _jsxDEV("div", { className: "grid grid-cols-2 gap-6", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-2", children: "가게 외관" }, void 0, false),
            _jsxDEV("div", { className: "w-full aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center text-4xl", children:
              storeImg1 ? _jsxDEV("img", { src: storeImg1, alt: "가게 외관", className: "w-full h-full object-cover" }, void 0, false) : '🏢' }, void 0, false
            )] }, void 0, true
          ),
          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: "block text-xs font-semibold text-gray-500 mb-2", children: "가게 내관" }, void 0, false),
            _jsxDEV("div", { className: "w-full aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center text-4xl", children:
              storeImg2 ? _jsxDEV("img", { src: storeImg2, alt: "가게 내관", className: "w-full h-full object-cover" }, void 0, false) : '🏪' }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      )] }, void 0, true
    ));

};

const PartnerInfoPage = () => {
  const { bizname } = authStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('업체 정보 확인');

  const partnerInfo = usePartnerInfo();
  const ceoName = partnerInfo.profile?.repName || partnerInfo.profile?.ceoName || '';


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
          activeTab === '업체 정보 확인' ?
          _jsxDEV(UserProfileTab, { ...partnerInfo }, void 0, false) :

          _jsxDEV("div", { className: "bg-white border border-gray-100 rounded-lg p-12 text-center text-gray-400", children: [
            _jsxDEV("h2", { className: "font-bold text-lg mb-2", children: activeTab }, void 0, false),
            _jsxDEV("p", { children: "콘텐츠 준비 중입니다." }, void 0, false)] }, void 0, true
          ) }, void 0, false

        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default PartnerInfoPage;