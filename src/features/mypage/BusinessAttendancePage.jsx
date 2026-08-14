



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/soso로고.png";
import authStore from "../../store/authStore";
import { useBusinessAttendance } from './hooks/useBusinessAttendance';
import EmployeeRegisterModal from './components/EmployeeRegisterModal';
import AttendanceHistoryModal from './components/AttendanceHistoryModal';

const AttendanceSection = () => {
  const {
    staffList,
    isLoading,
    handleRegisterStaff,
    handleCheckIn,
    handleCheckOut
  } = useBusinessAttendance();

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  if (isLoading) return _jsxDEV("div", { className: "p-12 text-center text-gray-400", children: "근태 정보를 불러오는 중입니다..." }, void 0, false);

  const todayStr = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return (
    _jsxDEV("div", { className: "bg-white border border-emerald-100 rounded-lg p-8 shadow-sm", children: [
      _jsxDEV("div", { className: "flex justify-between items-center mb-2", children: [
        _jsxDEV("h2", { className: "text-xl font-bold text-gray-900", children: "직원 근태 관리" }, void 0, false),
        _jsxDEV("div", { className: "flex gap-2", children: [
          _jsxDEV("span", { className: "px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full", children: "실시간 현황" }, void 0, false),
          _jsxDEV("span", { className: "px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-full", children: todayStr }, void 0, false)] }, void 0, true
        )] }, void 0, true
      ),
      _jsxDEV("p", { className: "text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4", children: "매장 직원들의 출퇴근 기록 및 근무 상태를 관리합니다." }, void 0, false),


      _jsxDEV("div", { className: "grid grid-cols-3 gap-4 mb-8", children: [
        _jsxDEV("div", { className: "bg-emerald-50 p-4 rounded-2xl border border-emerald-100", children: [
          _jsxDEV("p", { className: "text-xs text-emerald-600 font-bold mb-1", children: "등록 직원" }, void 0, false),
          _jsxDEV("p", { className: "text-2xl font-black text-emerald-700", children: [staffList.length, "명"] }, void 0, true)] }, void 0, true
        ),
        _jsxDEV("div", { className: "bg-blue-50 p-4 rounded-2xl border border-blue-100", children: [
          _jsxDEV("p", { className: "text-xs text-blue-600 font-bold mb-1", children: "현재 출근" }, void 0, false),
          _jsxDEV("p", { className: "text-2xl font-black text-blue-700", children: [staffList.filter((s) => s.status === 'WORK').length, "명"] }, void 0, true)] }, void 0, true
        ),
        _jsxDEV("div", { className: "bg-orange-50 p-4 rounded-2xl border border-orange-100", children: [
          _jsxDEV("p", { className: "text-xs text-orange-600 font-bold mb-1", children: "현재 퇴근" }, void 0, false),
          _jsxDEV("p", { className: "text-2xl font-black text-orange-700", children: [staffList.filter((s) => s.status === 'LEAVE').length, "명"] }, void 0, true)] }, void 0, true
        )] }, void 0, true
      ),


      _jsxDEV("div", { className: "overflow-x-auto", children:
        _jsxDEV("table", { className: "w-full text-sm", children: [
          _jsxDEV("thead", { children:
            _jsxDEV("tr", { className: "bg-gray-50 text-gray-500 font-bold text-xs uppercase tracking-wider", children: [
              _jsxDEV("th", { className: "px-4 py-3 text-left rounded-l-xl", children: "직원명" }, void 0, false),
              _jsxDEV("th", { className: "px-4 py-3 text-left", children: "연락처" }, void 0, false),
              _jsxDEV("th", { className: "px-4 py-3 text-left", children: "근무 상태" }, void 0, false),
              _jsxDEV("th", { className: "px-4 py-3 text-left", children: "지정 출근" }, void 0, false),
              _jsxDEV("th", { className: "px-4 py-3 text-left", children: "지정 퇴근" }, void 0, false),
              _jsxDEV("th", { className: "px-4 py-3 text-center", children: "출퇴근 처리" }, void 0, false),
              _jsxDEV("th", { className: "px-4 py-3 text-center rounded-r-xl", children: "근태 이력" }, void 0, false)] }, void 0, true
            ) }, void 0, false
          ),
          _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
            staffList.length === 0 ?
            _jsxDEV("tr", { children:
              _jsxDEV("td", { colSpan: "7", className: "px-4 py-12 text-center text-gray-400 text-sm", children: "등록된 매장 직원이 없습니다." }, void 0, false) }, void 0, false
            ) :

            staffList.map((staff) =>
            _jsxDEV("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
              _jsxDEV("td", { className: "px-4 py-4 font-bold text-gray-700", children: staff.empName }, void 0, false),
              _jsxDEV("td", { className: "px-4 py-4 text-gray-500 font-mono", children: staff.phone || '-' }, void 0, false),
              _jsxDEV("td", { className: "px-4 py-4", children:
                _jsxDEV("span", { className: `px-2 py-1 rounded-full text-[10px] font-black ${staff.status === 'WORK' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`, children:

                  staff.status === 'WORK' ? '근무 중' : '퇴근' }, void 0, false
                ) }, void 0, false
              ),
              _jsxDEV("td", { className: "px-4 py-4 text-gray-500 font-mono", children: staff.workStartTime ? staff.workStartTime.slice(0, 5) : '-' }, void 0, false),
              _jsxDEV("td", { className: "px-4 py-4 text-gray-500 font-mono", children: staff.workEndTime ? staff.workEndTime.slice(0, 5) : '-' }, void 0, false),
              _jsxDEV("td", { className: "px-4 py-4 text-center", children:
                staff.status === 'WORK' ?
                _jsxDEV("button", {
                  onClick: () => handleCheckOut(staff.employeeSeq),
                  className: "px-3 py-1 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-[10px] font-bold border border-red-200 cursor-pointer transition-colors", children:
                  "퇴근" }, void 0, false

                ) :

                _jsxDEV("button", {
                  onClick: () => handleCheckIn(staff.employeeSeq),
                  className: "px-3 py-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-lg text-[10px] font-bold border border-emerald-200 cursor-pointer transition-colors", children:
                  "출근" }, void 0, false

                ) }, void 0, false

              ),
              _jsxDEV("td", { className: "px-4 py-4 text-center", children:
                _jsxDEV("button", {
                  onClick: () => {
                    setSelectedStaff(staff);
                    setIsHistoryOpen(true);
                  },
                  className: "text-[10px] font-bold text-emerald-600 hover:underline cursor-pointer", children:
                  "기록보기" }, void 0, false

                ) }, void 0, false
              )] }, staff.employeeSeq, true
            )
            ) }, void 0, false

          )] }, void 0, true
        ) }, void 0, false
      ),

      _jsxDEV("div", { className: "mt-8 pt-6 border-t border-gray-50 flex justify-between items-center", children: [
        _jsxDEV("p", { className: "text-[11px] text-gray-400", children: "* 매장 PC/태블릿을 통해 수동으로 직원의 출퇴근 근태를 기록하고 조회합니다." }, void 0, false),
        _jsxDEV("button", {
          onClick: () => setIsRegisterOpen(true),
          className: "px-6 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 cursor-pointer", children:
          "+ 신규 직원 등록" }, void 0, false

        )] }, void 0, true
      ),


      _jsxDEV(EmployeeRegisterModal, {
        isOpen: isRegisterOpen,
        onClose: () => setIsRegisterOpen(false),
        onRegister: handleRegisterStaff }, void 0, false
      ),


      _jsxDEV(AttendanceHistoryModal, {
        isOpen: isHistoryOpen,
        onClose: () => setIsHistoryOpen(false),
        employee: selectedStaff }, void 0, false
      )] }, void 0, true
    ));

};

import { useStores } from '../../hooks/useStores';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

function BusinessAttendancePage() {
  const { logout, user_type, user_nickname, bizname, selectedStoreSeq, setSelectedStore } = authStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('직원 근태 관리');
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
                  className: `w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${activeTab === item ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-100'}`, children:


                  item }, void 0, false
                ) }, item, false
              )
              ) }, void 0, false
            )] }, group.title, true
          )
          )] }, void 0, true
        ),


        _jsxDEV("section", { className: "flex-grow", children:
          activeTab === '직원 근태 관리' ?
          _jsxDEV(AttendanceSection, {}, void 0, false) :

          _jsxDEV("div", { className: "bg-white border border-gray-100 rounded-lg p-12 text-center text-gray-400", children: [
            _jsxDEV("h2", { className: "font-bold text-lg mb-2", children: activeTab }, void 0, false),
            _jsxDEV("p", { children: "콘텐츠 준비 중입니다." }, void 0, false)] }, void 0, true
          ) }, void 0, false

        )] }, void 0, true
      ) }, void 0, false
    ));

}

export default BusinessAttendancePage;