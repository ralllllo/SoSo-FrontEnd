




import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler } from
'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import authStore from '../../store/authStore';
import { askRag } from "../../apis/ragApi";
import MainNotificationSession from './components/MainNotificationSession';
import { fetchBusinessDashboard } from '../../apis/mainApi';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { useStores } from '../../hooks/useStores';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

function BusinessMain({ setRole }) {
  const navigate = useNavigate();
  const userSeq = authStore((state) => state.user_seq);
  const selectedStoreSeq = authStore((state) => state.selectedStoreSeq);



  const { stores, isLoading: isStoresLoading } = useStores();


  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettlementMenuOpen, setIsSettlementMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);




  const handleProfileClick = () => {
    if (user_type === 'BUSINESS') {
      navigate('/business-mypage');
      setIsProfileOpen(false);
    } else {
      alert("사업자 전용 마이페이지입니다.");
    }
  };

  const { user_type, logout, setSelectedStore } = authStore();


  const handleSend = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
    ...prev,
    {
      role: "user",
      content: userQuestion
    }]
    );

    setQuestion("");
    setLoading(true);

    try {















      console.log("로그인 userSeq:", userSeq);
      console.log("선택된 매장 selectedStoreSeq:", selectedStoreSeq);
      console.log("챗봇 질문:", userQuestion);

      const result = await askRag({
        message: userQuestion,
        storeSeq: selectedStoreSeq
      });

      setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: result
      }]
      );
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: "답변을 가져오는 중 오류가 발생했습니다."
      }]
      );
    } finally {
      setLoading(false);
    }
  };





  const handleStoreSwitch = (storeSeq, companyName) => {
    setSelectedStore(storeSeq, companyName);
    navigate('/business-mypage');
    setIsProfileOpen(false);
  };

  const handleLogOut = () => {
    logout();
    alert("로그아웃 되었습니다.");
    navigate("/");
  };



  const [dashboard, setDashboard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    if (!selectedStoreSeq || !userSeq) return;
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const data = await fetchBusinessDashboard(selectedStoreSeq, userSeq);
        setDashboard(data);
        setCurrentPage(1);
      } catch (err) {
        console.error('소상공인 대시보드 데이터 로드 오류:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, [selectedStoreSeq, userSeq]);


  const totalStocks = dashboard?.totalStocks ?? 0;
  const lackStocks = dashboard?.lackStocks ?? 0;
  const expiringSoon = dashboard?.expiringSoon ?? 0;
  const activeGroupBuys = dashboard?.activeGroupBuys ?? 0;



  const stockChartData = {
    labels: dashboard?.stockStatus?.map((item) => item.name) || [],
    datasets: [{
      label: '현재 재고',
      data: dashboard?.stockStatus?.map((item) => item.value) || [],
      backgroundColor: [
      'rgba(16, 185, 129, 0.6)', 'rgba(59, 130, 246, 0.6)',
      'rgba(245, 158, 11, 0.6)', 'rgba(239, 68, 68, 0.6)',
      'rgba(139, 92, 246, 0.6)', 'rgba(236, 72, 153, 0.6)',
      'rgba(75, 85, 99, 0.6)', 'rgba(20, 184, 166, 0.6)'],

      borderColor: [
      'rgb(16, 185, 129)', 'rgb(59, 130, 246)',
      'rgb(245, 158, 11)', 'rgb(239, 68, 68)',
      'rgb(139, 92, 246)', 'rgb(236, 72, 153)',
      'rgb(75, 85, 99)', 'rgb(20, 184, 166)'],

      borderWidth: 1,
      borderRadius: 8
    }]
  };


  const salesChartData = {
    labels: dashboard?.salesTrend?.map((item) => item.month) || [],
    datasets: [{
      label: '매출액 (만원)',
      data: dashboard?.salesTrend?.map((item) => Math.round(item.amount / 10000)) || [],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: 'rgb(16, 185, 129)'
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, grid: { color: '#f3f4f6' } }, x: { grid: { display: false } } }
  };

  const groupOrders = dashboard?.groupOrders || [];

  return (
    _jsxDEV("div", { className: "bg-gray-50 text-gray-800 font-sans", children: [
      _jsxDEV("main", { className: "max-w-7xl mx-auto px-8 py-8", children: [
        _jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-6", children:
          [
          { t: '총 재고', v: totalStocks.toLocaleString(), u: '개 품목', b: '현재 등록된 자재 정보', c: 'border-emerald-100' },
          { t: '부족 재고', v: lackStocks.toLocaleString(), u: '개 품목', b: '즉시 발주 필요', c: 'border-red-100', tc: 'text-red-600' },
          { t: '유통기한 임박', v: expiringSoon.toLocaleString(), u: '개 품목', b: '7일 이내 만료 예정', c: 'border-orange-100', tc: 'text-orange-600' },
          { t: '공동 발주', v: activeGroupBuys.toLocaleString(), u: '건 진행 중', b: '참여 가능 공구', c: 'border-emerald-100', tc: 'text-emerald-600' }].
          map((s, i) =>
          _jsxDEV("div", { className: `bg-white p-5 rounded-2xl border-2 shadow-sm ${s.c}`, children: [
            _jsxDEV("div", { className: "text-gray-500 text-sm mb-2", children: s.t }, void 0, false),
            _jsxDEV("div", { className: "text-3xl font-extrabold mb-4", children: [s.v, _jsxDEV("span", { className: "text-sm font-medium text-gray-400 ml-1", children: s.u }, void 0, false)] }, void 0, true),
            _jsxDEV("span", { className: `px-2 py-0.5 rounded border text-[10px] font-bold bg-gray-50 ${s.tc || 'text-emerald-600 border-emerald-100'}`, children: s.b }, void 0, false)] }, i, true
          )
          ) }, void 0, false
        ),

        _jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6", children: [
          _jsxDEV("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-sm", children: [
            _jsxDEV("div", { className: "flex justify-between items-center mb-6", children: [
              _jsxDEV("h3", { className: "font-bold text-gray-700 flex items-center gap-2", children: [
                _jsxDEV("span", { className: "w-2 h-2 bg-emerald-500 rounded-full" }, void 0, false), "현재 재고 현황 (상위 8개 품목)"] }, void 0, true

              ),
              _jsxDEV("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-tight", children: "기준: 실시간 보유 수량" }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("div", { className: "h-64", children:
              _jsxDEV(Bar, { data: stockChartData, options: chartOptions }, void 0, false) }, void 0, false
            )] }, void 0, true
          ),
          _jsxDEV("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-sm", children: [
            _jsxDEV("div", { className: "flex justify-between items-center mb-6", children: [
              _jsxDEV("h3", { className: "font-bold text-gray-700 flex items-center gap-2", children: [
                _jsxDEV("span", { className: "w-2 h-2 bg-blue-500 rounded-full" }, void 0, false), "월별 매출 현황"] }, void 0, true

              ),
              _jsxDEV("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-tight", children: "단위: 만원" }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("div", { className: "h-64", children:
              _jsxDEV(Line, { data: salesChartData, options: chartOptions }, void 0, false) }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        ),

        _jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
          _jsxDEV(MainNotificationSession, {}, void 0, false),
          _jsxDEV("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("h3", { className: "font-bold mb-6 text-gray-700", children: "공동 발주 현황" }, void 0, false),
              _jsxDEV("div", { className: "space-y-4", children:
                groupOrders.length === 0 ?
                _jsxDEV("div", { className: "text-center py-12 text-gray-400 text-sm", children: "참여 가능한 공동 구매가 없습니다." }, void 0, false) :

                (() => {
                  const currentGroupOrders = groupOrders.slice((currentPage - 1) * 4, currentPage * 4);
                  return currentGroupOrders.map((o) =>
                  _jsxDEV("div", { className: "border border-gray-100 rounded-2xl p-5 hover:border-emerald-200 hover:shadow-md transition-all", children: [
                    _jsxDEV("div", { className: "flex justify-between mb-4", children: [_jsxDEV("h4", { className: "text-sm font-bold text-gray-900", children: o.title }, void 0, false), _jsxDEV("span", { className: `text-[10px] font-black px-2 py-0.5 rounded-full border ${o.status === '모집 중' ? 'text-emerald-600 border-emerald-100 bg-emerald-50' : 'text-red-500 border-red-100 bg-red-50'}`, children: o.status }, void 0, false)] }, void 0, true),
                    _jsxDEV("div", { className: "w-full bg-gray-100 h-1.5 rounded-full mb-3", children: _jsxDEV("div", { className: `${o.color} h-full rounded-full`, style: { width: `${o.progress}%` } }, void 0, false) }, void 0, false),
                    _jsxDEV("div", { className: "flex justify-between items-center mb-6 text-[10px] text-gray-400 font-bold uppercase tracking-tight", children: [_jsxDEV("span", { children: ["참여 ", o.currentParticipants, " / ", o.targetParticipants, "개"] }, void 0, true), _jsxDEV("span", { children: [o.progress, "% · ", o.dDay] }, void 0, true)] }, void 0, true),
                    _jsxDEV("button", { className: "w-full py-2.5 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black hover:bg-emerald-500 hover:text-white transition-all shadow-sm shadow-emerald-100/50", children: o.btn }, void 0, false)] }, o.id, true
                  )
                  );
                })() }, void 0, false

              )] }, void 0, true
            ),


            groupOrders.length > 4 &&
            _jsxDEV("div", { className: "flex justify-center items-center gap-2 mt-6 pt-4 border-t border-gray-50", children: [
              _jsxDEV("button", {
                onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
                disabled: currentPage === 1,
                className: "w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95", children:
                "←" }, void 0, false

              ),
              [...Array(Math.ceil(groupOrders.length / 4))].map((_, i) =>
              _jsxDEV("button", {

                onClick: () => setCurrentPage(i + 1),
                className: `w-8 h-8 rounded-lg font-black text-xs transition-all active:scale-95 ${currentPage === i + 1 ?
                'bg-emerald-500 text-white shadow-md shadow-emerald-100' :
                'bg-white text-gray-400 hover:text-gray-900 border border-gray-100'}`, children:


                i + 1 }, i + 1, false
              )
              ),
              _jsxDEV("button", {
                onClick: () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(groupOrders.length / 4))),
                disabled: currentPage === Math.ceil(groupOrders.length / 4),
                className: "w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95", children:
                "→" }, void 0, false

              )] }, void 0, true
            )] }, void 0, true

          )] }, void 0, true
        )] }, void 0, true
      ),

      _jsxDEV("aside", { className: "fixed bottom-6 right-6 z-40 flex items-end gap-5 max-lg:right-4 max-lg:bottom-4 max-sm:left-4 max-sm:right-4 max-sm:flex-col-reverse max-sm:items-end", children: [
        _jsxDEV("button", {
          type: "button",
          onClick: () => setIsChatbotOpen((prev) => !prev),
          className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 shadow-2xl shadow-emerald-900/30 transition-transform hover:-translate-y-1",
          "aria-label": isChatbotOpen ? '챗봇 닫기' : '챗봇 열기', children:

          _jsxDEV("div", { className: "relative flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-inner", children:
            _jsxDEV("span", { className: "relative flex h-7 w-8 items-center justify-center rounded-full bg-white", children: [
              _jsxDEV("span", { className: "absolute -bottom-1 left-1.5 h-2 w-2 -skew-x-12 bg-white" }, void 0, false),
              _jsxDEV("span", { className: "relative z-10 flex gap-1", children: [
                _jsxDEV("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-700" }, void 0, false),
                _jsxDEV("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-700" }, void 0, false),
                _jsxDEV("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-700" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ) }, void 0, false
          ) }, void 0, false
        ),

        isChatbotOpen &&
        _jsxDEV("section", { className: "w-[430px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/15 max-sm:w-full", children: [
          _jsxDEV("div", { className: "flex items-center justify-between bg-emerald-700 px-5 py-4 text-white", children: [
            _jsxDEV("div", { className: "flex items-center gap-3", children: [
              _jsxDEV("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/95", children:
                _jsxDEV("div", { className: "relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50", children:
                  _jsxDEV("span", { className: "relative flex h-6 w-7 items-center justify-center rounded-lg bg-emerald-600", children: [
                    _jsxDEV("span", { className: "absolute -top-1 h-1.5 w-1 rounded-full bg-emerald-600" }, void 0, false),
                    _jsxDEV("span", { className: "flex h-4 w-5 items-center justify-center gap-1 rounded-md bg-white", children: [
                      _jsxDEV("span", { className: "h-1 w-1 rounded-full bg-emerald-700" }, void 0, false),
                      _jsxDEV("span", { className: "h-1 w-1 rounded-full bg-emerald-700" }, void 0, false)] }, void 0, true
                    )] }, void 0, true
                  ) }, void 0, false
                ) }, void 0, false
              ),
              _jsxDEV("div", { children:
                _jsxDEV("h2", { className: "text-xl font-black leading-tight", children: "SoSo 챗봇" }, void 0, false) }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("div", { className: "flex items-center text-3xl font-light leading-none", children:
              _jsxDEV("button", { type: "button", onClick: () => setIsChatbotOpen(false), "aria-label": "챗봇 닫기", className: "leading-none text-white", children: "×" }, void 0, false

              ) }, void 0, false
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "flex h-[520px] flex-col bg-white px-5 py-5 max-sm:h-[460px]", children: [
            _jsxDEV("div", { className: "min-h-0 flex-1 space-y-5 overflow-y-auto pr-1", children:

              _jsxDEV("div", { className: "space-y-5", children: [
                _jsxDEV("div", { className: "flex items-start gap-3", children: [
                  _jsxDEV("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50", children:
                    _jsxDEV("span", { className: "relative flex h-6 w-7 items-center justify-center rounded-lg bg-emerald-600", children: [
                      _jsxDEV("span", { className: "absolute -top-1 h-1.5 w-1 rounded-full bg-emerald-600" }, void 0, false),
                      _jsxDEV("span", { className: "flex h-4 w-5 items-center justify-center gap-1 rounded-md bg-white", children: [
                        _jsxDEV("span", { className: "h-1 w-1 rounded-full bg-emerald-700" }, void 0, false),
                        _jsxDEV("span", { className: "h-1 w-1 rounded-full bg-emerald-700" }, void 0, false)] }, void 0, true
                      )] }, void 0, true
                    ) }, void 0, false
                  ),

                  _jsxDEV("div", { className: "max-w-[280px] rounded-2xl rounded-tl-md border border-gray-200 bg-white px-4 py-3 shadow-sm", children:
                    _jsxDEV("p", { className: "text-sm leading-7 text-gray-900", children: ["안녕하세요! 👋",
                      _jsxDEV("br", {}, void 0, false), "SoSo 업무 도우미입니다.",
                      _jsxDEV("br", {}, void 0, false), "무엇을 도와드릴까요?"] }, void 0, true

                    ) }, void 0, false
                  )] }, void 0, true
                ),

                messages.map((msg, index) =>
                msg.role === "user" ?
                _jsxDEV("div", { className: "flex justify-end", children:
                  _jsxDEV("div", { className: "max-w-[300px] whitespace-pre-line rounded-2xl rounded-tr-md bg-emerald-700 px-4 py-3 text-sm font-bold leading-7 text-white shadow-sm", children:
                    msg.content }, void 0, false
                  ) }, index, false
                ) :

                _jsxDEV("div", { className: "flex items-start gap-3", children: [
                  _jsxDEV("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50", children:
                    _jsxDEV("span", { className: "relative flex h-6 w-7 items-center justify-center rounded-lg bg-emerald-600", children: [
                      _jsxDEV("span", { className: "absolute -top-1 h-1.5 w-1 rounded-full bg-emerald-600" }, void 0, false),
                      _jsxDEV("span", { className: "flex h-4 w-5 items-center justify-center gap-1 rounded-md bg-white", children: [
                        _jsxDEV("span", { className: "h-1 w-1 rounded-full bg-emerald-700" }, void 0, false),
                        _jsxDEV("span", { className: "h-1 w-1 rounded-full bg-emerald-700" }, void 0, false)] }, void 0, true
                      )] }, void 0, true
                    ) }, void 0, false
                  ),

                  _jsxDEV("div", { className: "max-w-[310px] rounded-2xl rounded-tl-md border border-gray-200 bg-white px-4 py-3 shadow-sm", children:
                    _jsxDEV("p", { className: "whitespace-pre-line text-sm leading-7 text-gray-900", children:
                      msg.content }, void 0, false
                    ) }, void 0, false
                  )] }, index, true
                )

                ),

                loading &&
                _jsxDEV("div", { className: "flex items-start gap-3", children:
                  _jsxDEV("div", { className: "max-w-[220px] rounded-2xl rounded-tl-md border border-gray-200 bg-white px-4 py-3 shadow-sm", children:
                    _jsxDEV("p", { className: "text-sm text-gray-500", children: "답변 생성 중..." }, void 0, false) }, void 0, false
                  ) }, void 0, false
                )] }, void 0, true

              ) }, void 0, false

            ),

            _jsxDEV("div", { className: "mt-5 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm", children: [
              _jsxDEV("input", {
                type: "text",
                value: question,
                onChange: (event) => setQuestion(event.target.value),
                onKeyDown: (event) => {
                  if (event.key === "Enter") {
                    handleSend();
                  }
                },
                placeholder: "질문을 입력하세요...",
                className: "min-w-0 flex-1 bg-transparent text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none" }, void 0, false
              ),
              _jsxDEV("button", {
                type: "button",
                onClick: handleSend,
                disabled: loading,
                className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 disabled:cursor-not-allowed disabled:opacity-60",
                "aria-label": "챗봇 메시지 전송", children:

                _jsxDEV("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children:
                  _jsxDEV("path", { d: "M3.4 20.4 21.6 12 3.4 3.6 3 10l10 2-10 2 .4 6.4Z" }, void 0, false) }, void 0, false
                ) }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true

      )] }, void 0, true
    ));

};

export default BusinessMain;