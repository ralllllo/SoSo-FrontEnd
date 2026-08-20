import React, { useState, useEffect, useCallback } from 'react';
import { useFinance } from './hooks/useFinance';
import { getRecentPayments } from '../../apis/account';
import authStore from '../../store/authStore';import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";









const parseLocalDate = (dateVal) => {
  if (!dateVal) return '';
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) {
    return typeof dateVal === 'string' ? dateVal.split('T')[0] : '';
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const BusinessLogPage = () => {
  const { selectedStoreSeq } = authStore();
  const [viewMode, setViewMode] = useState('list');
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().substring(0, 7));
  const [params, setParams] = useState({
    startDate: '',
    endDate: '',
    type: 'ALL'
  });
  const [currentPage, setCurrentPage] = useState(1);


  const [cardPayments, setCardPayments] = useState([]);
  const [cardPaymentsForCalendar, setCardPaymentsForCalendar] = useState([]);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [salesForm, setSalesForm] = useState({
    targetDate: new Date().toISOString().substring(0, 10),
    amount: '',
    category: '매출',
    description: '일일 영업 매출 등록'
  });

  const { financeList, dailySummary, isLoading, fetchFinanceList, fetchDailySummary, addFinance } = useFinance();

  const loadCardPayments = useCallback(async () => {
    if (!selectedStoreSeq) return;
    try {
      const data = await getRecentPayments({ storeSeq: selectedStoreSeq, period: 'month' });
      setCardPayments(data || []);
    } catch (err) {
      console.error("카드 내역 조회 실패:", err);
    }
  }, [selectedStoreSeq]);

  useEffect(() => {
    setCurrentPage(1);
  }, [params]);

  useEffect(() => {
    if (viewMode === 'list') {
      fetchFinanceList(params);
      loadCardPayments();
    } else {
      fetchDailySummary(currentMonth);
      if (selectedStoreSeq) {
        const [year, month] = currentMonth.split('-').map(Number);
        const lastDay = new Date(year, month, 0).getDate();
        const startDate = `${currentMonth}-01`;
        const endDate = `${currentMonth}-${String(lastDay).padStart(2, '0')}`;


        fetchFinanceList({ startDate, endDate, type: 'ALL' });

        getRecentPayments({ storeSeq: selectedStoreSeq, startDate, endDate, period: 'custom' }).
        then((data) => setCardPaymentsForCalendar(data || [])).
        catch((err) => console.error("캘린더 카드 내역 조회 실패:", err));
      }
    }
  }, [fetchFinanceList, fetchDailySummary, loadCardPayments, viewMode, params, currentMonth, selectedStoreSeq]);


  const getCalendarDays = () => {
    const [year, month] = currentMonth.split('-').map(Number);
    const firstDay = new Date(year, month - 1, 1);
    const startDayOfWeek = firstDay.getDay();
    const totalDays = new Date(year, month, 0).getDate();

    const days = [];


    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ day: null, dateStr: '' });
    }


    for (let i = 1; i <= totalDays; i++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({ day: i, dateStr });
    }


    const totalCells = Math.ceil(days.length / 7) * 7;
    const remaining = totalCells - days.length;
    for (let i = 0; i < remaining; i++) {
      days.push({ day: null, dateStr: '' });
    }

    return days;
  };


  const filteredCardPayments = cardPayments.filter((p) => {
    const date = parseLocalDate(p.paidAt);
    if (params.startDate && date < params.startDate) return false;
    if (params.endDate && date > params.endDate) return false;
    if (params.type === 'INCOME') return false;
    return true;
  });


  const combinedList = [
  ...financeList.map((f) => ({
    ...f,
    targetDate: parseLocalDate(f.targetDate)
  })),
  ...filteredCardPayments.map((p) => ({
    financeSeq: `card-${p.paymentSeq}`,
    targetDate: parseLocalDate(p.paidAt),
    type: 'EXPENSE',
    category: '카드결제',
    description: `${p.partnerName} 대금 결제 (${p.cardCompany} ${p.cardNumberMasked})`,
    amount: p.totalAmount
  }))].
  sort((a, b) => new Date(b.targetDate) - new Date(a.targetDate));

  const itemsPerPage = 5;
  const totalPages = Math.ceil(combinedList.length / itemsPerPage) || 1;
  const displayedList = combinedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalIncome = combinedList.filter((f) => f.type === 'INCOME').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = combinedList.filter((f) => f.type === 'EXPENSE').reduce((acc, curr) => acc + curr.amount, 0);

  const handleSaveSales = async (e) => {
    e.preventDefault();
    if (!salesForm.amount || isNaN(salesForm.amount)) {
      alert('올바른 금액을 입력해 주세요.');
      return;
    }

    const success = await addFinance({
      type: 'INCOME',
      amount: Number(salesForm.amount),
      category: salesForm.category,
      description: salesForm.description,
      targetDate: salesForm.targetDate
    });

    if (success) {
      alert('영업 매출이 등록되었습니다.');
      setIsModalOpen(false);

      setSalesForm({
        targetDate: new Date().toISOString().substring(0, 10),
        amount: '',
        category: '매출',
        description: '일일 영업 매출 등록'
      });

      fetchFinanceList(params);
      loadCardPayments();
      fetchDailySummary(currentMonth);
    } else {
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    _jsxDEV("div", { className: "p-8 max-w-7xl mx-auto", children: [
      _jsxDEV("header", { className: "mb-8 flex justify-between items-end", children: [
        _jsxDEV("div", { children: [
          _jsxDEV("div", { className: "flex items-center gap-2 mb-2", children: [
            _jsxDEV("span", { className: "w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 text-sm", children: "📝" }, void 0, false),
            _jsxDEV("span", { className: "text-[11px] font-black text-amber-500 uppercase tracking-widest", children: "Finance & Logs" }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("h1", { className: "text-3xl font-black text-gray-900 tracking-tight", children: "영업 일지 및 정산 관리" }, void 0, false),
          _jsxDEV("p", { className: "text-sm text-gray-400 font-medium mt-1", children: "매일의 매출, 지출 기록과 정산 내역을 통합 관리합니다." }, void 0, false)] }, void 0, true
        ),
        _jsxDEV("div", { className: "flex gap-4 items-center", children: [
          _jsxDEV("button", {
            onClick: () => setIsModalOpen(true),
            className: "px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-amber-100 flex items-center gap-1.5", children: [

            _jsxDEV("span", { children: "+" }, void 0, false), " 오늘 매출 등록"] }, void 0, true
          ),
          _jsxDEV("div", { className: "bg-gray-100 p-1 rounded-2xl flex", children: [
            _jsxDEV("button", {
              onClick: () => setViewMode('list'),
              className: `px-6 py-2 rounded-xl text-xs font-black transition-all ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`, children:
              "리스트 보기" }, void 0, false

            ),
            _jsxDEV("button", {
              onClick: () => setViewMode('calendar'),
              className: `px-6 py-2 rounded-xl text-xs font-black transition-all ${viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`, children:
              "캘린더 보기" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ),


      _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [
        _jsxDEV("div", { className: "bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm", children: [
          _jsxDEV("div", { className: "text-[11px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-4", children: "Total Income" }, void 0, false),
          _jsxDEV("div", { className: "text-3xl font-black text-gray-900", children: [totalIncome.toLocaleString(), "원"] }, void 0, true),
          _jsxDEV("div", { className: "mt-2 text-xs text-gray-400 font-bold", children: "조회 기간 합계" }, void 0, false)] }, void 0, true
        ),
        _jsxDEV("div", { className: "bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm", children: [
          _jsxDEV("div", { className: "text-[11px] font-black text-rose-500 uppercase tracking-[0.2em] mb-4", children: "Total Expense" }, void 0, false),
          _jsxDEV("div", { className: "text-3xl font-black text-gray-900", children: [totalExpense.toLocaleString(), "원"] }, void 0, true),
          _jsxDEV("div", { className: "mt-2 text-xs text-gray-400 font-bold", children: "조회 기간 합계" }, void 0, false)] }, void 0, true
        ),
        _jsxDEV("div", { className: "bg-gray-900 p-8 rounded-[2.5rem] shadow-xl shadow-gray-200", children: [
          _jsxDEV("div", { className: "text-[11px] font-black text-white/50 uppercase tracking-[0.2em] mb-4", children: "Net Profit" }, void 0, false),
          _jsxDEV("div", { className: "text-3xl font-black text-white", children: [(totalIncome - totalExpense).toLocaleString(), "원"] }, void 0, true),
          _jsxDEV("div", { className: "mt-2 text-xs text-white/40 font-bold", children: "순이익" }, void 0, false)] }, void 0, true
        )] }, void 0, true
      ),

      viewMode === 'list' ?
      _jsxDEV(_Fragment, { children: [

        _jsxDEV("div", { className: "bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-5 gap-4 items-end", children: [
          _jsxDEV("div", { className: "md:col-span-2", children: [
            _jsxDEV("label", { className: "block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 ml-1", children: "조회 기간" }, void 0, false),
            _jsxDEV("div", { className: "flex items-center gap-3", children: [
              _jsxDEV("input", {
                type: "date",
                className: "flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-amber-500 min-w-[130px]",
                onChange: (e) => setParams((prev) => ({ ...prev, startDate: e.target.value })) }, void 0, false
              ),
              _jsxDEV("span", { className: "text-gray-300 shrink-0 font-bold", children: "~" }, void 0, false),
              _jsxDEV("input", {
                type: "date",
                className: "flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-amber-500 min-w-[130px]",
                onChange: (e) => setParams((prev) => ({ ...prev, endDate: e.target.value })) }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ),
          _jsxDEV("div", { className: "md:col-span-1", children: [
            _jsxDEV("label", { className: "block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 ml-1", children: "구분" }, void 0, false),
            _jsxDEV("select", {
              className: "w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-amber-500 appearance-none",
              onChange: (e) => setParams((prev) => ({ ...prev, type: e.target.value })), children: [

              _jsxDEV("option", { value: "ALL", children: "전체 보기" }, void 0, false),
              _jsxDEV("option", { value: "INCOME", children: "수익 (+)" }, void 0, false),
              _jsxDEV("option", { value: "EXPENSE", children: "지출 (-)" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden", children:
          _jsxDEV("table", { className: "w-full text-left border-collapse", children: [
            _jsxDEV("thead", { children:
              _jsxDEV("tr", { className: "bg-gray-50/50 border-b border-gray-100", children: [
                _jsxDEV("th", { className: "px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "날짜" }, void 0, false),
                _jsxDEV("th", { className: "px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "구분" }, void 0, false),
                _jsxDEV("th", { className: "px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-center", children: "카테고리" }, void 0, false),
                _jsxDEV("th", { className: "px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider", children: "상세 내용" }, void 0, false),
                _jsxDEV("th", { className: "px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-wider text-right", children: "금액" }, void 0, false)] }, void 0, true
              ) }, void 0, false
            ),
            _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
              isLoading ?
              _jsxDEV("tr", { children: _jsxDEV("td", { colSpan: "5", className: "px-8 py-20 text-center text-gray-400 font-bold animate-pulse", children: "기록을 불러오는 중..." }, void 0, false) }, void 0, false) :
              displayedList.length > 0 ?
              displayedList.map((item) =>
              _jsxDEV("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
                _jsxDEV("td", { className: "px-8 py-6 text-sm font-bold text-gray-400 text-center", children:
                  item.targetDate ? item.targetDate.split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$1년 $2월 $3일') : '-' }, void 0, false
                ),
                _jsxDEV("td", { className: "px-8 py-6 text-center", children:
                  _jsxDEV("span", { className: `px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    item.type === 'INCOME' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`, children:

                    item.type === 'INCOME' ? '수익' : '지출' }, void 0, false
                  ) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-8 py-6 text-center", children:
                  _jsxDEV("span", { className: "text-[13px] font-black text-gray-900 bg-gray-50 px-3 py-1 rounded-lg", children: item.category }, void 0, false) }, void 0, false
                ),
                _jsxDEV("td", { className: "px-8 py-6 text-[15px] font-medium text-gray-600", children: item.description }, void 0, false),
                _jsxDEV("td", { className: `px-8 py-6 text-lg font-black text-right ${
                  item.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'}`, children: [

                  item.type === 'INCOME' ? '+' : '-', item.amount.toLocaleString(), "원"] }, void 0, true
                )] }, item.financeSeq, true
              )
              ) :

              _jsxDEV("tr", { children:
                _jsxDEV("td", { colSpan: "5", className: "px-8 py-32 text-center", children: [
                  _jsxDEV("div", { className: "text-5xl mb-6 opacity-20", children: "📝" }, void 0, false),
                  _jsxDEV("p", { className: "text-gray-400 font-bold", children: "등록된 장부 기록이 없습니다." }, void 0, false)] }, void 0, true
                ) }, void 0, false
              ) }, void 0, false

            )] }, void 0, true
          ) }, void 0, false
        ),


        !isLoading && combinedList.length > 0 &&
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
                  'bg-amber-500 text-white shadow-lg shadow-amber-200' :
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
        )] }, void 0, true

      ) :

      _jsxDEV("div", { className: "bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/50", children: [
        _jsxDEV("div", { className: "flex justify-between items-center mb-8", children: [
          _jsxDEV("h2", { className: "text-2xl font-black text-gray-900", children: [currentMonth.split('-')[0], "년 ", currentMonth.split('-')[1], "월"] }, void 0, true),
          _jsxDEV("div", { className: "flex gap-2", children: [
            _jsxDEV("button", {
              onClick: () => {
                const [y, m] = currentMonth.split('-').map(Number);
                const prev = m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, '0')}`;
                setCurrentMonth(prev);
              },
              className: "w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all", children:
              "←" }, void 0, false

            ),
            _jsxDEV("button", {
              onClick: () => {
                const [y, m] = currentMonth.split('-').map(Number);
                const next = m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, '0')}`;
                setCurrentMonth(next);
              },
              className: "w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all", children:
              "→" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        ),

        _jsxDEV("div", { className: "grid grid-cols-7 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden", children: [
          ['일', '월', '화', '수', '목', '금', '토'].map((d) =>
          _jsxDEV("div", { className: "bg-gray-50 py-4 text-center text-[11px] font-black text-gray-400 uppercase tracking-widest", children: d }, d, false)
          ),
          getCalendarDays().map((cell, i) => {
            if (!cell.day) {
              return _jsxDEV("div", { className: "bg-gray-50/50 min-h-[120px]" }, `empty-${i}`, false);
            }

            const { day, dateStr } = cell;

            const dayFinanceLogs = financeList.filter((f) => parseLocalDate(f.targetDate) === dateStr);
            const dayCardPayments = cardPaymentsForCalendar.filter((p) => parseLocalDate(p.paidAt) === dateStr);

            return (
              _jsxDEV("div", { className: "bg-white min-h-[140px] p-3 flex flex-col justify-between group hover:bg-gray-50 transition-colors", children: [
                _jsxDEV("div", { className: "flex justify-between items-center mb-2", children:
                  _jsxDEV("span", { className: "text-sm font-bold text-gray-400 group-hover:text-gray-900", children: day }, void 0, false) }, void 0, false
                ),


                _jsxDEV("div", { className: "flex-1 overflow-y-auto space-y-1 max-h-[90px] custom-scrollbar", children: [

                  dayFinanceLogs.filter((f) => f.type === 'INCOME').map((item, idx) =>
                  _jsxDEV("div", { className: "text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex justify-between items-center gap-1", title: `${item.category}: ${item.description}`, children: [
                    _jsxDEV("span", { className: "truncate max-w-[45px]", children: item.category }, void 0, false),
                    _jsxDEV("span", { className: "shrink-0", children: ["+", item.amount.toLocaleString()] }, void 0, true)] }, `income-${idx}`, true
                  )
                  ),


                  dayFinanceLogs.filter((f) => f.type === 'EXPENSE').map((item, idx) =>
                  _jsxDEV("div", { className: "text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded flex justify-between items-center gap-1", title: `${item.category}: ${item.description}`, children: [
                    _jsxDEV("span", { className: "truncate max-w-[45px]", children: item.category }, void 0, false),
                    _jsxDEV("span", { className: "shrink-0", children: ["-", item.amount.toLocaleString()] }, void 0, true)] }, `expense-${idx}`, true
                  )
                  ),


                  dayCardPayments.map((item, idx) =>
                  _jsxDEV("div", { className: "text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded flex justify-between items-center gap-1", title: `${item.partnerName} 결제: ${item.cardNumberMasked || ''}`, children: [
                    _jsxDEV("span", { className: "truncate max-w-[45px]", children: item.partnerName || '카드' }, void 0, false),
                    _jsxDEV("span", { className: "shrink-0", children: ["-", item.totalAmount.toLocaleString()] }, void 0, true)] }, `card-${idx}`, true
                  )
                  )] }, void 0, true
                )] }, dateStr, true
              ));

          })] }, void 0, true
        )] }, void 0, true
      ),


      isModalOpen &&
      _jsxDEV("div", { className: "fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] animate-in fade-in duration-200", children:
        _jsxDEV("div", { className: "bg-white rounded-[2rem] border border-gray-100 p-8 shadow-2xl w-[480px] max-w-[90vw] animate-in zoom-in-95 duration-200", children: [
          _jsxDEV("div", { className: "flex justify-between items-center mb-6", children: [
            _jsxDEV("h3", { className: "text-xl font-bold text-gray-900 flex items-center gap-2", children: [
              _jsxDEV("span", { className: "w-1.5 h-6 bg-amber-500 rounded-full" }, void 0, false), "오늘 매출 등록"] }, void 0, true

            ),
            _jsxDEV("button", {
              onClick: () => setIsModalOpen(false),
              className: "text-gray-400 hover:text-gray-600 transition-colors text-lg", children:
              "✕" }, void 0, false

            )] }, void 0, true
          ),

          _jsxDEV("form", { onSubmit: handleSaveSales, className: "space-y-5", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2", children: "영업 날짜" }, void 0, false),
              _jsxDEV("input", {
                type: "date",
                required: true,
                value: salesForm.targetDate,
                onChange: (e) => setSalesForm((prev) => ({ ...prev, targetDate: e.target.value })),
                className: "w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-amber-500 outline-none" }, void 0, false
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2", children: "매출 금액 (원)" }, void 0, false),
              _jsxDEV("input", {
                type: "number",
                required: true,
                min: "0",
                placeholder: "금액을 입력하세요",
                value: salesForm.amount,
                onChange: (e) => setSalesForm((prev) => ({ ...prev, amount: e.target.value })),
                className: "w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-amber-500 outline-none" }, void 0, false
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2", children: "분류 (카테고리)" }, void 0, false),
              _jsxDEV("input", {
                type: "text",
                required: true,
                placeholder: "예: 매출, 주말매출, 배달매출",
                value: salesForm.category,
                onChange: (e) => setSalesForm((prev) => ({ ...prev, category: e.target.value })),
                className: "w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-amber-500 outline-none" }, void 0, false
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2", children: "상세 메모" }, void 0, false),
              _jsxDEV("textarea", {
                rows: "3",
                placeholder: "상세 내용을 입력하세요",
                value: salesForm.description,
                onChange: (e) => setSalesForm((prev) => ({ ...prev, description: e.target.value })),
                className: "w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-amber-500 outline-none resize-none" }, void 0, false
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "flex gap-3 pt-4", children: [
              _jsxDEV("button", {
                type: "button",
                onClick: () => setIsModalOpen(false),
                className: "flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-all text-sm", children:
                "취소" }, void 0, false

              ),
              _jsxDEV("button", {
                type: "submit",
                className: "flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black transition-all text-sm shadow-lg shadow-amber-100", children:
                "저장하기" }, void 0, false

              )] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ) }, void 0, false
      )] }, void 0, true

    ));

};

export default BusinessLogPage;