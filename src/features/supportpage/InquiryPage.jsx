import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authStore from "../../store/authStore";
import { getMyInquiries, submitInquiry } from "../../apis/boardApi";import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






function InquiryPage() {
  const navigate = useNavigate();
  const { user_seq } = authStore();

  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    csType: '',
    title: '',
    content: ''
  });

  const fetchMyInquiries = async () => {
    if (!user_seq) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getMyInquiries(user_seq);
      const formattedInquiries = data.results.map((item) => ({
        id: item.boardSeq,
        csType: item.csType,
        title: item.title,
        content: item.content,
        date: new Date(item.createdAt).toLocaleDateString(),
        status: '답변 대기'
      }));
      setInquiries(formattedInquiries);
    } catch (error) {
      console.error('문의 내역 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyInquiries();
  }, [user_seq]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = () => {
    if (!user_seq) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ csType: '', title: '', content: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user_seq) return;

    setIsSubmitting(true);
    try {
      const result = await submitInquiry({
        userSeq: user_seq,
        csType: formData.csType,
        title: formData.title,
        content: formData.content
      });

      if (result.status === 'success') {
        alert('문의가 성공적으로 접수되었습니다. 담당자가 확인 후 안내해 드리겠습니다.');
        handleCloseModal();
        fetchMyInquiries();
      } else {
        alert(result.message || '문의 접수에 실패했습니다.');
      }
    } catch (error) {
      alert('문의 접수 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCsTypeLabel = (type) => {
    switch (type) {
      case 'PAY':return '결제';
      case 'SERVICE':return '서비스';
      case 'ACCOUNT':return '계정';
      case 'BUG':return '오류';
      default:return type || '기타';
    }
  };

  const getCsTypeColor = (type) => {
    switch (type) {
      case 'PAY':return 'bg-blue-50 text-blue-600';
      case 'SERVICE':return 'bg-emerald-50 text-emerald-600';
      case 'ACCOUNT':return 'bg-purple-50 text-purple-600';
      case 'BUG':return 'bg-red-50 text-red-600';
      default:return 'bg-gray-100 text-gray-600';
    }
  };


  const [openId, setOpenId] = useState(null);

  return (
    _jsxDEV("div", { className: "bg-gray-50 min-h-screen relative", children: [
      _jsxDEV("main", { className: "max-w-4xl mx-auto px-4 py-16", children: [
        _jsxDEV("div", { className: "mb-10 text-center relative", children: [
          _jsxDEV("h1", { className: "text-3xl font-black text-gray-900 mb-3", children: "1:1 문의 내역" }, void 0, false),
          _jsxDEV("p", { className: "text-gray-500 font-medium", children: "고객님께서 남겨주신 문의와 답변을 확인하실 수 있습니다." }, void 0, false)] }, void 0, true
        ),


        _jsxDEV("div", { className: "bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-10", children: [
          _jsxDEV("div", { className: "p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50", children:
            _jsxDEV("span", { className: "text-sm font-bold text-gray-600", children: ["총 ", _jsxDEV("span", { className: "text-emerald-600", children: inquiries.length }, void 0, false), "건의 문의내역"] }, void 0, true) }, void 0, false
          ),

          _jsxDEV("div", { className: "divide-y divide-gray-100", children:
            isLoading ?
            _jsxDEV("div", { className: "p-16 text-center", children: [
              _jsxDEV("div", { className: "animate-spin text-4xl mb-4 inline-block text-emerald-500", children: "⏳" }, void 0, false),
              _jsxDEV("p", { className: "text-gray-500 font-bold", children: "문의 내역을 불러오는 중입니다..." }, void 0, false)] }, void 0, true
            ) :
            inquiries.length > 0 ?
            inquiries.map((inq) =>
            _jsxDEV("div", { className: "group", children: [
              _jsxDEV("button", {
                onClick: () => setOpenId(openId === inq.id ? null : inq.id),
                className: "w-full text-left p-6 hover:bg-gray-50 transition-colors flex justify-between items-center", children: [

                _jsxDEV("div", { className: "flex gap-4 items-center flex-1", children: [
                  _jsxDEV("span", { className: `px-2.5 py-1 text-xs font-bold rounded-md whitespace-nowrap ${getCsTypeColor(inq.csType)}`, children:
                    getCsTypeLabel(inq.csType) }, void 0, false
                  ),
                  _jsxDEV("div", { className: "flex-1 truncate", children:
                    _jsxDEV("span", { className: "text-lg font-bold text-gray-800", children: inq.title }, void 0, false) }, void 0, false
                  )] }, void 0, true
                ),
                _jsxDEV("div", { className: "flex items-center gap-4 ml-4", children: [
                  _jsxDEV("span", { className: "text-sm text-gray-400 font-medium", children: inq.date }, void 0, false),
                  _jsxDEV("span", { className: "text-[10px] font-bold px-2 py-1 rounded bg-gray-100 text-gray-500 uppercase", children:
                    inq.status }, void 0, false
                  )] }, void 0, true
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: `overflow-hidden transition-all duration-300 bg-gray-50 ${openId === inq.id ? 'max-h-[500px]' : 'max-h-0'}`, children:
                _jsxDEV("div", { className: "p-6 pl-14 border-t border-gray-100", children: [
                  _jsxDEV("span", { className: "text-xl font-black text-gray-300 mb-2 block", children: "Q." }, void 0, false),
                  _jsxDEV("p", { className: "text-gray-600 font-medium leading-relaxed whitespace-pre-wrap", children: inq.content }, void 0, false)] }, void 0, true
                ) }, void 0, false
              )] }, inq.id, true
            )
            ) :

            _jsxDEV("div", { className: "p-16 text-center", children: [
              _jsxDEV("div", { className: "text-5xl mb-4", children: "📝" }, void 0, false),
              _jsxDEV("p", { className: "text-gray-400 font-medium", children: "등록된 문의 내역이 없습니다." }, void 0, false)] }, void 0, true
            ) }, void 0, false

          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "fixed bottom-10 right-10 z-40", children:
          _jsxDEV("button", {
            onClick: handleOpenModal,
            className: "flex items-center gap-2 px-6 py-4 bg-emerald-600 text-white rounded-full font-black shadow-2xl shadow-emerald-200 hover:-translate-y-1 hover:bg-emerald-700 transition-all text-lg group", children: [

            _jsxDEV("span", { className: "text-2xl group-hover:rotate-12 transition-transform", children: "💬" }, void 0, false), "1:1 문의하기"] }, void 0, true

          ) }, void 0, false
        )] }, void 0, true
      ),


      isModalOpen &&
      _jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm animate-fade-in", children:
        _jsxDEV("div", { className: "bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-scale-up", children: [
          _jsxDEV("div", { className: "p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50", children: [
            _jsxDEV("div", { children: [
              _jsxDEV("h2", { className: "text-2xl font-black text-gray-900", children: "1:1 문의하기" }, void 0, false),
              _jsxDEV("p", { className: "text-sm text-gray-500 font-medium mt-1", children: "서비스 이용에 대해 궁금한 점을 남겨주세요." }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("button", { onClick: handleCloseModal, className: "text-gray-400 hover:text-red-500 text-2xl transition-colors", children: "✕" }, void 0, false)] }, void 0, true
          ),

          _jsxDEV("form", { onSubmit: handleSubmit, className: "p-8 space-y-6", children: [
            _jsxDEV("div", { className: "space-y-2", children: [
              _jsxDEV("label", { className: "text-sm font-bold text-gray-700", children: ["문의 유형 ", _jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false)] }, void 0, true),
              _jsxDEV("select", {
                name: "csType",
                value: formData.csType,
                onChange: handleChange,
                required: true,
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer", children: [

                _jsxDEV("option", { value: "", children: "문의 유형을 선택해주세요" }, void 0, false),
                _jsxDEV("option", { value: "PAY", children: "결제 관련 문의" }, void 0, false),
                _jsxDEV("option", { value: "SERVICE", children: "서비스 이용 문의" }, void 0, false),
                _jsxDEV("option", { value: "ACCOUNT", children: "계정 정보 문의" }, void 0, false),
                _jsxDEV("option", { value: "BUG", children: "시스템 오류/버그 신고" }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "space-y-2", children: [
              _jsxDEV("label", { className: "text-sm font-bold text-gray-700", children: ["문의 제목 ", _jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false)] }, void 0, true),
              _jsxDEV("input", {
                name: "title",
                value: formData.title,
                onChange: handleChange,
                required: true,
                type: "text",
                placeholder: "문의하실 내용의 핵심을 간략히 적어주세요",
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" }, void 0, false
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "space-y-2", children: [
              _jsxDEV("label", { className: "text-sm font-bold text-gray-700", children: ["문의 내용 ", _jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false)] }, void 0, true),
              _jsxDEV("textarea", {
                name: "content",
                value: formData.content,
                onChange: handleChange,
                required: true,
                rows: "6",
                placeholder: "상세한 문의 내용을 적어주시면 더 정확하고 빠른 답변이 가능합니다.",
                className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none" }, void 0, false
              )] }, void 0, true
            ),

            _jsxDEV("div", { className: "pt-4 flex gap-3", children: [
              _jsxDEV("button", {
                type: "button",
                onClick: handleCloseModal,
                disabled: isSubmitting,
                className: "flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-all", children:
                "취소" }, void 0, false

              ),
              _jsxDEV("button", {
                type: "submit",
                disabled: isSubmitting,
                className: `flex-[2] py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${
                isSubmitting ? 'bg-emerald-300' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'}`, children:


                isSubmitting ? '접수 중...' : '문의 접수하기' }, void 0, false
              )] }, void 0, true
            )] }, void 0, true
          )] }, void 0, true
        ) }, void 0, false
      )] }, void 0, true

    ));

}

export default InquiryPage;