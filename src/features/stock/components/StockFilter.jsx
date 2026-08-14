import React, { useState, useEffect } from 'react';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const StockFilter = ({ filters, categories = [], onFilterChange, onSearch }) => {

  const [searchTerm, setSearchTerm] = useState(filters.search);


  useEffect(() => {
    setSearchTerm(filters.search);
  }, [filters.search]);

  const handleSearchTrigger = () => {

    onFilterChange('search', searchTerm);

    onSearch(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchTrigger();
    }
  };

  return (
    _jsxDEV("div", { className: "bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm mb-8", children:
      _jsxDEV("div", { className: "flex flex-col lg:flex-row gap-4", children: [

        _jsxDEV("div", { className: "flex-1 relative group", children: [
          _jsxDEV("input", {
            type: "text",
            placeholder: "품목명 또는 코드로 검색",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            onKeyDown: handleKeyDown,
            className: "w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] text-[15px] font-medium outline-none focus:bg-white focus:border-emerald-500 transition-all" }, void 0, false
          ),
          _jsxDEV("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-xl grayscale group-focus-within:grayscale-0 transition-all", children: "🔍" }, void 0, false)] }, void 0, true
        ),

        _jsxDEV("div", { className: "flex flex-wrap md:flex-nowrap gap-4", children: [

          _jsxDEV("select", {
            value: filters.category,
            onChange: (e) => onFilterChange('category', e.target.value),
            className: "h-14 px-6 bg-gray-50 border-2 border-transparent rounded-[1.25rem] text-[14px] font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all cursor-pointer appearance-none", children: [

            _jsxDEV("option", { value: "ALL", children: "전체 카테고리" }, void 0, false),
            categories.map((cat) =>
            _jsxDEV("option", { value: cat.categoryName, children:
              cat.categoryName }, cat.categorySeq, false
            )
            )] }, void 0, true
          ),


          _jsxDEV("select", {
            value: filters.status,
            onChange: (e) => onFilterChange('status', e.target.value),
            className: "h-14 px-6 bg-gray-50 border-2 border-transparent rounded-[1.25rem] text-[14px] font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all cursor-pointer appearance-none", children: [

            _jsxDEV("option", { value: "ALL", children: "전체 상태" }, void 0, false),
            _jsxDEV("option", { value: "NORMAL", children: "정상 재고" }, void 0, false),
            _jsxDEV("option", { value: "LACK", children: "재고 부족" }, void 0, false),
            _jsxDEV("option", { value: "OUT_OF_STOCK", children: "품절 항목" }, void 0, false),
            _jsxDEV("option", { value: "EXPIRING_SOON", children: "유통기한 임박" }, void 0, false)] }, void 0, true
          ),


          _jsxDEV("button", {
            onClick: handleSearchTrigger,
            className: "h-14 px-8 bg-emerald-600 text-white font-black rounded-[1.25rem] text-[14px] hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95", children:
            "조회하기" }, void 0, false

          )] }, void 0, true
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default StockFilter;