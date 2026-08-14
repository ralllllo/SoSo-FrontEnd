import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGroupOrder } from './hooks/useGroupOrderList';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






function GroupOrderList() {
  const { groupOrders, filterStatus, handleFilterChange } = useGroupOrder();
  const navigate = useNavigate();


  const statusColors = {
    '모집중': 'bg-emerald-500 text-white',
    '모집완료': 'bg-blue-600 text-white',
    '모집실패': 'bg-gray-400 text-white',
    '배송준비': 'bg-orange-500 text-white'
  };

  return (
    _jsxDEV("div", { className: "min-h-screen bg-[#F8F9FA] text-gray-800 font-sans", children:
      _jsxDEV("main", { className: "max-w-7xl mx-auto px-6 py-10", children: [
        _jsxDEV("div", { className: "flex justify-between items-start mb-10", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("h2", { className: "text-4xl font-black text-gray-900 tracking-tight mb-3", children: "공동 발주 현황" }, void 0, false),
            _jsxDEV("div", { className: "flex items-center gap-3", children: [
              _jsxDEV("span", { className: "px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-black uppercase tracking-wider", children: "Group Buying" }, void 0, false),
              _jsxDEV("p", { className: "text-gray-500 font-semibold text-sm", children: "함께 주문하고 더 큰 할인 혜택을 누리세요." }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ),
          _jsxDEV("button", { className: "bg-gray-900 text-white px-6 py-2 rounded-2xl font-black hover:bg-black transition-all shadow-lg flex items-center gap-2", children: [
            _jsxDEV("span", { className: "text-xl", children: "+" }, void 0, false), " 공동 발주 개설"] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "bg-white rounded-[32px] border border-gray-100 p-10 shadow-sm mb-10 overflow-x-auto", children:
          _jsxDEV("div", { className: "flex justify-between items-center min-w-[800px] max-w-6xl mx-auto relative px-4", children: [

            _jsxDEV("div", { className: "absolute top-8 left-0 w-full h-1 bg-gray-50 -z-0 rounded-full" }, void 0, false),
            [
            { label: '모집중', icon: '📢', count: 2, active: true },
            { label: '마감', icon: '⏰', count: 1, active: false },
            { label: '발주완료', icon: '📝', count: 0, active: false },
            { label: '배송중', icon: '🚚', count: 0, active: false },
            { label: '검수중', icon: '🔍', count: 0, active: false },
            { label: '배분중', icon: '📦', count: 0, active: false },
            { label: '완료', icon: '✅', count: 142, active: false }].
            map((step, i) =>
            _jsxDEV("div", { className: "flex flex-col items-center gap-4 relative z-10 bg-white px-4", children: [
              _jsxDEV("div", { className: `w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-sm transition-all ${step.active ? 'bg-blue-50 text-blue-600 ring-4 ring-blue-50' : 'bg-gray-50 text-gray-300 grayscale border border-gray-100'}`, children:
                step.icon }, void 0, false
              ),
              _jsxDEV("div", { className: "text-center", children: [
                _jsxDEV("div", { className: `text-[13px] font-black mb-0.5 whitespace-nowrap ${step.active ? 'text-blue-800' : 'text-gray-400'}`, children: step.label }, void 0, false),
                _jsxDEV("div", { className: `text-xs font-bold ${step.active ? 'text-blue-500' : 'text-gray-300'}`, children: [step.count, "건"] }, void 0, true)] }, void 0, true
              )] }, i, true
            )
            )] }, void 0, true
          ) }, void 0, false
        ),


        _jsxDEV("div", { className: "bg-white rounded-[32px] border border-gray-100 p-4 shadow-sm mb-8 flex items-center justify-between", children: [
          _jsxDEV("div", { className: "flex items-center gap-1.5 bg-gray-50 p-1.5 rounded-2xl", children:
            ['전체', '모집중', '모집완료', '모집실패'].map((status) =>
            _jsxDEV("button", {

              onClick: () => handleFilterChange(status),
              className: `px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
              filterStatus === status ?
              'bg-blue-600 text-white shadow-lg' :
              'text-gray-400 hover:text-gray-600'}`, children:


              status }, status, false
            )
            ) }, void 0, false
          ),
          _jsxDEV("div", { className: "flex gap-2", children: [
            _jsxDEV("input", { type: "text", placeholder: "품목명 또는 업체명 검색", className: "bg-gray-50 border-none rounded-xl px-4 py-2 text-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none" }, void 0, false),
            _jsxDEV("button", { className: "bg-gray-900 text-white px-6 py-2 rounded-xl text-sm font-black", children: "검색" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-x-auto", children: [
          _jsxDEV("table", { className: "w-full text-left border-collapse min-w-[1000px]", children: [
            _jsxDEV("thead", { children:
              _jsxDEV("tr", { className: "bg-gray-50/50", children: [
                _jsxDEV("th", { className: "px-12 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50 whitespace-nowrap", children: "발주 번호" }, void 0, false),
                _jsxDEV("th", { className: "px-15 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50 whitespace-nowrap", children: "품목 정보" }, void 0, false),
                _jsxDEV("th", { className: "px-5 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50 whitespace-nowrap", children: "공급업체" }, void 0, false),
                _jsxDEV("th", { className: "px-16 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50 whitespace-nowrap", children: "모집 현황" }, void 0, false),
                _jsxDEV("th", { className: "px-5 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50 whitespace-nowrap", children: "공동 구매가" }, void 0, false),
                _jsxDEV("th", { className: "px-7 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50 whitespace-nowrap", children: "상태" }, void 0, false),
                _jsxDEV("th", { className: "px-4 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50 whitespace-nowrap", children: "마감 기한" }, void 0, false),
                _jsxDEV("th", { className: "px-4 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50 text-center whitespace-nowrap", children: "관리" }, void 0, false)] }, void 0, true
              ) }, void 0, false
            ),
            _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
              groupOrders.map((order) =>
              _jsxDEV("tr", { className: "hover:bg-blue-50/30 transition-colors group", children: [
                _jsxDEV("td", { className: "px-5 py-6 text-xs font-black text-gray-900 whitespace-nowrap uppercase", children:
                  order.id }, void 0, false
                ),
                _jsxDEV("td", { className: "px-5 py-6", children:
                  _jsxDEV("div", { className: "flex flex-col min-w-[180px]", children: [
                    _jsxDEV("span", { className: "text-[9px] font-black text-blue-500 mb-0.5 uppercase tracking-tighter", children: order.category }, void 0, false),
                    _jsxDEV("span", { className: "text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors", children: order.title }, void 0, false)] }, void 0, true
                  ) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-5 py-6 whitespace-nowrap", children:
                  _jsxDEV("div", { className: "text-xs font-bold text-gray-700", children: order.supplier }, void 0, false) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-5 py-6", children:
                  _jsxDEV("div", { className: "w-40", children: [
                    _jsxDEV("div", { className: "flex justify-between items-end mb-1.5 text-[10px] font-black", children: [
                      _jsxDEV("span", { className: "text-blue-600", children: [order.currentCount, "/", order.minCount, "개"] }, void 0, true),
                      _jsxDEV("span", { className: "text-blue-600", children: [order.progress, "%"] }, void 0, true)] }, void 0, true
                    ),
                    _jsxDEV("div", { className: "w-full bg-gray-100 h-1.5 rounded-full overflow-hidden", children:
                      _jsxDEV("div", {
                        className: "bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-1000",
                        style: { width: `${order.progress}%` } }, void 0, false
                      ) }, void 0, false
                    )] }, void 0, true
                  ) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-5 py-6 whitespace-nowrap", children:
                  _jsxDEV("div", { className: "flex flex-col", children: [
                    _jsxDEV("span", { className: "text-[10px] text-gray-300 font-bold line-through leading-none mb-1", children: ["₩", order.price.toLocaleString()] }, void 0, true),
                    _jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                      _jsxDEV("span", { className: "text-sm font-black text-gray-900 leading-none", children: ["₩", order.discountPrice.toLocaleString()] }, void 0, true),
                      _jsxDEV("span", { className: "text-[10px] font-black text-red-500 italic", children: ["-", Math.round((1 - order.discountPrice / order.price) * 100), "%"] }, void 0, true)] }, void 0, true
                    )] }, void 0, true
                  ) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-5 py-6 whitespace-nowrap", children:
                  _jsxDEV("span", { className: `px-3 py-1 rounded-lg text-[10px] font-black border shadow-sm inline-block ${statusColors[order.status]}`, children:
                    order.status }, void 0, false
                  ) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-5 py-6 whitespace-nowrap", children:
                  _jsxDEV("div", { className: "flex flex-col items-start", children: [
                    _jsxDEV("span", { className: "text-xs font-black text-red-600 mb-0.5", children: order.dDay }, void 0, false),
                    _jsxDEV("span", { className: "text-[9px] font-bold text-gray-300 uppercase tracking-tighter", children: [order.deadline, " 마감"] }, void 0, true)] }, void 0, true
                  ) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-5 py-6 text-center whitespace-nowrap", children:
                  _jsxDEV("button", { className: `px-4 py-1.5 rounded-lg font-black text-[10px] transition-all ${order.status === '모집중' ? 'bg-gray-900 text-white hover:bg-black shadow-md' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`, children:
                    order.status === '모집중' ? '참여하기' : '상세보기' }, void 0, false
                  ) }, void 0, false
                )] }, order.id, true
              )
              ) }, void 0, false
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "px-8 py-6 bg-gray-50/50 flex justify-center border-t border-gray-50", children:
            _jsxDEV("div", { className: "flex gap-2", children:
              [1, 2, 3, 4, 5].map((n) =>
              _jsxDEV("button", { className: `w-10 h-10 rounded-xl font-bold text-sm transition-all ${n === 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-gray-100 border border-gray-100'}`, children: n }, n, false)
              ) }, void 0, false
            ) }, void 0, false
          )] }, void 0, true
        )] }, void 0, true
      ) }, void 0, false
    ));

}

export default GroupOrderList;