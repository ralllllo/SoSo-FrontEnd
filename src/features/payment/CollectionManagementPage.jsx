
import { useEffect, useMemo, useState } from "react";





import { getCollectionDashboard } from "../../apis/account";
import MainFooter from "../../components/layout/MainFooter";import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

const ROWS_PER_PAGE = 10;


const cardStyles = {

  emerald: {
    border: 'border-emerald-100',
    icon: 'bg-emerald-50 text-emerald-600',
    amount: 'text-emerald-600'
  },


  blue: {
    border: 'border-blue-100',
    icon: 'bg-blue-50 text-blue-600',
    amount: 'text-blue-600'
  },


  amber: {
    border: 'border-amber-100',
    icon: 'bg-amber-50 text-amber-500',
    amount: 'text-amber-500'
  }
};


function CollectionManagementPage() {

  const [businessInfo, setBusinessInfo] = useState(null);


  const [summary, setSummary] = useState({
    paidAmount: 0,
    paidCount: 0,
    scheduledAmount: 0,
    scheduledCount: 0,
    unpaidAmount: 0,
    unpaidCount: 0
  });


  const [depositAccounts, setDepositAccounts] = useState([]);


  const [collectionRows, setCollectionRows] = useState([]);


  const [selectedClient, setSelectedClient] = useState('전체');

  const [currentPage, setCurrentPage] = useState(1);


  const money = (value) => {

    return `${Number(value || 0).toLocaleString()}원`;
  };


  const fetchCollectionDashboard = async () => {

    const storeSeq = JSON.parse(localStorage.getItem('soso-auth-storage'))?.state?.selectedStoreSeq;


    if (!storeSeq) {
      return;
    }

    try {

      const data = await getCollectionDashboard(storeSeq);


      setBusinessInfo(data.businessInfos || data.businessInfo || null);


      setSummary(data.summary || {
        paidAmount: 0,
        paidCount: 0,
        scheduledAmount: 0,
        scheduledCount: 0,
        unpaidAmount: 0,
        unpaidCount: 0
      });


      setDepositAccounts(data.depositAccounts || []);


      setCollectionRows(data.collectionRows || []);
      setCurrentPage(1);
    } catch (error) {

      console.error('수금관리 조회 실패:', error);
    }
  };


  useEffect(() => {

    fetchCollectionDashboard();
  }, []);


  const summaryCards = [

  {
    label: '이번 달 입금 완료',
    amount: money(summary.paidAmount),
    description: `총 ${summary.paidCount || 0}건의 입금이 확인됐어요`,
    color: 'emerald'
  },


  {
    label: '월 입금 예정 금액',
    amount: money(summary.scheduledAmount),
    description: `앞으로 ${summary.scheduledCount || 0}건의 입금이 예정돼요`,
    color: 'blue'
  },


  {
    label: '미수금',
    amount: money(summary.unpaidAmount),
    description: `확인이 필요한 미수금 ${summary.unpaidCount || 0}건`,
    color: 'amber'
  }];



  const clientFilters = useMemo(() => {

    const names = collectionRows.map((row) => row.client);


    return ['전체', ...new Set(names)];
  }, [collectionRows]);


  const filteredRows = useMemo(() => {

    if (selectedClient === '전체') {
      return collectionRows;
    }


    return collectionRows.filter((row) => row.client === selectedClient);
  }, [collectionRows, selectedClient]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / ROWS_PER_PAGE));

  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredRows.slice(startIndex, startIndex + ROWS_PER_PAGE);
  }, [currentPage, filteredRows]);


  const businessInfoList = useMemo(() => {
    if (!businessInfo) {
      return [];
    }

    return Array.isArray(businessInfo) ? businessInfo : [businessInfo];
  }, [businessInfo]);


  return (
    _jsxDEV("div", { className: "flex min-h-screen flex-col bg-slate-50 text-slate-800", children: [
      _jsxDEV("main", { className: "mx-auto w-full max-w-7xl flex-1 space-y-8 px-5 py-8 lg:px-8", children: [

        _jsxDEV("section", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children:
          _jsxDEV("div", { children: [
            _jsxDEV("p", { className: "mb-2 text-sm font-bold text-emerald-600", children: "수금 관리" }, void 0, false),
            _jsxDEV("h1", { className: "text-3xl font-black tracking-tight text-slate-900", children: "월 결제 현황" }, void 0, false),
            _jsxDEV("p", { className: "mt-2 text-sm text-slate-500", children: "거래처 기준 수금 현황과 입금 내역을 한눈에 확인하세요." }, void 0, false

            )] }, void 0, true
          ) }, void 0, false

        ),


        _jsxDEV("section", { className: "grid gap-4 md:grid-cols-3", children:
          summaryCards.map((card) => {

            const style = cardStyles[card.color];


            return (
              _jsxDEV("article", { className: `rounded-3xl border bg-white p-6 shadow-sm ${style.border}`, children:
                _jsxDEV("div", { className: "flex items-start justify-between", children: [
                  _jsxDEV("div", { children: [
                    _jsxDEV("p", { className: "text-sm font-bold text-slate-500", children: card.label }, void 0, false),
                    _jsxDEV("p", { className: `mt-3 text-3xl font-black tracking-tight ${style.amount}`, children: card.amount }, void 0, false),
                    _jsxDEV("p", { className: "mt-3 text-xs font-medium text-slate-400", children: card.description }, void 0, false)] }, void 0, true
                  ),


                  _jsxDEV("span", { className: `flex h-11 w-11 items-center justify-center rounded-2xl ${style.icon}`, children:
                    _jsxDEV("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children:
                      _jsxDEV("path", { d: "M4 7h16M7 3v4m10-4v4M5 11h14v9H5z", strokeLinecap: "round", strokeLinejoin: "round" }, void 0, false) }, void 0, false
                    ) }, void 0, false
                  )] }, void 0, true
                ) }, card.label, false
              ));

          }) }, void 0, false
        ),


        _jsxDEV("section", { className: "grid gap-6 lg:grid-cols-[0.9fr_1.1fr]", children: [

          _jsxDEV("article", { className: "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm", children: [
            _jsxDEV("div", { className: "mb-6 flex items-center justify-between", children: [
              _jsxDEV("div", { children: [
                _jsxDEV("p", { className: "text-xs font-bold text-emerald-600", children: "사업자 정보" }, void 0, false),
                _jsxDEV("h2", { className: "mt-1 text-xl font-black text-slate-900", children: "기본 정보 관리" }, void 0, false)] }, void 0, true
              ),

              _jsxDEV("span", { className: "rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500", children: ["총 ",
                businessInfoList.length, "개"] }, void 0, true
              )] }, void 0, true
            ),


            businessInfoList.length === 0 ?
            _jsxDEV("p", { className: "rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-400", children: "등록된 사업자 정보가 없습니다." }, void 0, false

            ) :

            _jsxDEV("div", { className: "max-h-[420px] space-y-3 overflow-y-auto pr-1", children:
              businessInfoList.map((info, index) =>
              _jsxDEV("section", {

                className: "rounded-2xl border border-slate-100 bg-slate-50 p-4", children: [

                _jsxDEV("div", { className: "mb-4 flex items-center justify-between", children: [
                  _jsxDEV("p", { className: "text-sm font-black text-slate-800", children: ["사업자 정보 ", index + 1] }, void 0, true),
                  _jsxDEV("span", { className: "rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 shadow-sm", children:
                    info.businessType || '-' }, void 0, false
                  )] }, void 0, true
                ),

                _jsxDEV("dl", { className: "space-y-3", children:
                  [
                  ['사업자 유형', info.businessType || '-'],
                  ['사업자번호', info.businessNumber || '-'],
                  ['대표자명', info.ownerName || '-']].
                  map(([label, value]) =>
                  _jsxDEV("div", {

                    className: "grid grid-cols-[100px_1fr] items-center border-b border-slate-200 pb-3 last:border-0 last:pb-0", children: [

                    _jsxDEV("dt", { className: "text-sm font-semibold text-slate-400", children: label }, void 0, false),
                    _jsxDEV("dd", { className: "text-sm font-bold text-slate-700", children: value }, void 0, false)] }, label, true
                  )
                  ) }, void 0, false
                )] }, info.businessNumber || index, true

              )
              ) }, void 0, false
            )] }, void 0, true

          ),


          _jsxDEV("article", { className: "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm", children: [
            _jsxDEV("div", { className: "mb-5 flex items-center justify-between", children: [
              _jsxDEV("div", { children: [
                _jsxDEV("p", { className: "text-xs font-bold text-blue-600", children: "입금 계좌" }, void 0, false),
                _jsxDEV("h2", { className: "mt-1 text-xl font-black text-slate-900", children: "들어온 계좌 확인" }, void 0, false)] }, void 0, true
              ),


              _jsxDEV("button", { type: "button", className: "text-xs font-bold text-slate-400 hover:text-emerald-600", children: "전체 보기" }, void 0, false

              )] }, void 0, true
            ),


            _jsxDEV("div", { className: "space-y-3", children:
              depositAccounts.length === 0 ?

              _jsxDEV("p", { className: "rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-400", children: "입금 내역이 없습니다." }, void 0, false
              ) :


              depositAccounts.map((item, index) =>
              _jsxDEV("div", {

                className: "flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between", children: [

                _jsxDEV("div", { className: "flex items-center gap-3", children: [
                  _jsxDEV("span", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-black text-blue-600 shadow-sm", children:
                    (item.bank || '계좌').slice(0, 2) }, void 0, false
                  ),

                  _jsxDEV("div", { children: [
                    _jsxDEV("p", { className: "text-sm font-black text-slate-800", children: item.bank || '-' }, void 0, false),
                    _jsxDEV("p", { className: "mt-1 text-xs font-medium text-slate-400", children: item.account || '-' }, void 0, false)] }, void 0, true
                  )] }, void 0, true
                ),

                _jsxDEV("div", { className: "text-left sm:text-right", children: [
                  _jsxDEV("p", { className: "text-sm font-black text-emerald-600", children: ["+ ", money(item.amount)] }, void 0, true),
                  _jsxDEV("p", { className: "mt-1 text-xs text-slate-400", children: item.date || '-' }, void 0, false)] }, void 0, true
                )] }, `${item.bank || 'bank'}-${index}`, true
              )
              ) }, void 0, false

            ),


            _jsxDEV("button", {
              type: "button",
              onClick: fetchCollectionDashboard,
              className: "mt-4 w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700", children:
              "입금 내역 새로고침" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("section", { className: "overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm", children: [
          _jsxDEV("div", { className: "flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("p", { className: "text-xs font-bold text-emerald-600", children: "거래처별 현황" }, void 0, false),
              _jsxDEV("h2", { className: "mt-1 text-xl font-black text-slate-900", children: "거래처 수금 이력" }, void 0, false)] }, void 0, true
            ),


            _jsxDEV("div", { className: "flex flex-wrap gap-2", children:
              clientFilters.map((filter) =>
              _jsxDEV("button", {

                type: "button",
                onClick: () => {
                  setSelectedClient(filter);
                  setCurrentPage(1);
                },
                className: `rounded-xl px-4 py-2 text-xs font-bold ${
                selectedClient === filter ?
                'bg-emerald-600 text-white' :
                'border border-slate-200 bg-white text-slate-500 hover:border-emerald-200 hover:text-emerald-600'}`, children:


                filter }, filter, false
              )
              ) }, void 0, false
            )] }, void 0, true
          ),


          _jsxDEV("div", { className: "overflow-x-auto", children:
            _jsxDEV("table", { className: "min-w-[800px] w-full table-fixed text-center", children: [
              _jsxDEV("thead", { className: "bg-slate-50 text-xs font-bold text-slate-500", children:
                _jsxDEV("tr", { children: [
                  _jsxDEV("th", { className: "px-6 py-4", children: "거래처명" }, void 0, false),
                  _jsxDEV("th", { className: "px-6 py-4", children: "사업자 구분" }, void 0, false),
                  _jsxDEV("th", { className: "px-6 py-4", children: "예정 금액" }, void 0, false),
                  _jsxDEV("th", { className: "px-6 py-4", children: "입금된 금액" }, void 0, false),
                  _jsxDEV("th", { className: "px-6 py-4", children: "입금 카드" }, void 0, false),
                  _jsxDEV("th", { className: "px-6 py-4 text-center", children: "상태" }, void 0, false)] }, void 0, true
                ) }, void 0, false
              ),

              _jsxDEV("tbody", { className: "divide-y divide-slate-100", children:
                filteredRows.length === 0 ?

                _jsxDEV("tr", { children:
                  _jsxDEV("td", { colSpan: "6", className: "px-6 py-10 text-center text-sm font-bold text-slate-400", children: "수금 내역이 없습니다." }, void 0, false

                  ) }, void 0, false
                ) :


                paginatedRows.map((row, index) => {

                  const statusStyle = {
                    입금완료: 'bg-emerald-50 text-emerald-700',
                    입금예정: 'bg-amber-50 text-amber-600',
                    미수금: 'bg-red-50 text-red-600'
                  }[row.status] || 'bg-slate-100 text-slate-500';


                  return (

                    _jsxDEV("tr", {
                      className: "hover:bg-slate-50/70", children: [
                      _jsxDEV("td", { className: "px-6 py-5 text-sm font-black text-slate-800", children: row.client || '-' }, void 0, false),
                      _jsxDEV("td", { className: "px-6 py-5 text-sm text-slate-500", children: row.type || '-' }, void 0, false),
                      _jsxDEV("td", { className: "px-6 py-5 text-sm font-bold text-slate-700", children:
                        money(row.expected) }, void 0, false
                      ),
                      _jsxDEV("td", { className: "px-6 py-5 text-sm font-black text-slate-900", children:
                        money(row.paid) }, void 0, false
                      ),
                      _jsxDEV("td", { className: "whitespace-nowrap px-6 py-5 text-sm text-slate-500", children: row.account || '-' }, void 0, false),
                      _jsxDEV("td", { className: "px-6 py-5 text-center", children:
                        _jsxDEV("span", { className: `inline-flex rounded-full px-3 py-1.5 text-xs font-black ${statusStyle}`, children:
                          row.status || '-' }, void 0, false
                        ) }, void 0, false
                      )] }, `${row.client}-${row.expected}-${row.paid}-${row.account}-${index}`, true
                    ));

                }) }, void 0, false

              )] }, void 0, true
            ) }, void 0, false
          ),

          _jsxDEV("nav", {
            className: "flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 bg-slate-50 px-6 py-5",
            "aria-label": "수금 이력 페이지 이동", children: [

            _jsxDEV("button", {
              type: "button",
              onClick: () => setCurrentPage((page) => Math.max(1, page - 1)),
              disabled: currentPage === 1,
              className: "rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:border-emerald-200 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40", children:
              "이전" }, void 0, false

            ),

            Array.from({ length: totalPages }, (_, index) => index + 1).map((page) =>
            _jsxDEV("button", {

              type: "button",
              onClick: () => setCurrentPage(page),
              "aria-current": currentPage === page ? 'page' : undefined,
              className: `h-9 min-w-9 rounded-lg px-3 text-xs font-bold ${
              currentPage === page ?
              'bg-emerald-600 text-white' :
              'border border-slate-200 text-slate-500 hover:border-emerald-200 hover:text-emerald-600'}`, children:


              page }, page, false
            )
            ),

            _jsxDEV("button", {
              type: "button",
              onClick: () => setCurrentPage((page) => Math.min(totalPages, page + 1)),
              disabled: currentPage === totalPages,
              className: "rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:border-emerald-200 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40", children:
              "다음" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ),

      _jsxDEV(MainFooter, {}, void 0, false)] }, void 0, true

    ));

}


export default CollectionManagementPage;