import React from 'react';import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";





const DashboardTimelineFeed = ({ history, isLoading, onOpenModal }) => {

  const getTimelineStyle = (reason, transactionType) => {
    if (transactionType === 'ALERT') {
      if (reason && (reason.includes('미달') || reason.includes('부족'))) {
        return { icon: '?', color: 'bg-orange-50 text-orange-600 border-orange-200', dot: 'bg-orange-500' };
      }
      if (reason && (reason.includes('임박') || reason.includes('만료'))) {
        return { icon: '!', color: 'bg-rose-50 text-rose-600 border-rose-200', dot: 'bg-rose-500' };
      }
      return { icon: '?', color: 'bg-purple-50 text-purple-600 border-purple-200', dot: 'bg-purple-500' };
    }

    if (transactionType === 'INCOMING') {
      return { icon: 'i', color: 'bg-blue-50 text-blue-600 border-blue-200', dot: 'bg-blue-500' };
    }
    return { icon: '✓', color: 'bg-emerald-50 text-emerald-600 border-emerald-200', dot: 'bg-emerald-500' };
  };

  return (
    _jsxDEV("div", { className: "bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm h-full flex flex-col", children: [
      _jsxDEV("div", { className: "flex-1 overflow-y-auto pr-4 scrollbar-hide", children:
        isLoading ?
        _jsxDEV("div", { className: "py-10 text-center text-gray-400 font-medium", children: "데이터를 불러오는 중..." }, void 0, false) :
        history && history.length > 0 ?
        _jsxDEV("div", { className: "space-y-8", children:
          history.map((item, index) => {
            const style = getTimelineStyle(item.reason, item.transactionType);
            const isLast = index === history.length - 1;
            const isAlert = item.transactionType === 'ALERT';

            return (
              _jsxDEV("div", { className: "relative flex gap-6", children: [

                !isLast &&
                _jsxDEV("div", { className: "absolute left-6 top-14 bottom-[-32px] w-0.5 bg-gray-100" }, void 0, false),



                _jsxDEV("div", { className: `w-12 h-12 rounded-2xl flex items-center justify-center border font-black text-lg z-10 bg-white ${style.color}`, children:
                  style.icon }, void 0, false
                ),


                _jsxDEV("div", { className: "flex-1 pt-2", children: [
                  _jsxDEV("div", { className: "flex items-center justify-between mb-2", children: [
                    _jsxDEV("div", { className: "flex items-center gap-2", children: [
                      _jsxDEV("span", { className: `w-2 h-2 rounded-full ${style.dot}` }, void 0, false),
                      _jsxDEV("h4", { className: `text-[16px] font-black ${
                        style.dot === 'bg-rose-500' || style.dot === 'bg-orange-500' ? 'text-gray-900' : 'text-gray-700'}`, children:

                        isAlert ? item.reason :
                        _jsxDEV(_Fragment, { children: [
                          item.detailStockName || '이름 없음',
                          item.transactionType === 'INCOMING' ? ' 입고' :
                          item.transactionType === 'OUTBOUND' ? ' 출고' : ' 조정'] }, void 0, true
                        ) }, void 0, false

                      )] }, void 0, true
                    ),
                    _jsxDEV("span", { className: "text-[12px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md", children:
                      item.createdAt?.replace('T', ' ') }, void 0, false
                    )] }, void 0, true
                  ),
                  _jsxDEV("p", { className: "text-[14px] font-medium text-gray-500 mb-2 leading-relaxed", children:
                    isAlert ?
                    _jsxDEV("span", { className: "text-gray-900 font-bold", children: item.detailStockName }, void 0, false) :

                    _jsxDEV(_Fragment, { children: [
                      item.reason || '사유 없음',
                      _jsxDEV("span", { className: "ml-2 font-black text-gray-900", children: [
                        item.transactionType === 'INCOMING' ? `+${item.changeQuantity}` : item.changeQuantity, "개"] }, void 0, true
                      )] }, void 0, true
                    ) }, void 0, false

                  ),
                  item.memo &&
                  _jsxDEV("div", { className: "bg-gray-50 rounded-xl p-3 border border-gray-100/50", children:
                    _jsxDEV("p", { className: "text-[13px] text-gray-400 font-medium", children:
                      item.memo }, void 0, false
                    ) }, void 0, false
                  )] }, void 0, true

                )] }, item.historySeq, true
              ));

          }) }, void 0, false
        ) :

        _jsxDEV("div", { className: "py-20 text-center", children: [
          _jsxDEV("div", { className: "text-4xl mb-4 opacity-20", children: "🕒" }, void 0, false),
          _jsxDEV("p", { className: "text-gray-400 font-medium", children: "타임라인 이력이 없습니다." }, void 0, false)] }, void 0, true
        ) }, void 0, false

      ),

      _jsxDEV("button", {
        onClick: onOpenModal,
        className: "mt-6 w-full py-4 rounded-2xl border-2 border-gray-100 text-[14px] font-black text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all hover:shadow-lg active:scale-95", children:
        "과거 타임라인 더 불러오기" }, void 0, false

      )] }, void 0, true
    ));

};

export default DashboardTimelineFeed;