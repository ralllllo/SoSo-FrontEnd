import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/soso로고.png';
import authStore from '../../store/authStore';
import { useStores } from '../../hooks/useStores';
import { useTransfer } from './hooks/useTransfer';
import { insertAccount, accountList, accountDel, getPaymentCards, registerPaymentCard, deletePaymentCard, payOrdersByCard, getRecentPayments } from '../../apis/account';
import { suppliers as getSupplierList, unpaidOrders as getUnpaidOrders } from '../../apis/orderApi';
import * as PortOne from "@portone/browser-sdk/v2";import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






const TransferManagementPage = () => {
  const navigate = useNavigate();
  const { logout, user_nickname, bizname, selectedStoreSeq, setSelectedStore, userSeq } = authStore();
  const { stores, isLoading: isStoresLoading } = useStores();


  const { isLoading, formatCurrency } = useTransfer();

  const [accounts, setAccounts] = useState([]);
  const [activeAccountIndex, setActiveAccountIndex] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettlementMenuOpen, setIsSettlementMenuOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAutoTransferModalOpen, setIsAutoTransferModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferAccount, setTransferAccount] = useState(null);
  const [isAutoTransferEnabled, setIsAutoTransferEnabled] = useState(false);
  const [transferSearchType, setTransferSearchType] = useState('week');

  const [paymentKeyword, setPaymentKeyword] = useState('');


  const [paymentStartDate, setPaymentStartDate] = useState('');


  const [paymentEndDate, setPaymentEndDate] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [newAccount, setNewAccount] = useState({
    bankName: '',
    accountNumber: '',
    accountName: ''
  });
  const [isCardRegisterModalOpen, setIsCardRegisterModalOpen] = useState(false);
  const [isOrderPaymentModalOpen, setIsOrderPaymentModalOpen] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [orderPaymentPartners, setOrderPaymentPartners] = useState([]);
  const [payableOrders, setPayableOrders] = useState([]);




  const [isPaying, setIsPaying] = useState(false);

  const [newCard, setNewCard] = useState({
    cardCompany: "",
    cardLast4: "",
    cardName: ""
  });


  const bankRegexMap = {
    "신한은행": /^\d{11,12}$/,
    "국민은행": /^\d{12,14}$/,
    "우리은행": /^\d{13}$/,
    "하나은행": /^\d{14}$/,
    "SC제일은행": /^\d{11,14}$/,
    "한국씨티은행": /^\d{12}$/,
    "iM뱅크은행": /^\d{12,14}$/,
    "농협은행": /^\d{11,14}$/
  };


  const formatAccountNumber = (bankName, accountNumber) => {
    const num = String(accountNumber ?? "").replace(/\D/g, "");

    if (!num) return "";

    if (bankName === "신한은행" || bankName === "신한") {
      if (num.length === 11) return num.replace(/(\d{3})(\d{2})(\d{6})/, "$1-$2-$3");
      if (num.length === 12) return num.replace(/(\d{3})(\d{3})(\d{6})/, "$1-$2-$3");
    }

    if (bankName === "국민은행" || bankName === "국민") {
      if (num.length === 12) return num.replace(/(\d{3})(\d{2})(\d{4})(\d{3})/, "$1-$2-$3-$4");
      if (num.length === 14) return num.replace(/(\d{6})(\d{2})(\d{6})/, "$1-$2-$3");
    }

    if (bankName === "우리은행" || bankName === "우리") {
      if (num.length === 13) return num.replace(/(\d{4})(\d{3})(\d{6})/, "$1-$2-$3");
    }

    if (bankName === "하나은행" || bankName === "하나") {
      if (num.length === 14) return num.replace(/(\d{3})(\d{6})(\d{5})/, "$1-$2-$3");
    }

    if (bankName === "SC제일은행") {
      if (num.length === 11) return num.replace(/(\d{3})(\d{2})(\d{6})/, "$1-$2-$3");
      if (num.length === 12) return num.replace(/(\d{3})(\d{3})(\d{6})/, "$1-$2-$3");
      if (num.length === 14) return num.replace(/(\d{3})(\d{3})(\d{8})/, "$1-$2-$3");
    }

    if (bankName === "한국씨티은행" || bankName === "씨티은행") {
      if (num.length === 12) return num.replace(/(\d{3})(\d{6})(\d{3})/, "$1-$2-$3");
    }

    if (bankName === "iM뱅크은행" || bankName === "iM뱅크" || bankName === "대구은행") {
      if (num.length === 12) return num.replace(/(\d{3})(\d{2})(\d{7})/, "$1-$2-$3");
      if (num.length === 13) return num.replace(/(\d{3})(\d{3})(\d{7})/, "$1-$2-$3");
      if (num.length === 14) return num.replace(/(\d{3})(\d{3})(\d{8})/, "$1-$2-$3");
    }

    if (bankName === "농협은행" || bankName === "농협") {
      if (num.length === 11) return num.replace(/(\d{3})(\d{2})(\d{6})/, "$1-$2-$3");
      if (num.length === 12) return num.replace(/(\d{3})(\d{3})(\d{6})/, "$1-$2-$3");
      if (num.length === 13) return num.replace(/(\d{3})(\d{4})(\d{6})/, "$1-$2-$3");
      if (num.length === 14) return num.replace(/(\d{6})(\d{2})(\d{6})/, "$1-$2-$3");
    }

    return num;
  };


  const accountNameRegex = /^[가-힣a-zA-Z0-9\s]{2,30}$/;

  const selectedPartner = orderPaymentPartners.find(
    (partner) => String(partner.storeSeq ?? partner.partnerSeq) === String(selectedPartnerId)
  );

  const selectedPartnerOrders = payableOrders;

  const selectedOrders = payableOrders.filter((order) =>
  selectedOrderIds.includes(Number(order.orderSeq))
  );

  const selectedOrderTotal = selectedOrders.reduce(
    (total, order) => total + Number(order.totalAmount || 0),
    0
  );





  const handlePartnerChange = async (partnerSeq) => {
    setSelectedPartnerId(partnerSeq);
    setSelectedOrderIds([]);
    setPayableOrders([]);

    if (!partnerSeq) return;

    const currentStoreSeq = selectedStoreSeq ?? stores?.[0]?.storeSeq;

    if (!currentStoreSeq) {
      alert("사업장 정보가 없습니다.");
      return;
    }

    try {
      const orders = await getUnpaidOrders(
        Number(currentStoreSeq),
        Number(partnerSeq)
      );

      setPayableOrders(orders ?? []);
    } catch (error) {
      console.error("미결제 발주 목록 조회 실패:", error);
      alert("미결제 발주 목록을 불러오지 못했습니다.");
    }
  };

  const handleOrderPaymentToggle = (orderSeq) => {
    const targetOrderSeq = Number(orderSeq);

    setSelectedOrderIds((prev) =>
    prev.includes(targetOrderSeq) ?
    prev.filter((id) => id !== targetOrderSeq) :
    [...prev, targetOrderSeq]
    );
  };


  const handlePayOrders = async () => {

    const currentStoreSeq = selectedStoreSeq ?? stores?.[0]?.storeSeq;


    const selectedCard = cards[activeCardIndex];


    if (!currentStoreSeq) {
      alert("사업장 정보가 없습니다.");
      return;
    }


    if (!selectedCard) {
      alert("결제할 카드가 없습니다.");
      return;
    }


    if (!selectedPartnerId) {
      alert("거래처를 선택해 주세요.");
      return;
    }


    if (selectedOrderIds.length === 0) {
      alert("결제할 발주를 선택해 주세요.");
      return;
    }


    const ok = confirm(`${selectedOrderTotal.toLocaleString()}원을 결제하시겠습니까?`);

    if (!ok) {
      return;
    }

    try {

      setIsPaying(true);


      const result = await payOrdersByCard({
        storeSeq: Number(currentStoreSeq),
        partnerSeq: Number(selectedPartnerId),
        cardSeq: Number(selectedCard.cardSeq),
        orderSeqList: selectedOrderIds
      });


      if (result.success) {
        alert("결제가 완료되었습니다.");


        setSelectedOrderIds([]);


        const orders = await getUnpaidOrders(
          Number(currentStoreSeq),
          Number(selectedPartnerId)
        );

        setPayableOrders(orders ?? []);


        await fetchRecentPayments(Number(currentStoreSeq));
      } else {
        alert(result.message || "결제에 실패했습니다.");
      }
    } catch (error) {
      console.error("발주 결제 실패:", error);



      alert(error.response?.data?.message || "결제 중 오류가 발생했습니다.");
    } finally {

      setIsPaying(false);
    }
  };



  useEffect(() => {
    const currentStoreSeq = selectedStoreSeq ?? stores?.[0]?.storeSeq;

    if (currentStoreSeq) {

      fetchCards(currentStoreSeq);


      fetchRecentPayments(currentStoreSeq);
    }
  }, [selectedStoreSeq, stores]);











  const fetchAccountList = async () => {
    const currentStoreSeq = selectedStoreSeq ?? stores?.[0]?.storeSeq;

    if (!currentStoreSeq) {
      return;
    }

    try {
      const data = await accountList(Number(currentStoreSeq));
      setAccounts(data);
    } catch (error) {
      console.error("계좌 목록 조회 실패:", error);
    }
  };


  const [cards, setCards] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const [recentPayments, setRecentPayments] = useState([]);
  const [recentPaymentsPage, setRecentPaymentsPage] = useState(1);

  const fetchCards = async (storeSeq) => {
    try {
      const cardList = await getPaymentCards(storeSeq);
      setCards(cardList ?? []);
      setActiveCardIndex(0);
    } catch (error) {
      console.error("카드 목록 조회 실패:", error);
    }
  };

  const handleDeleteCard = async () => {
    const selectedCard = cards[activeCardIndex];

    if (!selectedCard || !window.confirm("등록된 카드를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deletePaymentCard(selectedCard.cardSeq);
      setCards((prevCards) => prevCards.filter((card) => card.cardSeq !== selectedCard.cardSeq));
      setActiveCardIndex(0);
    } catch (error) {
      console.error("카드 삭제 실패:", error);
      alert("카드를 삭제하지 못했습니다.");
    }
  };





  const fetchRecentPayments = async (storeSeqParam) => {


    const currentStoreSeq =
    storeSeqParam ?? selectedStoreSeq ?? stores?.[0]?.storeSeq;


    if (!currentStoreSeq) {
      return;
    }

    try {


      const data = await getRecentPayments({
        storeSeq: Number(currentStoreSeq),
        period: transferSearchType,
        startDate: paymentStartDate,
        endDate: paymentEndDate,
        keyword: paymentKeyword
      });


      setRecentPayments(data ?? []);
      setRecentPaymentsPage(1);
    } catch (error) {
      console.error("최근 결제 내역 조회 실패:", error);


      setRecentPayments([]);
      setRecentPaymentsPage(1);
    }
  };


  const handleOpenOrderPaymentModal = async () => {
    const currentStoreSeq = selectedStoreSeq ?? stores?.[0]?.storeSeq;

    if (!currentStoreSeq) {
      alert("사업장 정보가 없습니다.");
      return;
    }

    if (cards.length === 0) {
      alert("등록된 카드가 없습니다. 먼저 카드를 등록해 주세요.");
      return;
    }

    try {
      const partners = await getSupplierList(Number(currentStoreSeq));

      setOrderPaymentPartners(partners ?? []);
      setSelectedPartnerId("");
      setSelectedOrderIds([]);
      setIsOrderPaymentModalOpen(true);
    } catch (error) {
      console.error("거래처 목록 조회 실패:", error);
      alert("거래처 목록을 불러오지 못했습니다.");
    }
  };




  const STORE_ID = "store-d07c8343-3eda-4b37-b1b1-d59c24f3d02d";
  const CHANNEL_KEY = "channel-key-3ac881ab-bc4c-4016-b0d0-3c6eb420b83c";

  const handleRegisterCard = async () => {
    try {
      const currentStoreSeq = selectedStoreSeq ?? stores?.[0]?.storeSeq;

      if (!currentStoreSeq) {
        alert("사업장 정보가 없습니다.");
        return;
      }

      if (!newCard.cardCompany) {
        alert("카드사를 선택해 주세요.");
        return;
      }

      if (!newCard.cardName.trim()) {
        alert("카드 별칭을 입력해 주세요.");
        return;
      }

      if (!/^\d{4}$/.test(newCard.cardLast4)) {
        alert("카드 끝 4자리는 숫자 4자리로 입력해 주세요.");
        return;
      }

      const now = Date.now();
      const billingKeyRequestId = `billing-${currentStoreSeq}-${now}`;
      const customerId = `customer-${currentStoreSeq}-${now}`;

      const response = await PortOne.requestIssueBillingKey({
        storeId: STORE_ID,
        channelKey: CHANNEL_KEY,
        billingKeyMethod: "CARD",
        billingKeyRequestId,
        issueId: billingKeyRequestId,
        issueName: "SOSO카드 등록",
        customer: {
          id: customerId,
          fullName: user_nickname || "테스트사업자",
          email: "jihye10226@naver.com",
          phoneNumber: "01073711745"
        }

      });

      if (!response) {
        alert("카드 등록이 취소되었습니다.");
        return;
      }

      if (response.code) {
        console.error("포트원 빌링키 발급 실패:", response);
        alert(`카드 등록 실패: ${response.message}`);
        return;
      }

      await registerPaymentCard({
        userSeq: Number(userSeq),
        storeSeq: Number(currentStoreSeq),
        billingKey: response.billingKey,
        cardCompany: newCard.cardCompany,
        cardNumberMasked: `**** **** **** ${newCard.cardLast4}`,
        cardType: "CARD",
        cardName: newCard.cardName.trim()
      });

      alert("카드 등록 성공");

      setIsCardRegisterModalOpen(false);

      setNewCard({
        cardCompany: "",
        cardLast4: "",
        cardName: ""
      });

      await fetchCards(currentStoreSeq);
    } catch (error) {
      console.error("카드 등록 오류:", error);
      alert(error.message || "카드 등록 중 오류가 발생했습니다.");
    }
  };














  const handleAddAccount = async () => {
    if (accounts.length >= 4) {
      alert("계좌는 최대 4개까지 등록할 수 있습니다.");
      setIsRegisterModalOpen(false);
      return;
    }
    if (!newAccount.bankName) {
      alert("은행을 선택해 주세요.");
      return;
    }
    if (!newAccount.accountNumber) {
      alert("계좌번호를 입력해 주세요.");
      return;
    }

    const regex = bankRegexMap[newAccount.bankName];
    const cleanAccountNumber = newAccount.accountNumber.replace(/-/g, "");

    if (!regex.test(cleanAccountNumber)) {
      alert(`${newAccount.bankName} 계좌번호 형식이 올바르지 않습니다.`);
      return;
    }

    if (!newAccount.accountName) {
      alert("예금주를 입력해 주세요.");
      return;
    }

    if (!accountNameRegex.test(newAccount.accountName.trim())) {
      alert("예금주명은 한글, 영문, 숫자, 공백만 입력할 수 있으며 2~30자여야 합니다.");
      return;
    }

    const currentStoreSeq = selectedStoreSeq ?? stores?.[0]?.storeSeq;

    if (currentStoreSeq === null || currentStoreSeq === undefined || currentStoreSeq === '') {
      alert("사업장 정보가 없습니다.");
      return;
    }


    const accountData = {
      storeSeq: Number(currentStoreSeq),
      bankName: newAccount.bankName,
      accountNumber: cleanAccountNumber,
      accountName: newAccount.accountName
    };

    await insertAccount(accountData);

    setIsRegisterModalOpen(false);

    await fetchAccountList();

    setIsRegisterModalOpen(false);


    setNewAccount({
      bankName: '',
      accountNumber: '',
      accountName: ''
    });
    alert("새 계좌 등록이 완료되었습니다.");

    setActiveAccountIndex(updatedAccounts.length - 1);
  };

  const handleOpenEditModal = (acc, e) => {
    e.stopPropagation();
    setEditingAccount({ ...acc });
    setIsEditModalOpen(true);
  };

  const handleUpdateAccount = () => {
    if (!editingAccount.bankName) {
      alert("은행을 선택해 주세요.");
      return;
    }
    if (!editingAccount.accountNumber) {
      alert("계좌번호를 입력해 주세요.");
      return;
    }
    if (!editingAccount.accountName) {
      alert("예금주명을 입력해 주세요.");
      return;
    }

    setAccounts(accounts.map((a) => a.id === editingAccount.id ? editingAccount : a));
    setIsEditModalOpen(false);
    alert("계좌 정보가 수정되었습니다.");
  };

  const handleDeleteAccount = async (acc, e) => {
    e.stopPropagation();

    const ok = confirm(
      `정말 ${acc.bankName} (${acc.accountNumber}) 계좌를 삭제하시겠습니까?`
    );

    if (!ok) return;

    try {
      await accountDel(acc.accountSeq);

      alert("계좌가 삭제되었습니다.");

      await fetchAccountList();

      setActiveAccountIndex(0);
    } catch (error) {
      const message =
      error.response?.data?.message ||
      error.response?.data ||
      "계좌 삭제 중 오류가 발생했습니다.";

      alert(message);
    }
  };

  const handlePrevAccount = () => {
    setActiveAccountIndex((prev) => prev === 0 ? accounts.length - 1 : prev - 1);
  };

  const handleNextAccount = () => {
    setActiveAccountIndex((prev) => prev === accounts.length - 1 ? 0 : prev + 1);
  };

  const handleLogOut = () => {
    logout();
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  const handleStoreSwitch = (storeSeq, companyName) => {
    setSelectedStore(storeSeq, companyName);
    setIsProfileOpen(false);
  };

  const recentPaymentsPerPage = 5;
  const recentPaymentsTotalPages = Math.max(
    1,
    Math.ceil(recentPayments.length / recentPaymentsPerPage)
  );
  const paginatedRecentPayments = recentPayments.slice(
    (recentPaymentsPage - 1) * recentPaymentsPerPage,
    recentPaymentsPage * recentPaymentsPerPage
  );

  return (
    _jsxDEV("div", { className: "min-h-screen bg-gray-50 text-gray-800 font-sans", children: [
      _jsxDEV("main", { className: "max-w-7xl mx-auto px-8 py-8", children: [
        _jsxDEV("div", { className: "flex justify-between items-end mb-8", children: [
          _jsxDEV("div", { children: [
            _jsxDEV("h2", { className: "text-2xl font-black text-gray-900 mb-1", children: "카드 관리" }, void 0, false),
            _jsxDEV("p", { className: "text-sm text-gray-500", children: "결제 카드를 등록하고 카드 결제 내역을 한눈에 관리하세요." }, void 0, false)] }, void 0, true
          ),
          _jsxDEV("div", { className: "flex gap-3", children: [

























            _jsxDEV("button", {
              type: "button",
              onClick: () => setIsCardRegisterModalOpen(true),
              className: "rounded-2xl border border-emerald-200 bg-white px-6 py-3 text-sm font-black text-emerald-600 shadow-sm transition-all hover:bg-emerald-50", children:
              "카드 등록" }, void 0, false

            ),
            _jsxDEV("button", {
              type: "button",
              onClick: handleOpenOrderPaymentModal,
              className: "rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700", children:
              "발주 결제하기" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        ),

        _jsxDEV("div", { className: "space-y-7", children: [
          cards.length > 0 ?
          _jsxDEV("section", { className: "rounded-[28px] border border-gray-100 bg-white p-8 text-gray-900 shadow-sm", children: [
            _jsxDEV("div", { className: "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between", children: [


              _jsxDEV("div", { className: "flex items-center gap-5", children: [
                _jsxDEV("div", { className: "flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-lg font-black text-emerald-700", children:
                  cards[activeCardIndex]?.cardCompany?.substring(0, 2) || "카드" }, void 0, false
                ),

                _jsxDEV("div", { children: [
                  _jsxDEV("div", { className: "flex items-center gap-3", children: [
                    _jsxDEV("h3", { className: "text-2xl font-black", children:
                      cards[activeCardIndex]?.cardCompany || "등록 카드" }, void 0, false
                    ),

                    cards[activeCardIndex]?.isDefault === "Y" &&
                    _jsxDEV("span", { className: "rounded-lg bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700", children: "대표" }, void 0, false

                    )] }, void 0, true

                  ),

                  _jsxDEV("p", { className: "mt-2 text-base font-semibold text-gray-400", children:
                    cards[activeCardIndex]?.cardNumberMasked || "**** **** **** ****" }, void 0, false
                  ),

                  _jsxDEV("p", { className: "mt-1 text-sm font-semibold text-gray-400", children:
                    cards[activeCardIndex]?.cardName || "자동결제 카드" }, void 0, false
                  )] }, void 0, true
                )] }, void 0, true
              ),


              _jsxDEV("div", { className: "text-left lg:text-right", children: [
                _jsxDEV("span", { className: "text-sm font-bold text-gray-400", children: "결제수단 상태" }, void 0, false),

                _jsxDEV("div", { className: "mt-2 flex flex-col items-start gap-2 lg:items-end", children: [
                  _jsxDEV("span", { className: "rounded-xl bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700", children: "사용 가능" }, void 0, false

                  ),

                  _jsxDEV("span", { className: "text-sm font-bold text-gray-400", children:
                    cards[activeCardIndex]?.cardType || "CARD" }, void 0, false
                  ),

                  _jsxDEV("button", {
                    type: "button",
                    onClick: handleDeleteCard,
                    className: "rounded-xl border border-red-200 px-4 py-2 text-sm font-black text-red-500 transition-colors hover:bg-red-50", children:
                    "삭제" }, void 0, false

                  )] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            ),

            cards.length > 1 &&
            _jsxDEV("div", { className: "mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4", children:
              cards.map((card, index) => {
                const isActive = index === activeCardIndex;

                return (
                  _jsxDEV("button", {

                    type: "button",
                    onClick: () => setActiveCardIndex(index),
                    className: `rounded-2xl border p-4 text-left transition-all ${
                    isActive ?
                    "border-emerald-500 bg-emerald-50" :
                    "border-gray-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30"}`, children: [


                    _jsxDEV("div", { className: "flex items-center justify-between gap-2", children: [
                      _jsxDEV("strong", { className: "text-sm font-black text-gray-900", children:
                        card.cardCompany || "등록 카드" }, void 0, false
                      ),

                      isActive &&
                      _jsxDEV("span", { className: "rounded-lg bg-emerald-100 px-2 py-1 text-[10px] font-black text-emerald-700", children: "선택됨" }, void 0, false

                      )] }, void 0, true

                    ),

                    _jsxDEV("p", { className: "mt-2 text-xs font-bold text-gray-400", children:
                      card.cardNumberMasked || "**** **** **** ****" }, void 0, false
                    ),

                    _jsxDEV("p", { className: "mt-1 text-xs font-semibold text-gray-400", children:
                      card.cardName || "자동결제 카드" }, void 0, false
                    )] }, card.cardSeq, true
                  ));

              }) }, void 0, false
            )] }, void 0, true

          ) :
























          _jsxDEV("div", { className: "rounded-[28px] border border-dashed border-gray-300 bg-white p-12 text-center font-bold text-gray-400", children: "등록된 결제 계좌가 없습니다. 새 계좌를 추가해 주세요." }, void 0, false

          ),


          accounts.length > 0 &&
          _jsxDEV("section", { className: "rounded-[28px] border border-gray-100 bg-white p-7 text-gray-900 shadow-sm", children: [
            _jsxDEV("div", { className: "mb-6 flex items-center justify-between", children: [
              _jsxDEV("h3", { className: "text-lg font-black", children: ["내 보유 계좌 ", _jsxDEV("span", { className: "font-medium text-gray-400", children: ["(", accounts.length, "개)"] }, void 0, true)] }, void 0, true),
              _jsxDEV("span", { className: "text-sm font-bold text-gray-400", children: ["총 잔액 ",
                _jsxDEV("strong", { className: "text-gray-900", children: formatCurrency(accounts.reduce((sum, account) => sum + account.testBalance, 0)) }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4", children: [
              accounts.map((acc, index) => {
                const isActive = index === activeAccountIndex;
                let bankColor = 'bg-emerald-50 text-emerald-700';
                if (acc.bankName.includes('신한')) bankColor = 'bg-blue-50 text-blue-700';else
                if (acc.bankName.includes('국민')) bankColor = 'bg-amber-50 text-amber-700';else
                if (acc.bankName.includes('우리')) bankColor = 'bg-indigo-50 text-indigo-700';

                return (
                  _jsxDEV("article", {

                    onClick: () => setActiveAccountIndex(index),
                    className: `flex min-h-[250px] cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-all ${
                    isActive ? 'border-emerald-500 bg-emerald-50/40 shadow-sm' : 'border-gray-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/20'}`, children: [


                    _jsxDEV("div", { children: [
                      _jsxDEV("div", { className: "flex items-start justify-between gap-3", children: [
                        _jsxDEV("div", { className: "flex min-w-0 items-center gap-3", children: [
                          _jsxDEV("div", { className: `flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-black ${bankColor}`, children:
                            acc.bankName.substring(0, 2) }, void 0, false
                          ),
                          _jsxDEV("div", { className: "min-w-0", children: [
                            _jsxDEV("div", { className: "flex items-center gap-2", children: [
                              _jsxDEV("h4", { className: "truncate text-base font-black", children: acc.bankName }, void 0, false),
                              acc.isMain && _jsxDEV("span", { className: "rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-black text-emerald-700", children: "대표" }, void 0, false)] }, void 0, true
                            ),
                            _jsxDEV("p", { className: "mt-1 text-xs font-semibold text-gray-400", children: formatAccountNumber(acc.bankName, acc.accountNumber) }, void 0, false)] }, void 0, true
                          )] }, void 0, true
                        ),
                        isActive && _jsxDEV("span", { className: "rounded-xl bg-emerald-50 px-3 py-2 text-[10px] font-black text-emerald-700", children: "선택됨" }, void 0, false)] }, void 0, true
                      ),
                      _jsxDEV("div", { className: `mt-6 text-2xl font-black ${isActive ? 'text-emerald-600' : 'text-gray-900'}`, children: formatCurrency(acc.testBalance ?? 0) }, void 0, false)] }, void 0, true
                    ),

                    _jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [
                      _jsxDEV("button", {
                        type: "button",
                        onClick: (e) => {
                          e.stopPropagation();
                          setTransferAccount(acc);
                          setIsTransferModalOpen(true);
                        },
                        className: "rounded-xl border border-gray-200 py-2.5 text-xs font-black text-gray-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600", children:
                        "이체" }, void 0, false

                      ),
                      _jsxDEV("button", { type: "button", onClick: (e) => handleDeleteAccount(acc, e), className: "rounded-xl border border-gray-200 py-2.5 text-xs font-black text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-500", children: "삭제" }, void 0, false)] }, void 0, true
                    )] }, acc.accountSeq, true
                  ));

              }),
              Array.from({ length: Math.max(0, 4 - accounts.length) }).map((_, index) =>
              _jsxDEV("button", {

                type: "button",
                onClick: () => setIsRegisterModalOpen(true),
                className: "flex min-h-[250px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 px-5 text-center transition-all hover:border-emerald-300 hover:bg-emerald-50/40", children: [

                _jsxDEV("span", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-light text-gray-300 shadow-sm ring-1 ring-gray-100", children: "+" }, void 0, false

                ),
                _jsxDEV("strong", { className: "mt-4 text-sm font-black text-gray-500", children: "계좌 추가" }, void 0, false),
                _jsxDEV("span", { className: "mt-1 text-xs font-medium text-gray-400", children: "등록 가능한 빈 슬롯입니다." }, void 0, false

                )] }, `empty-account-${index}`, true
              )
              )] }, void 0, true
            )] }, void 0, true
          ),


          _jsxDEV("section", { className: "overflow-hidden rounded-[28px] border border-gray-100 bg-white text-gray-900 shadow-sm", children: [
            _jsxDEV("div", { className: "border-b border-gray-100 px-7 py-6", children:
              _jsxDEV("h3", { className: "text-lg font-black", children: "최근 결제 내역" }, void 0, false) }, void 0, false
            ),
            _jsxDEV("div", { className: "flex flex-col gap-3 border-b border-gray-100 bg-gray-50/60 px-7 py-4 xl:flex-row xl:items-center", children: [
              _jsxDEV("div", { className: "flex shrink-0 items-center gap-1 rounded-xl border border-gray-200 bg-white p-1", children:
                [
                { value: 'week', label: '이번 주' },
                { value: 'month', label: '한 달' },
                { value: 'custom', label: '날짜 지정' }].
                map((period) =>
                _jsxDEV("button", {

                  type: "button",
                  onClick: () => {

                    setTransferSearchType(period.value);


                    if (period.value !== 'custom') {
                      setPaymentStartDate('');
                      setPaymentEndDate('');
                    }
                  },
                  className: `rounded-lg px-4 py-2 text-xs font-black transition-all ${
                  transferSearchType === period.value ?
                  'bg-emerald-600 text-white shadow-sm' :
                  'text-gray-500 hover:bg-gray-50 hover:text-emerald-600'}`, children:


                  period.label }, period.value, false
                )
                ) }, void 0, false
              ),

              _jsxDEV("div", { className: "flex shrink-0 items-center gap-2", children: [
                _jsxDEV("input", {
                  type: "date",
                  "aria-label": "검색 시작일",
                  value: paymentStartDate,
                  onChange: (e) => {

                    setPaymentStartDate(e.target.value);


                    setTransferSearchType('custom');
                  },
                  className: "rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs font-bold text-gray-600 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/10" }, void 0, false
                ),
                _jsxDEV("span", { className: "text-xs font-bold text-gray-300", children: "~" }, void 0, false),
                _jsxDEV("input", {
                  type: "date",
                  "aria-label": "검색 종료일",
                  value: paymentEndDate,
                  onChange: (e) => {

                    setPaymentEndDate(e.target.value);


                    setTransferSearchType('custom');
                  },
                  className: "rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs font-bold text-gray-600 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/10" }, void 0, false
                )] }, void 0, true
              ),

              _jsxDEV("div", { className: "relative min-w-0 flex-1", children: [
                _jsxDEV("svg", {
                  className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24", children:

                  _jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "m21 21-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" }, void 0, false) }, void 0, false
                ),
                _jsxDEV("input", {
                  type: "search",
                  value: paymentKeyword,
                  onChange: (e) => {

                    setPaymentKeyword(e.target.value);
                  },
                  onKeyDown: (e) => {

                    if (e.key === 'Enter') {
                      fetchRecentPayments();
                    }
                  },
                  placeholder: "은행명, 받는 사람을 검색하세요",
                  className: "w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs font-bold text-gray-700 outline-none transition-all placeholder:font-medium placeholder:text-gray-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/10" }, void 0, false
                )] }, void 0, true
              ),
              _jsxDEV("button", {
                type: "button",
                onClick: () => {

                  fetchRecentPayments();
                },
                className: "shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-black text-white transition-colors hover:bg-emerald-700", children:
                "검색" }, void 0, false

              )] }, void 0, true
            ),
            _jsxDEV("div", { className: "overflow-x-auto", children:
              _jsxDEV("table", { className: "w-full min-w-[1180px] table-fixed text-center", children: [
                _jsxDEV("colgroup", { children: [
                  _jsxDEV("col", { className: "w-[15%]" }, void 0, false),
                  _jsxDEV("col", { className: "w-[11%]" }, void 0, false),
                  _jsxDEV("col", { className: "w-[17%]" }, void 0, false),
                  _jsxDEV("col", { className: "w-[13%]" }, void 0, false),
                  _jsxDEV("col", { className: "w-[17%]" }, void 0, false),
                  _jsxDEV("col", { className: "w-[15%]" }, void 0, false),
                  _jsxDEV("col", { className: "w-[12%]" }, void 0, false)] }, void 0, true
                ),
                _jsxDEV("thead", { className: "border-b border-gray-100 bg-gray-50 text-xs font-bold text-gray-400", children:
                  _jsxDEV("tr", { children: [
                    _jsxDEV("th", { className: "px-5 py-4", children: "일시" }, void 0, false),
                    _jsxDEV("th", { className: "px-5 py-4", children: "카드사" }, void 0, false),
                    _jsxDEV("th", { className: "px-5 py-4", children: "카드번호" }, void 0, false),
                    _jsxDEV("th", { className: "px-5 py-4", children: "보낸 사람" }, void 0, false),
                    _jsxDEV("th", { className: "px-5 py-4", children:
                      _jsxDEV("span", { className: "mx-auto block w-[150px] pl-12 text-left", children: "받는 사람" }, void 0, false) }, void 0, false
                    ),
                    _jsxDEV("th", { className: "px-5 py-4", children: "결제 금액" }, void 0, false),
                    _jsxDEV("th", { className: "px-5 py-4", children: "상태" }, void 0, false)] }, void 0, true
                  ) }, void 0, false
                ),
                _jsxDEV("tbody", { className: "divide-y divide-gray-100", children:
                  paginatedRecentPayments.length > 0 ?
                  paginatedRecentPayments.map((item) => {

                    const partnerInitial = item.partnerName?.substring(0, 1) || "거";

                    return (
                      _jsxDEV("tr", {

                        className: "transition-colors hover:bg-emerald-50/20", children: [


                        _jsxDEV("td", { className: "whitespace-nowrap px-5 py-5 text-sm font-semibold text-gray-500", children:
                          item.paidAt }, void 0, false
                        ),


                        _jsxDEV("td", { className: "px-5 py-5 text-sm font-black text-gray-800", children:
                          item.cardCompany || "카드" }, void 0, false
                        ),


                        _jsxDEV("td", { className: "px-5 py-5 text-sm font-bold text-gray-500", children:
                          item.cardNumberMasked || "**** **** **** ****" }, void 0, false
                        ),


                        _jsxDEV("td", { className: "px-5 py-5 text-sm font-bold text-gray-800", children:
                          item.payerName }, void 0, false
                        ),


                        _jsxDEV("td", { className: "px-5 py-5", children:
                          _jsxDEV("div", { className: "mx-auto flex w-[150px] items-center gap-3", children: [
                            _jsxDEV("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-black text-emerald-700", children:
                              partnerInitial }, void 0, false
                            ),

                            _jsxDEV("div", { className: "min-w-0 flex-1 text-left", children:
                              _jsxDEV("p", { className: "truncate whitespace-nowrap text-sm font-black text-gray-900", children:
                                item.partnerName }, void 0, false
                              ) }, void 0, false
                            )] }, void 0, true
                          ) }, void 0, false
                        ),


                        _jsxDEV("td", { className: "px-5 py-5 text-base font-black text-gray-900", children:
                          formatCurrency(item.totalAmount) }, void 0, false
                        ),


                        _jsxDEV("td", { className: "px-5 py-5", children:
                          _jsxDEV("span", { className: "inline-flex whitespace-nowrap rounded-full bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700", children:
                            item.status === "PAID" ? "결제 완료" : item.status }, void 0, false
                          ) }, void 0, false
                        )] }, item.paymentSeq, true
                      ));

                  }) :

                  _jsxDEV("tr", { children:
                    _jsxDEV("td", {
                      colSpan: 7,
                      className: "px-5 py-12 text-center text-sm font-bold text-gray-400", children:
                      "최근 결제 내역이 없습니다." }, void 0, false

                    ) }, void 0, false
                  ) }, void 0, false

                )] }, void 0, true
              ) }, void 0, false
            ),
            _jsxDEV("div", { className: "px-8 py-6 bg-gray-50/50 flex justify-center border-t border-gray-50", children:
              _jsxDEV("div", { className: "flex gap-2", children:
                Array.from({ length: recentPaymentsTotalPages }, (_, index) => index + 1).map((pageNumber) =>
                _jsxDEV("button", {

                  type: "button",
                  onClick: () => setRecentPaymentsPage(pageNumber),
                  className: `w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                  pageNumber === recentPaymentsPage ?
                  'bg-emerald-600 text-white shadow-lg' :
                  'bg-white text-gray-400 hover:bg-gray-100 border border-gray-100'}`, children:


                  pageNumber }, pageNumber, false
                )
                ) }, void 0, false
              ) }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ),
      isTransferModalOpen && transferAccount &&
      _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
        _jsxDEV("button", {
          type: "button",
          "aria-label": "계좌 이체 닫기",
          onClick: () => setIsTransferModalOpen(false),
          className: "absolute inset-0 bg-black/40 backdrop-blur-sm" }, void 0, false
        ),
        _jsxDEV("div", { className: "relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl animate-fade-in-up", children: [
          _jsxDEV("div", { className: "mb-6 flex items-start justify-between gap-4", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("h3", { className: "text-xl font-black text-gray-900", children: "계좌 이체" }, void 0, false),
              _jsxDEV("p", { className: "mt-1 text-xs font-medium text-gray-400", children: "받는 분의 계좌 정보와 이체 금액을 입력해 주세요." }, void 0, false

              )] }, void 0, true
            ),
            _jsxDEV("button", {
              type: "button",
              "aria-label": "계좌 이체 닫기",
              onClick: () => setIsTransferModalOpen(false),
              className: "flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600", children:
              "×" }, void 0, false

            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "mb-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5", children:
            _jsxDEV("div", { className: "flex items-center justify-between gap-4", children: [
              _jsxDEV("div", { children: [
                _jsxDEV("span", { className: "text-[10px] font-bold uppercase tracking-widest text-emerald-600", children: "출금 계좌" }, void 0, false

                ),
                _jsxDEV("strong", { className: "mt-2 block text-sm font-black text-gray-900", children:
                  transferAccount.bankName }, void 0, false
                ),
                _jsxDEV("span", { className: "mt-1 block text-xs font-semibold text-gray-500", children:
                  transferAccount.accountNumber }, void 0, false
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "text-right", children: [
                _jsxDEV("span", { className: "block text-[10px] font-bold text-gray-400", children: "출금 가능 금액" }, void 0, false),
                _jsxDEV("strong", { className: "mt-2 block text-lg font-black text-emerald-700", children:
                  formatCurrency(transferAccount.balance) }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            ) }, void 0, false
          ),

          _jsxDEV("div", { className: "space-y-5", children: [
            _jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "받는 은행" }, void 0, false

                ),
                _jsxDEV("select", {
                  defaultValue: "",
                  value: newAccount.bankName,
                  className: "w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 outline-none transition-all focus:ring-2 focus:ring-emerald-500/20",
                  onChange: (e) => setNewAccount({ ...newAccount, bankName: e.target.value }), children: [

                  _jsxDEV("option", { value: "", disabled: true, children: "은행 선택" }, void 0, false),
                  _jsxDEV("option", { value: "국민은행", children: "국민은행" }, void 0, false),
                  _jsxDEV("option", { value: "신한은행", children: "신한은행" }, void 0, false),
                  _jsxDEV("option", { value: "우리은행", children: "우리은행" }, void 0, false),
                  _jsxDEV("option", { value: "하나은행", children: "하나은행" }, void 0, false),
                  _jsxDEV("option", { value: "농협은행", children: "농협은행" }, void 0, false),
                  _jsxDEV("option", { value: "카카오뱅크", children: "카카오뱅크" }, void 0, false)] }, void 0, true
                )] }, void 0, true
              ),
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "받는 분" }, void 0, false

                ),
                _jsxDEV("input", {
                  type: "text",
                  value: newAccount.accountName,
                  onChange: (e) => setNewAccount({ ...newAccount, accountName: e.target.value }),
                  placeholder: "예금주명 입력",
                  className: "w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 outline-none transition-all placeholder:font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-emerald-500/20" }, void 0, false
                )] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "받는 계좌번호" }, void 0, false

              ),
              _jsxDEV("input", {
                type: "text",
                value: newAccount.accountNumber,
                onChange: (e) => setNewAccount({ ...newAccount, accountNumber: e.target.value }),
                inputMode: "numeric",
                placeholder: "'-' 없이 계좌번호 입력",
                className: "w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 outline-none transition-all placeholder:font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-emerald-500/20" }, void 0, false
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "이체 금액" }, void 0, false

              ),
              _jsxDEV("div", { className: "relative", children: [
                _jsxDEV("input", {
                  type: "text",
                  inputMode: "numeric",
                  placeholder: "0",
                  className: "w-full rounded-xl border border-gray-100 bg-gray-50 py-3 pl-4 pr-10 text-right text-sm font-black text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:ring-2 focus:ring-emerald-500/20" }, void 0, false
                ),
                _jsxDEV("span", { className: "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-gray-500", children: "원" }, void 0, false

                )] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "이체 메모" }, void 0, false

              ),
              _jsxDEV("input", {
                type: "text",
                placeholder: "메모를 입력해 주세요. (선택)",
                className: "w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 outline-none transition-all placeholder:font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-emerald-500/20" }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "mt-8 flex gap-3", children: [
            _jsxDEV("button", {
              type: "button",
              onClick: () => setIsTransferModalOpen(false),
              className: "flex-1 rounded-2xl bg-gray-100 py-4 text-sm font-black text-gray-600 transition-colors hover:bg-gray-200", children:
              "취소" }, void 0, false

            ),
            _jsxDEV("button", {
              type: "button",
              className: "flex-1 rounded-2xl bg-emerald-600 py-4 text-sm font-black text-white shadow-lg shadow-emerald-200 transition-colors hover:bg-emerald-700", children:
              "이체하기" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ),

      isOrderPaymentModalOpen &&
      _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
        _jsxDEV("button", {
          type: "button",
          "aria-label": "발주 결제 닫기",
          onClick: () => setIsOrderPaymentModalOpen(false),
          className: "absolute inset-0 bg-black/40 backdrop-blur-sm" }, void 0, false
        ),

        _jsxDEV("div", { className: "relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl animate-fade-in-up", children: [
          _jsxDEV("div", { className: "mb-7 flex items-start justify-between gap-4", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("h3", { className: "text-xl font-black text-gray-900", children: "발주 결제하기" }, void 0, false),
              _jsxDEV("p", { className: "mt-1 text-xs font-medium text-gray-400", children: "거래처를 선택하고 미결제 발주를 확인한 뒤 등록된 카드로 결제하세요." }, void 0, false

              )] }, void 0, true
            ),

            _jsxDEV("button", {
              type: "button",
              onClick: () => setIsOrderPaymentModalOpen(false),
              className: "text-2xl text-gray-400 transition-colors hover:text-gray-600", children:
              "×" }, void 0, false

            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "space-y-6", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "거래처" }, void 0, false

              ),
              _jsxDEV("select", {
                value: selectedPartnerId,
                onChange: (e) => handlePartnerChange(e.target.value),
                className: "w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 outline-none transition-all focus:ring-2 focus:ring-emerald-500/20", children: [

                _jsxDEV("option", { value: "", children: "거래처를 선택해 주세요" }, void 0, false),
                orderPaymentPartners.map((partner) =>
                _jsxDEV("option", { value: partner.storeSeq, children:
                  partner.companyName }, partner.storeSeq, false
                )
                )] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("div", { className: "mb-3 flex items-center justify-between", children: [
                _jsxDEV("h4", { className: "text-sm font-black text-gray-900", children: "미결제 발주 목록" }, void 0, false),
                _jsxDEV("span", { className: "text-xs font-bold text-gray-400", children:
                  selectedPartner ? `${payableOrders.length}건` : "거래처 선택 필요" }, void 0, false
                )] }, void 0, true
              ),

              selectedPartner ?
              _jsxDEV("div", { className: "space-y-3", children:
                payableOrders.map((order) => {
                  const isSelected = selectedOrderIds.includes(Number(order.orderSeq));

                  return (
                    _jsxDEV("button", {

                      type: "button",
                      onClick: () => handleOrderPaymentToggle(order.orderSeq),
                      className: `w-full rounded-2xl border p-5 text-left transition-all ${
                      isSelected ?
                      "border-emerald-500 bg-emerald-50" :
                      "border-gray-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/40"}`, children:


                      _jsxDEV("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
                        _jsxDEV("div", { className: "flex items-start gap-3", children: [
                          _jsxDEV("span", {
                            className: `mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-black ${
                            isSelected ?
                            "border-emerald-600 bg-emerald-600 text-white" :
                            "border-gray-200 bg-white text-white"}`, children:

                            "✓" }, void 0, false

                          ),

                          _jsxDEV("div", { children: [
                            _jsxDEV("strong", { className: "block text-sm font-black text-gray-900", children:
                              order.title }, void 0, false
                            ),
                            _jsxDEV("span", { className: "mt-1 block text-xs font-bold text-gray-400", children: [
                              order.orderNo, " · 발주일 ", String(order.createdAt ?? "").substring(0, 10)] }, void 0, true
                            )] }, void 0, true
                          )] }, void 0, true
                        ),
                        _jsxDEV("strong", { className: "text-base font-black text-gray-900", children:
                          formatCurrency(order.totalAmount) }, void 0, false
                        )] }, void 0, true
                      ) }, order.orderSeq, false
                    ));

                }) }, void 0, false
              ) :

              _jsxDEV("div", { className: "rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center", children:
                _jsxDEV("p", { className: "text-sm font-bold text-gray-400", children: "거래처를 선택하면 미결제 발주 목록이 표시됩니다." }, void 0, false

                ) }, void 0, false
              )] }, void 0, true

            ),

            _jsxDEV("div", { className: "grid gap-4 lg:grid-cols-[1fr_1.1fr]", children: [
              _jsxDEV("div", { className: "rounded-2xl border border-gray-100 bg-gray-50 p-5", children: [
                _jsxDEV("span", { className: "block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "등록된 결제 카드" }, void 0, false

                ),
                _jsxDEV("strong", { className: "mt-3 block text-base font-black text-gray-900", children:
                  cards[activeCardIndex]?.cardCompany || "등록된 카드 없음" }, void 0, false
                ),
                _jsxDEV("span", { className: "mt-1 block text-sm font-semibold text-gray-400", children:
                  cards[activeCardIndex]?.cardNumberMasked || "카드 등록 후 결제할 수 있습니다." }, void 0, false
                )] }, void 0, true
              ),

              _jsxDEV("div", { className: "rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5", children:
                _jsxDEV("div", { className: "flex items-center justify-between gap-4", children: [
                  _jsxDEV("div", { children: [
                    _jsxDEV("span", { className: "block text-[10px] font-bold uppercase tracking-widest text-emerald-700", children: "결제 선택" }, void 0, false

                    ),
                    _jsxDEV("strong", { className: "mt-3 block text-sm font-black text-gray-900", children: [
                      selectedOrders.length, "건 선택"] }, void 0, true
                    )] }, void 0, true
                  ),
                  _jsxDEV("div", { className: "text-right", children: [
                    _jsxDEV("span", { className: "block text-xs font-bold text-emerald-700", children: "총 결제 금액" }, void 0, false),
                    _jsxDEV("strong", { className: "mt-1 block text-2xl font-black text-emerald-700", children:
                      formatCurrency(selectedOrderTotal) }, void 0, false
                    )] }, void 0, true
                  )] }, void 0, true
                ) }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "mt-8 flex gap-3", children: [
            _jsxDEV("button", {
              type: "button",
              onClick: () => setIsOrderPaymentModalOpen(false),
              className: "flex-1 rounded-2xl bg-gray-100 py-4 text-sm font-black text-gray-600 transition-colors hover:bg-gray-200", children:
              "취소" }, void 0, false

            ),
            _jsxDEV("button", {
              type: "button",

              onClick: handlePayOrders,


              disabled: selectedOrderIds.length === 0 || cards.length === 0 || isPaying,

              className: `flex-1 rounded-2xl py-4 text-sm font-black transition-colors ${
              selectedOrderIds.length === 0 || cards.length === 0 || isPaying ?
              "cursor-not-allowed bg-gray-200 text-gray-400" :
              "bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700"}`, children:



              isPaying ? "결제 처리 중..." : "등록된 카드로 결제" }, void 0, false
            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ),

      isCardRegisterModalOpen &&
      _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
        _jsxDEV("button", {
          type: "button",
          "aria-label": "카드 등록 닫기",
          onClick: () => setIsCardRegisterModalOpen(false),
          className: "absolute inset-0 bg-black/40 backdrop-blur-sm" }, void 0, false
        ),

        _jsxDEV("div", { className: "relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl animate-fade-in-up", children: [
          _jsxDEV("div", { className: "mb-7 flex items-start justify-between gap-4", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("h3", { className: "text-xl font-black text-gray-900", children: "카드 등록" }, void 0, false),
              _jsxDEV("p", { className: "mt-1 text-xs font-medium text-gray-400", children: "화면에 표시할 카드 정보를 입력한 뒤 포트원 카드 등록을 진행하세요." }, void 0, false

              )] }, void 0, true
            ),

            _jsxDEV("button", {
              type: "button",
              onClick: () => setIsCardRegisterModalOpen(false),
              className: "text-2xl text-gray-400 transition-colors hover:text-gray-600", children:
              "×" }, void 0, false

            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "space-y-5", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "카드사" }, void 0, false

              ),
              _jsxDEV("select", {
                value: newCard.cardCompany,
                onChange: (e) => setNewCard({ ...newCard, cardCompany: e.target.value }),
                className: "w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 outline-none transition-all focus:ring-2 focus:ring-emerald-500/20", children: [

                _jsxDEV("option", { value: "", children: "카드사를 선택해 주세요" }, void 0, false),
                _jsxDEV("option", { value: "신한카드", children: "신한카드" }, void 0, false),
                _jsxDEV("option", { value: "삼성카드", children: "삼성카드" }, void 0, false),
                _jsxDEV("option", { value: "현대카드", children: "현대카드" }, void 0, false),
                _jsxDEV("option", { value: "롯데카드", children: "롯데카드" }, void 0, false),
                _jsxDEV("option", { value: "BC카드", children: "BC카드" }, void 0, false),
                _jsxDEV("option", { value: "하나카드", children: "하나카드" }, void 0, false),
                _jsxDEV("option", { value: "우리카드", children: "우리카드" }, void 0, false),
                _jsxDEV("option", { value: "토스카드", children: "토스카드" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "카드 별칭" }, void 0, false

              ),
              _jsxDEV("input", {
                type: "text",
                value: newCard.cardName,
                onChange: (e) => setNewCard({ ...newCard, cardName: e.target.value }),
                placeholder: "예: 대표 사업자카드, 개인카드",
                className: "w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 outline-none transition-all placeholder:font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-emerald-500/20" }, void 0, false
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "카드 끝 4자리" }, void 0, false

              ),
              _jsxDEV("input", {
                type: "text",
                inputMode: "numeric",
                maxLength: 4,
                value: newCard.cardLast4,
                onChange: (e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setNewCard({ ...newCard, cardLast4: value });
                },
                placeholder: "예: 1234",
                className: "w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 outline-none transition-all placeholder:font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-emerald-500/20" }, void 0, false
              ),
              _jsxDEV("p", { className: "mt-2 text-xs font-medium text-gray-400", children: "실제 카드번호 전체는 저장하지 않고 화면 표시용 끝 4자리만 저장합니다." }, void 0, false

              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5", children:
              _jsxDEV("p", { className: "text-xs font-bold leading-6 text-emerald-700", children: "실제 자동결제는 포트원에서 발급받은 빌링키로 처리됩니다." }, void 0, false

              ) }, void 0, false
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "mt-8 flex gap-3", children: [
            _jsxDEV("button", {
              type: "button",
              onClick: () => setIsCardRegisterModalOpen(false),
              className: "flex-1 rounded-2xl bg-gray-100 py-4 text-sm font-black text-gray-600 transition-colors hover:bg-gray-200", children:
              "취소" }, void 0, false

            ),

            _jsxDEV("button", {
              type: "button",
              onClick: handleRegisterCard,
              className: "flex-1 rounded-2xl bg-emerald-600 py-4 text-sm font-black text-white shadow-lg shadow-emerald-200 transition-colors hover:bg-emerald-700", children:
              "포트원 카드 등록" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ),

      isAutoTransferModalOpen &&
      _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
        _jsxDEV("button", {
          type: "button",
          "aria-label": "자동이체 설정 닫기",
          onClick: () => setIsAutoTransferModalOpen(false),
          className: "absolute inset-0 bg-black/40 backdrop-blur-sm" }, void 0, false
        ),
        _jsxDEV("div", { className: "relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl animate-fade-in-up", children: [
          _jsxDEV("div", { className: "mb-7 flex items-start justify-between gap-4", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("h3", { className: "text-xl font-black text-gray-900", children: "자동이체 설정" }, void 0, false),
              _jsxDEV("p", { className: "mt-1 text-xs font-medium text-gray-400", children: "정기 결제 정보를 등록하고 자동이체를 관리하세요." }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("button", {
              type: "button",
              onClick: () => setIsAutoTransferModalOpen(false),
              className: "text-2xl text-gray-400 transition-colors hover:text-gray-600", children:
              "×" }, void 0, false

            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "space-y-5", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "거래처" }, void 0, false),
              _jsxDEV("select", { className: "w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 outline-none transition-all focus:ring-2 focus:ring-emerald-500/20", children: [
                _jsxDEV("option", { value: "", children: "거래처를 선택해 주세요" }, void 0, false),
                _jsxDEV("option", { value: "daebak", children: "(주)대박식자재" }, void 0, false),
                _jsxDEV("option", { value: "daesung", children: "대성농산" }, void 0, false),
                _jsxDEV("option", { value: "woojin", children: "우진주류" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "출금 계좌" }, void 0, false),
              _jsxDEV("select", { className: "w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 outline-none transition-all focus:ring-2 focus:ring-emerald-500/20", children: [
                _jsxDEV("option", { value: "", children: "출금 계좌를 선택해 주세요" }, void 0, false),
                accounts.map((account) =>
                _jsxDEV("option", { value: account.id, children: [
                  account.bankName, " ", account.accountNumber] }, account.id, true
                )
                )] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "예금주" }, void 0, false),
                _jsxDEV("input", {
                  type: "text",
                  placeholder: "예금주명 입력",
                  className: "w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold outline-none transition-all focus:ring-2 focus:ring-emerald-500/20" }, void 0, false
                )] }, void 0, true
              ),
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "결제일" }, void 0, false),
                _jsxDEV("select", { className: "w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 outline-none transition-all focus:ring-2 focus:ring-emerald-500/20", children: [
                  _jsxDEV("option", { value: "", children: "일자 선택" }, void 0, false),
                  Array.from({ length: 31 }, (_, index) => index + 1).map((date) =>
                  _jsxDEV("option", { value: date, children: [date, "일"] }, date, true)
                  )] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/50 px-5 py-4", children: [
              _jsxDEV("div", { children: [
                _jsxDEV("strong", { className: "block text-sm font-black text-gray-800", children: "자동이체 활성화" }, void 0, false),
                _jsxDEV("span", { className: "mt-1 block text-xs font-medium text-gray-400", children: "설정한 결제일에 자동으로 이체합니다." }, void 0, false)] }, void 0, true
              ),
              _jsxDEV("button", {
                type: "button",
                role: "switch",
                "aria-checked": isAutoTransferEnabled,
                onClick: () => setIsAutoTransferEnabled(!isAutoTransferEnabled),
                className: `relative h-7 w-12 rounded-full transition-colors ${
                isAutoTransferEnabled ? 'bg-emerald-500' : 'bg-gray-300'}`, children:


                _jsxDEV("span", { className: `absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  isAutoTransferEnabled ? 'translate-x-5' : 'translate-x-0'}` }, void 0, false
                ) }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "mt-8 flex gap-3", children: [
            _jsxDEV("button", {
              type: "button",
              onClick: () => setIsAutoTransferModalOpen(false),
              className: "flex-1 rounded-2xl bg-gray-100 py-4 text-sm font-black text-gray-600 transition-colors hover:bg-gray-200", children:
              "취소" }, void 0, false

            ),
            _jsxDEV("button", {
              type: "button",
              className: "flex-1 rounded-2xl bg-emerald-600 py-4 text-sm font-black text-white shadow-lg shadow-emerald-200 transition-colors hover:bg-emerald-700", children:
              "설정 완료" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      ),

      isRegisterModalOpen &&
      _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto", children: [
        _jsxDEV("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm", onClick: () => setIsRegisterModalOpen(false) }, void 0, false),
        _jsxDEV("div", { className: "relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 animate-fade-in-up my-8", children: [
          _jsxDEV("div", { className: "flex justify-between items-center mb-8", children: [
            _jsxDEV("h3", { className: "text-xl font-black text-gray-900", children: "새 계좌 등록" }, void 0, false),
            _jsxDEV("button", { onClick: () => setIsRegisterModalOpen(false), className: "text-gray-400 hover:text-gray-600 text-2xl", children: "×" }, void 0, false)] }, void 0, true
          ),

          _jsxDEV("div", { className: "px-1", children:

            _jsxDEV("section", { children: [
              _jsxDEV("h4", { className: "text-sm font-black text-emerald-600 mb-4 flex items-center gap-2", children: [
                _jsxDEV("span", { className: "w-1 h-4 bg-emerald-500 rounded-full" }, void 0, false), "계좌 관리"] }, void 0, true

              ),
              _jsxDEV("div", { className: "space-y-4", children: [
                _jsxDEV("div", { children: [
                  _jsxDEV("label", { className: "block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest", children: "은행명" }, void 0, false),
                  _jsxDEV("select", {
                    className: "w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all",
                    value: newAccount.bankName,
                    onChange: (e) => setNewAccount({ ...newAccount, bankName: e.target.value }), children: [

                    _jsxDEV("option", { value: "", children: "은행을 선택해 주세요" }, void 0, false),
                    _jsxDEV("option", { value: "신한은행", children: "신한은행" }, void 0, false),
                    _jsxDEV("option", { value: "국민은행", children: "국민은행" }, void 0, false),
                    _jsxDEV("option", { value: "우리은행", children: "우리은행" }, void 0, false),
                    _jsxDEV("option", { value: "하나은행", children: "하나은행" }, void 0, false),
                    _jsxDEV("option", { value: "SC제일은행", children: "SC제일은행" }, void 0, false),
                    _jsxDEV("option", { value: "한국씨티은행", children: "한국씨티은행" }, void 0, false),
                    _jsxDEV("option", { value: "iM뱅크은행", children: "iM뱅크은행" }, void 0, false),
                    _jsxDEV("option", { value: "농협은행", children: "농협은행" }, void 0, false)] }, void 0, true
                  )] }, void 0, true
                ),
                _jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
                  _jsxDEV("div", { children: [
                    _jsxDEV("label", { className: "block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest", children: "계좌번호" }, void 0, false),
                    _jsxDEV("input", {
                      type: "text",
                      placeholder: "- 없이 입력",
                      className: "w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all",
                      value: newAccount.accountNumber,
                      onChange: (e) => setNewAccount({ ...newAccount, accountNumber: e.target.value }) }, void 0, false
                    )] }, void 0, true
                  ),
                  _jsxDEV("div", { children: [
                    _jsxDEV("label", { className: "block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest", children: "예금주" }, void 0, false),
                    _jsxDEV("input", {
                      type: "text",
                      placeholder: "실명 또는 사업자명 입력",
                      className: "w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all",
                      value: newAccount.accountName,
                      onChange: (e) => setNewAccount({ ...newAccount, accountName: e.target.value }) }, void 0, false
                    )] }, void 0, true
                  )] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            ) }, void 0, false

          ),

          _jsxDEV("button", {
            onClick: handleAddAccount,
            className: "w-full mt-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200", children:
            "등록 완료" }, void 0, false

          )] }, void 0, true
        )] }, void 0, true
      ),


      isEditModalOpen && editingAccount &&
      _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto", children: [
        _jsxDEV("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm", onClick: () => setIsEditModalOpen(false) }, void 0, false),
        _jsxDEV("div", { className: "relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 animate-fade-in-up my-8", children: [
          _jsxDEV("div", { className: "flex justify-between items-center mb-8", children: [
            _jsxDEV("h3", { className: "text-xl font-black text-gray-900", children: "계좌 정보 수정" }, void 0, false),
            _jsxDEV("button", { onClick: () => setIsEditModalOpen(false), className: "text-gray-400 hover:text-gray-600 text-2xl", children: "×" }, void 0, false)] }, void 0, true
          ),

          _jsxDEV("div", { className: "space-y-6", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest", children: "은행명" }, void 0, false),
              _jsxDEV("select", {
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all",
                value: editingAccount.bankName,
                onChange: (e) => setEditingAccount({ ...editingAccount, bankName: e.target.value }), children: [

                _jsxDEV("option", { value: "신한은행", children: "신한은행" }, void 0, false),
                _jsxDEV("option", { value: "국민은행", children: "국민은행" }, void 0, false),
                _jsxDEV("option", { value: "우리은행", children: "우리은행" }, void 0, false),
                _jsxDEV("option", { value: "하나은행", children: "하나은행" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest", children: "계좌번호" }, void 0, false),
              _jsxDEV("input", {
                type: "text",
                placeholder: "- 없이 입력",
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all",
                value: editingAccount.accountNumber,
                onChange: (e) => setEditingAccount({ ...editingAccount, accountNumber: e.target.value }) }, void 0, false
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: "block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest", children: "예금주명" }, void 0, false),
              _jsxDEV("input", {
                type: "text",
                placeholder: "예금주명 입력",
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all",
                value: editingAccount.accountHolder || '',
                onChange: (e) => setEditingAccount({ ...editingAccount, accountHolder: e.target.value }) }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "flex gap-3 mt-8", children: [
            _jsxDEV("button", {
              onClick: () => setIsEditModalOpen(false),
              className: "flex-grow py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all", children:
              "취소" }, void 0, false

            ),
            _jsxDEV("button", {
              onClick: handleUpdateAccount,
              className: "flex-grow py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200", children:
              "수정 완료" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true
      )] }, void 0, true

    ));

};

export default TransferManagementPage;