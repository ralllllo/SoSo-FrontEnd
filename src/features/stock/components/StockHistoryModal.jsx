import React, { useState, useEffect } from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const StockHistoryModal = ({ isOpen, onClose, stock, fetchDetailData }) => {
  const [data, setData] = useState({ batches: [], histories: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && stock?.stockSeq) {
      const loadData = async () => {
        setIsLoading(true);
        try {
          const result = await fetchDetailData(stock.stockSeq);
          setData(result);
        } catch (error) {
          alert('상세 정보를 불러오는 중 오류가 발생했습니다.');
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    }
  }, [isOpen, stock, fetchDetailData]);

  if (!isOpen) return null;

  return (
    _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in", children:
      _jsxDEV("div", { className: "bg-white w-full max-w-6xl rounded-[3rem] shadow-2xl overflow-hidden animate-scale-up flex flex-col max-h-[90vh] border border-white/20", children: [

        _jsxDEV("div", { className: "px-10 py-8 flex items-center justify-between border-b border-gray-50", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("div", { className: "flex items-center gap-2 mb-2" }, void 0, false
            ),
            _jsxDEV("h3", { className: "text-3xl font-black text-gray-900 tracking-tight", children: "재고 상세 및 변동 이력" }, void 0, false),
            _jsxDEV("p", { className: "text-[15px] text-gray-400 font-medium mt-1", children: [
              _jsxDEV("span", { className: "text-emerald-600 font-black", children: stock.stockName }, void 0, false), " 품목의 실시간 보유 현황과 모든 변동 내역입니다."] }, void 0, true
            )] }, void 0, true
          ),
          _jsxDEV("button", {
            onClick: onClose,
            className: "w-12 h-12 flex items-center justify-center rounded-[1.25rem] bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all active:scale-90", children:

            _jsxDEV("span", { className: "text-2xl", children: "✕" }, void 0, false) }, void 0, false
          )] }, void 0, true
        ),

        _jsxDEV("div", { className: "flex-1 overflow-y-auto px-10 py-8 space-y-12 scrollbar-hide", children: [

          _jsxDEV("section", { children: [
            _jsxDEV("div", { className: "flex items-center gap-3 mb-6", children: [
              _jsxDEV("div", { className: "w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-xl", children: "📦" }, void 0, false),
              _jsxDEV("h4", { className: "text-xl font-black text-gray-900 tracking-tight", children: "현재 보유 재고" }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("div", { className: "bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm", children:
              _jsxDEV("table", { className: "w-full text-left border-collapse", children: [
                _jsxDEV("thead", { className: "bg-gray-50/50 border-b border-gray-100", children:
                  _jsxDEV("tr", { children: [
                    _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "입고일" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "상세 품목명" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "남은 수량" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "입고 단가" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "유통기한" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "로트번호" }, void 0, false)] }, void 0, true
                  ) }, void 0, false
                ),
                _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
                  isLoading ?
                  _jsxDEV("tr", { children: _jsxDEV("td", { colSpan: "6", className: "px-6 py-10 text-center text-gray-400 font-medium", children: "데이터를 불러오는 중..." }, void 0, false) }, void 0, false) :
                  data.batches.length > 0 ?
                  data.batches.map((batch, idx) =>
                  _jsxDEV("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
                    _jsxDEV("td", { className: "px-6 py-4 text-sm text-gray-500 text-center font-medium", children: batch.incomingDate }, void 0, false),
                    _jsxDEV("td", { className: "px-6 py-4 text-[15px] font-black text-gray-900 text-center", children: batch.detailStockName }, void 0, false),
                    _jsxDEV("td", { className: "px-6 py-4 text-center", children: [
                      _jsxDEV("span", { className: "text-[16px] font-black text-emerald-600", children: batch.currentQuantity.toLocaleString() }, void 0, false),
                      _jsxDEV("span", { className: "text-[11px] text-gray-400 ml-1 font-bold", children: stock.unit || 'EA' }, void 0, false)] }, void 0, true
                    ),
                    _jsxDEV("td", { className: "px-6 py-4 text-sm text-gray-900 text-center font-bold", children: [batch.incomingPrice.toLocaleString(), "원"] }, void 0, true),
                    _jsxDEV("td", { className: "px-6 py-4 text-center", children:
                      _jsxDEV("span", { className: "px-3 py-1 bg-rose-50 text-rose-600 text-[12px] font-black rounded-lg border border-rose-100 italic", children:
                        batch.expirationDate }, void 0, false
                      ) }, void 0, false
                    ),
                    _jsxDEV("td", { className: "px-6 py-4 text-[11px] font-mono text-gray-300 text-center uppercase tracking-tighter", children: batch.lotNumber }, void 0, false)] }, idx, true
                  )
                  ) :

                  _jsxDEV("tr", { children: _jsxDEV("td", { colSpan: "6", className: "px-6 py-20 text-center", children: [
                      _jsxDEV("div", { className: "text-4xl mb-4 opacity-20", children: "📦" }, void 0, false),
                      _jsxDEV("p", { className: "text-gray-400 font-medium", children: "보유 중인 상세 재고가 없습니다." }, void 0, false)] }, void 0, true
                    ) }, void 0, false) }, void 0, false

                )] }, void 0, true
              ) }, void 0, false
            )] }, void 0, true
          ),


          _jsxDEV("section", { children: [
            _jsxDEV("div", { className: "flex items-center gap-3 mb-6", children: [
              _jsxDEV("div", { className: "w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-xl", children: "📊" }, void 0, false),
              _jsxDEV("h4", { className: "text-xl font-black text-gray-900 tracking-tight", children: "최근 재고 변동 이력" }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("div", { className: "bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm", children:
              _jsxDEV("table", { className: "w-full text-left border-collapse", children: [
                _jsxDEV("thead", { className: "bg-gray-50/50 border-b border-gray-100", children:
                  _jsxDEV("tr", { children: [
                    _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "일시" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "구분" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "품목명" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "변동수량" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "최종재고" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "사유" }, void 0, false),
                    _jsxDEV("th", { className: "px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "메모" }, void 0, false)] }, void 0, true
                  ) }, void 0, false
                ),
                _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
                  isLoading ?
                  _jsxDEV("tr", { children: _jsxDEV("td", { colSpan: "7", className: "px-6 py-10 text-center text-gray-400 font-medium", children: "데이터를 불러오는 중..." }, void 0, false) }, void 0, false) :
                  data.histories.length > 0 ?
                  data.histories.map((hist, idx) =>
                  _jsxDEV("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
                    _jsxDEV("td", { className: "px-6 py-4 text-[11px] text-gray-400 text-center font-bold uppercase", children: hist.createdAt?.replace('T', ' ') }, void 0, false),
                    _jsxDEV("td", { className: "px-6 py-4 text-center", children:
                      _jsxDEV("span", { className: `px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        hist.transactionType === 'INCOMING' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        hist.transactionType === 'OUTBOUND' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                        'bg-amber-50 text-amber-600 border-amber-100'}`, children:

                        hist.transactionType === 'INCOMING' ? '입고' :
                        hist.transactionType === 'OUTBOUND' ? '출고' : '조정' }, void 0, false
                      ) }, void 0, false
                    ),
                    _jsxDEV("td", { className: "px-6 py-4 text-sm text-gray-900 text-center font-bold", children: hist.detailStockName || '-' }, void 0, false),
                    _jsxDEV("td", { className: `px-6 py-4 text-center font-black ${
                      hist.transactionType === 'INCOMING' ? 'text-blue-600' : 'text-rose-500'}`, children:

                      _jsxDEV("span", { className: "text-[16px]", children: hist.transactionType === 'INCOMING' ? `+${hist.changeQuantity}` : hist.changeQuantity }, void 0, false) }, void 0, false
                    ),
                    _jsxDEV("td", { className: "px-6 py-4 text-[16px] font-black text-gray-900 text-center", children: hist.currentTotalStock.toLocaleString() }, void 0, false),
                    _jsxDEV("td", { className: "px-6 py-4 text-sm text-gray-500 text-center font-medium", children: hist.reason || '-' }, void 0, false),
                    _jsxDEV("td", { className: "px-6 py-4 text-sm text-gray-500 text-center font-medium", children: hist.memo || '-' }, void 0, false)] }, idx, true
                  )
                  ) :

                  _jsxDEV("tr", { children: _jsxDEV("td", { colSpan: "7", className: "px-6 py-20 text-center", children: [
                      _jsxDEV("div", { className: "text-4xl mb-4 opacity-20", children: "📊" }, void 0, false),
                      _jsxDEV("p", { className: "text-gray-400 font-medium", children: "변동 이력이 존재하지 않습니다." }, void 0, false)] }, void 0, true
                    ) }, void 0, false) }, void 0, false

                )] }, void 0, true
              ) }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "px-10 py-6 bg-gray-50/50 border-t border-gray-50 flex justify-end", children:
          _jsxDEV("button", {
            onClick: onClose,
            className: "px-10 py-4 bg-gray-900 text-white text-[14px] font-black rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-gray-200 active:scale-95", children:
            "기록 창 닫기" }, void 0, false

          ) }, void 0, false
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default StockHistoryModal;