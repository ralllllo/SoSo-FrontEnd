import React, { useState, useEffect } from 'react';
import { getAttendanceHistory } from '../../../apis/employeeApi';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const AttendanceHistoryModal = ({ isOpen, onClose, employee }) => {
  const [history, setHistory] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    setSelectedMonth(`${yyyy}-${mm}`);
  }, [isOpen]);


  useEffect(() => {
    if (!isOpen || !employee || !selectedMonth) return;

    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const data = await getAttendanceHistory(employee.employeeSeq, selectedMonth);
        setHistory(data || []);
      } catch (err) {
        console.error('근태 이력 로드 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [isOpen, employee, selectedMonth]);

  if (!isOpen || !employee) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case '정상':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case '지각':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case '조퇴':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case '결근':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    _jsxDEV("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4", children:
      _jsxDEV("div", { className: "bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-fade-in border border-gray-100 flex flex-col max-h-[90vh]", children: [


        _jsxDEV("div", { className: "bg-emerald-500 px-6 py-4 flex justify-between items-center text-white shrink-0", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("h3", { className: "font-bold text-lg", children: "📅 근태 기록 정보 조회" }, void 0, false),
            _jsxDEV("p", { className: "text-xs text-emerald-100 mt-0.5", children: [employee.empName, " 직원의 출퇴근 상세 리스트"] }, void 0, true)] }, void 0, true
          ),
          _jsxDEV("button", { onClick: onClose, className: "text-white hover:text-emerald-100 text-xl font-bold cursor-pointer", children: "×" }, void 0, false

          )] }, void 0, true
        ),

        _jsxDEV("div", { className: "p-6 flex flex-col gap-4 overflow-hidden flex-grow", children: [

          _jsxDEV("div", { className: "flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-150 shrink-0", children: [
            _jsxDEV("span", { className: "text-sm font-bold text-gray-700", children: "📆 조회 기준 월" }, void 0, false),
            _jsxDEV("input", {
              type: "month",
              value: selectedMonth,
              onChange: (e) => setSelectedMonth(e.target.value),
              className: "px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" }, void 0, false
            )] }, void 0, true
          ),


          _jsxDEV("div", { className: "overflow-auto border border-gray-100 rounded-xl flex-grow max-h-[400px]", children:
            isLoading ?
            _jsxDEV("div", { className: "p-20 text-center text-gray-400 text-sm", children: "기록을 불러오는 중입니다..." }, void 0, false) :
            history.length === 0 ?
            _jsxDEV("div", { className: "p-20 text-center text-gray-400 text-sm", children: "해당 월에 기록된 출퇴근 이력이 없습니다." }, void 0, false) :

            _jsxDEV("table", { className: "w-full text-left border-collapse text-xs", children: [
              _jsxDEV("thead", { className: "bg-gray-50 text-gray-500 font-bold sticky top-0 border-b border-gray-100 z-10", children:
                _jsxDEV("tr", { children: [
                  _jsxDEV("th", { className: "px-4 py-3", children: "근무 일자" }, void 0, false),
                  _jsxDEV("th", { className: "px-4 py-3", children: "실제 출근시간" }, void 0, false),
                  _jsxDEV("th", { className: "px-4 py-3", children: "실제 퇴근시간" }, void 0, false),
                  _jsxDEV("th", { className: "px-4 py-3", children: "근태 상태" }, void 0, false),
                  _jsxDEV("th", { className: "px-4 py-3", children: "비고/메모" }, void 0, false)] }, void 0, true
                ) }, void 0, false
              ),
              _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
                history.map((row) =>
                _jsxDEV("tr", { className: "hover:bg-gray-50/50", children: [
                  _jsxDEV("td", { className: "px-4 py-3 font-bold text-gray-700", children: row.workDate }, void 0, false),
                  _jsxDEV("td", { className: "px-4 py-3 text-gray-600 font-mono", children: row.actualStartTime || '-' }, void 0, false),
                  _jsxDEV("td", { className: "px-4 py-3 text-gray-600 font-mono", children: row.actualEndTime || '-' }, void 0, false),
                  _jsxDEV("td", { className: "px-4 py-3", children:
                    _jsxDEV("span", { className: `px-2 py-0.5 rounded-full border text-[10px] font-black ${getStatusBadge(row.attendanceStatus)}`, children:
                      row.attendanceStatus }, void 0, false
                    ) }, void 0, false
                  ),
                  _jsxDEV("td", { className: "px-4 py-3 text-gray-500 truncate max-w-[180px]", title: row.memo, children:
                    row.memo || '-' }, void 0, false
                  )] }, row.attendanceSeq, true
                )
                ) }, void 0, false
              )] }, void 0, true
            ) }, void 0, false

          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0", children:
          _jsxDEV("button", {
            onClick: onClose,
            className: "px-6 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all cursor-pointer shadow-md", children:
            "확인" }, void 0, false

          ) }, void 0, false
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default AttendanceHistoryModal;