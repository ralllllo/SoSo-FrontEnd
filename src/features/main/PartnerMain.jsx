




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import MainFooter from '../../components/layout/MainFooter';
import authStore from '../../store/authStore';
import PartnerMainHeader from '../../components/layout/PartnerMainHeader';
import MainNotificationSession from './components/MainNotificationSession';
import { fetchPartnerDashboard } from '../../apis/orderApi';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";


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

function PartnerMain({ setRole }) {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatbotMessage, setChatbotMessage] = useState('');
  const sellerSeq = authStore((state) => state.user_seq);

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!sellerSeq) return;
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await fetchPartnerDashboard(sellerSeq);
        setDashboard(res);
      } catch (err) {
        console.error('거래처 대시보드 데이터 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [sellerSeq]);


  const todayNewOrders = dashboard?.todayNewOrders ?? 0;
  const shippingOrders = dashboard?.shippingOrders ?? 0;
  const waitingPayments = dashboard?.waitingPayments ?? 0;


  const thisMonthSales = dashboard?.thisMonthSales ?? 0;
  const thisMonthCollections = dashboard?.thisMonthCollections ?? 0;
  const totalReceivables = dashboard?.totalReceivables ?? 0;


  const collectionRate = thisMonthSales > 0 ? Math.round(thisMonthCollections / thisMonthSales * 100) : 100;


  const trendChartData = {
    labels: dashboard?.monthlySalesAndCollections?.map((item) => item.month) || [],
    datasets: [
    {
      label: '매출',
      data: dashboard?.monthlySalesAndCollections?.map((item) => Math.round(item.sales / 10000)) || [],
      backgroundColor: 'rgba(16, 185, 129, 0.6)',
      borderRadius: 4
    },
    {
      label: '수금',
      data: dashboard?.monthlySalesAndCollections?.map((item) => Math.round(item.collection / 10000)) || [],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderRadius: 4
    }]

  };

  const trendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { boxWidth: 12, font: { size: 12, weight: 'bold' } }
      }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
      x: { grid: { display: false } }
    }
  };


  const receivableChartData = {
    labels: dashboard?.receivableTrend?.map((item) => item.month) || [],
    datasets: [{
      label: '누적 미수금',
      data: dashboard?.receivableTrend?.map((item) => Math.round(item.amount / 10000)) || [],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4
    }]
  };

  const businessSales = dashboard?.businessSales || [];
  const groupOrders = dashboard?.groupOrders || [];

  if (loading) {
    return (
      _jsxDEV("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children:
        _jsxDEV("div", { className: "flex flex-col items-center gap-3", children: [
          _jsxDEV("div", { className: "w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" }, void 0, false),
          _jsxDEV("p", { className: "text-gray-500 font-bold text-sm", children: "실제 데이터 기반 대시보드를 구축하는 중..." }, void 0, false)] }, void 0, true
        ) }, void 0, false
      ));

  }

  return (
    _jsxDEV("div", { className: "min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col", children: [
      _jsxDEV("main", { className: "flex-grow max-w-7xl mx-auto px-8 py-8 space-y-8 w-full", children: [
        _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", children:
          [
          { t: '신규 발주 (오늘)', v: todayNewOrders, u: '건', b: '실시간 접수 건수', c: 'border-emerald-100' },
          { t: '배송 중', v: shippingOrders, u: '건', b: '정상 배송 건수', c: 'border-emerald-100' },
          { t: '입금 대기', v: (waitingPayments / 10000).toLocaleString('ko-KR', { maximumFractionDigits: 1 }), u: '만원', b: '미결제 발주 총액', c: 'border-orange-100' }].
          map((s, i) =>
          _jsxDEV("div", { className: `bg-white p-8 rounded-3xl border-2 shadow-sm ${s.c}`, children: [
            _jsxDEV("div", { className: "text-gray-500 text-sm mb-2 uppercase tracking-wider font-bold", children: s.t }, void 0, false),
            _jsxDEV("div", { className: "text-5xl font-black mb-4 tracking-tight", children: [s.v, _jsxDEV("span", { className: "text-lg font-normal text-gray-400 ml-1", children: s.u }, void 0, false)] }, void 0, true),
            _jsxDEV("span", { className: "px-3 py-1 rounded-lg bg-gray-50 border border-gray-100 text-xs font-black text-emerald-600", children: s.b }, void 0, false)] }, i, true
          )
          ) }, void 0, false
        ),

        _jsxDEV("div", { className: "bg-white rounded-[2.5rem] border border-gray-200 p-10 shadow-sm", children: [
          _jsxDEV("div", { className: "flex justify-between items-center mb-10", children: [
            _jsxDEV("h3", { className: "text-2xl font-black text-gray-900 flex items-center gap-3", children: [
              _jsxDEV("span", { className: "w-4 h-4 bg-emerald-500 rounded-full" }, void 0, false), "월별 매출 및 수금 현황"] }, void 0, true

            ),
            _jsxDEV("div", { className: "flex gap-4", children:
              _jsxDEV("div", { className: "px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-500", children: "실시간 통합 통계" }, void 0, false) }, void 0, false
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
            _jsxDEV("div", { className: "lg:col-span-2 h-[350px]", children:
              _jsxDEV(Bar, { data: trendChartData, options: trendChartOptions }, void 0, false) }, void 0, false
            ),

            _jsxDEV("div", { className: "bg-gray-50 rounded-[2rem] p-8 flex flex-col justify-between", children: [
              _jsxDEV("div", { className: "space-y-6", children: [
                _jsxDEV("div", { children: [
                  _jsxDEV("div", { className: "text-xs text-gray-400 mb-2 font-black uppercase tracking-widest", children: "이번 달 매출" }, void 0, false),
                  _jsxDEV("div", { className: "text-3xl font-black text-gray-900 tracking-tight", children: [(thisMonthSales / 10000).toLocaleString('ko-KR', { maximumFractionDigits: 1 }), "만"] }, void 0, true)] }, void 0, true
                ),
                _jsxDEV("div", { children: [
                  _jsxDEV("div", { className: "text-xs text-gray-400 mb-2 font-black uppercase tracking-widest", children: "이번 달 수금" }, void 0, false),
                  _jsxDEV("div", { className: "text-3xl font-black text-emerald-600 tracking-tight", children: [(thisMonthCollections / 10000).toLocaleString('ko-KR', { maximumFractionDigits: 1 }), "만"] }, void 0, true)] }, void 0, true
                ),
                _jsxDEV("div", { className: "pt-6 border-t border-gray-200", children: [
                  _jsxDEV("div", { className: "text-xs text-gray-400 mb-2 font-black uppercase tracking-widest", children: "누적 미수금" }, void 0, false),
                  _jsxDEV("div", { className: "text-3xl font-black text-red-500 tracking-tight", children: [(totalReceivables / 10000).toLocaleString('ko-KR', { maximumFractionDigits: 1 }), "만"] }, void 0, true)] }, void 0, true
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "mt-8", children: [
                _jsxDEV("div", { className: "flex justify-between text-xs font-black text-gray-500 mb-2 uppercase tracking-widest", children: [
                  _jsxDEV("span", { children: "수금 목표 달성률" }, void 0, false),
                  _jsxDEV("span", { children: [collectionRate, "%"] }, void 0, true)] }, void 0, true
                ),
                _jsxDEV("div", { className: "w-full bg-gray-200 h-2.5 rounded-full overflow-hidden", children:
                  _jsxDEV("div", { className: "bg-emerald-500 h-full rounded-full", style: { width: `${collectionRate}%` } }, void 0, false) }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "lg:col-span-3 pt-10 border-t border-gray-100", children: [
              _jsxDEV("h4", { className: "text-xl font-bold text-gray-900 mb-8 flex items-center gap-3", children: [
                _jsxDEV("span", { className: "w-3 h-3 bg-red-500 rounded-full" }, void 0, false), "누적 미수금 변동 추이 (단위: 만원)"] }, void 0, true

              ),
              _jsxDEV("div", { className: "h-60", children:
                _jsxDEV(Line, {
                  data: receivableChartData,
                  options: {
                    ...trendChartOptions,
                    plugins: { legend: { display: false } }
                  } }, void 0, false
                ) }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ),

        _jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
          _jsxDEV("div", { className: "bg-white rounded-[2.5rem] border border-gray-200 p-8 shadow-sm", children: [
            _jsxDEV("h3", { className: "text-xl font-black mb-8 flex justify-between items-center text-gray-900", children: ["사업자별 매출 요약",

              _jsxDEV("span", { className: "text-xs text-gray-400 font-bold cursor-pointer hover:text-emerald-600 transition-colors uppercase tracking-widest", children: "View All >" }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("div", { className: "space-y-8", children:
              businessSales.length === 0 ?
              _jsxDEV("div", { className: "text-center py-12 text-gray-400 text-sm", children: "연계된 소상공인 사업자가 없습니다." }, void 0, false) :

              businessSales.map((b) =>
              _jsxDEV("div", { className: "flex flex-col gap-3", children: [
                _jsxDEV("div", { className: "flex justify-between items-start", children: [
                  _jsxDEV("div", { className: "flex gap-3 items-center", children: [
                    _jsxDEV("div", { className: "w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xs text-gray-400 font-black tracking-tighter", children: "CORP" }, void 0, false),
                    _jsxDEV("div", { children: [
                      _jsxDEV("div", { className: "font-black text-base text-gray-900", children: b.name }, void 0, false),
                      _jsxDEV("div", { className: "text-xs text-gray-400 font-medium", children: b.desc }, void 0, false)] }, void 0, true
                    )] }, void 0, true
                  ),
                  _jsxDEV("div", { className: "text-right", children: [
                    _jsxDEV("div", { className: "font-black text-base text-gray-900 tracking-tight", children: b.amount }, void 0, false),
                    _jsxDEV("div", { className: "text-xs text-emerald-500 font-black uppercase tracking-tighter", children: b.trend }, void 0, false)] }, void 0, true
                  )] }, void 0, true
                ),
                _jsxDEV("div", { className: "w-full bg-gray-50 h-1.5 rounded-full overflow-hidden ml-13", style: { width: 'calc(100% - 52px)' }, children:
                  _jsxDEV("div", { className: `${b.color} h-full rounded-full transition-all duration-1000`, style: { width: `${b.progress}%` } }, void 0, false) }, void 0, false
                )] }, b.name, true
              )
              ) }, void 0, false

            )] }, void 0, true
          ),

































          _jsxDEV(MainNotificationSession, {}, void 0, false)] }, void 0, true
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
            _jsxDEV("div", { className: "min-h-0 flex-1 space-y-5 overflow-y-auto pr-1", children: [
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
                _jsxDEV("div", { className: "max-w-[280px] rounded-2xl rounded-tl-md border border-gray-200 bg-white px-4 py-3 shadow-sm", children: [
                  _jsxDEV("p", { className: "text-sm leading-7 text-gray-900", children: ["안녕하세요! 👋", _jsxDEV("br", {}, void 0, false), "SoSo 업무 도우미입니다.", _jsxDEV("br", {}, void 0, false), "무엇을 도와드릴까요?"] }, void 0, true),
                  _jsxDEV("p", { className: "mt-2 text-right text-xs text-gray-400", children: "오후 2:30" }, void 0, false)] }, void 0, true
                )] }, void 0, true
              ),

              _jsxDEV("div", { className: "flex justify-end", children:
                _jsxDEV("div", { className: "rounded-2xl rounded-tr-md bg-emerald-700 px-4 py-3 text-sm font-bold text-white shadow-sm", children: "최근 발주 내역 알려줘" }, void 0, false) }, void 0, false
              ),

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
                _jsxDEV("div", { className: "max-w-[310px] rounded-2xl rounded-tl-md border border-gray-200 bg-white px-4 py-3 shadow-sm", children: [
                  _jsxDEV("p", { className: "text-sm leading-7 text-gray-900", children: "최근 발주 내역은 총 3건입니다." }, void 0, false),
                  _jsxDEV("ul", { className: "mt-2 space-y-1 text-sm leading-6 text-gray-900", children: [
                    _jsxDEV("li", { children: "· 2024-06-18 신선식품 350,000원" }, void 0, false),
                    _jsxDEV("li", { children: "· 2024-06-17 대한유통 180,000원" }, void 0, false),
                    _jsxDEV("li", { children: "· 2024-06-16 푸드상사 250,000원" }, void 0, false)] }, void 0, true
                  ),
                  _jsxDEV("p", { className: "mt-2 text-right text-xs text-gray-400", children: "오후 2:30" }, void 0, false)] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "mt-5 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm", children: [
              _jsxDEV("input", {
                type: "text",
                value: chatbotMessage,
                onChange: (event) => setChatbotMessage(event.target.value),
                placeholder: "질문을 입력하세요...",
                className: "min-w-0 flex-1 bg-transparent text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none" }, void 0, false
              ),
              _jsxDEV("button", { type: "button", className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-900/20", "aria-label": "챗봇 메시지 전송", children:
                _jsxDEV("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children:
                  _jsxDEV("path", { d: "M3.4 20.4 21.6 12 3.4 3.6 3 10l10 2-10 2 .4 6.4Z" }, void 0, false) }, void 0, false
                ) }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true

      )] }, void 0, true
    ));

}

export default PartnerMain;