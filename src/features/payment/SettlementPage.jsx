import { useState } from 'react';
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
import { Line } from 'react-chartjs-2';
import MainFooter from '../../components/layout/MainFooter';
import { useSettlement } from './hooks/useSettlement';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";


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





const SettlementPage = () => {
  const { settlementData, formatCurrency } = useSettlement();

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const chartMonthlySales = settlementData.monthlySales;

  const paymentChartData = {
    labels: chartMonthlySales.map((d) => d.month),
    datasets: [
    {
      label: '결제 금액',
      data: chartMonthlySales.map((item, index, monthlySales) =>
      index === monthlySales.length - 1 ? item.amount : item.amount * 0.82
      ),
      borderColor: 'rgb(37, 99, 235)',
      backgroundColor: (context) => {
        const { chart } = context;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          return 'rgba(37, 99, 235, 0.12)';
        }

        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.32)');
        gradient.addColorStop(0.55, 'rgba(59, 130, 246, 0.12)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.01)');

        return gradient;
      },
      borderWidth: 2,
      fill: 'origin',
      tension: 0.35,
      pointBackgroundColor: chartMonthlySales.map((_, index, monthlySales) =>
      index === monthlySales.length - 1 ? 'rgb(239, 68, 68)' : 'rgb(37, 99, 235)'
      ),
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 6
    }]

  };

  const paymentValueLabelPlugin = {
    id: 'paymentValueLabel',
    afterDatasetsDraw: (chart) => {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);

      ctx.save();
      ctx.font = '700 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      meta.data.forEach((point, index) => {
        const value = chart.data.datasets[0].data[index];
        const label = `${Number(value).toLocaleString('ko-KR')}원`;
        const labelWidth = ctx.measureText(label).width + 14;
        const labelX = point.x;
        const labelY = point.y - 24;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
        ctx.beginPath();
        ctx.roundRect(labelX - labelWidth / 2, labelY - 10, labelWidth, 20, 6);
        ctx.fill();

        ctx.fillStyle = '#1d4ed8';
        ctx.fillText(label, labelX, labelY);

        ctx.beginPath();
        ctx.moveTo(labelX, labelY + 10);
        ctx.lineTo(labelX, point.y - 7);
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      ctx.restore();
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    layout: {
      padding: {
        top: 38,
        right: 20,
        bottom: 8,
        left: 8
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#111827',
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const isCurrentMonth =
            context.dataIndex === chartMonthlySales.length - 1;
            const label = isCurrentMonth ? '결제 예정 금액' : '결제 완료 금액';

            return `${label}: ${formatCurrency(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      y: {
        display: true,
        beginAtZero: true,
        min: 0,
        max: 20000000,
        border: {
          display: false
        },
        grid: {
          color: 'rgba(226, 232, 240, 0.8)',
          drawTicks: false
        },
        ticks: {
          stepSize: 5000000,
          padding: 12,
          color: '#64748b',
          font: { size: 11, weight: '600' },
          callback: (value) => `${Math.round(value / 10000).toLocaleString('ko-KR')}만원`
        }
      },
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: {
          padding: 18,
          color: '#111827',
          font: { size: 12, weight: 'bold' }
        }
      }
    }
  };

  const settlementProducts = [
  { name: '친환경 양파', detail: '20kg · 2망' },
  { name: '국내산 감자', detail: '10kg · 3박스' },
  { name: '대파', detail: '5kg · 4단' },
  { name: '계란 특란', detail: '30구 · 10판' },
  { name: '쌀', detail: '20kg · 3포' }];


  const paymentStatusStyles = {
    미결제: {
      badge: 'bg-red-50 text-red-600',
      dot: 'bg-red-500'
    },
    '결제 예정': {
      badge: 'bg-blue-50 text-blue-600',
      dot: 'bg-blue-500'
    },
    '결제 완료': {
      badge: 'bg-emerald-50 text-emerald-600',
      dot: 'bg-emerald-500'
    }
  };

  const paymentStatuses = ['미결제', '결제 예정', '결제 완료'];
  const settlementsPerPage = 5;
  const settlementStartIndex = 0;
  const visibleSettlements = settlementData.history.slice(0, settlementsPerPage);

  return (
    _jsxDEV("div", { className: "min-h-screen bg-gray-50 text-gray-800 font-sans", children: [
      _jsxDEV("main", { className: "max-w-7xl mx-auto px-8 py-8", children: [
        _jsxDEV("div", { className: "mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("h2", { className: "text-2xl font-black text-gray-900 mb-1", children: "지출 및 결제 현황" }, void 0, false),
            _jsxDEV("p", { className: "text-sm text-gray-500", children: "매장에 대한 결제 예정, 완료, 미결제 내역을 확인하세요." }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("button", {
            type: "button",
            onClick: () => setIsExportModalOpen(true),
            className: "inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-emerald-200 bg-white px-4 text-xs font-black text-emerald-700 shadow-sm transition-colors hover:bg-emerald-50 sm:mt-2 sm:self-auto", children: [

            _jsxDEV("svg", {
              className: "h-4 w-4",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              "aria-hidden": "true", children:

              _jsxDEV("path", { d: "M12 3v12m0 0 4-4m-4 4-4-4M5 20h14", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, false) }, void 0, false
            ), "엑셀로 내보내기"] }, void 0, true

          )] }, void 0, true
        ),

        _jsxDEV("div", { className: "mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4", children:
          [
          {
            title: '이번 달 결제 예정액',
            value: formatCurrency(settlementData.summary.expectedSettlement),
            description: '이번 달 전체 결제 예정',
            cardStyle: 'border-blue-100',
            iconStyle: 'bg-blue-50 text-blue-600',
            valueStyle: 'text-blue-600',
            icon:
            _jsxDEV("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
              _jsxDEV("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }, void 0, false),
              _jsxDEV("path", { d: "M16 3v4M8 3v4M3 10h18", strokeLinecap: "round" }, void 0, false)] }, void 0, true
            )

          },
          {
            title: '오늘 결제 예정',
            value: formatCurrency(settlementData.history[0]?.amount ?? 0),
            description: `${settlementData.history.length > 0 ? 1 : 0}건 결제 예정`,
            cardStyle: 'border-orange-100',
            iconStyle: 'bg-orange-50 text-orange-500',
            valueStyle: 'text-orange-500',
            icon:
            _jsxDEV("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
              _jsxDEV("circle", { cx: "12", cy: "12", r: "9" }, void 0, false),
              _jsxDEV("path", { d: "M12 7v5l3 2", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, false)] }, void 0, true
            )

          },
          {
            title: '미결제 금액',
            value: formatCurrency(
              settlementData.history.
              filter((_, index) => paymentStatuses[index % paymentStatuses.length] === '미결제').
              reduce((total, item) => total + item.amount, 0)
            ),
            description: '확인이 필요한 결제 내역',
            cardStyle: 'border-red-100',
            iconStyle: 'bg-red-50 text-red-500',
            valueStyle: 'text-red-500',
            icon:
            _jsxDEV("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
              _jsxDEV("path", { d: "M12 3 2.8 19a1.4 1.4 0 0 0 1.2 2h16a1.4 1.4 0 0 0 1.2-2L12 3Z", strokeLinejoin: "round" }, void 0, false),
              _jsxDEV("path", { d: "M12 9v5M12 17.5v.1", strokeLinecap: "round" }, void 0, false)] }, void 0, true
            )

          },
          {
            title: '결제 완료 금액',
            value: formatCurrency(settlementData.summary.completedSettlement),
            description: '이번 달 결제 완료 기준',
            cardStyle: 'border-emerald-100',
            iconStyle: 'bg-emerald-50 text-emerald-600',
            valueStyle: 'text-emerald-600',
            icon:
            _jsxDEV("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
              _jsxDEV("circle", { cx: "12", cy: "12", r: "9" }, void 0, false),
              _jsxDEV("path", { d: "m8 12 2.5 2.5L16 9", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, false)] }, void 0, true
            )

          }].
          map((s, i) =>
          _jsxDEV("div", { className: `rounded-2xl border-2 bg-white p-5 shadow-sm ${s.cardStyle}`, children: [
            _jsxDEV("div", { className: "mb-5 flex items-start justify-between gap-3", children: [
              _jsxDEV("div", { className: "text-xs font-bold tracking-tight text-gray-500", children: s.title }, void 0, false),
              _jsxDEV("span", { className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.iconStyle}`, children:
                s.icon }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("div", { className: `mb-2 text-2xl font-black tracking-tight ${s.valueStyle}`, children: s.value }, void 0, false),
            _jsxDEV("p", { className: "text-[11px] font-medium text-gray-400", children: s.description }, void 0, false)] }, i, true
          )
          ) }, void 0, false
        ),

        _jsxDEV("div", { className: "mb-8 space-y-8", children: [
          _jsxDEV("div", { className: "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm", children: [
            _jsxDEV("div", { className: "mb-6", children:
              _jsxDEV("div", { children: [
                _jsxDEV("h3", { className: "flex items-center gap-2 font-bold text-gray-700", children: [
                  _jsxDEV("span", { className: "h-2 w-2 rounded-full bg-emerald-500" }, void 0, false), "월별 결제 금액 추이"] }, void 0, true

                ),
                _jsxDEV("p", { className: "mt-1.5 text-xs font-medium text-gray-400", children: "지난달까지는 결제 완료 금액, 이번 달은 결제 예정 금액입니다." }, void 0, false

                )] }, void 0, true
              ) }, void 0, false
            ),
            _jsxDEV("div", { className: "h-80", children:
              _jsxDEV(Line, {
                data: paymentChartData,
                options: chartOptions,
                plugins: [paymentValueLabelPlugin] }, void 0, false
              ) }, void 0, false
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-2", children: [
            _jsxDEV("div", { className: "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm", children: [
              _jsxDEV("div", { className: "mb-5 flex items-start justify-between gap-4", children: [
                _jsxDEV("h3", { className: "flex items-center gap-2 font-bold text-gray-700", children: [
                  _jsxDEV("span", { className: "h-2 w-2 rounded-full bg-emerald-500" }, void 0, false), "거래처별 결제 비중"] }, void 0, true

                ),
                _jsxDEV("span", { className: "rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-600", children: "4개 거래처" }, void 0, false

                )] }, void 0, true
              ),

              _jsxDEV("div", { className: "overflow-hidden rounded-xl border border-gray-100", children: [
                _jsxDEV("div", { className: "grid grid-cols-[160px_1fr] gap-6 bg-gray-50 px-4 py-3 text-[11px] font-black text-gray-600", children: [
                  _jsxDEV("span", { children: "거래처" }, void 0, false),
                  _jsxDEV("span", { children: "비중" }, void 0, false)] }, void 0, true
                ),
                [
                { label: '소소마을 1호점', amount: 380000 },
                { label: '신선유통', amount: 230000 },
                { label: '농산물센터', amount: 150000 },
                { label: '기타', amount: 70000 }].
                map((item, idx) =>
                _jsxDEV("div", {

                  className: "grid grid-cols-[160px_1fr] items-center gap-6 border-t border-gray-100 px-4 py-4 transition-colors hover:bg-gray-50", children: [

                  _jsxDEV("span", { className: "text-sm font-semibold text-gray-700", children: item.label }, void 0, false),
                  _jsxDEV("div", { children: [
                    _jsxDEV("div", { className: "mb-2 flex items-center justify-between", children:
                      _jsxDEV("span", { className: "text-xs font-black text-emerald-600", children: [
                        Math.round(item.amount / 830000 * 100), "%"] }, void 0, true
                      ) }, void 0, false
                    ),
                    _jsxDEV("div", { className: "h-2 w-full overflow-hidden rounded-full bg-gray-100", children:
                      _jsxDEV("div", {
                        className: "h-full rounded-full bg-emerald-500",
                        style: { width: `${item.amount / 830000 * 100}%` } }, void 0, false
                      ) }, void 0, false
                    )] }, void 0, true
                  )] }, idx, true
                )
                )] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm", children: [
              _jsxDEV("div", { className: "mb-5 flex items-start justify-between gap-4", children: [
                _jsxDEV("h3", { className: "flex items-center gap-2 font-bold text-gray-700", children: [
                  _jsxDEV("span", { className: "h-2 w-2 rounded-full bg-blue-500" }, void 0, false), "월별 결제 완료 비교"] }, void 0, true

                ),
                _jsxDEV("span", { className: "rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-600", children: "최근 4개월" }, void 0, false

                )] }, void 0, true
              ),

              _jsxDEV("div", { className: "mb-5 flex items-end justify-between rounded-xl bg-gray-50 px-5 py-4", children: [
                _jsxDEV("div", { children: [
                  _jsxDEV("p", { className: "mb-1 text-[11px] font-bold text-gray-600", children: "최근 4개월 결제 완료" }, void 0, false),
                  _jsxDEV("p", { className: "text-2xl font-black tracking-tight text-gray-900", children:
                    formatCurrency(46900000) }, void 0, false
                  )] }, void 0, true
                ),
                _jsxDEV("span", { className: "text-[12px] font-bold text-blue-500", children: "월 평균 11,725,000원" }, void 0, false)] }, void 0, true
              ),

              _jsxDEV("div", { className: "overflow-hidden rounded-xl border border-gray-100 text-center", children: [
                _jsxDEV("div", { className: "grid grid-cols-[54px_1fr_auto] gap-3 bg-gray-50 px-4 py-3 text-[11px] font-black text-gray-600", children: [
                  _jsxDEV("span", { className: "text-center", children: "월" }, void 0, false),
                  _jsxDEV("span", { className: "text-center", children: "지출 금액" }, void 0, false),
                  _jsxDEV("span", { className: "min-w-24 text-center", children: "전월 대비" }, void 0, false)] }, void 0, true
                ),
                [
                { month: '6월', amount: 12640000, difference: 1480000, rate: 13.3 },
                { month: '5월', amount: 11160000, difference: -920000, rate: -7.6 },
                { month: '4월', amount: 12080000, difference: 730000, rate: 6.4 },
                { month: '3월', amount: 11020000, difference: -580000, rate: -5.0 }].
                map((item) => {
                  const isIncrease = item.difference > 0;

                  return (
                    _jsxDEV("div", {

                      className: "grid grid-cols-[60px_1fr_130px] items-center gap-3 border-t border-gray-100 px-4 py-4 transition-colors hover:bg-gray-50", children: [

                      _jsxDEV("span", { className: "text-sm font-black text-gray-700", children: item.month }, void 0, false),
                      _jsxDEV("span", { className: "justify-self-center w-[120px] text-right text-sm font-black text-gray-900", children:
                        formatCurrency(item.amount) }, void 0, false
                      ),
                      _jsxDEV("span", {
                        className: `min-w-24 rounded-lg px-2 py-1.5 text-right text-[10px] font-black ${
                        isIncrease ?
                        'bg-red-50 text-red-500' :
                        'bg-blue-50 text-blue-600'}`, children: [


                        isIncrease ? '▲' : '▼', " ", formatCurrency(Math.abs(item.difference)), " (", Math.abs(item.rate), "%)"] }, void 0, true
                      )] }, item.month, true
                    ));

                })] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ),

        _jsxDEV("section", { className: "overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm", children: [
          _jsxDEV("div", { className: "flex flex-col gap-5 border-b border-gray-100 p-6 lg:flex-row lg:items-center lg:justify-between", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("div", { className: "mb-2 flex items-center gap-2", children: [
                _jsxDEV("span", { className: "rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-black text-emerald-600", children: "월별 결제 예정" }, void 0, false

                ),
                _jsxDEV("span", { className: "text-xs font-medium text-gray-600", children: "해당 월에 결제해야 할 내역입니다." }, void 0, false

                )] }, void 0, true
              ),
              _jsxDEV("h3", { className: "text-lg font-black text-gray-900", children: "6월 결제 예정 상세내역" }, void 0, false)] }, void 0, true
            ),

            _jsxDEV("div", { className: "flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1", children: [
              _jsxDEV("button", {
                type: "button",
                "aria-label": "이전 달",
                className: "flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white hover:text-emerald-600", children:

                _jsxDEV("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children:
                  _jsxDEV("path", { d: "m15 18-6-6 6-6", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, false) }, void 0, false
                ) }, void 0, false
              ),
              _jsxDEV("span", { className: "min-w-28 px-3 text-center text-sm font-black text-gray-800", children:
                settlementData.history[0]?.date ?
                `${settlementData.history[0].date.slice(0, 4)}년 ${Number(settlementData.history[0].date.slice(5, 7))}월` :
                '정산 월' }, void 0, false
              ),
              _jsxDEV("button", {
                type: "button",
                "aria-label": "다음 달",
                className: "flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white hover:text-emerald-600", children:

                _jsxDEV("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children:
                  _jsxDEV("path", { d: "m9 18 6-6-6-6", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, false) }, void 0, false
                ) }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "grid gap-3 border-b border-gray-100 bg-gray-50/70 p-6 sm:grid-cols-3", children: [
            _jsxDEV("div", { className: "rounded-xl border border-gray-100 bg-white p-4", children: [
              _jsxDEV("p", { className: "mb-2 text-xs font-bold text-gray-500", children: "결제 예정 건수" }, void 0, false),
              _jsxDEV("p", { className: "text-xl font-black text-gray-900", children: [
                settlementData.history.length,
                _jsxDEV("span", { className: "ml-1 text-sm font-bold text-gray-500", children: "건" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ),
            _jsxDEV("div", { className: "rounded-xl border border-gray-100 bg-white p-4", children: [
              _jsxDEV("p", { className: "mb-2 text-xs font-bold text-gray-500", children: "총 결제 예정 금액" }, void 0, false),
              _jsxDEV("p", { className: "text-xl font-black text-emerald-600", children:
                formatCurrency(settlementData.history.reduce((total, item) => total + item.amount, 0)) }, void 0, false
              )] }, void 0, true
            ),
            _jsxDEV("div", { className: "rounded-xl border border-gray-100 bg-white p-4", children: [
              _jsxDEV("p", { className: "mb-2 text-xs font-bold text-gray-500", children: "정산 기준" }, void 0, false),
              _jsxDEV("p", { className: "text-sm font-black text-gray-800", children: "월 결제 예정 내역" }, void 0, false),
              _jsxDEV("p", { className: "mt-1 text-[11px] font-medium text-gray-500", children: "결제일 순으로 확인하세요." }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "overflow-x-auto", children:
            _jsxDEV("table", { className: "w-full table-fixed min-w-[980px] text-center", children: [
              _jsxDEV("thead", { className: "border-b border-gray-100 bg-white text-[11px] font-black uppercase tracking-widest text-gray-600", children:
                _jsxDEV("tr", { children: [
                  _jsxDEV("th", { className: "px-6 py-4", children: "거래처명" }, void 0, false),
                  _jsxDEV("th", { className: "px-6 py-4", children: "발주 내역" }, void 0, false),
                  _jsxDEV("th", { className: "px-6 py-4", children: "결제 항목" }, void 0, false),
                  _jsxDEV("th", { className: "px-6 py-4", children: "결제 예정일" }, void 0, false),
                  _jsxDEV("th", { className: "px-6 py-4", children: "결제 금액" }, void 0, false),
                  _jsxDEV("th", { className: "px-6 py-4", children: "결제 상태" }, void 0, false)] }, void 0, true
                ) }, void 0, false
              ),
              _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
                visibleSettlements.map((item, index) => {
                  const itemIndex = settlementStartIndex + index;
                  const product = settlementProducts[itemIndex % settlementProducts.length];
                  const paymentStatus = paymentStatuses[itemIndex % paymentStatuses.length];
                  const statusStyle = paymentStatusStyles[paymentStatus];

                  return (
                    _jsxDEV("tr", { className: "transition-colors hover:bg-emerald-50/30", children: [
                      _jsxDEV("td", { className: "px-6 py-5", children:
                        _jsxDEV("div", { className: "flex items-center justify-center gap-3", children: [
                          _jsxDEV("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xs font-black text-emerald-600", children:
                            item.store?.substring(0, 1) }, void 0, false
                          ),
                          _jsxDEV("div", { children:
                            _jsxDEV("p", { className: "text-sm font-bold text-gray-800", children: item.store }, void 0, false) }, void 0, false
                          )] }, void 0, true
                        ) }, void 0, false
                      ),
                      _jsxDEV("td", { className: "px-6 py-5", children:
                        _jsxDEV("div", { className: "flex items-center justify-center gap-3", children: [
                          _jsxDEV("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500", children:
                            _jsxDEV("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
                              _jsxDEV("path", { d: "M5 8.5 12 5l7 3.5v7L12 19l-7-3.5v-7Z", strokeLinejoin: "round" }, void 0, false),
                              _jsxDEV("path", { d: "m5 8.5 7 3.5 7-3.5M12 12v7", strokeLinejoin: "round" }, void 0, false)] }, void 0, true
                            ) }, void 0, false
                          ),
                          _jsxDEV("div", { children: [
                            _jsxDEV("p", { className: "text-sm font-bold text-gray-800", children: product.name }, void 0, false),
                            _jsxDEV("p", { className: "mt-0.5 text-[11px] font-medium text-gray-400", children: product.detail }, void 0, false)] }, void 0, true
                          )] }, void 0, true
                        ) }, void 0, false
                      ),
                      _jsxDEV("td", { className: "px-6 py-5", children:
                        _jsxDEV("span", { className: "rounded-lg bg-gray-100 px-2.5 py-1.5 text-[11px] font-bold text-gray-600", children:
                          item.type }, void 0, false
                        ) }, void 0, false
                      ),
                      _jsxDEV("td", { className: "px-6 py-5 text-sm font-semibold text-gray-600", children: item.date }, void 0, false),
                      _jsxDEV("td", { className: "px-6 py-5 text-center text-sm font-black text-gray-900", children:
                        formatCurrency(item.amount) }, void 0, false
                      ),
                      _jsxDEV("td", { className: "px-6 py-5", children:
                        _jsxDEV("span", { className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black ${statusStyle.badge}`, children: [
                          _jsxDEV("span", { className: `h-1.5 w-1.5 rounded-full ${statusStyle.dot}` }, void 0, false),
                          paymentStatus] }, void 0, true
                        ) }, void 0, false
                      )] }, item.id, true
                    ));

                }) }, void 0, false
              )] }, void 0, true
            ) }, void 0, false
          ),

          _jsxDEV("div", { className: "flex flex-col gap-4 border-t border-gray-100 bg-gray-50/50 px-6 py-4 lg:flex-row lg:items-center lg:justify-between", children: [
            _jsxDEV("p", { className: "text-xs font-medium text-gray-400", children: ["총 ",
              _jsxDEV("span", { className: "font-black text-gray-700", children: [settlementData.history.length, "건"] }, void 0, true), "의 결제 내역"] }, void 0, true
            ),
            _jsxDEV("p", { className: "whitespace-nowrap text-sm font-bold text-gray-500", children: ["합계",

              _jsxDEV("span", { className: "ml-3 text-lg font-black text-emerald-600", children:
                formatCurrency(settlementData.history.reduce((total, item) => total + item.amount, 0)) }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ),

        _jsxDEV("div", { className: "hidden", children: [
          _jsxDEV("div", { className: "p-6 border-b border-gray-100 flex justify-between items-center", children:
            _jsxDEV("h3", { className: "font-bold text-gray-700", children: "최근 정산 상세 내역" }, void 0, false) }, void 0, false
          ),
          _jsxDEV("div", { className: "overflow-x-auto", children:
            _jsxDEV("table", { className: "w-full text-left", children: [
              _jsxDEV("thead", { className: "bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100", children:
                _jsxDEV("tr", { children: [
                  _jsxDEV("th", { className: "px-6 py-4", children: "거래 일시" }, void 0, false),
                  _jsxDEV("th", { className: "px-6 py-4", children: "매장명" }, void 0, false),
                  _jsxDEV("th", { className: "px-6 py-4", children: "결제 수단" }, void 0, false),
                  _jsxDEV("th", { className: "px-6 py-4 text-right", children: "금액" }, void 0, false),
                  _jsxDEV("th", { className: "px-6 py-4 text-center", children: "상태" }, void 0, false)] }, void 0, true
                ) }, void 0, false
              ),
              _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
                settlementData.history.map((item) =>
                _jsxDEV("tr", { className: "hover:bg-gray-50 transition-colors", children: [
                  _jsxDEV("td", { className: "px-6 py-4 text-sm text-gray-600", children: item.date }, void 0, false),
                  _jsxDEV("td", { className: "px-6 py-4 text-sm font-bold text-gray-800", children: item.store }, void 0, false),
                  _jsxDEV("td", { className: "px-6 py-4 text-sm text-gray-500", children:
                    _jsxDEV("span", { className: "px-2 py-1 bg-gray-100 rounded-md text-[10px] font-bold", children: item.type }, void 0, false) }, void 0, false
                  ),
                  _jsxDEV("td", { className: "px-6 py-4 text-sm font-black text-right", children: formatCurrency(item.amount) }, void 0, false),
                  _jsxDEV("td", { className: "px-6 py-4 text-center", children:
                    _jsxDEV("span", { className: `px-2 py-1 rounded-full text-[10px] font-black ${
                      item.status === '정산완료' ?
                      'bg-emerald-50 text-emerald-600' :
                      'bg-blue-50 text-blue-600'}`, children:

                      item.status }, void 0, false
                    ) }, void 0, false
                  )] }, item.id, true
                )
                ) }, void 0, false
              )] }, void 0, true
            ) }, void 0, false
          )] }, void 0, true
        )] }, void 0, true
      ),
      isExportModalOpen &&
      _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
        _jsxDEV("button", {
          type: "button",
          "aria-label": "엑셀 내보내기 모달 닫기",
          onClick: () => setIsExportModalOpen(false),
          className: "absolute inset-0 bg-gray-950/40 backdrop-blur-sm" }, void 0, false
        ),

        _jsxDEV("div", {
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "export-modal-title",
          className: "relative flex max-h-[90vh] w-full max-w-xl flex-col rounded-3xl bg-white shadow-2xl", children: [

          _jsxDEV("div", { className: "flex items-start justify-between gap-4 border-b border-gray-100 px-7 py-6", children: [
            _jsxDEV("div", { className: "flex items-start gap-3", children: [
              _jsxDEV("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600", children:
                _jsxDEV("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
                  _jsxDEV("path", { d: "M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z", strokeLinejoin: "round" }, void 0, false),
                  _jsxDEV("path", { d: "M14 3v5h5M9 12l6 6M15 12l-6 6", strokeLinecap: "round" }, void 0, false)] }, void 0, true
                ) }, void 0, false
              ),
              _jsxDEV("div", { children: [
                _jsxDEV("h3", { id: "export-modal-title", className: "text-xl font-black text-gray-900", children: "월 지출 내역 엑셀 내보내기" }, void 0, false

                ),
                _jsxDEV("p", { className: "mt-2 text-xs font-medium leading-5 text-gray-500", children: ["해당 월의 결제 및 지출 내역을 엑셀 파일로 생성합니다.",

                  _jsxDEV("br", {}, void 0, false), "세무 신고 또는 증빙 정리에 활용할 수 있습니다."] }, void 0, true

                )] }, void 0, true
              )] }, void 0, true
            ),
            _jsxDEV("button", {
              type: "button",
              "aria-label": "닫기",
              onClick: () => setIsExportModalOpen(false),
              className: "flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700", children:
              "×" }, void 0, false

            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "space-y-6 overflow-y-auto px-7 py-6", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("p", { className: "mb-2 text-xs font-black text-gray-500", children: "대상 기간" }, void 0, false),
              _jsxDEV("div", { className: "rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-black text-gray-800", children: "2024년 6월" }, void 0, false

              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("p", { className: "mb-2 text-xs font-black text-gray-500", children: "내보낼 데이터" }, void 0, false),
              _jsxDEV("div", { className: "flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3.5", children: [
                _jsxDEV("span", { className: "h-2.5 w-2.5 rounded-full bg-emerald-500" }, void 0, false),
                _jsxDEV("span", { className: "text-sm font-black text-gray-800", children: "월 지출 상세 내역" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("p", { className: "mb-3 text-xs font-black text-gray-500", children: "포함 항목" }, void 0, false),
              _jsxDEV("div", { className: "flex flex-wrap gap-2", children:
                [
                '거래처명',
                '발주 내역',
                '결제 항목',
                '결제 예정일',
                '합계 금액(발주서 기준)',
                '결제 상태',
                '카테고리',
                '사업자등록번호',
                '공급가액',
                '부가세'].
                map((item) =>
                _jsxDEV("span", {

                  className: "rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700", children:

                  item }, item, false
                )
                ) }, void 0, false
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("p", { className: "mb-2 text-xs font-black text-gray-500", children: "파일 정보" }, void 0, false),
              _jsxDEV("div", { className: "space-y-2 rounded-xl border border-gray-200 bg-white px-4 py-4", children: [
                _jsxDEV("div", { className: "flex items-center justify-between gap-4 text-xs", children: [
                  _jsxDEV("span", { className: "font-bold text-gray-400", children: "파일명" }, void 0, false),
                  _jsxDEV("span", { className: "font-black text-gray-800", children: "2024년_6월_지출내역.xlsx" }, void 0, false)] }, void 0, true
                ),
                _jsxDEV("div", { className: "flex items-center justify-between gap-4 text-xs", children: [
                  _jsxDEV("span", { className: "font-bold text-gray-400", children: "형식" }, void 0, false),
                  _jsxDEV("span", { className: "font-black text-emerald-600", children: ".xlsx" }, void 0, false)] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "flex gap-3 border-t border-gray-100 px-7 py-5", children: [
            _jsxDEV("button", {
              type: "button",
              onClick: () => setIsExportModalOpen(false),
              className: "h-12 flex-1 rounded-xl border border-gray-200 text-sm font-black text-gray-500 transition-colors hover:bg-gray-50", children:
              "취소" }, void 0, false

            ),
            _jsxDEV("button", {
              type: "button",
              className: "flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-black text-white transition-colors hover:bg-emerald-700", children: [

              _jsxDEV("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children:
                _jsxDEV("path", { d: "M12 3v12m0 0 4-4m-4 4-4-4M5 20h14", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, false) }, void 0, false
              ), "엑셀 다운로드"] }, void 0, true

            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ),


      _jsxDEV(MainFooter, {}, void 0, false)] }, void 0, true
    ));

};

export default SettlementPage;