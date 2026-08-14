import React from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const OrderDetailModal = ({ isOpen, onClose, detail }) => {
  if (!isOpen || !detail) return null;

  const { orderInfo, items } = detail;


  const getStatusStyle = (status) => {
    switch (status) {
      case 'DELIVERED':
      case 'COMPLETED':
        return 'bg-emerald-50 text-emerald-600';
      case 'REQUESTED':
        return 'bg-blue-50 text-blue-600';
      default:
        return 'bg-amber-50 text-amber-600';
    }
  };

  return (
    _jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [

      _jsxDEV("div", {
        className: "absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity",
        onClick: onClose }, void 0, false
      ),


      _jsxDEV("div", { className: "relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200", children: [

        _jsxDEV("div", { className: "p-8 border-b border-gray-50 flex justify-between items-start bg-gray-50/30", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("div", { className: "flex items-center gap-3 mb-2", children: [
              _jsxDEV("span", { className: `px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getStatusStyle(orderInfo.status)}`, children:
                orderInfo.status }, void 0, false
              ),
              _jsxDEV("span", { className: "text-xs font-mono text-gray-400 font-bold", children: orderInfo.orderNo }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("h2", { className: "text-2xl font-black text-gray-900 tracking-tight", children: orderInfo.companyName }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("button", {
            onClick: onClose,
            className: "w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all shadow-sm", children:
            "✕" }, void 0, false

          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "p-8 max-h-[70vh] overflow-y-auto", children: [

          _jsxDEV("div", { className: "grid grid-cols-2 gap-8 mb-10", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("h3", { className: "text-[11px] font-black text-gray-300 uppercase tracking-widest mb-3", children: "Order Information" }, void 0, false),
              _jsxDEV("div", { className: "space-y-2", children: [
                _jsxDEV("div", { className: "flex justify-between", children: [
                  _jsxDEV("span", { className: "text-sm font-bold text-gray-400", children: "발주 일자" }, void 0, false),
                  _jsxDEV("span", { className: "text-sm font-black text-gray-700", children: orderInfo.createdAt?.split('T')[0] }, void 0, false)] }, void 0, true
                ),
                _jsxDEV("div", { className: "flex justify-between", children: [
                  _jsxDEV("span", { className: "text-sm font-bold text-gray-400", children: "총 금액" }, void 0, false),
                  _jsxDEV("span", { className: "text-sm font-black text-emerald-600", children: [orderInfo.totalAmount?.toLocaleString(), "원"] }, void 0, true)] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            ),
            _jsxDEV("div", { children: [
              _jsxDEV("h3", { className: "text-[11px] font-black text-gray-300 uppercase tracking-widest mb-3", children: "Shipping Address" }, void 0, false),
              _jsxDEV("p", { className: "text-sm font-black text-gray-700 leading-relaxed", children: ["[",
                orderInfo.zonecode, "]", _jsxDEV("br", {}, void 0, false),
                orderInfo.address1, " ", orderInfo.address2] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ),


          _jsxDEV("div", { className: "mb-10", children: [
            _jsxDEV("h3", { className: "text-[11px] font-black text-gray-300 uppercase tracking-widest mb-4", children: "Order Items" }, void 0, false),
            _jsxDEV("div", { className: "bg-gray-50/50 rounded-3xl border border-gray-100 overflow-hidden", children:
              _jsxDEV("table", { className: "w-full text-left", children: [
                _jsxDEV("thead", { children:
                  _jsxDEV("tr", { className: "border-b border-gray-100", children: [
                    _jsxDEV("th", { className: "px-6 py-4 text-[10px] font-black text-gray-400 uppercase", children: "품목명" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-4 text-[10px] font-black text-gray-400 uppercase text-center", children: "수량" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-4 text-[10px] font-black text-gray-400 uppercase text-right", children: "단가" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-4 text-[10px] font-black text-gray-400 uppercase text-right", children: "합계" }, void 0, false)] }, void 0, true
                  ) }, void 0, false
                ),
                _jsxDEV("tbody", { className: "divide-y divide-gray-100", children:
                  items.map((item) =>
                  _jsxDEV("tr", { className: "group hover:bg-white transition-colors", children: [
                    _jsxDEV("td", { className: "px-6 py-4", children: [
                      _jsxDEV("div", { className: "text-sm font-black text-gray-900", children: item.itemName }, void 0, false),
                      _jsxDEV("div", { className: "text-[11px] font-bold text-gray-400", children: [item.categoryName, " | ", item.spec] }, void 0, true)] }, void 0, true
                    ),
                    _jsxDEV("td", { className: "px-6 py-4 text-sm font-black text-gray-700 text-center", children: item.quantity }, void 0, false),
                    _jsxDEV("td", { className: "px-6 py-4 text-sm font-bold text-gray-400 text-right", children: [item.unitPrice?.toLocaleString(), "원"] }, void 0, true),
                    _jsxDEV("td", { className: "px-6 py-4 text-sm font-black text-gray-900 text-right", children: [item.totalPrice?.toLocaleString(), "원"] }, void 0, true)] }, item.orderItemSeq, true
                  )
                  ) }, void 0, false
                )] }, void 0, true
              ) }, void 0, false
            )] }, void 0, true
          ),


          orderInfo.order_memo &&
          _jsxDEV("div", { children: [
            _jsxDEV("h3", { className: "text-[11px] font-black text-gray-300 uppercase tracking-widest mb-3", children: "Order Memo" }, void 0, false),
            _jsxDEV("div", { className: "p-5 bg-amber-50/30 rounded-2xl border border-amber-100/50 text-sm font-medium text-gray-600 italic", children: ["\"",
              orderInfo.order_memo, "\""] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true

        ),


        _jsxDEV("div", { className: "p-8 bg-gray-50/30 border-t border-gray-50 flex justify-end", children:
          _jsxDEV("button", {
            onClick: onClose,
            className: "px-8 py-3 rounded-2xl bg-gray-900 text-white text-sm font-black hover:bg-gray-800 transition-all shadow-lg shadow-gray-200", children:
            "닫기" }, void 0, false

          ) }, void 0, false
        )] }, void 0, true
      )] }, void 0, true
    ));

};

export default OrderDetailModal;