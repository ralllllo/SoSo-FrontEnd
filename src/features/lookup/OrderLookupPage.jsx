import React, { useState, useEffect } from 'react';
import { useOrderLookup } from './hooks/useOrderLookup';
import OrderDetailModal from './components/OrderDetailModal';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const OrderLookupPage = () => {
  const [params, setParams] = useState({
    status: 'ALL',
    startDate: '',
    endDate: '',
    keyword: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { orders, isLoading, orderDetail, setOrderDetail, fetchOrders, fetchOrderDetail } = useOrderLookup();

  useEffect(() => {
    fetchOrders(params);
  }, [fetchOrders, params]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleOrderClick = (orderSeq) => {
    fetchOrderDetail(orderSeq);
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(orders.length / itemsPerPage) || 1;
  const displayedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    _jsxDEV("div", { className: "p-8 max-w-7xl mx-auto", children: [
      _jsxDEV("header", { className: "mb-8 flex justify-between items-end", children:
        _jsxDEV("div", { children: [
          _jsxDEV("div", { className: "flex items-center gap-2 mb-2", children: [
            _jsxDEV("span", { className: "w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-sm", children: "📄" }, void 0, false),
            _jsxDEV("span", { className: "text-[11px] font-black text-emerald-500 uppercase tracking-widest", children: "Orders" }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("h1", { className: "text-3xl font-black text-gray-900 tracking-tight", children: "발주 이력 조회" }, void 0, false),
          _jsxDEV("p", { className: "text-sm text-gray-400 font-medium mt-1", children: "과거에 진행된 모든 발주 내역을 확인하고 관리합니다." }, void 0, false)] }, void 0, true
        ) }, void 0, false
      ),


      _jsxDEV("div", { className: "bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-5 gap-4 items-end", children: [
        _jsxDEV("div", { className: "md:col-span-2", children: [
          _jsxDEV("label", { className: "block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 ml-1", children: "조회 기간" }, void 0, false),
          _jsxDEV("div", { className: "flex items-center gap-3", children: [
            _jsxDEV("input", {
              type: "date",
              name: "startDate",
              value: params.startDate,
              onChange: handleFilterChange,
              className: "flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 min-w-[130px]" }, void 0, false
            ),
            _jsxDEV("span", { className: "text-gray-300 shrink-0 font-bold", children: "~" }, void 0, false),
            _jsxDEV("input", {
              type: "date",
              name: "endDate",
              value: params.endDate,
              onChange: handleFilterChange,
              className: "flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 min-w-[130px]" }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        ),
        _jsxDEV("div", { className: "md:col-span-1", children: [
          _jsxDEV("label", { className: "block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 ml-1", children: "발주 상태" }, void 0, false),
          _jsxDEV("select", {
            name: "status",
            value: params.status,
            onChange: handleFilterChange,
            className: "w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500 appearance-none", children: [

            _jsxDEV("option", { value: "ALL", children: "전체 보기" }, void 0, false),
            _jsxDEV("option", { value: "REQUESTED", children: "발주 신청" }, void 0, false),
            _jsxDEV("option", { value: "ACCEPTED", children: "접수 완료" }, void 0, false),
            _jsxDEV("option", { value: "PREPARING", children: "상품 준비중" }, void 0, false),
            _jsxDEV("option", { value: "SHIPPING", children: "배송중" }, void 0, false),
            _jsxDEV("option", { value: "DELIVERED", children: "배송 완료" }, void 0, false),
            _jsxDEV("option", { value: "COMPLETED", children: "거래 완료" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ),
        _jsxDEV("div", { className: "md:col-span-2", children: [
          _jsxDEV("label", { className: "block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 ml-1", children: "검색어 (발주번호/거래처명)" }, void 0, false),
          _jsxDEV("input", {
            type: "text",
            name: "keyword",
            placeholder: "검색어를 입력하세요...",
            value: params.keyword,
            onChange: handleFilterChange,
            className: "w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500" }, void 0, false
          )] }, void 0, true
        )] }, void 0, true
      ),


      _jsxDEV("div", { className: "space-y-4", children:
        isLoading ?
        _jsxDEV("div", { className: "bg-white p-20 rounded-[3rem] text-center text-gray-400 font-bold animate-pulse", children: "발주 내역을 불러오는 중..." }, void 0, false) :
        displayedOrders.length > 0 ?
        displayedOrders.map((order) =>
        _jsxDEV("div", {

          onClick: () => handleOrderClick(order.orderSeq),
          className: "group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-100/30 transition-all flex items-center justify-between cursor-pointer", children: [

          _jsxDEV("div", { className: "flex items-center gap-8", children: [
            _jsxDEV("div", { className: "w-16 h-16 rounded-2xl bg-gray-50 flex flex-col items-center justify-center", children: [
              _jsxDEV("span", { className: "text-[10px] font-black text-gray-300 uppercase leading-none mb-1", children: "Status" }, void 0, false),
              _jsxDEV("div", { className: `w-2 h-2 rounded-full ${
                order.status === 'DELIVERED' || order.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-amber-500'}` }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("div", { children: [
              _jsxDEV("div", { className: "flex items-center gap-3 mb-1", children: [
                _jsxDEV("span", { className: "text-[12px] font-mono text-gray-300 font-bold", children: order.orderNo }, void 0, false),
                _jsxDEV("span", { className: `px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                  order.status === 'DELIVERED' || order.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`, children:

                  order.status }, void 0, false
                )] }, void 0, true
              ),
              _jsxDEV("h3", { className: "text-xl font-black text-gray-900 mb-1", children: order.companyName }, void 0, false),
              _jsxDEV("p", { className: "text-sm text-gray-400 font-medium", children: order.itemSummary }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ),
          _jsxDEV("div", { className: "text-right flex items-center gap-12", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("div", { className: "text-[11px] font-black text-gray-300 uppercase tracking-widest mb-1", children: "Total Amount" }, void 0, false),
              _jsxDEV("div", { className: "text-xl font-black text-gray-900", children: [order.totalAmount?.toLocaleString(), "원"] }, void 0, true)] }, void 0, true
            ),
            _jsxDEV("div", { children: [
              _jsxDEV("div", { className: "text-[11px] font-black text-gray-300 uppercase tracking-widest mb-1", children: "Order Date" }, void 0, false),
              _jsxDEV("div", { className: "text-sm font-bold text-gray-500", children: order.createdAt?.split('T')[0] }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("button", { className: "w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-all", children: "→" }, void 0, false

            )] }, void 0, true
          )] }, order.orderSeq, true
        )
        ) :

        _jsxDEV("div", { className: "bg-white p-32 rounded-[3rem] border border-dashed border-gray-200 text-center", children: [
          _jsxDEV("div", { className: "text-5xl mb-6 opacity-20", children: "📄" }, void 0, false),
          _jsxDEV("p", { className: "text-gray-400 font-bold", children: "발주 이력이 존재하지 않습니다." }, void 0, false)] }, void 0, true
        ) }, void 0, false

      ),


      !isLoading && orders.length > 0 &&
      _jsxDEV("div", { className: "mt-8 flex justify-center items-center gap-2", children: [
        _jsxDEV("button", {
          onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
          disabled: currentPage === 1,
          className: "w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-all", children:
          "←" }, void 0, false

        ),
        (() => {
          const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
          const endPage = Math.min(startPage + 9, totalPages);
          const pageButtons = [];
          for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
              _jsxDEV("button", {

                onClick: () => setCurrentPage(i),
                className: `w-10 h-10 rounded-xl font-black text-sm transition-all ${
                currentPage === i ?
                'bg-emerald-600 text-white shadow-lg shadow-emerald-200' :
                'bg-white text-gray-400 hover:text-gray-900 border border-gray-100'}`, children:


                i }, i, false
              )
            );
          }
          return pageButtons;
        })(),
        _jsxDEV("button", {
          onClick: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)),
          disabled: currentPage === totalPages,
          className: "w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-all", children:
          "→" }, void 0, false

        )] }, void 0, true
      ),



      _jsxDEV(OrderDetailModal, {
        isOpen: !!orderDetail,
        onClose: () => setOrderDetail(null),
        detail: orderDetail }, void 0, false
      )] }, void 0, true
    ));

};

export default OrderLookupPage;