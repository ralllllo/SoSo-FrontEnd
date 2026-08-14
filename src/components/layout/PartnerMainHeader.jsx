import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/soso로고.png';
import authStore from '../../store/authStore';
import { useStores } from '../../hooks/useStores';import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";






function PartnerMainHeader({ activeMenu = '홈' }) {
  const { logout, user_type, user_nickname, bizname, selectedStoreSeq, setSelectedStore } = authStore();
  const { stores, isLoading: isStoresLoading } = useStores();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const [isStockDropdownOpen, setIsStockDropdownOpen] = useState(false);

  const handleLogOut = () => {
    logout();
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  const handleProfileClick = () => {
    if (user_type === 'PARTNER') {
      navigate('/partner-info');
      setIsProfileOpen(false);
    } else {
      alert("거래처 전용 마이페이지입니다.");
    }
  };

  const handleStoreSwitch = (storeSeq, companyName) => {
    setSelectedStore(storeSeq, companyName);
    navigate('/partner-info');
    setIsProfileOpen(false);
  };


  const getNavStyle = (menuName) => {
    return activeMenu === menuName ?
    "px-4 py-1.5 text-sm font-semibold bg-white text-gray-900 rounded shadow-sm border border-gray-200" :
    "px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors whitespace-nowrap";
  };

  return (
    _jsxDEV("header", { className: "grid grid-cols-3 items-center py-5 px-6 md:px-12 border-b border-gray-200 bg-white sticky top-0 z-50", children: [

      _jsxDEV("div", { className: "flex items-center gap-1 cursor-pointer", onClick: () => navigate("/"), children: [
        _jsxDEV("img", { src: logo, alt: "SoSo Logo", className: "w-12 h-12 object-contain relative top-[5px]" }, void 0, false),
        _jsxDEV("div", { className: "text-[40px] font-black text-[#1d9e75] tracking-tighter leading-none", children: "SoSo" }, void 0, false)] }, void 0, true
      ),


      _jsxDEV("nav", { className: "hidden md:flex justify-center gap-1 border border-gray-100 rounded-lg p-1 bg-gray-50 w-fit mx-auto relative", children: [
        _jsxDEV(Link, { to: "/", className: getNavStyle('홈'), children: "홈" }, void 0, false),


        _jsxDEV("div", {
          className: "relative",
          onMouseEnter: () => setIsOrderDropdownOpen(true),
          onMouseLeave: () => setIsOrderDropdownOpen(false), children: [

          _jsxDEV("div", { className: activeMenu === '발주 관리' ?
            "px-4 py-1.5 text-sm font-semibold bg-white text-emerald-600 rounded shadow-sm border border-gray-200 cursor-pointer transition-all whitespace-nowrap" :
            "px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-all cursor-pointer whitespace-nowrap", children: "발주 관리" }, void 0, false

          ),

          _jsxDEV("div", { className: `absolute top-full left-0 w-48 pt-2 z-[60] transition-all duration-200 ${isOrderDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`, children:
            _jsxDEV("div", { className: "bg-white border border-gray-100 rounded-2xl shadow-xl p-2", children: [
              _jsxDEV(Link, { to: "/orders", className: "block w-full text-left px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl mb-1", children: "일반 발주 현황" }, void 0, false

              ),



              user_type !== 'PARTNER' && user_type !== 'Partner' &&
              _jsxDEV(Link, { to: "/orders/new", className: "block w-full text-left px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl", children: "발주 신청" }, void 0, false

              )] }, void 0, true

            ) }, void 0, false
          )] }, void 0, true
        ),


        _jsxDEV("div", {
          className: "relative",
          onMouseEnter: () => setIsStockDropdownOpen(true),
          onMouseLeave: () => setIsStockDropdownOpen(false), children: [

          _jsxDEV("div", { className: activeMenu === '재고 관리' ?
            "px-4 py-1.5 text-sm font-semibold bg-white text-emerald-600 rounded shadow-sm border border-gray-200 cursor-pointer transition-all whitespace-nowrap" :
            "px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-all cursor-pointer whitespace-nowrap", children: "재고 관리" }, void 0, false

          ),

          _jsxDEV("div", { className: `absolute top-full left-0 w-48 pt-2 z-[60] transition-all duration-200 ${isStockDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`, children:
            _jsxDEV("div", { className: "bg-white border border-gray-100 rounded-2xl shadow-xl p-2", children: [
              _jsxDEV(Link, { to: "/stock", className: "block w-full text-left px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl mb-1", children: "재고 현황 관리" }, void 0, false

              ),
              _jsxDEV(Link, { to: "/stock-status", className: "block w-full text-left px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl mb-1", children: "자동 재고 제어" }, void 0, false

              )] }, void 0, true
            ) }, void 0, false
          )] }, void 0, true
        ),

        ['수금 관리', '업체 홍보', '통계'].map((m) =>
        _jsxDEV(Link, {

          to: "#",
          className: getNavStyle(m), children:

          m }, m, false
        )
        ),

        _jsxDEV(Link, { to: "/community", className: getNavStyle('커뮤니티'), children: "커뮤니티" }, void 0, false

        )] }, void 0, true
      ),


      _jsxDEV("div", { className: "flex items-center justify-end gap-4", children: [
        _jsxDEV("button", { className: "text-gray-400 hover:text-emerald-600 relative", children: [
          _jsxDEV("span", { className: "text-xl", children: "🔔" }, void 0, false),
          _jsxDEV("span", { className: "absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" }, void 0, false)] }, void 0, true
        ),

        _jsxDEV("div", { className: "relative", children: [
          _jsxDEV("div", {
            onClick: () => setIsProfileOpen(!isProfileOpen),
            className: "flex items-center gap-2 border border-gray-200 rounded-full py-1.5 px-3 bg-white hover:bg-emerald-50 cursor-pointer transition-colors", children: [

            _jsxDEV("div", { className: "w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold", children:
              user_nickname ? user_nickname.substring(0, 1) : 'G' }, void 0, false
            ),
            _jsxDEV("span", { className: "text-sm font-semibold whitespace-nowrap text-gray-700", children: [
              user_nickname || '회원님',
              _jsxDEV("span", { className: "text-xs text-gray-400 font-normal ml-1", children:
                bizname || '상호명 미등록' }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ),

          isProfileOpen &&
          _jsxDEV("div", { className: "absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 z-[60] animate-fade-in-up", children: [
            user_type === 'BUSINESS' &&
            _jsxDEV(_Fragment, { children: [
              _jsxDEV("div", { className: "p-3 border-b border-gray-50 flex justify-between items-center", children: [
                _jsxDEV("span", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "나의 매장 목록" }, void 0, false),
                isStoresLoading && _jsxDEV("span", { className: "text-[10px] text-emerald-500 animate-pulse", children: "로딩 중..." }, void 0, false)] }, void 0, true
              ),

              _jsxDEV("div", { className: "py-2 max-h-60 overflow-y-auto custom-scrollbar", children:
                stores && stores.length > 0 ?
                stores.map((store) =>
                _jsxDEV("button", {

                  onClick: () => handleStoreSwitch(store.storeSeq, store.companyName),
                  className: `w-full text-left px-4 py-3 rounded-xl mb-1 flex justify-between items-center transition-all ${
                  selectedStoreSeq == store.storeSeq || !selectedStoreSeq && stores[0].storeSeq === store.storeSeq ?
                  'bg-emerald-50 text-emerald-600 font-bold border border-emerald-100' :
                  'text-gray-600 hover:bg-gray-50 font-medium'}`, children: [


                  _jsxDEV("div", { className: "flex flex-col", children: [
                    _jsxDEV("span", { className: "text-sm", children: store.companyName }, void 0, false),
                    _jsxDEV("span", { className: "text-[10px] text-gray-400 font-normal", children: store.bizNumber.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3') }, void 0, false)] }, void 0, true
                  ),
                  (selectedStoreSeq == store.storeSeq || !selectedStoreSeq && stores[0].storeSeq === store.storeSeq) &&
                  _jsxDEV("span", { className: "text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded uppercase", children: "Active" }, void 0, false)] }, store.storeSeq, true

                )
                ) :

                _jsxDEV("div", { className: "px-4 py-6 text-center", children:
                  _jsxDEV("p", { className: "text-xs text-gray-400", children: "등록된 매장이 없습니다." }, void 0, false) }, void 0, false
                ) }, void 0, false

              ),
              _jsxDEV("div", { className: "border-t border-gray-50 pt-2 mt-2", children:
                _jsxDEV("button", {
                  onClick: () => {navigate("/business-multiprofile");setIsProfileOpen(false);},
                  className: "w-full text-center py-2 text-[11px] font-bold text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all mb-1", children:
                  "+ 새 매장 추가하기" }, void 0, false

                ) }, void 0, false
              )] }, void 0, true
            ),


            user_type === 'PARTNER' &&
            _jsxDEV("div", { className: "py-2", children:
              _jsxDEV("button", { className: "w-full text-left px-4 py-3 text-sm font-bold text-emerald-600 bg-emerald-50 rounded-xl mb-1 flex justify-between items-center", children: [
                bizname || '한빛 식품 유통',
                _jsxDEV("span", { className: "text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded uppercase", children: "Main" }, void 0, false)] }, void 0, true
              ) }, void 0, false
            ),


            _jsxDEV("div", { className: "border-t border-gray-50 pt-2 mt-2", children: [
              _jsxDEV("button", {
                onClick: handleProfileClick,
                className: "w-full text-center py-3 text-sm font-black text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all", children:
                "마이페이지" }, void 0, false

              ),
              _jsxDEV("button", {
                onClick: handleLogOut,
                className: "w-full text-center py-3 text-sm font-black text-red-500 hover:bg-red-50 rounded-xl transition-all", children:
                "로그아웃" }, void 0, false

              )] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true

        )] }, void 0, true
      )] }, void 0, true
    ));

}

export default PartnerMainHeader;