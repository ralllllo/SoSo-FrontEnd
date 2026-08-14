import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFindId } from './hooks/useFindId';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






const FindIdPage = () => {
  const navigate = useNavigate();


  const {
    formData,
    errors,
    isVerifying,
    verificationCode,
    isFound,
    foundId,
    handleInputChange,
    handleVerificationCodeChange,
    handleFindIdClick,
    handleVerifyConfirm
  } = useFindId();

  return (
    _jsxDEV("div", { className: "w-full min-h-[calc(100dvh-170px)] overflow-y-auto flex items-start justify-center bg-gray-50 px-4 pt-4 pb-8 sm:px-6 sm:pt-5", children:

      _jsxDEV("div", { className: "w-full max-w-md mx-auto space-y-5 sm:space-y-6 bg-white px-6 py-7 sm:px-10 sm:py-10 rounded-3xl shadow-2xl border border-gray-100", children: [


        _jsxDEV("div", { className: "text-center flex flex-col items-center", children: [
          _jsxDEV("div", { className: "flex items-center justify-center gap-0 cursor-pointer", onClick: () => navigate('/login'), children: [
            _jsxDEV("img", {
              src: "/images/logo.png",
              alt: "SoSo Logo",
              className: "w-13 h-13 object-contain transform translate-y-[4px]" }, void 0, false
            ),

            _jsxDEV("h1", { className: "text-[36px] sm:text-[40px] font-black leading-none tracking-tight text-[#1D9E75]", children: "SoSo" }, void 0, false

            )] }, void 0, true
          ),
          _jsxDEV("h2", { className: "mt-3 text-[22px] sm:text-[24px] font-extrabold text-gray-900", children: "아이디 찾기" }, void 0, false),
          _jsxDEV("p", { className: "mt-2 text-[15px] text-gray-500 font-medium text-center break-keep", children:
            !isFound ?
            "회원가입 시 등록한 정보를 입력해주세요." :
            "고객님의 정보와 일치하는 아이디를 확인하세요." }, void 0, false
          )] }, void 0, true
        ),

        !isFound ?

        _jsxDEV("div", { className: "space-y-6 pt-2", children: [

          _jsxDEV("div", { children: [
            _jsxDEV("label", { htmlFor: "name", className: "block text-sm font-bold text-gray-700 mb-2 ml-1", children: "이름" }, void 0, false

            ),
            _jsxDEV("input", {
              id: "name",
              name: "name",
              type: "text",
              value: formData.name,
              onChange: handleInputChange,
              disabled: isVerifying,
              className: `block w-full px-4 py-3 sm:px-5 rounded-2xl border outline-none transition-all ${
              isVerifying ?
              'bg-gray-100 text-gray-400 border-gray-200' :
              errors.name ?
              'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-400 bg-gray-50' :
              'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent'}`,

              placeholder: "이름을 입력하세요" }, void 0, false
            ),
            errors.name &&
            _jsxDEV("p", { className: "mt-1.5 ml-1 text-[12px] font-semibold text-red-500 animate-in fade-in slide-in-from-top-1", children:
              errors.name }, void 0, false
            )] }, void 0, true

          ),


          _jsxDEV("div", { children: [
            _jsxDEV("label", { htmlFor: "email", className: "block text-sm font-bold text-gray-700 mb-2 ml-1", children: "이메일" }, void 0, false

            ),
            _jsxDEV("input", {
              id: "email",
              name: "email",
              type: "text",
              value: formData.email,
              onChange: handleInputChange,
              disabled: isVerifying,
              className: `block w-full px-4 py-3 sm:px-5 rounded-2xl border outline-none transition-all ${
              isVerifying ?
              'bg-gray-100 text-gray-400 border-gray-200' :
              errors.email ?
              'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-400 bg-gray-50' :
              'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent'}`,

              placeholder: "이메일을 입력하세요" }, void 0, false
            ),
            errors.email &&
            _jsxDEV("p", { className: "mt-1.5 ml-1 text-[12px] font-semibold text-red-500 animate-in fade-in slide-in-from-top-1", children:
              errors.email }, void 0, false
            )] }, void 0, true

          ),


          _jsxDEV("div", { children:
            _jsxDEV("button", {
              type: "button",
              onClick: handleFindIdClick,

              className: "w-full flex justify-center py-3 px-4 border border-transparent text-ml font-black rounded-2xl text-white shadow-lg transition-all transform active:scale-[0.98] bg-[#1D9E75] hover:bg-[#158A64]", children:

              isVerifying ? '인증번호 재발송' : '인증번호 전송' }, void 0, false
            ) }, void 0, false
          ),


          isVerifying &&
          _jsxDEV("div", { className: "space-y-3 pt-3 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-500", children:
            _jsxDEV("div", { className: "bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100", children: [
              _jsxDEV("label", { htmlFor: "verificationCode", className: "block text-sm font-bold text-gray-700 mb-3 ml-1", children: "인증번호 입력" }, void 0, false

              ),
              _jsxDEV("div", { className: "flex flex-col gap-3 sm:flex-row", children: [
                _jsxDEV("input", {
                  id: "verificationCode",
                  type: "text",
                  value: verificationCode,
                  onChange: handleVerificationCodeChange,
                  className: `w-full min-w-0 sm:flex-1 px-4 py-3 sm:px-5 rounded-2xl border outline-none transition-all font-bold tracking-widest ${
                  errors.verificationCode ?
                  'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-400 bg-white' :
                  'border-gray-200 focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent bg-white'}`,

                  placeholder: "6자리 번호",
                  maxLength: 6 }, void 0, false
                ),
                _jsxDEV("button", {
                  type: "button",
                  onClick: handleVerifyConfirm,
                  className: "w-full px-6 py-3 bg-gray-800 text-white font-bold rounded-2xl hover:bg-black transition-all active:scale-95 whitespace-nowrap sm:w-auto", children:
                  "확인" }, void 0, false

                )] }, void 0, true
              ),
              errors.verificationCode ?
              _jsxDEV("p", { className: "mt-2.5 ml-1 text-[12px] font-semibold text-red-500 animate-in fade-in slide-in-from-top-1", children:
                errors.verificationCode }, void 0, false
              ) :

              _jsxDEV("p", { className: "mt-3 ml-1 text-[12px] text-gray-500 font-medium", children: "이메일로 전송된 6자리 인증번호를 입력해주세요." }, void 0, false

              )] }, void 0, true

            ) }, void 0, false
          ),


          _jsxDEV("div", { className: "text-center pt-2", children:
            _jsxDEV("button", {
              type: "button",
              onClick: () => navigate('/login'),
              className: "text-[15px] font-bold text-[#0D6B50] hover:underline underline-offset-4 transition-all", children:
              "로그인 화면으로 돌아가기" }, void 0, false

            ) }, void 0, false
          )] }, void 0, true
        ) :


        _jsxDEV("div", { className: "space-y-6 -mt-3 animate-in fade-in zoom-in-95 duration-500", children: [
          _jsxDEV("div", { className: "bg-gray-50 rounded-2xl p-8 text-center border border-gray-100 flex flex-col items-center justify-center", children: [
            _jsxDEV("p", { className: "text-gray-500 font-bold text-[16px] mb-4", children: "고객님의 아이디는 다음과 같습니다." }, void 0, false

            ),
            _jsxDEV("div", { className: "py-4 px-10 bg-white rounded-xl border border-gray-200 shadow-sm inline-block", children:
              _jsxDEV("span", { className: "text-[25px] font-black tracking-tight", style: { color: '#1D9E75' }, children:
                foundId }, void 0, false
              ) }, void 0, false
            )] }, void 0, true
          ),

          _jsxDEV("div", { className: "space-y-4", children: [
            _jsxDEV("button", {
              type: "button",
              onClick: () => navigate('/login'),

              className: "w-full py-2 px-4 border border-transparent text-ml font-black rounded-2xl text-white shadow-lg transition-all transform active:scale-[0.98] bg-[#1D9E75] hover:bg-[#158A64]", children:
              "로그인하기" }, void 0, false

            ),

            _jsxDEV("button", {
              onClick: () => navigate('/find-password'),
              className: "w-full py-2 px-4 border border-gray-200 text-ml font-black rounded-2xl text-gray-700 bg-white hover:bg-gray-100 transition-all transform active:scale-[0.98]", children:
              "비밀번호 찾기" }, void 0, false

            )] }, void 0, true
          )] }, void 0, true
        )] }, void 0, true

      ) }, void 0, false
    ));

};

export default FindIdPage;