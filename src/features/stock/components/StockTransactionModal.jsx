import React from 'react';
import { useStockTransaction } from '../hooks/useStockTransaction';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const StockTransactionModal = ({ isOpen, onClose, selectedStock, onSuccess }) => {
  const {
    activeTab,
    handleTabChange,
    inboundForm,
    outboundForm,
    adjustmentForm,
    batches,
    handleInboundChange,
    handleOutboundChange,
    handleAdjustmentChange,
    handleSubmit,
    isLoading,
    resetForms
  } = useStockTransaction(selectedStock, onClose, onSuccess);


  React.useEffect(() => {
    if (!isOpen) {
      resetForms();
    }
  }, [isOpen]);

  if (!isOpen || !selectedStock) return null;

  const labelStyle = "block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 ml-1";
  const inputStyle = "w-full h-12 px-5 bg-gray-50 border-2 border-transparent rounded-2xl text-[14px] font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all placeholder:text-gray-300";
  const selectStyle = "w-full h-12 px-5 bg-gray-50 border-2 border-transparent rounded-2xl text-[14px] font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all cursor-pointer appearance-none";

  return (
    _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in", children:
      _jsxDEV("div", { className: "bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-up border border-white/20", children: [

        _jsxDEV("div", { className: "px-8 pt-8 pb-4 flex items-center justify-between", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("h3", { className: "text-2xl font-black text-gray-900 tracking-tight", children: selectedStock.stockName }, void 0, false),
            _jsxDEV("p", { className: "text-xs text-gray-400 font-medium mt-1", children: "품목의 재고 수량을 변경합니다." }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("button", {
            onClick: onClose,
            className: "w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all active:scale-90", children:

            _jsxDEV("span", { className: "text-xl", children: "✕" }, void 0, false) }, void 0, false
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "flex p-1.5 bg-gray-100 mx-8 mt-6 rounded-[1.25rem]", children:
          [
          { id: 'INBOUND', label: '📥 입고' },
          { id: 'OUTBOUND', label: '📤 출고' },
          { id: 'ADJUST', label: '⚖️ 조정' }].
          map((tab) =>
          _jsxDEV("button", {

            onClick: () => handleTabChange(tab.id),
            className: `flex-1 py-3 text-[13px] font-black rounded-xl transition-all ${
            activeTab === tab.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`, children:


            tab.label }, tab.id, false
          )
          ) }, void 0, false
        ),


        _jsxDEV("form", { onSubmit: handleSubmit, className: "px-8 pb-8 pt-6 space-y-5", children: [
          activeTab === 'INBOUND' &&
          _jsxDEV("div", { className: "animate-fade-in space-y-5", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: labelStyle, children: ["상세 품목명 ", _jsxDEV("span", { className: "text-rose-500", children: "*" }, void 0, false)] }, void 0, true),
              _jsxDEV("input", {
                type: "text",
                name: "detailStockName",
                value: inboundForm.detailStockName,
                onChange: handleInboundChange,
                placeholder: "예: 국내산 목살 500g",
                className: inputStyle,
                required: true }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: labelStyle, children: ["입고 수량 (", selectedStock.unit, ") ", _jsxDEV("span", { className: "text-rose-500", children: "*" }, void 0, false)] }, void 0, true),
                _jsxDEV("input", {
                  type: "number",
                  name: "quantity",
                  value: inboundForm.quantity,
                  onChange: handleInboundChange,
                  placeholder: "0",
                  className: inputStyle,
                  min: "1",
                  required: true }, void 0, false
                )] }, void 0, true
              ),
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: labelStyle, children: ["입고 단가 (원) ", _jsxDEV("span", { className: "text-rose-500", children: "*" }, void 0, false)] }, void 0, true),
                _jsxDEV("input", {
                  type: "number",
                  name: "incomingPrice",
                  value: inboundForm.incomingPrice,
                  onChange: handleInboundChange,
                  placeholder: "0",
                  className: inputStyle,
                  required: true }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ),


          activeTab === 'OUTBOUND' &&
          _jsxDEV("div", { className: "animate-fade-in space-y-5", children:
            _jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: labelStyle, children: ["출고 수량 (", selectedStock.unit, ") ", _jsxDEV("span", { className: "text-rose-500", children: "*" }, void 0, false)] }, void 0, true),
                _jsxDEV("input", {
                  type: "number",
                  name: "quantity",
                  value: outboundForm.quantity,
                  onChange: handleOutboundChange,
                  placeholder: "0",
                  className: inputStyle,
                  min: "1",
                  required: true }, void 0, false
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "relative", children: [
                _jsxDEV("label", { className: labelStyle, children: ["출고 사유 ", _jsxDEV("span", { className: "text-rose-500", children: "*" }, void 0, false)] }, void 0, true),
                _jsxDEV("select", {
                  name: "reason",
                  value: outboundForm.reason,
                  onChange: handleOutboundChange,
                  className: selectStyle,
                  required: true, children: [

                  _jsxDEV("option", { value: "주방 소진", children: "🍳 주방 소진" }, void 0, false),
                  _jsxDEV("option", { value: "밀키트 제작용", children: "🍱 밀키트 제작" }, void 0, false),
                  _jsxDEV("option", { value: "매장 간 이동", children: "🚚 매장 간 이동" }, void 0, false),
                  _jsxDEV("option", { value: "기타", children: "ETC 기타" }, void 0, false)] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            ) }, void 0, false
          ),


          activeTab === 'ADJUST' &&
          _jsxDEV("div", { className: "animate-fade-in space-y-5", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: labelStyle, children: "조정 대상 배치" }, void 0, false),
              _jsxDEV("div", { className: "relative", children:
                _jsxDEV("select", {
                  name: "batchSeq",
                  value: adjustmentForm.batchSeq,
                  onChange: handleAdjustmentChange,
                  className: selectStyle, children: [

                  _jsxDEV("option", { value: "", children: "전체 재고 통합 조정" }, void 0, false),
                  batches.map((batch) =>
                  _jsxDEV("option", { value: batch.batchSeq, children: [
                    batch.detailStockName, " (남은 재고: ", batch.currentQuantity, ")"] }, batch.batchSeq, true
                  )
                  )] }, void 0, true
                ) }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: labelStyle, children: ["조정 수량 (+/-) ", _jsxDEV("span", { className: "text-rose-500", children: "*" }, void 0, false)] }, void 0, true),
                _jsxDEV("input", {
                  type: "number",
                  name: "quantity",
                  value: adjustmentForm.quantity,
                  onChange: handleAdjustmentChange,
                  placeholder: "예: -5, +2",
                  className: inputStyle,
                  required: true }, void 0, false
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "relative", children: [
                _jsxDEV("label", { className: labelStyle, children: ["조정 사유 ", _jsxDEV("span", { className: "text-rose-500", children: "*" }, void 0, false)] }, void 0, true),
                _jsxDEV("select", {
                  name: "reason",
                  value: adjustmentForm.reason,
                  onChange: handleAdjustmentChange,
                  className: selectStyle,
                  required: true, children: [

                  _jsxDEV("option", { value: "파손/분실", children: "💔 파손/분실" }, void 0, false),
                  _jsxDEV("option", { value: "유통기한 만료/부패", children: "⏰ 만료/부패" }, void 0, false),
                  _jsxDEV("option", { value: "재고 실사 후 수정", children: "📝 실사 결과" }, void 0, false),
                  _jsxDEV("option", { value: "기타", children: "ETC 기타" }, void 0, false)] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ),


          _jsxDEV("div", { children: [
            _jsxDEV("label", { className: labelStyle, children: "추가 메모" }, void 0, false),
            _jsxDEV("input", {
              type: "text",
              name: "memo",
              value: activeTab === 'INBOUND' ? inboundForm.memo : activeTab === 'OUTBOUND' ? outboundForm.memo : adjustmentForm.memo,
              onChange: activeTab === 'INBOUND' ? handleInboundChange : activeTab === 'OUTBOUND' ? handleOutboundChange : handleAdjustmentChange,
              placeholder: "특이사항을 입력하세요 (선택)",
              className: inputStyle }, void 0, false
            )] }, void 0, true
          ),


          _jsxDEV("div", { className: "flex gap-3 pt-4", children: [
            _jsxDEV("button", {
              type: "button",
              onClick: onClose,
              className: "flex-1 h-14 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[14px] font-black rounded-2xl transition-all active:scale-95", children:
              "취소" }, void 0, false

            ),
            _jsxDEV("button", {
              type: "submit",
              disabled: isLoading,
              className: "flex-1 h-14 bg-gray-900 hover:bg-emerald-600 text-white text-[14px] font-black rounded-2xl transition-all shadow-xl shadow-gray-100 active:scale-95 disabled:opacity-50", children:

              isLoading ? '처리 중...' : '데이터 저장하기' }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default StockTransactionModal;