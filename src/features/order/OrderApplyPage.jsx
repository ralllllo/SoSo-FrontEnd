import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOrderApply } from './hooks/useOrderApply';
import { check } from '../../apis/orderApi';
import { createIncomingStock } from '../../apis/stockApi';import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";






function OrderApplyPage() {
  const navigate = useNavigate();
  const [recommendedStocks, setRecommendedStocks] = useState([]);
  const [selectedSupplierItem, setSelectedSupplierItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const {
    orderInfo,
    items,
    totalSummary,
    supplierItems,
    suppliers,
    filteredSupplierItems,
    handleInfoChange,
    handleItemChange,
    addSelectedItem,
    removeItem,
    handleSubmit,
    deliveryNotes
  } = useOrderApply();


  const supplierRealName = suppliers.find(
    (supplier) => String(supplier.storeSeq) === String(orderInfo.supplier)
  );


  const handleSelectSupplierItem = async (item) => {
    try {
      const storeSeq = Number(JSON.parse(localStorage.getItem('soso-auth-storage'))?.state?.selectedStoreSeq);

      if (!storeSeq) {
        alert('선택된 매장이 없습니다.');
        return;
      }

      const result = await check(item.itemName, storeSeq);
      const list = Array.isArray(result) ? result : [];

      setSelectedSupplierItem(item);
      setRecommendedStocks(list);


      if (list.length === 0) {
        addSelectedItem(item);
      }


      setOpenModal(true);
    } catch (error) {
      console.error('재고 추천 조회 실패:', error);


      addSelectedItem(item);
      setSelectedSupplierItem(item);
      setRecommendedStocks([]);
      setOpenModal(true);
    }
  };


  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const handleConnectStock = (stock) => {
    if (!selectedSupplierItem) return;

    if (!stock.stockSeq) {
      alert('연결할 재고 정보가 없습니다.');
      return;
    }

    console.log('연결할 내 재고:', stock);



    addSelectedItem({
      ...selectedSupplierItem,



      quantity: 1,


      linkedStockSeq: stock.stockSeq,
      linkedStockName: stock.stock
    });

    setOpenModal(false);
    setSelectedSupplierItem(null);
    setRecommendedStocks([]);
  };


  const handleSubmitWithStockIncoming = async () => {
    try {
      const storeSeq = Number(JSON.parse(localStorage.getItem('soso-auth-storage'))?.state?.selectedStoreSeq);

      if (!storeSeq) {
        alert('선택된 매장이 없습니다.');
        return;
      }


      const linkedItems = items.filter((item) => item.linkedStockSeq);

      console.log("전체 발주 품목:", items);
      console.log("재고 연결된 품목:", linkedItems);


      const submitResult = await handleSubmit();

      if (submitResult === false) {
        return;
      }


      for (const item of linkedItems) {
        const quantity = Number(item.quantity);

        if (!quantity || quantity <= 0) continue;

        const incomingData = {
          stockSeq: Number(item.linkedStockSeq),
          quantity,
          changeQuantity: quantity,

          detailProductName: item.itemName,
          detailStockName: item.itemName,

          incomingPrice: Number(item.unitPrice || 0),
          price: Number(item.unitPrice || 0),

          expirationDate: new Date().toISOString().slice(0, 10),

          reason: '발주 신청서 추천 재고 연결',
          memo: `${item.itemName} 발주 수량 ${quantity}개 ${item.linkedStockName || ''}에 입고`
        };

        console.log('입고 요청 데이터:', incomingData);

        await createIncomingStock(storeSeq, incomingData);
      }

      alert('발주 신청 및 재고 입고 처리가 완료되었습니다.');
      navigate('/orders');

    } catch (error) {
      console.error('발주 신청 또는 재고 입고 처리 실패:', error);
      console.log('서버 응답:', error.response?.data);
      alert('발주 신청 또는 재고 입고 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    _jsxDEV("div", { className: "min-h-screen bg-[#F8F9FA] text-gray-800 font-sans", children:
      _jsxDEV("main", { className: "max-w-7xl mx-auto px-6 py-10", children: [
        _jsxDEV("div", { className: "flex justify-between items-end mb-8", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("h2", { className: "text-4xl font-black text-gray-900 tracking-tight mb-2", children: "신규 발주 신청" }, void 0, false),
            _jsxDEV("p", { className: "text-gray-500 font-semibold", children: "정확한 정보를 입력하여 발주서를 작성해주세요." }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { className: "flex gap-3", children: [
            _jsxDEV("button", {
              onClick: () => navigate('/orders'),
              className: "px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all", children:
              "취소" }, void 0, false

            ),
            _jsxDEV("button", {
              onClick: handleSubmitWithStockIncoming,
              className: "px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100", children:
              "발주 신청하기" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        ),

        _jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
          _jsxDEV("div", { className: "lg:col-span-2 space-y-8", children: [

            _jsxDEV("section", { className: "bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm", children: [
              _jsxDEV("h3", { className: "text-xl font-bold text-gray-800 mb-6 flex items-center gap-2", children: [
                _jsxDEV("span", { className: "w-1.5 h-6 bg-emerald-500 rounded-full" }, void 0, false), "발주 기본 정보"] }, void 0, true

              ),
              _jsxDEV("div", { className: "grid grid-cols-2 gap-6", children: [
                _jsxDEV("div", { children: [
                  _jsxDEV("label", { className: "block text-[14px] font-black text-gray-600 mb-2 uppercase tracking-tighter", children: "발주 날짜" }, void 0, false),
                  _jsxDEV("input", {
                    type: "date",
                    value: orderInfo.orderDate,
                    onChange: (e) => handleInfoChange('orderDate', e.target.value),
                    className: "w-full bg-gray-50 border-none rounded-2xl py-4 px-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none" }, void 0, false
                  )] }, void 0, true
                ),
                _jsxDEV("div", { children: [
                  _jsxDEV("label", { className: "block text-[14px] font-black text-gray-600 mb-2 uppercase tracking-tighter", children: "공급업체" }, void 0, false),
                  _jsxDEV("select", {
                    value: orderInfo.supplier,
                    onChange: (e) => handleInfoChange('supplier', e.target.value),
                    className: "w-full bg-gray-50 border-none rounded-2xl py-4 px-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none", children: [

                    _jsxDEV("option", { value: "", children: "공급업체 선택" }, void 0, false),

                    suppliers.map((supplier) =>
                    _jsxDEV("option", { value: supplier.storeSeq, children:
                      supplier.companyName }, supplier.storeSeq, false
                    )
                    )] }, void 0, true
                  )] }, void 0, true
                ),
                _jsxDEV("div", { children: [
                  _jsxDEV("label", { className: "block text-[14px] font-black text-gray-600 mb-2 uppercase tracking-tighter", children: "사업자명" }, void 0, false),
                  _jsxDEV("input", {
                    type: "text",
                    value: orderInfo.manager,
                    readOnly: true,
                    className: "w-full bg-gray-100 border-none rounded-2xl py-4 px-4 text-sm font-bold text-gray-500 cursor-not-allowed" }, void 0, false
                  )] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            ),


            orderInfo.supplier &&
            _jsxDEV("section", { className: "bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-top-4", children: [
              _jsxDEV("div", { className: "p-8 border-b border-gray-50 flex justify-between items-center bg-white", children:
                _jsxDEV("h3", { className: "text-xl font-bold text-gray-800 flex items-center gap-2", children: [
                  _jsxDEV("span", { className: "w-1.5 h-6 bg-emerald-500 rounded-full" }, void 0, false),
                  supplierRealName?.companyName, " 등록 물품",
                  _jsxDEV("span", { className: "text-[14px] font-medium text-gray-500 ml-2", children: "업체에서 공급하는 품목 리스트입니다." }, void 0, false)] }, void 0, true
                ) }, void 0, false
              ),
              _jsxDEV("div", { className: "max-h-[500px] overflow-x-auto custom-scrollbar", children:
                _jsxDEV("table", { className: "w-full min-w-[680px] table-fixed text-left border-collapse", children: [
                  _jsxDEV("thead", { className: "bg-gray-100/100 sticky top-0 z-10", children:
                    _jsxDEV("tr", { children: [
                      _jsxDEV("th", { className: "w-[18%] px-3 py-4 text-[14px] font-black text-gray-600 uppercase tracking-wide text-center align-middle whitespace-nowrap border-b border-gray-50", children: "품목코드" }, void 0, false),
                      _jsxDEV("th", { className: "w-[22%] px-3 py-4 text-[14px] font-black text-gray-600 uppercase tracking-wide text-center align-middle whitespace-nowrap border-b border-gray-50", children: "품목명" }, void 0, false),
                      _jsxDEV("th", { className: "w-[18%] px-3 py-4 text-[14px] font-black text-gray-600 uppercase tracking-wide text-center align-middle whitespace-nowrap border-b border-gray-50", children: "카테고리" }, void 0, false),
                      _jsxDEV("th", { className: "w-[16%] px-3 py-4 text-[14px] font-black text-gray-600 uppercase tracking-wide text-center align-middle whitespace-nowrap border-b border-gray-50", children: "규격" }, void 0, false),
                      _jsxDEV("th", { className: "w-[16%] px-3 py-4 text-[14px] font-black text-gray-600 uppercase tracking-wide text-center align-middle whitespace-nowrap border-b border-gray-50", children: "판매단가" }, void 0, false),
                      _jsxDEV("th", { className: "w-[10%] px-3 py-4 text-[14px] font-black text-gray-600 uppercase tracking-wide text-center align-middle border-b border-gray-50" }, void 0, false)] }, void 0, true
                    ) }, void 0, false
                  ),
                  _jsxDEV("tbody", { className: "divide-y divide-gray-50 bg-white", children:
                    filteredSupplierItems.length === 0 ?
                    _jsxDEV("tr", { children:
                      _jsxDEV("td", { colSpan: "6", className: "px-3 py-10 text-center text-sm font-bold text-gray-400", children: "표시할 거래처 품목이 없습니다." }, void 0, false

                      ) }, void 0, false
                    ) :
                    filteredSupplierItems.map((item) =>
                    _jsxDEV("tr", { className: "group hover:bg-emerald-50/40 transition-all cursor-default", children: [
                      _jsxDEV("td", { className: "px-3 py-4 text-center align-middle text-sm font-bold text-gray-500 font-mono truncate whitespace-nowrap", children: item.itemCode }, void 0, false),
                      _jsxDEV("td", { className: "px-3 py-4 text-center align-middle text-sm font-black text-gray-800 truncate whitespace-nowrap", children: item.itemName }, void 0, false),
                      _jsxDEV("td", { className: "px-3 py-4 text-center align-middle whitespace-nowrap", children:
                        _jsxDEV("span", { className: "inline-block px-2.5 py-1 bg-gray-100 text-gray-600 text-[12px] font-black rounded-md uppercase", children: item.categoryName }, void 0, false) }, void 0, false
                      ),
                      _jsxDEV("td", { className: "px-3 py-4 text-center align-middle text-sm font-bold text-gray-400 truncate whitespace-nowrap", children: item.spec }, void 0, false),
                      _jsxDEV("td", { className: "px-3 py-4 text-center align-middle text-sm font-black text-emerald-600 whitespace-nowrap", children: ["₩", (item.unitPrice ?? 0).toLocaleString()] }, void 0, true),
                      _jsxDEV("td", { className: "px-3 py-4 text-center align-middle", children:
                        _jsxDEV("button", { onClick: () => handleSelectSupplierItem(item), className: "px-3 py-2 bg-emerald-50 text-emerald-600 text-[12px] font-black rounded-lg hover:bg-emerald-600 hover:text-white transition-all active:scale-95 border border-emerald-100/50 whitespace-nowrap", children: "선택" }, void 0, false) }, void 0, false
                      )] }, item.itemSeq, true
                    )
                    ) }, void 0, false

                  )] }, void 0, true
                ) }, void 0, false
              )] }, void 0, true
            ),



            _jsxDEV("section", { className: "bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden min-h-[400px] flex flex-col", children: [
              _jsxDEV("div", { className: "p-8 border-b border-gray-50 flex justify-between items-center bg-white", children:
                _jsxDEV("h3", { className: "text-xl font-bold text-gray-800 flex items-center gap-2", children: [
                  _jsxDEV("span", { className: "w-1.5 h-6 bg-emerald-500 rounded-full" }, void 0, false), "발주 품목 목록"] }, void 0, true

                ) }, void 0, false
              ),

              !orderInfo.supplier ?
              _jsxDEV("div", { className: "flex-1 flex flex-col items-center justify-center py-20 px-10 text-center", children: [
                _jsxDEV("div", { className: "w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6", children:
                  _jsxDEV("svg", { className: "w-12 h-12 text-gray-200", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children:
                    _jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 21V5a2 2 0 00-2-2H5a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }, void 0, false) }, void 0, false
                  ) }, void 0, false
                ),
                _jsxDEV("h4", { className: "text-2xl font-black text-gray-400 mb-2", children: "공급 업체를 선택해주세요" }, void 0, false),
                _jsxDEV("p", { className: "text-gray-300 font-bold max-w-xs", children: "상단의 공급업체를 먼저 선택하시면 해당 업체에서 취급하는 물품 리스트가 나타납니다." }, void 0, false)] }, void 0, true
              ) :

              _jsxDEV(_Fragment, { children: [
                _jsxDEV("div", { className: "overflow-x-auto", children:
                  _jsxDEV("table", { className: "w-full table-fixed text-left border-collapse", children: [
                    _jsxDEV("thead", { className: "bg-gray-50/50", children:
                      _jsxDEV("tr", { children: [
                        _jsxDEV("th", { className: "align-middle px-7 py-4 text-[12px] font-black text-gray-600 uppercase tracking-widest w-[7%] text-center", children: "No." }, void 0, false),
                        _jsxDEV("th", { className: "align-middle px-14 py-4 text-[12px] font-black text-gray-600 uppercase tracking-widest w-[21%] text-center", children: "품목명" }, void 0, false),
                        _jsxDEV("th", { className: "align-middle px-7 py-4 text-[12px] font-black text-gray-600 uppercase tracking-widest w-[17%] text-center", children: "카테고리" }, void 0, false),
                        _jsxDEV("th", { className: "align-middle px-4 py-4 text-[12px] font-black text-gray-600 uppercase tracking-widest w-[10%] text-center", children: "수량" }, void 0, false),
                        _jsxDEV("th", { className: "align-middle px-6 py-4 text-[12px] font-black text-gray-600 uppercase tracking-widest w-[10%] text-center", children: "규격" }, void 0, false),
                        _jsxDEV("th", { className: "align-middle px-4 py-4 text-[12px] font-black text-gray-600 uppercase tracking-widest w-[15%] text-center", children: "단가(원)" }, void 0, false),
                        _jsxDEV("th", { className: "align-middle px-4 py-4 text-[12px] font-black text-gray-600 uppercase tracking-widest w-[15%] text-center", children: "합계" }, void 0, false),
                        _jsxDEV("th", { className: "align-middle px-1 py-4 text-[12px] font-black text-gray-600 uppercase tracking-widest w-[5%] text-center" }, void 0, false)] }, void 0, true
                      ) }, void 0, false
                    ),
                    _jsxDEV("tbody", { className: "divide-y divide-gray-50", children:
                      items.map((item, index) =>
                      _jsxDEV("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
                        _jsxDEV("td", { className: "align-middle px-9 py-4 text-center font-bold text-gray-400 text-sm", children: index + 1 }, void 0, false),
                        _jsxDEV("td", { className: "align-middle px-6 py-4", children:
                          _jsxDEV("input", { type: "text", placeholder: "품목명", value: item.itemName, readOnly: true, className: "w-[120px] bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 text-sm font-bold text-gray-500 cursor-not-allowed outline-none transition-all text-center" }, void 0, false) }, void 0, false
                        ),
                        _jsxDEV("td", { className: "align-middle px-2 py-4", children:
                          _jsxDEV("select", { value: item.categoryName || '', readOnly: true, className: "w-[115px] bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 text-sm font-bold text-gray-500 cursor-not-allowed appearance-none text-center", children:
                            _jsxDEV("option", { value: item.categoryName || '', children:
                              item.categoryName || '미분류' }, void 0, false
                            ) }, void 0, false
                          ) }, void 0, false
                        ),
                        _jsxDEV("td", { className: "align-middle px-4 py-4 text-center", children:
                          _jsxDEV("input", {
                            type: "number",
                            value: item.quantity === 0 ? '' : item.quantity,
                            onChange: (e) => {
                              const val = Math.max(1, Number(e.target.value));
                              handleItemChange(item.id, 'quantity', val);
                            },
                            className: "w-full max-w-[60px] bg-white border border-gray-200 rounded-lg py-2 px-2 text-sm font-bold text-gray-800 text-center outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all mx-auto",
                            min: "1" }, void 0, false
                          ) }, void 0, false
                        ),
                        _jsxDEV("td", { className: "align-middle px-2 py-4 text-center", children:
                          _jsxDEV("select", { value: item.spec, readOnly: true, className: "w-[70px] bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 text-sm font-bold text-gray-500 cursor-not-allowed appearance-none text-center", children:
                            _jsxDEV("option", { value: item.spec || '', children:
                              item.spec || '미분류' }, void 0, false
                            ) }, void 0, false
                          ) }, void 0, false
                        ),
                        _jsxDEV("td", { className: "align-middle px-4 py-4 text-center", children:
                          _jsxDEV("input", { type: "text", value: item.unitPrice === 0 ? '' : `₩${item.unitPrice.toLocaleString()}`, readOnly: true, className: "w-[90px] max-w-[120px] bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 text-sm font-bold text-gray-500 text-center cursor-not-allowed outline-none transition-all ml-auto" }, void 0, false) }, void 0, false
                        ),
                        _jsxDEV("td", { className: "align-middle px-4 py-4 text-center", children:
                          _jsxDEV("div", { className: "text-sm font-black text-gray-900 pr-2", children: ["₩", Number((item.unitPrice || 0) * (item.quantity || 0)).toLocaleString(), "원"] }, void 0, true) }, void 0, false
                        ),
                        _jsxDEV("td", { className: "align-middle px-1 py-4 text-center", children:
                          _jsxDEV("button", { onClick: () => removeItem(item.id), className: "p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all", title: "삭제", children: "✕" }, void 0, false) }, void 0, false
                        )] }, item.id, true
                      )
                      ) }, void 0, false
                    )] }, void 0, true
                  ) }, void 0, false
                ),
                _jsxDEV("div", { className: "p-8 bg-gray-50/30 flex justify-end gap-10 border-t border-gray-50", children: [
                  _jsxDEV("div", { className: "text-right", children: [
                    _jsxDEV("div", { className: "text-[14px] font-black text-gray-500 uppercase mb-1", children: "총 공급가액" }, void 0, false),
                    _jsxDEV("div", { className: "text-lg font-bold text-gray-700", children: ["₩", totalSummary.supplyValue.toLocaleString()] }, void 0, true)] }, void 0, true
                  ),
                  _jsxDEV("div", { className: "text-right", children: [
                    _jsxDEV("div", { className: "text-[14px] font-black text-gray-500 uppercase mb-1", children: "총 부가세" }, void 0, false),
                    _jsxDEV("div", { className: "text-lg font-bold text-gray-700", children: ["₩", totalSummary.tax.toLocaleString()] }, void 0, true)] }, void 0, true
                  ),
                  _jsxDEV("div", { className: "text-right", children: [
                    _jsxDEV("div", { className: "text-[14px] font-black text-emerald-500 uppercase mb-1 tracking-widest", children: "최종 합계 금액" }, void 0, false),
                    _jsxDEV("div", { className: "text-3xl font-black text-emerald-600", children: ["₩", Number(totalSummary.total || 0).toLocaleString()] }, void 0, true)] }, void 0, true
                  )] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true

            )] }, void 0, true
          ),


          openModal && selectedSupplierItem &&
          _jsxDEV("div", { className: "fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]", children:
            _jsxDEV("section", { className: "relative bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm w-[500px] max-w-[90vw] max-h-[80vh] overflow-y-auto", children: [
              _jsxDEV("button", {
                type: "button",
                onClick: handleCloseModal,
                "aria-label": "내 재고 추천 모달 닫기",
                className: "absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full text-2xl font-bold leading-none text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700", children:
                "×" }, void 0, false

              ),
              _jsxDEV("h3", { className: "text-xl font-bold text-gray-800 mb-4 flex items-center gap-2", children: [
                _jsxDEV("span", { className: "w-1.5 h-6 bg-emerald-500 rounded-full" }, void 0, false), "내 재고 추천"] }, void 0, true

              ),
              _jsxDEV("p", { className: "text-base text-gray-500 font-semibold mb-5", children: ["선택한 거래처 품목:",

                _jsxDEV("span", { className: "text-emerald-600 font-black ml-2", children:
                  selectedSupplierItem?.itemName }, void 0, false
                )] }, void 0, true
              ),

              recommendedStocks.length === 0 ?
              _jsxDEV(_Fragment, { children: [
                _jsxDEV("div", { className: "bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center", children:
                  _jsxDEV("p", { className: "text-[15px] font-bold text-gray-600 mb-4", children: "내 재고 목록에서 비슷한 품목을 찾지 못했습니다." }, void 0, false

                  ) }, void 0, false
                ),
                _jsxDEV("div", { className: "flex justify-center mt-5", children:
                  _jsxDEV("button", {
                    onClick: handleCloseModal,
                    className: "px-6 py-2.5 bg-gray-200 text-gray-600 text-xs font-black rounded-xl hover:bg-gray-300 transition-all active:scale-95", children:
                    "닫기" }, void 0, false

                  ) }, void 0, false
                )] }, void 0, true
              ) :

              _jsxDEV("div", { className: "space-y-3", children:
                recommendedStocks.map((stock) =>
                _jsxDEV("div", {

                  className: "border border-emerald-100 bg-emerald-50/40 rounded-2xl p-5 flex justify-between items-center", children: [

                  _jsxDEV("div", { children: [
                    _jsxDEV("p", { className: "text-base font-black text-gray-800", children:
                      stock.stock }, void 0, false
                    ),
                    _jsxDEV("p", { className: "text-xs font-bold text-gray-500 mt-1", children: ["현재 수량: ",
                      stock.quantity, " / 안전재고: ", stock.safetyStock] }, void 0, true
                    )] }, void 0, true
                  ),
                  _jsxDEV("button", {
                    className: "px-4 py-2 bg-emerald-600 text-white text-xs font-black rounded-xl hover:bg-emerald-700 transition-all",
                    onClick: () => handleConnectStock(stock), children:
                    "이 재고로 연결" }, void 0, false

                  )] }, stock.stockSeq, true



                )
                ) }, void 0, false
              )] }, void 0, true

            ) }, void 0, false
          ),



          _jsxDEV("div", { className: "space-y-8", children:
            _jsxDEV("section", { className: "bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm h-fit", children: [
              _jsxDEV("h3", { className: "text-xl font-bold text-gray-800 mb-6 flex items-center gap-2", children: [
                _jsxDEV("span", { className: "w-1.5 h-6 bg-emerald-500 rounded-full" }, void 0, false), "결제 및 배송 조건"] }, void 0, true

              ),

              _jsxDEV("div", { className: "space-y-6", children: [
                _jsxDEV("div", { children: [
                  _jsxDEV("label", { className: "block text-sm font-black text-gray-600 mb-2 uppercase tracking-tighter", children: "결제 방식" }, void 0, false),
                  _jsxDEV("div", { className: "grid grid-cols-2 gap-2", children:
                    ['카드결제'].map((method) =>
                    _jsxDEV("button", {

                      onClick: () => handleInfoChange('paymentMethod', method),
                      className: `py-3 rounded-xl text-xs font-bold transition-all border ${
                      orderInfo.paymentMethod === method ?
                      'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-100' :
                      'bg-white text-gray-500 border-gray-100 hover:border-emerald-200'}`, children:


                      method }, method, false
                    )
                    ) }, void 0, false
                  )] }, void 0, true
                ),

                _jsxDEV("div", { children: [
                  _jsxDEV("label", { className: "block text-sm font-black text-gray-600 mb-2 uppercase tracking-tighter", children: "배송지 정보" }, void 0, false),
                  _jsxDEV("textarea", {
                    value: orderInfo.deliveryAddress,
                    readOnly: true,
                    rows: "3",
                    className: "w-full bg-gray-50 border-none rounded-2xl py-4 px-4 text-sm font-bold text-gray-500 cursor-not-allowed outline-none resize-none" }, void 0, false
                  )] }, void 0, true
                ),

                _jsxDEV("div", { children: [
                  _jsxDEV("label", { className: "block text-sm font-black text-gray-600 mb-2 uppercase tracking-tighter", children: "배송 요청 사항" }, void 0, false),
                  _jsxDEV("textarea", {
                    value: orderInfo.deliveryNotes,
                    onChange: (e) => handleInfoChange('deliveryNotes', e.target.value),
                    placeholder: "예: 부재 시 문 앞에 놓아주세요.",
                    rows: "3",
                    className: "w-full bg-gray-50 border-none rounded-2xl py-4 px-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none" }, void 0, false
                  )] }, void 0, true
                )] }, void 0, true
              ),

              _jsxDEV("div", { className: "mt-8 pt-8 border-t border-gray-50", children:
                _jsxDEV("div", { className: "bg-emerald-50 rounded-2xl p-6", children: [
                  _jsxDEV("div", { className: "text-[11px] font-black text-emerald-600 uppercase mb-2 tracking-widest", children: "예상 결제 총액" }, void 0, false),
                  _jsxDEV("div", { className: "text-2xl font-black text-emerald-700", children: ["₩", Number(totalSummary.total || 0).toLocaleString()] }, void 0, true),
                  _jsxDEV("p", { className: "text-[10px] text-emerald-500 mt-2 font-medium", children: "* 부가세 포함 금액입니다." }, void 0, false)] }, void 0, true
                ) }, void 0, false
              )] }, void 0, true
            ) }, void 0, false
          )] }, void 0, true
        )] }, void 0, true
      ) }, void 0, false
    ));

}
export default OrderApplyPage;