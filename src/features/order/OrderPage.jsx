import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOrder } from './hooks/useOrder';
import authStore from '../../store/authStore';

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { webSocketMe, getOrderDetail } from '../../apis/orderApi';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






function OrderPage() {
  const { orders, setOrders, keyword, filterStatus, dateRange, handleKeywordChange, fetchSearch, reset, handleFilterChange, handleDateRangeChange } = useOrder();
  const navigate = useNavigate();


  const selectedStoreSeq = authStore((state) => state.selectedStoreSeq);

  const stompClientRef = useRef(null);

  const [liveOrderStatus, setLiveOrderStatus] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortType, setSortType] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchWebSocketMe = async () => {
      try {
        const data = await webSocketMe();
        setUserSeq(data);
      } catch (err) {
        console.error('웹소켓 사용자 조회 실패:', err);
      }
    };
    fetchWebSocketMe();
  }, []);
  useEffect(() => {
    if (!selectedStoreSeq) return;

    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:80';
    const socket = new SockJS(`${baseURL}/ws`, null, {
      transports: ['websocket']
    });

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {


        client.subscribe(`/sub/order/${selectedStoreSeq}`, (message) => {
          const data = JSON.parse(message.body);

          setLiveOrderStatus(data.status);


          setOrders((prevOrders) =>
          prevOrders.map((order) =>
          order.orderSeq === data.orderSeq ?
          { ...order, status: data.status } :
          order
          )
          );
        });
      },

      onStompError: (frame) => {
        console.error('STOMP 에러:', frame);
      },

      onWebSocketError: (error) => {
        console.error('웹소켓 연결 에러:', error);
      }
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [selectedStoreSeq]);


  const statusSteps = [
  { key: 'REQUESTED', label: '발주신청', icon: '📝' },
  { key: 'ACCEPTED', label: '접수완료', icon: '📩' },
  { key: 'PREPARING', label: '상품준비', icon: '📦' },
  { key: 'SHIPPING', label: '배송중', icon: '🚚' },
  { key: 'DELIVERED', label: '배송완료', icon: '📬' }];



  const getOrderStatus = (order) => {
    const status = String(order.status || order.orderStatus || '').trim();
    const statusMap = {
      발주신청: 'REQUESTED',
      접수완료: 'ACCEPTED',
      상품준비: 'PREPARING',
      배송중: 'SHIPPING',
      배송완료: 'DELIVERED'
    };
    return statusMap[status] || status;
  };

  const statusCounts = {
    REQUESTED: orders.filter((order) => getOrderStatus(order) === 'REQUESTED').length,
    ACCEPTED: orders.filter((order) => getOrderStatus(order) === 'ACCEPTED').length,
    PREPARING: orders.filter((order) => getOrderStatus(order) === 'PREPARING').length,
    SHIPPING: orders.filter((order) => getOrderStatus(order) === 'SHIPPING').length,
    DELIVERED: orders.filter((order) => getOrderStatus(order) === 'DELIVERED').length
  };


  const statusColors = {
    REQUESTED: 'bg-blue-100 text-blue-700 border-blue-200',
    ACCEPTED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    PREPARING: 'bg-amber-100 text-amber-700 border-amber-200',
    SHIPPING: 'bg-purple-100 text-purple-700 border-purple-200',
    DELIVERED: 'bg-gray-200 text-gray-700 border-gray-300'
  };


  const handleOpenDetail = async (orderSeq) => {
    try {
      const data = await getOrderDetail(orderSeq);

      setSelectedOrder(data);
      setIsDetailOpen(true);
    } catch (error) {
      console.error('상세 조회 실패:', error);
      alert('발주 상세 조회에 실패했습니다.');
    }
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedOrder(null);
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortType === 'latest') {
      return Number(b.orderSeq || 0) - Number(a.orderSeq || 0);
    }

    if (sortType === 'high') {
      return Number(b.totalAmount || 0) - Number(a.totalAmount || 0);
    }

    if (sortType === 'low') {
      return Number(a.totalAmount || 0) - Number(b.totalAmount || 0);
    }

    return 0;
  });

  const ordersPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / ordersPerPage));
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const pagesPerGroup = 10;
  const currentPageGroup = Math.floor((currentPage - 1) / pagesPerGroup);
  const firstVisiblePage = currentPageGroup * pagesPerGroup + 1;
  const lastVisiblePage = Math.min(firstVisiblePage + pagesPerGroup - 1, totalPages);
  const visiblePageNumbers = Array.from(
    { length: lastVisiblePage - firstVisiblePage + 1 },
    (_, index) => firstVisiblePage + index
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    _jsxDEV("div", { className: "min-h-screen bg-[#F8F9FA] text-gray-800 font-sans", children:
      _jsxDEV("main", { className: "max-w-7xl mx-auto px-6 py-10", children: [

        _jsxDEV("div", { className: "flex justify-between items-start mb-10", children:
          _jsxDEV("div", { children: [
            _jsxDEV("h2", { className: "text-4xl font-black text-gray-900 tracking-tight mb-3", children: "일반 발주 현황" }, void 0, false),
            _jsxDEV("div", { className: "flex items-center gap-3", children: [
              _jsxDEV("span", { className: "px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-black uppercase tracking-wider", children: "Business Mode" }, void 0, false),
              _jsxDEV("p", { className: "text-gray-500 font-semibold text-sm", children: "매장의 발주 상태를 실시간으로 모니터링하세요." }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ) }, void 0, false
        ),


        _jsxDEV("div", { className: "mb-3 flex items-center justify-between", children:
          _jsxDEV("h3", { className: "text-xl font-bold text-gray-800 flex items-center gap-2", children: [
            _jsxDEV("span", { className: "w-1.5 h-6 bg-emerald-500 rounded-full" }, void 0, false), "발주 현황"] }, void 0, true

          ) }, void 0, false
        ),


        _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-4 mb-10", children:
          [
          { label: '전체 발주', value: orders.length, color: 'border-gray-200', text: 'text-gray-900' },
          { label: '승인 대기', value: statusCounts.REQUESTED, color: 'border-orange-200', text: 'text-orange-600' },
          { label: '접수 완료', value: statusCounts.ACCEPTED, color: 'border-emerald-200', text: 'text-emerald-600' },
          { label: '배송 중', value: statusCounts.SHIPPING, color: 'border-blue-200', text: 'text-blue-600' },
          { label: '배송 완료', value: statusCounts.DELIVERED, color: 'border-gray-200', text: 'text-gray-700' }].
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


        _jsxDEV("div", { className: "bg-white rounded-[32px] border border-gray-100 p-4 shadow-sm mb-8", children: [
          _jsxDEV("div", { className: "flex flex-col lg:flex-row gap-4", children: [
            _jsxDEV("div", { className: "flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl", children: [
              _jsxDEV("span", { className: "text-xs font-black text-gray-600 px-3 uppercase tracking-tighter", children: "조회 기간" }, void 0, false),
              ['오늘', '7일', '1개월', '3개월'].map((range) =>
              _jsxDEV("button", {

                onClick: () => handleDateRangeChange(range),
                className: `px-5 py-2 rounded-xl text-xs font-bold transition-all ${dateRange === range ? 'bg-white text-emerald-600 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`, children:

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
              [
              { name: '전체', activeClass: 'bg-gray-900 text-white shadow-lg shadow-gray-200' },
              { name: '대기중', activeClass: 'bg-orange-500 text-white shadow-lg shadow-orange-100' },
              { name: '접수완료', activeClass: 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' },
              { name: '배송중', activeClass: 'bg-blue-600 text-white shadow-lg shadow-blue-100' },
              { name: '배송완료', activeClass: 'bg-gray-700 text-white shadow-lg shadow-gray-200' }].
              map((status) =>
              _jsxDEV("button", {

                onClick: () => handleFilterChange(status.name),
                className: `px-5 py-2 rounded-xl text-xs font-black transition-all transform active:scale-95 ${filterStatus === status.name ? status.activeClass : 'text-gray-400 hover:bg-white hover:text-gray-600'}`, children:

                status.name }, status.name, false
              )
              )] }, void 0, true
            )] }, void 0, true
          ),
          _jsxDEV("div", { className: "mt-4 flex gap-4", children: [
            _jsxDEV("div", { className: "relative flex-grow", children: [
              _jsxDEV("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", children: "🔍" }, void 0, false),
              _jsxDEV("input", {
                type: "text",
                value: keyword,
                onChange: handleKeywordChange,
                onKeyDown: (e) => e.key === 'Enter' && fetchSearch(),
                placeholder: "발주 번호, 공급업체, 또는 품목명을 입력하세요",
                className: "w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("button", { onClick: fetchSearch, className: "bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-black transition-all", children: "검색하기" }, void 0, false),
            _jsxDEV("button", { onClick: reset, className: "bg-white border border-gray-200 text-gray-400 px-4 py-4 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all", children: "🔄 초기화" }, void 0, false)] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden", children: [
          _jsxDEV("div", { className: "px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-white", children: [
            _jsxDEV("h3", { className: "font-black text-gray-900 flex items-center gap-2", children: [
              _jsxDEV("span", { className: "w-2.5 h-2.5 bg-emerald-500 rounded-full" }, void 0, false), "발주 상세 목록 ",
              _jsxDEV("span", { className: "text-gray-500 font-medium ml-1 text-sm", children: [orders.length, "건"] }, void 0, true)] }, void 0, true
            ),
            _jsxDEV("div", { className: "flex gap-4", children:
              _jsxDEV("select", {
                value: sortType,
                onChange: (e) => {
                  setSortType(e.target.value);
                  setCurrentPage(1);
                },
                className: "text-xs font-bold text-gray-500 bg-gray-50 border-none rounded-lg px-3 py-1.5 outline-none", children: [

                _jsxDEV("option", { value: "latest", children: "최신순" }, void 0, false),
                _jsxDEV("option", { value: "high", children: "금액 높은순" }, void 0, false),
                _jsxDEV("option", { value: "low", children: "금액 낮은순" }, void 0, false)] }, void 0, true
              ) }, void 0, false
            )] }, void 0, true
          ),
          _jsxDEV("table", { className: "w-full text-left border-collapse", children: [
            _jsxDEV("thead", { children:
              _jsxDEV("tr", { className: "bg-gray-50/50", children: [
                _jsxDEV("th", { className: "px-18 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50", children: "발주번호" }, void 0, false),
                _jsxDEV("th", { className: "px-16 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50", children: "공급업체" }, void 0, false),
                _jsxDEV("th", { className: "px-15 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50", children: "발주 품목" }, void 0, false),
                _jsxDEV("th", { className: "px-7 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50", children: "결제 금액/수단" }, void 0, false),
                _jsxDEV("th", { className: "px-12 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50", children: "상태" }, void 0, false),
                _jsxDEV("th", { className: "px-8 py-5 text-[12px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-50 text-center", children: "관리" }, void 0, false)] }, void 0, true
              ) }, void 0, false
            ),
            _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
              paginatedOrders.map((order) =>
              _jsxDEV("tr", { className: "hover:bg-emerald-50/30 transition-colors group", children: [
                _jsxDEV("td", { className: "px-8 py-6", children:
                  _jsxDEV("div", { className: "text-sm font-black text-gray-900 mb-1", children: order.orderNo }, void 0, false) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-8 py-6", children:
                  _jsxDEV("div", { className: "flex items-center gap-2", children: [
                    _jsxDEV("div", { className: "w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs", children: "🏢" }, void 0, false),
                    _jsxDEV("div", { className: "text-sm font-bold text-gray-700", children: order.companyName || '-' }, void 0, false)] }, void 0, true
                  ) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-8 py-6", children:
                  _jsxDEV("div", { className: "text-sm text-gray-600 font-medium", children: order.itemSummary || '-' }, void 0, false) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-8 py-6", children:
                  _jsxDEV("div", { className: "text-sm font-black text-emerald-600 mb-1", children:
                    order.totalAmount != null ? `${order.totalAmount.toLocaleString()}원` : '-' }, void 0, false
                  ) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-8 py-6", children:
                  _jsxDEV("span", { className: `px-4 py-1.5 rounded-xl text-[10px] font-black border shadow-sm inline-block ${statusColors[getOrderStatus(order)]}`, children:
                    order.status }, void 0, false
                  ) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-8 py-6 text-center", children:
                  _jsxDEV("div", { className: "flex items-center justify-center gap-3", children:
                    _jsxDEV("button", {
                      type: "button",
                      onClick: () => handleOpenDetail(order.orderSeq),
                      className: "p-2 hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-emerald-600 shadow-sm",
                      title: "상세보기", children:
                      "📄" }, void 0, false

                    ) }, void 0, false
                  ) }, void 0, false
                )] }, order.orderSeq, true
              )
              ) }, void 0, false
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "px-8 py-6 bg-gray-50/50 flex justify-center border-t border-gray-50", children:
            _jsxDEV("div", { className: "flex gap-2", children: [
              totalPages > pagesPerGroup &&
              _jsxDEV("button", {
                type: "button",
                onClick: () => setCurrentPage(Math.max(1, firstVisiblePage - pagesPerGroup)),
                disabled: firstVisiblePage === 1,
                "aria-label": "이전 페이지 묶음",
                className: "w-10 h-10 rounded-xl border border-gray-100 bg-white text-sm font-bold text-gray-400 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40", children:
                "<" }, void 0, false

              ),


              visiblePageNumbers.map((n) =>
              _jsxDEV("button", {

                type: "button",
                onClick: () => setCurrentPage(n),
                className: `w-10 h-10 rounded-xl font-bold text-sm transition-all ${n === currentPage ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-gray-100 border border-gray-100'}`, children:

                n }, n, false
              )
              ),

              totalPages > pagesPerGroup &&
              _jsxDEV("button", {
                type: "button",
                onClick: () => setCurrentPage(Math.min(totalPages, lastVisiblePage + 1)),
                disabled: lastVisiblePage === totalPages,
                "aria-label": "다음 페이지 묶음",
                className: "w-10 h-10 rounded-xl border border-gray-100 bg-white text-sm font-bold text-gray-400 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40", children:
                ">" }, void 0, false

              )] }, void 0, true

            ) }, void 0, false
          )] }, void 0, true
        ),
        isDetailOpen && selectedOrder &&
        _jsxDEV("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/40", children:
          _jsxDEV("div", { className: "w-[700px] max-w-[90vw] rounded-[28px] bg-white p-8 shadow-xl", children: [
            _jsxDEV("div", { className: "mb-6 flex items-center justify-between", children: [
              _jsxDEV("h3", { className: "text-2xl font-black text-gray-900", children: "발주 상세" }, void 0, false),
              _jsxDEV("button", {
                onClick: handleCloseDetail,
                className: "rounded-xl bg-gray-100 px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-200", children:
                "닫기" }, void 0, false

              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "mb-6 rounded-2xl bg-gray-50 p-5 text-sm font-bold text-gray-700", children: [
              _jsxDEV("p", { children: ["발주번호: ", selectedOrder.orderInfo?.orderNo] }, void 0, true),
              _jsxDEV("p", { children: ["공급업체: ", selectedOrder.orderInfo?.companyName] }, void 0, true),
              _jsxDEV("p", { children: ["상태: ", selectedOrder.orderInfo?.status] }, void 0, true),
              _jsxDEV("p", { children: ["총 금액: ", Number(selectedOrder.orderInfo?.totalAmount || 0).toLocaleString(), "원"] }, void 0, true),
              _jsxDEV("p", { children: ["배송지: (", selectedOrder.orderInfo?.zonecode, ") ", selectedOrder.orderInfo?.address1, " ", selectedOrder.orderInfo?.address2] }, void 0, true),
              _jsxDEV("p", { children: ["요청사항: ", selectedOrder.orderInfo?.orderMemo || '-'] }, void 0, true)] }, void 0, true
            ),

            _jsxDEV("table", { className: "w-full text-left", children: [
              _jsxDEV("thead", { children:
                _jsxDEV("tr", { className: "border-b bg-gray-50 text-sm text-gray-500", children: [
                  _jsxDEV("th", { className: "p-3", children: "품목명" }, void 0, false),
                  _jsxDEV("th", { className: "p-3", children: "카테고리" }, void 0, false),
                  _jsxDEV("th", { className: "p-3", children: "수량" }, void 0, false),
                  _jsxDEV("th", { className: "p-3", children: "규격" }, void 0, false),
                  _jsxDEV("th", { className: "p-3", children: "단가" }, void 0, false),
                  _jsxDEV("th", { className: "p-3", children: "합계" }, void 0, false)] }, void 0, true
                ) }, void 0, false
              ),
              _jsxDEV("tbody", { children:
                selectedOrder.items?.map((item) =>
                _jsxDEV("tr", { className: "border-b text-sm", children: [
                  _jsxDEV("td", { className: "p-3 font-bold", children: item.itemName }, void 0, false),
                  _jsxDEV("td", { className: "p-3", children: item.categoryName }, void 0, false),
                  _jsxDEV("td", { className: "p-3", children: item.quantity }, void 0, false),
                  _jsxDEV("td", { className: "p-3", children: item.spec }, void 0, false),
                  _jsxDEV("td", { className: "p-3", children: [Number(item.unitPrice || 0).toLocaleString(), "원"] }, void 0, true),
                  _jsxDEV("td", { className: "p-3", children: [Number(item.totalPrice || 0).toLocaleString(), "원"] }, void 0, true)] }, item.orderItemSeq, true
                )
                ) }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ) }, void 0, false
        )] }, void 0, true

      ) }, void 0, false
    ));

}

export default OrderPage;