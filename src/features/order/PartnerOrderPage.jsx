import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePartnerOrder } from './hooks/usePartnerOrder';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






function PartnerOrderPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    orders,
    allOrders,
    loading,
    keyword,
    filterStatus,
    handleKeywordChange,
    handleFilterChange,
    fetchOrders,
    openOrderDetail,
    isModalOpen,
    closeModal,
    selectedOrderDetails,
    selectedOrder,
    handleStatusChange
  } = usePartnerOrder();


  const statusColors = {
    REQUESTED: 'bg-blue-100 text-blue-700 border-blue-200',
    ACCEPTED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    PREPARING: 'bg-amber-100 text-amber-700 border-amber-200',
    SHIPPING: 'bg-purple-100 text-purple-700 border-purple-200',
    DELIVERED: 'bg-gray-200 text-gray-700 border-gray-300'
  };

  const statusOptions = [
  { value: 'REQUESTED', label: '발주신청' },
  { value: 'ACCEPTED', label: '접수완료' },
  { value: 'PREPARING', label: '상품준비' },
  { value: 'SHIPPING', label: '배송중' },
  { value: 'DELIVERED', label: '배송완료' }];



  const stats = {
    total: allOrders.length,
    requested: allOrders.filter((o) => o.status === 'REQUESTED').length,
    preparing: allOrders.filter((o) => o.status === 'PREPARING' || o.status === 'ACCEPTED').length,
    shipping: allOrders.filter((o) => o.status === 'SHIPPING').length,
    delivered: allOrders.filter((o) => o.status === 'DELIVERED').length
  };


  const statusSteps = [
  { key: 'REQUESTED', label: '발주신청', icon: '📝' },
  { key: 'ACCEPTED', label: '접수완료', icon: '📩' },
  { key: 'PREPARING', label: '상품준비', icon: '📦' },
  { key: 'SHIPPING', label: '배송중', icon: '🚚' },
  { key: 'DELIVERED', label: '배송완료', icon: '📬' }];



  const statusCounts = {
    REQUESTED: allOrders.filter((o) => o.status === 'REQUESTED').length,
    ACCEPTED: allOrders.filter((o) => o.status === 'ACCEPTED').length,
    PREPARING: allOrders.filter((o) => o.status === 'PREPARING').length,
    SHIPPING: allOrders.filter((o) => o.status === 'SHIPPING').length,
    DELIVERED: allOrders.filter((o) => o.status === 'DELIVERED').length
  };

  const ordersPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(orders.length / ordersPerPage));
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);


  const maxPageButtons = 10;
  const currentGroup = Math.ceil(currentPage / maxPageButtons);
  const startPage = (currentGroup - 1) * maxPageButtons + 1;
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    _jsxDEV("div", { className: "min-h-screen bg-[#F8F9FA] text-gray-800 font-sans", children: [
      _jsxDEV("main", { className: "max-w-7xl mx-auto px-6 py-10", children: [

        _jsxDEV("div", { className: "flex justify-between items-start mb-10", children:
          _jsxDEV("div", { children: [
            _jsxDEV("h2", { className: "text-4xl font-black text-gray-900 tracking-tight mb-3", children: "거래처 발주 관리" }, void 0, false),
            _jsxDEV("div", { className: "flex items-center gap-3", children: [
              _jsxDEV("span", { className: "px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-black uppercase tracking-wider", children: "PartnerMode" }, void 0, false),
              _jsxDEV("p", { className: "text-gray-500 font-semibold text-sm", children: "업장에서 들어온 발주 요청을 관리하고 실시간으로 상태를 업데이트하세요." }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ) }, void 0, false
        ),


        _jsxDEV("div", { className: "mb-3 flex items-center justify-between", children: [
          _jsxDEV("h3", { className: "text-xl font-bold text-gray-800 flex items-center gap-2", children: [
            _jsxDEV("span", { className: "w-1.5 h-6 bg-emerald-500 rounded-full" }, void 0, false), "발주 현황 요약"] }, void 0, true

          ),
          _jsxDEV("div", { className: "flex items-center gap-4", children:
            _jsxDEV("span", { className: "text-xs font-medium text-gray-400", children: ["최근 업데이트: ", new Date().toLocaleString('ko-KR')] }, void 0, true) }, void 0, false
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-4 mb-10", children:
          [
          { label: '전체 발주', value: stats.total, color: 'border-gray-200', text: 'text-gray-900' },
          { label: '신규 요청', value: stats.requested, color: 'border-blue-200', text: 'text-blue-600' },
          { label: '상품 준비', value: stats.preparing, color: 'border-amber-200', text: 'text-amber-600' },
          { label: '배송 중', value: stats.shipping, color: 'border-purple-200', text: 'text-purple-600' },
          { label: '배송 완료', value: stats.delivered, color: 'border-emerald-200', text: 'text-emerald-600' }].
          map((item, idx) =>
          _jsxDEV("div", { className: `bg-white p-7 rounded-3xl border shadow-sm transition-transform hover:-translate-y-1 ${item.color}`, children: [
            _jsxDEV("div", { className: "text-gray-600 text-[12px] font-black uppercase tracking-[0.2em] mb-3", children: item.label }, void 0, false),
            _jsxDEV("div", { className: `text-3xl font-black mb-1 ${item.text}`, children: [item.value, "건"] }, void 0, true)] }, idx, true
          )
          ) }, void 0, false
        ),


        _jsxDEV("div", { className: "bg-white rounded-[32px] border border-gray-100 p-10 shadow-sm mb-10", children:
          _jsxDEV("div", { className: "flex justify-between items-center max-w-5xl mx-auto relative", children: [
            _jsxDEV("div", { className: "absolute top-8 left-0 w-full h-1 bg-gray-50 -z-0 rounded-full" }, void 0, false),
            statusSteps.map((step, i) => {
              const count = statusCounts[step.key] || 0;
              const active = count > 0;
              return (
                _jsxDEV("div", { className: "flex flex-col items-center gap-5 relative z-10 bg-white px-6", children: [
                  _jsxDEV("div", { className: `w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-sm transition-all ${active ? 'bg-emerald-100 text-emerald-700 border-emerald-300 ring-4 ring-emerald-100' : 'bg-gray-50 text-gray-300 grayscale border-gray-100'}`, children:
                    step.icon }, void 0, false
                  ),
                  _jsxDEV("div", { className: "text-center", children: [
                    _jsxDEV("div", { className: `text-base font-black mb-1 ${active ? 'text-gray-800' : 'text-gray-400'}`, children: step.label }, void 0, false),
                    _jsxDEV("div", { className: `text-sm font-bold ${active ? 'text-emerald-500' : 'text-gray-300'}`, children: [count, "건"] }, void 0, true)] }, void 0, true
                  )] }, step.key, true
                ));

            })] }, void 0, true
          ) }, void 0, false
        ),


        _jsxDEV("div", { className: "bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm mb-8", children: [
          _jsxDEV("div", { className: "flex flex-col lg:flex-row gap-4 mb-4", children: [

            _jsxDEV("div", { className: "flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl", children: [
              _jsxDEV("span", { className: "text-xs font-black text-gray-600 px-3 uppercase tracking-tighter", children: "조회 기간" }, void 0, false),
              ['오늘', '7일', '1개월', '3개월'].map((range) =>
              _jsxDEV("button", {

                className: `px-5 py-2 rounded-xl text-xs font-bold transition-all hover:bg-white hover:shadow-sm text-gray-400`, children:

                range }, range, false
              )
              ),
              _jsxDEV("div", { className: "h-4 w-px bg-gray-200 mx-2" }, void 0, false),
              _jsxDEV("input", { type: "date", className: "bg-transparent border-none text-xs font-bold text-gray-500 focus:ring-0 cursor-pointer" }, void 0, false),
              _jsxDEV("span", { className: "text-gray-300", children: "~" }, void 0, false),
              _jsxDEV("input", { type: "date", className: "bg-transparent border-none text-xs font-bold text-gray-500 focus:ring-0 cursor-pointer" }, void 0, false)] }, void 0, true
            ),


            _jsxDEV("div", { className: "flex items-center gap-1.5 bg-gray-50 p-1.5 rounded-2xl flex-grow", children: [
              _jsxDEV("span", { className: "text-xs font-black text-gray-600 px-3 uppercase tracking-tighter", children: "발주 상태" }, void 0, false),
              ['전체', '발주신청', '준비중', '배송중', '배송완료'].map((status) =>
              _jsxDEV("button", {

                onClick: () => handleFilterChange(status),
                className: `px-5 py-2 rounded-xl text-xs font-black transition-all transform active:scale-95 ${filterStatus === status ? 'bg-gray-900 text-white shadow-lg shadow-gray-200' : 'text-gray-400 hover:bg-white hover:text-gray-600'}`, children:

                status }, status, false
              )
              )] }, void 0, true
            )] }, void 0, true
          ),


          _jsxDEV("div", { className: "flex gap-4", children: [
            _jsxDEV("div", { className: "relative flex-grow", children: [
              _jsxDEV("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "🔍" }, void 0, false),
              _jsxDEV("input", {
                type: "text",
                value: keyword,
                onChange: handleKeywordChange,
                onKeyDown: (e) => e.key === 'Enter' && fetchOrders(),
                placeholder: "발주 번호 또는 주문 업체명을 입력하세요",
                className: "w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("button", { onClick: fetchOrders, className: "bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-black transition-all", children: "검색하기" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden", children: [
          _jsxDEV("div", { className: "px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-white", children:
            _jsxDEV("h3", { className: "font-black text-gray-900 flex items-center gap-2", children: [
              _jsxDEV("span", { className: "w-2.5 h-2.5 bg-emerald-500 rounded-full" }, void 0, false), "발주 상세 목록 ",
              _jsxDEV("span", { className: "text-gray-500 font-medium ml-1 text-sm", children: [orders.length, "건"] }, void 0, true)] }, void 0, true
            ) }, void 0, false
          ),

          _jsxDEV("table", { className: "w-full text-left border-collapse", children: [
            _jsxDEV("thead", { children:
              _jsxDEV("tr", { className: "bg-gray-50/50", children: [
                _jsxDEV("th", { className: "px-8 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50", children: "발주번호" }, void 0, false),
                _jsxDEV("th", { className: "px-8 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50", children: "주문 업체" }, void 0, false),
                _jsxDEV("th", { className: "px-8 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50", children: "상태 관리" }, void 0, false),
                _jsxDEV("th", { className: "px-8 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50 text-right", children: "결제 금액" }, void 0, false),
                _jsxDEV("th", { className: "px-8 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50 text-center", children: "상세" }, void 0, false)] }, void 0, true
              ) }, void 0, false
            ),
            _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
              loading ?
              _jsxDEV("tr", { children:
                _jsxDEV("td", { colSpan: "5", className: "px-8 py-20 text-center text-gray-400 font-bold", children: "발주 내역을 불러오는 중입니다..." }, void 0, false) }, void 0, false
              ) :
              orders.length === 0 ?
              _jsxDEV("tr", { children:
                _jsxDEV("td", { colSpan: "5", className: "px-8 py-20 text-center text-gray-400 font-bold", children: "접수된 발주 내역이 없습니다." }, void 0, false) }, void 0, false
              ) :

              paginatedOrders.map((order) =>
              _jsxDEV("tr", { className: "hover:bg-emerald-50/30 transition-colors group cursor-pointer", onClick: () => openOrderDetail(order.orderSeq), children: [
                _jsxDEV("td", { className: "px-8 py-6", children: [
                  _jsxDEV("div", { className: "text-sm font-black text-gray-900", children: order.orderNo }, void 0, false),
                  _jsxDEV("div", { className: "text-[10px] text-gray-400 mt-1", children: new Date(order.createdAt).toLocaleString('ko-KR') }, void 0, false)] }, void 0, true
                ),
                _jsxDEV("td", { className: "px-8 py-6", children:
                  _jsxDEV("div", { className: "flex items-center gap-2", children: [
                    _jsxDEV("div", { className: "w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs", children: "🏪" }, void 0, false),
                    _jsxDEV("div", { className: "text-sm font-bold text-gray-700", children: order.companyName }, void 0, false)] }, void 0, true
                  ) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-8 py-6", children:
                  _jsxDEV("select", {
                    value: order.status,
                    onChange: (e) => handleStatusChange(order.orderSeq, e.target.value),
                    onClick: (e) => e.stopPropagation(),
                    className: `px-4 py-2 rounded-xl text-[10px] font-black border shadow-sm outline-none cursor-pointer transition-all ${statusColors[order.status] || 'bg-gray-100'}`, children:

                    statusOptions.map((option) =>
                    _jsxDEV("option", { value: option.value, children:
                      option.label }, option.value, false
                    )
                    ) }, void 0, false
                  ) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-8 py-6 text-right", children:
                  _jsxDEV("div", { className: "text-sm font-black text-emerald-600", children: [
                    order.totalAmount?.toLocaleString(), "원"] }, void 0, true
                  ) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-8 py-6 text-center", children:
                  _jsxDEV("button", {
                    className: "p-2 bg-gray-50 group-hover:bg-white rounded-xl transition-all border border-gray-100 shadow-sm text-gray-400 group-hover:text-emerald-500",
                    onClick: (e) => {
                      e.stopPropagation();
                      openOrderDetail(order.orderSeq);
                    }, children:
                    "📄" }, void 0, false

                  ) }, void 0, false
                )] }, order.orderSeq, true
              )
              ) }, void 0, false

            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "px-8 py-6 bg-gray-50/50 flex justify-center border-t border-gray-50", children:
            _jsxDEV("div", { className: "flex items-center gap-2", children: [

              _jsxDEV("button", {
                type: "button",
                onClick: () => setCurrentPage((prev) => Math.max(1, prev - 1)),
                disabled: currentPage === 1,
                className: `w-10 h-10 rounded-xl font-bold text-sm transition-all border flex items-center justify-center ${currentPage === 1 ?
                'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' :
                'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-gray-100 shadow-sm cursor-pointer'}`, children:

                "<" }, void 0, false

              ),


              pageNumbers.map((n) =>
              _jsxDEV("button", {

                type: "button",
                onClick: () => setCurrentPage(n),
                className: `w-10 h-10 rounded-xl font-bold text-sm transition-all ${n === currentPage ?
                'bg-emerald-600 text-white shadow-lg shadow-emerald-100' :
                'bg-white text-gray-400 hover:bg-gray-100 border border-gray-100 shadow-sm cursor-pointer'}`, children:


                n }, n, false
              )
              ),


              _jsxDEV("button", {
                type: "button",
                onClick: () => setCurrentPage((prev) => Math.min(totalPages, prev + 1)),
                disabled: currentPage === totalPages,
                className: `w-10 h-10 rounded-xl font-bold text-sm transition-all border flex items-center justify-center ${currentPage === totalPages ?
                'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' :
                'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-gray-100 shadow-sm cursor-pointer'}`, children:

                ">" }, void 0, false

              )] }, void 0, true
            ) }, void 0, false
          )] }, void 0, true
        )] }, void 0, true
      ),


      isModalOpen &&
      _jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm", children:
        _jsxDEV("div", { className: "bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300", children: [
          _jsxDEV("div", { className: "px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("h3", { className: "text-2xl font-black text-gray-900", children: "발주 품목 상세" }, void 0, false),
              _jsxDEV("p", { className: "text-gray-500 text-sm font-bold mt-1", children: "선택하신 발주서의 세부 항목입니다." }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("button", {
              onClick: closeModal,
              className: "w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm font-black text-xl", children:
              "✕" }, void 0, false

            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "p-10 max-h-[60vh] overflow-y-auto", children: [

            selectedOrder &&
            _jsxDEV("div", { className: "grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-100", children: [
              _jsxDEV("div", { className: "bg-gray-50 p-6 rounded-2xl", children: [
                _jsxDEV("div", { className: "text-xs font-black text-gray-400 mb-3 uppercase tracking-widest flex items-center gap-2", children: [
                  _jsxDEV("span", { children: "📍" }, void 0, false), " 배송지 정보"] }, void 0, true
                ),
                _jsxDEV("div", { className: "font-bold text-gray-800 text-base mb-1", children: selectedOrder.companyName }, void 0, false),
                _jsxDEV("div", { className: "text-gray-600 text-sm leading-relaxed", children: [
                  _jsxDEV("span", { className: "inline-block px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs font-bold mr-2 mb-1", children:
                    selectedOrder.zonecode || '우편번호 없음' }, void 0, false
                  ),
                  _jsxDEV("br", {}, void 0, false),
                  selectedOrder.address1, " ", selectedOrder.address2] }, void 0, true
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "bg-gray-50 p-6 rounded-2xl", children: [
                _jsxDEV("div", { className: "text-xs font-black text-gray-400 mb-3 uppercase tracking-widest flex items-center gap-2", children: [
                  _jsxDEV("span", { children: "📝" }, void 0, false), " 요청 메모"] }, void 0, true
                ),
                _jsxDEV("div", { className: "text-gray-600 text-sm whitespace-pre-wrap leading-relaxed", children:
                  selectedOrder.orderMemo || '입력된 요청 사항이 없습니다.' }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            ),


            _jsxDEV("table", { className: "w-full text-left border-collapse", children: [
              _jsxDEV("thead", { children:
                _jsxDEV("tr", { className: "border-b-2 border-gray-900", children: [
                  _jsxDEV("th", { className: "py-4 text-sm font-black text-gray-900 uppercase", children: "품목명" }, void 0, false),
                  _jsxDEV("th", { className: "py-4 text-sm font-black text-gray-900 uppercase", children: "카테고리" }, void 0, false),
                  _jsxDEV("th", { className: "py-4 text-sm font-black text-gray-900 uppercase text-center", children: "수량" }, void 0, false),
                  _jsxDEV("th", { className: "py-4 text-sm font-black text-gray-900 uppercase text-right", children: "단가" }, void 0, false),
                  _jsxDEV("th", { className: "py-4 text-sm font-black text-gray-900 uppercase text-right", children: "합계" }, void 0, false)] }, void 0, true
                ) }, void 0, false
              ),
              _jsxDEV("tbody", { className: "divide-y divide-gray-100", children:
                selectedOrderDetails.map((item) =>
                _jsxDEV("tr", { className: "hover:bg-gray-50/50", children: [
                  _jsxDEV("td", { className: "py-5", children: [
                    _jsxDEV("div", { className: "font-bold text-gray-800", children: item.itemName }, void 0, false),
                    _jsxDEV("div", { className: "text-xs text-gray-400 mt-1", children: item.spec }, void 0, false)] }, void 0, true
                  ),
                  _jsxDEV("td", { className: "py-5 text-sm text-gray-500", children: item.categoryName }, void 0, false),
                  _jsxDEV("td", { className: "py-5 text-sm font-black text-center", children: item.quantity }, void 0, false),
                  _jsxDEV("td", { className: "py-5 text-sm text-gray-500 text-right", children: [item.unitPrice?.toLocaleString(), "원"] }, void 0, true),
                  _jsxDEV("td", { className: "py-5 text-sm font-black text-emerald-600 text-right", children: [item.totalPrice?.toLocaleString(), "원"] }, void 0, true)] }, item.orderItemSeq, true
                )
                ) }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "px-10 py-8 bg-gray-50 border-t border-gray-100 flex justify-end items-center gap-6", children: [
            _jsxDEV("div", { className: "text-right", children: [
              _jsxDEV("span", { className: "text-gray-400 font-bold text-sm uppercase tracking-widest mr-4", children: "최종 결제 금액" }, void 0, false),
              _jsxDEV("span", { className: "text-3xl font-black text-gray-900", children: [
                selectedOrderDetails.reduce((sum, item) => sum + (item.totalPrice || 0), 0).toLocaleString(), "원"] }, void 0, true
              )] }, void 0, true
            ),
            _jsxDEV("button", {
              onClick: closeModal,
              className: "bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-black transition-all shadow-lg shadow-gray-200", children:
              "닫기" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        ) }, void 0, false
      )] }, void 0, true

    ));

}

export default PartnerOrderPage;