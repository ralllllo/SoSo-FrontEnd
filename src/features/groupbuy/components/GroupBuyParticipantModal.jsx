import React, { useEffect, useState } from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






const GroupBuyParticipantModal = ({ groupBuy, onClose, getParticipants }) => {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      if (groupBuy) {
        setIsLoading(true);
        const data = await getParticipants(groupBuy.seq);
        setParticipants(data);
        setIsLoading(false);
      }
    };
    fetchParticipants();
  }, [groupBuy, getParticipants]);

  if (!groupBuy) return null;

  return (
    _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children:
      _jsxDEV("div", { className: "bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200", children: [
        _jsxDEV("div", { className: "px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("h3", { className: "text-xl font-black text-gray-900", children: "참여자 리스트" }, void 0, false),
            _jsxDEV("p", { className: "text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5", children: "Participant Directory" }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-full", children:
            _jsxDEV("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children:
              _jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }, void 0, false) }, void 0, false
            ) }, void 0, false
          )] }, void 0, true
        ),

        _jsxDEV("div", { className: "p-8 max-h-[60vh] overflow-y-auto custom-scrollbar", children: [
          _jsxDEV("div", { className: "mb-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100", children: [
            _jsxDEV("h4", { className: "text-sm font-black text-emerald-900 mb-1", children: groupBuy.title }, void 0, false),
            _jsxDEV("div", { className: "flex items-center justify-between", children: [
              _jsxDEV("p", { className: "text-xs text-emerald-600 font-bold", children: ["현재 ", participants.length, "명 참여 중"] }, void 0, true),
              _jsxDEV("span", { className: "text-[10px] font-black text-emerald-500 bg-white px-2 py-0.5 rounded-full border border-emerald-100", children: ["목표 ",
                groupBuy.target_participants, "명"] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ),

          isLoading ?
          _jsxDEV("div", { className: "py-20 text-center", children: [
            _jsxDEV("div", { className: "w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" }, void 0, false),
            _jsxDEV("p", { className: "text-gray-400 font-bold text-sm", children: "참여자 정보를 불러오는 중..." }, void 0, false)] }, void 0, true
          ) :
          participants.length === 0 ?
          _jsxDEV("div", { className: "py-20 text-center", children: [
            _jsxDEV("div", { className: "text-4xl mb-4", children: "👥" }, void 0, false),
            _jsxDEV("p", { className: "text-gray-400 font-bold", children: "아직 참여한 사업자가 없습니다." }, void 0, false)] }, void 0, true
          ) :

          _jsxDEV("div", { className: "space-y-4", children:
            participants.map((p, idx) =>
            _jsxDEV("div", { className: "flex items-center justify-between p-5 bg-white border border-gray-100 rounded-[24px] hover:border-emerald-200 transition-colors shadow-sm", children: [
              _jsxDEV("div", { className: "flex items-center gap-4", children: [
                _jsxDEV("div", { className: "w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-lg shadow-inner", children: "🏪" }, void 0, false

                ),
                _jsxDEV("div", { children: [
                  _jsxDEV("div", { className: "text-sm font-black text-gray-900", children: p.bizname }, void 0, false),
                  _jsxDEV("div", { className: "text-[10px] text-gray-400 font-bold", children: ["담당자: ", p.user_nickname] }, void 0, true)] }, void 0, true
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "text-right", children: [
                _jsxDEV("div", { className: "text-xs font-black text-gray-900", children: ["₩", groupBuy.price?.toLocaleString()] }, void 0, true),
                _jsxDEV("div", { className: "flex items-center gap-1 justify-end mt-1", children: [
                  _jsxDEV("span", { className: "w-1.5 h-1.5 bg-emerald-500 rounded-full" }, void 0, false),
                  _jsxDEV("span", { className: "text-[10px] text-emerald-500 font-black uppercase tracking-tighter", children: "결제완료" }, void 0, false)] }, void 0, true
                )] }, void 0, true
              )] }, idx, true
            )
            ) }, void 0, false
          )] }, void 0, true

        ),

        _jsxDEV("div", { className: "px-8 py-6 bg-gray-50 border-t border-gray-100", children:
          _jsxDEV("button", {
            onClick: onClose,
            className: "w-full bg-gray-900 text-white py-4 rounded-[20px] font-black text-sm hover:bg-black transition-all shadow-lg shadow-gray-200 active:scale-95", children:
            "닫기" }, void 0, false

          ) }, void 0, false
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default GroupBuyParticipantModal;