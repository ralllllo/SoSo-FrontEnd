import React, { useState, useEffect } from 'react';
import { getBoardsByType } from '../../apis/boardApi';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";







function NoticePage() {
  const [openId, setOpenId] = useState(null);
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getBoardsByType('NOTICE');
        const formattedNotices = data.results.map((item) => ({
          id: item.boardSeq,
          type: '공지',
          title: item.title,
          content: item.content,
          date: new Date(item.createdAt).toLocaleDateString(),
          isNew: (new Date() - new Date(item.createdAt)) / (1000 * 60 * 60 * 24) <= 7
        }));
        setNotices(formattedNotices);
      } catch (error) {
        console.error('공지사항 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    _jsxDEV("div", { className: "bg-gray-50 min-h-screen", children:
      _jsxDEV("main", { className: "max-w-4xl mx-auto px-4 py-16", children: [
        _jsxDEV("div", { className: "mb-10 text-center", children: [
          _jsxDEV("h1", { className: "text-3xl font-black text-gray-900 mb-3", children: "공지사항" }, void 0, false),
          _jsxDEV("p", { className: "text-gray-500 font-medium", children: "SoSo의 새로운 소식과 유용한 정보를 확인하세요." }, void 0, false)] }, void 0, true
        ),

        _jsxDEV("div", { className: "bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden", children: [
          _jsxDEV("div", { className: "divide-y divide-gray-100", children:
            isLoading ?
            _jsxDEV("div", { className: "p-16 text-center", children: [
              _jsxDEV("div", { className: "animate-spin text-4xl mb-4 inline-block text-emerald-500", children: "⏳" }, void 0, false),
              _jsxDEV("p", { className: "text-gray-500 font-bold", children: "공지사항을 불러오는 중입니다..." }, void 0, false)] }, void 0, true
            ) :
            notices.length > 0 ?
            notices.map((notice) =>
            _jsxDEV("div", { className: "group", children: [
              _jsxDEV("button", {
                onClick: () => setOpenId(openId === notice.id ? null : notice.id),
                className: "w-full text-left p-6 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-start", children: [

                _jsxDEV("div", { className: "w-full flex justify-between items-start mb-2", children: [
                  _jsxDEV("div", { className: "flex items-center gap-3", children: [
                    _jsxDEV("span", { className: "px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-50 text-emerald-600", children:
                      notice.type }, void 0, false
                    ),
                    notice.isNew && _jsxDEV("span", { className: "text-[10px] font-black text-red-500 animate-pulse", children: "N" }, void 0, false)] }, void 0, true
                  ),
                  _jsxDEV("span", { className: "text-sm text-gray-400 font-medium", children: notice.date }, void 0, false)] }, void 0, true
                ),
                _jsxDEV("div", { className: "w-full flex justify-between items-center", children: [
                  _jsxDEV("h2", { className: "text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors", children: notice.title }, void 0, false),
                  _jsxDEV("span", { className: `text-xl text-gray-400 transition-transform duration-200 ${openId === notice.id ? 'rotate-180' : ''}`, children: "▼" }, void 0, false

                  )] }, void 0, true
                )] }, void 0, true
              ),
              _jsxDEV("div", { className: `overflow-hidden transition-all duration-300 bg-gray-50 ${openId === notice.id ? 'max-h-[1000px]' : 'max-h-0'}`, children:
                _jsxDEV("div", { className: "p-8 border-t border-gray-100", children:
                  _jsxDEV("p", { className: "text-gray-700 font-medium leading-relaxed whitespace-pre-wrap", children: notice.content }, void 0, false) }, void 0, false
                ) }, void 0, false
              )] }, notice.id, true
            )
            ) :

            _jsxDEV("div", { className: "p-16 text-center text-gray-400 font-medium", children: "등록된 공지사항이 없습니다." }, void 0, false

            ) }, void 0, false

          ),


          notices.length > 0 &&
          _jsxDEV("div", { className: "p-6 bg-gray-50 border-t border-gray-100 flex justify-center", children:
            _jsxDEV("nav", { className: "flex gap-2", children: [
              _jsxDEV("button", { className: "w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-400", children: "<" }, void 0, false),
              _jsxDEV("button", { className: "w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-600 text-white font-bold", children: "1" }, void 0, false),
              _jsxDEV("button", { className: "w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-400", children: ">" }, void 0, false)] }, void 0, true
            ) }, void 0, false
          )] }, void 0, true

        )] }, void 0, true
      ) }, void 0, false
    ));

}

export default NoticePage;