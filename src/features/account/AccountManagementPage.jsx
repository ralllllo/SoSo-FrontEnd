import React from 'react';
import { Link } from 'react-router-dom';
import { useAccountManagement } from './hooks/useAccountManagement';import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";






function AccountManagementPage() {
  const { items, partnerDetail, isLoading } = useAccountManagement();

  return (
    _jsxDEV("div", { className: "bg-gray-50 min-h-screen", children:
      _jsxDEV("main", { className: "max-w-7xl mx-auto px-4 py-10", children: [


        _jsxDEV("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("h1", { className: "text-2xl font-bold text-gray-900", children: "거래처 상세 및 품목 관리" }, void 0, false),
            _jsxDEV("p", { className: "text-gray-500 mt-1", children: "거래처의 기본 정보와 취급 품목을 확인하세요." }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { className: "flex gap-2", children:
            _jsxDEV(Link, { to: "/account/list", className: "px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors", children: "목록으로 돌아가기" }, void 0, false

            ) }, void 0, false
          )] }, void 0, true
        ),

        isLoading ?
        _jsxDEV("div", { className: "p-32 text-center flex flex-col items-center justify-center", children: [
          _jsxDEV("div", { className: "animate-spin text-5xl mb-6 text-emerald-500", children: "⏳" }, void 0, false),
          _jsxDEV("p", { className: "text-gray-500 font-bold text-lg", children: "데이터를 불러오는 중입니다..." }, void 0, false)] }, void 0, true
        ) :

        _jsxDEV(_Fragment, { children: [

          partnerDetail &&
          _jsxDEV("div", { className: "bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8 flex flex-col md:flex-row", children: [
            _jsxDEV("div", { className: "bg-emerald-50 p-8 flex flex-col items-center justify-center min-w-[250px] border-r border-emerald-100/50", children: [
              _jsxDEV("div", { className: "w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md mb-4 text-4xl", children: "🏪" }, void 0, false

              ),
              _jsxDEV("h2", { className: "text-xl font-black text-gray-900 text-center", children: partnerDetail.name }, void 0, false),
              _jsxDEV("span", { className: "mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full", children: ["사업자번호: ",
                partnerDetail.bizNum] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "p-8 flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6", children: [
              _jsxDEV("div", { className: "space-y-1", children: [
                _jsxDEV("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider", children: "대표자명" }, void 0, false),
                _jsxDEV("p", { className: "text-base font-semibold text-gray-800", children: partnerDetail.ceo }, void 0, false)] }, void 0, true
              ),
              _jsxDEV("div", { className: "space-y-1", children: [
                _jsxDEV("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider", children: "연락처" }, void 0, false),
                _jsxDEV("p", { className: "text-base font-semibold text-gray-800", children: partnerDetail.phone }, void 0, false)] }, void 0, true
              ),
              _jsxDEV("div", { className: "space-y-1", children: [
                _jsxDEV("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider", children: "이메일" }, void 0, false),
                _jsxDEV("p", { className: "text-base font-semibold text-gray-800", children: partnerDetail.email }, void 0, false)] }, void 0, true
              ),
              _jsxDEV("div", { className: "space-y-1 md:col-span-2", children: [
                _jsxDEV("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider", children: "사업장 주소" }, void 0, false),
                _jsxDEV("p", { className: "text-base font-semibold text-gray-800", children: partnerDetail.address }, void 0, false)] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ),



          _jsxDEV("div", { className: "bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden", children: [
            _jsxDEV("div", { className: "p-6 border-b border-gray-50 flex flex-wrap gap-4 items-center justify-between", children: [
              _jsxDEV("div", { className: "flex gap-2", children:
                _jsxDEV("button", { className: "px-6 py-2.5 text-sm font-bold bg-gray-50 text-gray-700 rounded-lg border border-gray-200", children: ["전체 품목 ",
                  _jsxDEV("span", { className: "ml-1 px-2 py-0.5 bg-white text-emerald-600 rounded-full text-xs shadow-sm", children: items.length }, void 0, false)] }, void 0, true
                ) }, void 0, false
              ),
              _jsxDEV("div", { className: "relative", children: [
                _jsxDEV("input", {
                  type: "text",
                  placeholder: "품목명 검색",
                  className: "pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64 transition-all" }, void 0, false
                ),
                _jsxDEV("span", { className: "absolute left-3 top-3 text-gray-400", children: "🔍" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "overflow-x-auto min-h-[300px]", children:
              items.length > 0 ?
              _jsxDEV("table", { className: "w-full text-left", children: [
                _jsxDEV("thead", { className: "bg-gray-50 border-b border-gray-100", children:
                  _jsxDEV("tr", { children: [
                    _jsxDEV("th", { className: "px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest", children: "품목명" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest", children: "카테고리" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest", children: "규격/단위" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest", children: "단가" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest", children: "상태" }, void 0, false)] }, void 0, true
                  ) }, void 0, false
                ),
                _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
                  items.map((item) =>
                  _jsxDEV("tr", { className: "hover:bg-emerald-50/30 transition-colors group", children: [
                    _jsxDEV("td", { className: "px-8 py-5 whitespace-nowrap", children:
                      _jsxDEV("div", { className: "flex items-center gap-4", children: [
                        _jsxDEV("div", { className: "w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200", children:
                          item.image ?
                          _jsxDEV("img", { src: item.image, alt: item.name, className: "w-full h-full object-cover" }, void 0, false) :

                          _jsxDEV("span", { className: "text-xl", children: "🍅" }, void 0, false) }, void 0, false

                        ),
                        _jsxDEV("span", { className: "text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors", children: item.name }, void 0, false)] }, void 0, true
                      ) }, void 0, false
                    ),
                    _jsxDEV("td", { className: "px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-500", children: item.category }, void 0, false),
                    _jsxDEV("td", { className: "px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-500", children: item.unit || '-' }, void 0, false),
                    _jsxDEV("td", { className: "px-6 py-5 whitespace-nowrap text-sm font-black text-emerald-600", children: item.price }, void 0, false),
                    _jsxDEV("td", { className: "px-6 py-5 whitespace-nowrap", children:
                      _jsxDEV("span", { className: "px-2.5 py-1 text-[10px] font-black rounded-md uppercase bg-emerald-100 text-emerald-700", children:
                        item.status }, void 0, false
                      ) }, void 0, false
                    )] }, item.id, true
                  )
                  ) }, void 0, false
                )] }, void 0, true
              ) :

              _jsxDEV("div", { className: "p-32 text-center h-full flex flex-col items-center justify-center", children: [
                _jsxDEV("div", { className: "text-6xl mb-6 opacity-50", children: "📦" }, void 0, false),
                _jsxDEV("h3", { className: "text-2xl font-black text-gray-800 mb-2", children: "등록된 품목이 없습니다" }, void 0, false),
                _jsxDEV("p", { className: "text-gray-400 font-medium", children: "이 거래처에는 아직 등록된 품목 정보가 없습니다." }, void 0, false)] }, void 0, true
              ) }, void 0, false

            ),

            items.length > 0 &&
            _jsxDEV("div", { className: "p-6 bg-gray-50 border-t border-gray-100 flex justify-center", children:
              _jsxDEV("nav", { className: "flex gap-2", children: [
                _jsxDEV("button", { className: "w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-400 hover:border-emerald-500 hover:text-emerald-500 transition-all", children: "<" }, void 0, false),
                _jsxDEV("button", { className: "w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-600 text-white font-bold", children: "1" }, void 0, false),
                _jsxDEV("button", { className: "w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-400 hover:border-emerald-500 hover:text-emerald-500 transition-all", children: ">" }, void 0, false)] }, void 0, true
              ) }, void 0, false
            )] }, void 0, true

          )] }, void 0, true
        )] }, void 0, true

      ) }, void 0, false
    ));

}

export default AccountManagementPage;