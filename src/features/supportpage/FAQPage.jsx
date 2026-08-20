import React, { useState, useEffect } from 'react';
import { getBoardsByType } from '../../apis/boardApi';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






function FAQPage() {
  const [openId, setOpenId] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getBoardsByType('TIP');
        const formattedFaqs = data.results.map((item) => ({
          id: item.boardSeq,
          category: item.csType || '일반',
          q: item.title,
          a: item.content
        }));
        setFaqs(formattedFaqs);
      } catch (error) {
        console.error('FAQ 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    _jsxDEV("div", { className: "bg-gray-50 min-h-screen", children:
      _jsxDEV("main", { className: "max-w-4xl mx-auto px-4 py-16", children: [
        _jsxDEV("div", { className: "mb-10 text-center", children: [
          _jsxDEV("h1", { className: "text-3xl font-black text-gray-900 mb-3", children: "자주 묻는 질문" }, void 0, false),
          _jsxDEV("p", { className: "text-gray-500 font-medium", children: "고객님들께서 자주 문의하시는 내용을 모았습니다." }, void 0, false)] }, void 0, true
        ),

        _jsxDEV("div", { className: "bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden", children:
          _jsxDEV("div", { className: "divide-y divide-gray-100", children:
            isLoading ?
            _jsxDEV("div", { className: "p-16 text-center", children: [
              _jsxDEV("div", { className: "animate-spin text-4xl mb-4 inline-block text-emerald-500", children: "⏳" }, void 0, false),
              _jsxDEV("p", { className: "text-gray-500 font-bold", children: "자주 묻는 질문을 불러오는 중입니다..." }, void 0, false)] }, void 0, true
            ) :
            faqs.length > 0 ?
            faqs.map((faq) =>
            _jsxDEV("div", { className: "group", children: [
              _jsxDEV("button", {
                onClick: () => setOpenId(openId === faq.id ? null : faq.id),
                className: "w-full text-left p-6 hover:bg-gray-50 transition-colors flex justify-between items-center", children: [

                _jsxDEV("div", { className: "flex gap-4 items-center", children: [
                  _jsxDEV("span", { className: "text-xl font-black text-emerald-500", children: "Q." }, void 0, false),
                  _jsxDEV("div", { children: [
                    _jsxDEV("span", { className: "text-xs font-bold text-gray-400 mb-1 block", children: ["[",
                      faq.category === 'PAY' ? '결제' : faq.category === 'SERVICE' ? '서비스' : faq.category === 'ACCOUNT' ? '계정' : faq.category === 'BUG' ? '오류' : faq.category, "]"] }, void 0, true
                    ),
                    _jsxDEV("span", { className: "text-lg font-bold text-gray-800", children: faq.q }, void 0, false)] }, void 0, true
                  )] }, void 0, true
                ),
                _jsxDEV("span", { className: `text-xl text-gray-400 transition-transform duration-200 ${openId === faq.id ? 'rotate-180' : ''}`, children: "▼" }, void 0, false

                )] }, void 0, true
              ),
              _jsxDEV("div", { className: `overflow-hidden transition-all duration-300 bg-gray-50 ${openId === faq.id ? 'max-h-[500px]' : 'max-h-0'}`, children:
                _jsxDEV("div", { className: "p-6 pl-14 flex gap-4 border-t border-gray-100", children: [
                  _jsxDEV("span", { className: "text-xl font-black text-gray-300", children: "A." }, void 0, false),

                  _jsxDEV("p", { className: "text-gray-600 font-medium leading-relaxed whitespace-pre-wrap", children: faq.a }, void 0, false)] }, void 0, true
                ) }, void 0, false
              )] }, faq.id, true
            )
            ) :

            _jsxDEV("div", { className: "p-16 text-center text-gray-400 font-medium", children: "등록된 자주 묻는 질문이 없습니다." }, void 0, false

            ) }, void 0, false

          ) }, void 0, false
        )] }, void 0, true
      ) }, void 0, false
    ));

}

export default FAQPage;