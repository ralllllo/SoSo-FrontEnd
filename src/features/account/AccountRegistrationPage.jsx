import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountRegistration } from './hooks/useAccountRegistration';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






function AccountRegistrationPage() {
  const navigate = useNavigate();
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    hasSearched,
    isLoading,
    isModalOpen,
    memo,
    setMemo,
    selectedPartner,
    isRegistering,
    handleSearch,
    handleKeyDown,
    handleOpenModal,
    handleCloseModal,
    handleConfirmRegistration,
    resetSearch
  } = useAccountRegistration();

  return (
    _jsxDEV("div", { className: "bg-gray-50 flex flex-col min-h-screen", children: [
      _jsxDEV("main", { className: "flex-1 max-w-4xl mx-auto px-4 py-20 w-full relative", children: [

        _jsxDEV("div", { className: "text-center mb-16", children: [
          _jsxDEV("h1", { className: "text-4xl font-black text-gray-900 tracking-tight mb-4", children: "거래처 검색 등록" }, void 0, false),
          _jsxDEV("p", { className: "text-lg text-gray-500 font-medium", children: "등록하시려는 업체명을 입력하고 검색해 주세요." }, void 0, false)] }, void 0, true
        ),


        _jsxDEV("div", { className: "relative max-w-2xl mx-auto", children: [
          _jsxDEV("div", { className: "flex gap-3", children: [
            _jsxDEV("div", { className: "relative flex-1 group", children: [
              _jsxDEV("div", { className: "absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none", children:
                _jsxDEV("span", { className: "text-2xl text-gray-400 group-focus-within:text-emerald-500 transition-colors", children: "🔍" }, void 0, false) }, void 0, false
              ),
              _jsxDEV("input", {
                type: "text",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                onKeyDown: handleKeyDown,
                placeholder: "업체명 또는 사업자 번호",
                className: "w-full pl-16 pr-6 py-6 bg-white border-2 border-gray-100 rounded-3xl text-xl font-semibold shadow-xl shadow-gray-100 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all placeholder:text-gray-300",
                autoFocus: true }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("button", {
              onClick: handleSearch,
              disabled: isLoading,
              className: `px-10 rounded-3xl font-bold text-lg transition-all shadow-xl whitespace-nowrap ${
              isLoading ?
              'bg-gray-300 text-gray-500 cursor-not-allowed' :
              'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100'}`, children:


              isLoading ? '검색 중...' : '검색' }, void 0, false
            )] }, void 0, true
          ),


          _jsxDEV("div", { className: `mt-10 transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`, children:
            isLoading ?
            _jsxDEV("div", { className: "bg-white border border-gray-100 shadow-2xl rounded-3xl p-16 text-center", children: [
              _jsxDEV("div", { className: "animate-spin text-4xl mb-4 inline-block text-emerald-500", children: "⏳" }, void 0, false),
              _jsxDEV("p", { className: "text-gray-500 font-bold", children: "거래처 목록을 불러오는 중입니다..." }, void 0, false)] }, void 0, true
            ) :
            searchResults.length > 0 ?
            _jsxDEV("div", { className: "bg-white border border-gray-100 shadow-2xl rounded-3xl overflow-hidden", children: [
              _jsxDEV("div", { className: "p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center", children:
                _jsxDEV("span", { className: "text-xs font-black text-gray-400 uppercase tracking-widest", children:
                  searchTerm ? `검색 결과 ${searchResults.length}건` : `전체 거래처 ${searchResults.length}건` }, void 0, false
                ) }, void 0, false
              ),
              _jsxDEV("div", { className: "divide-y divide-gray-50 max-h-[500px] overflow-y-auto custom-scrollbar", children:
                searchResults.map((business, index) =>
                _jsxDEV("div", {

                  onClick: () => handleOpenModal(business),
                  className: "w-full text-left px-8 py-6 hover:bg-emerald-50 transition-all cursor-pointer group flex justify-between items-center", children: [

                  _jsxDEV("div", { className: "flex-1", children: [
                    _jsxDEV("div", { className: "flex items-center gap-3 mb-1", children: [
                      _jsxDEV("span", { className: "text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors", children: business.name }, void 0, false),
                      _jsxDEV("span", { className: "text-sm font-medium text-gray-400", children: business.bizNum }, void 0, false)] }, void 0, true
                    ),
                    _jsxDEV("div", { className: "text-sm text-gray-500", children: business.address }, void 0, false),
                    _jsxDEV("div", { className: "text-xs text-gray-400 mt-1", children: ["대표자: ", business.ceo] }, void 0, true)] }, void 0, true
                  ),
                  _jsxDEV("div", { className: "ml-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0", children:
                    _jsxDEV("span", { className: "px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-100", children: "등록하기" }, void 0, false

                    ) }, void 0, false
                  )] }, index, true
                )
                ) }, void 0, false
              )] }, void 0, true
            ) :

            _jsxDEV("div", { className: "bg-white border border-gray-100 shadow-2xl rounded-3xl p-16 text-center", children: [
              _jsxDEV("div", { className: "text-6xl mb-6", children: "🏜️" }, void 0, false),
              _jsxDEV("h3", { className: "text-xl font-bold text-gray-800 mb-2", children: "해당하는 거래처가 없습니다" }, void 0, false),
              _jsxDEV("p", { className: "text-gray-400 font-medium", children: "검색어(업체명 또는 사업자 번호)를 다시 확인해 주세요." }, void 0, false),
              _jsxDEV("button", {
                onClick: resetSearch,
                className: "mt-6 text-sm font-bold text-emerald-600 hover:underline", children:
                "전체 목록 다시 보기" }, void 0, false

              )] }, void 0, true
            ) }, void 0, false

          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "mt-20 text-center", children:
          _jsxDEV("button", {
            onClick: () => navigate(-1),
            className: "text-gray-400 font-bold hover:text-emerald-600 transition-colors flex items-center gap-2 mx-auto", children:
            "← 뒤로가기" }, void 0, false

          ) }, void 0, false
        )] }, void 0, true
      ),


      isModalOpen &&
      _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm animate-fade-in", children:
        _jsxDEV("div", { className: "bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scale-up", children: [
          _jsxDEV("div", { className: "p-8 border-b border-gray-50", children: [
            _jsxDEV("h2", { className: "text-2xl font-black text-gray-900 mb-2", children: "거래처 등록" }, void 0, false),
            _jsxDEV("p", { className: "text-sm text-gray-500 font-medium", children: [
              _jsxDEV("span", { className: "text-emerald-600 font-bold", children: ["[", selectedPartner?.name, "]"] }, void 0, true), " 업체와 파트너 관계를 맺으시겠습니까?"] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "p-8 space-y-4", children: [
            _jsxDEV("label", { className: "text-sm font-bold text-gray-700 block ml-1", children: "거래처 메모 (선택)" }, void 0, false),
            _jsxDEV("textarea", {
              value: memo,
              onChange: (e) => setMemo(e.target.value),
              placeholder: "예: 과일 전문 도매, 매주 수요일 배송 등",
              className: "w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none min-h-[120px]" }, void 0, false
            ),
            _jsxDEV("p", { className: "text-[11px] text-gray-400 leading-relaxed px-1", children: "* 등록된 메모는 거래처 목록에서 확인할 수 있으며, 업무 효율을 높이는 데 도움이 됩니다." }, void 0, false

            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "p-4 bg-gray-50 flex gap-3", children: [
            _jsxDEV("button", {
              onClick: handleCloseModal,
              disabled: isRegistering,
              className: "flex-1 py-4 bg-white border border-gray-200 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-all", children:
              "취소" }, void 0, false

            ),
            _jsxDEV("button", {
              onClick: handleConfirmRegistration,
              disabled: isRegistering,
              className: `flex-[1.5] py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${
              isRegistering ? 'bg-gray-300' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'}`, children:


              isRegistering ? '등록 중...' : '등록 완료' }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        ) }, void 0, false
      )] }, void 0, true

    ));

}

export default AccountRegistrationPage;