import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from './hooks/useLogin';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






const LoginPage = () => {
  const navigate = useNavigate();

  const {
    loginType,
    setLoginType,
    formData,
    errors,
    handleInputChange,
    handleLoginSubmit
  } = useLogin();

  return (
    _jsxDEV("div", { className: "min-h-dvh overflow-y-auto flex items-center justify-center bg-gray-50 px-4 py-6 sm:px-6", children:

      _jsxDEV("div", { className: "w-full max-w-[520px] space-y-5 bg-white px-6 py-8 sm:space-y-8 sm:px-12 sm:py-14 rounded-3xl shadow-2xl border border-gray-100", children: [


        _jsxDEV("div", { className: "text-center flex flex-col items-center", children: [
          _jsxDEV("div", { className: "flex items-center justify-center gap-0", children: [

            _jsxDEV(Link, { to: "/", children:
              _jsxDEV("img", {
                src: "/images/logo.png",
                alt: "SoSo Logo",
                className: "w-13 h-13 object-contain transform translate-y-[4px]" }, void 0, false
              ) }, void 0, false
            ),

            _jsxDEV(Link, { to: "/", children:
              _jsxDEV("h1", { className: "text-[36px] sm:text-[40px] font-black leading-none tracking-tight", style: { color: '#1D9E75' }, children: "SoSo" }, void 0, false

              ) }, void 0, false
            )] }, void 0, true
          ),

          _jsxDEV("p", { className: "mt-3 sm:mt-5 text-[15px] sm:text-[16px] text-gray-500 font-medium", children: [
            loginType === 'business' ? '사업자' : '거래처', " 전용 로그인 서비스"] }, void 0, true
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "flex bg-gray-100 p-1.5 rounded-2xl", children: [
          _jsxDEV("button", {
            onClick: () => setLoginType('business'),
            className: `flex-1 py-2.5 sm:py-3 text-sm font-bold rounded-xl transition-all ${
            loginType === 'business' ?
            'bg-white shadow-md text-[#1D9E75]' :
            'text-gray-400 hover:text-gray-600'}`, children:

            "사업자 로그인" }, void 0, false

          ),
          _jsxDEV("button", {
            onClick: () => setLoginType('partner'),
            className: `flex-1 py-2.5 sm:py-3 text-sm font-bold rounded-xl transition-all ${
            loginType === 'partner' ?
            'bg-white shadow-md text-[#1D9E75]' :
            'text-gray-400 hover:text-gray-600'}`, children:

            "거래처 로그인" }, void 0, false

          )] }, void 0, true
        ),


        _jsxDEV("form", { className: "space-y-4 sm:space-y-5", onSubmit: (e) => {e.preventDefault();handleLoginSubmit();}, children: [
          _jsxDEV("div", { className: "space-y-4 sm:space-y-5", children: [

            _jsxDEV("div", { children: [
              _jsxDEV("label", { htmlFor: "id", className: "block text-sm font-bold text-gray-700 mb-2 ml-1", children: "아이디" }, void 0, false

              ),
              _jsxDEV("input", {
                id: "id",
                name: "user_id",
                type: "text",
                value: formData.user_id,
                onChange: handleInputChange,
                className: `block w-full px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl border transition-all outline-none bg-gray-50 focus:bg-white ${
                errors.id ?
                'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-400' :
                'border-gray-200 focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent'}`,

                placeholder: "아이디를 입력하세요" }, void 0, false
              ),
              errors.user_id &&
              _jsxDEV("p", { className: "mt-1.5 ml-1 text-[12px] font-semibold text-red-500 animate-in fade-in slide-in-from-top-1", children:
                errors.user_id }, void 0, false
              )] }, void 0, true

            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { htmlFor: "password", className: "block text-sm font-bold text-gray-700 mb-2 ml-1", children: "비밀번호" }, void 0, false

              ),
              _jsxDEV("input", {
                id: "password",
                name: "password",
                type: "password",
                value: formData.password,
                onChange: handleInputChange,
                className: `block w-full px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl border transition-all outline-none bg-gray-50 focus:bg-white ${
                errors.password ?
                'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-400' :
                'border-gray-200 focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent'}`,

                placeholder: "비밀번호를 입력하세요" }, void 0, false
              ),
              errors.password &&
              _jsxDEV("p", { className: "mt-1.5 ml-1 text-[12px] font-semibold text-red-500 animate-in fade-in slide-in-from-top-1", children:
                errors.password }, void 0, false
              )] }, void 0, true

            )] }, void 0, true
          ),


          _jsxDEV("div", { className: "flex items-center justify-center pt-1 text-sm sm:pt-2", children:

            _jsxDEV("div", { className: "flex w-full items-center justify-center gap-3 font-bold text-[#158A64] text-[13px] whitespace-nowrap sm:gap-4 sm:text-[13.5px]", children: [
              _jsxDEV("span", {
                onClick: () => navigate('/find-id'),
                className: "hover:text-[#0D6B50] cursor-pointer transition-colors hover:underline underline-offset-4", children:
                "아이디 찾기" }, void 0, false

              ),
              _jsxDEV("span", { className: "text-gray-200 font-normal select-none", children: "|" }, void 0, false),
              _jsxDEV("span", {
                onClick: () => navigate('/find-password'),
                className: "hover:text-[#0D6B50] cursor-pointer transition-colors hover:underline underline-offset-4", children:
                "비밀번호 찾기" }, void 0, false

              )] }, void 0, true
            ) }, void 0, false
          ),


          _jsxDEV("div", { className: "pt-0", children:
            _jsxDEV("button", {
              type: "submit",
              className: "w-full flex justify-center py-2 px-4 border border-transparent text-ml font-black rounded-2xl text-white shadow-lg transition-all transform active:scale-[0.98]",
              style: { backgroundColor: '#1D9E75', padding: '10px' },
              onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#158A64',
              onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#1D9E75', children:
              "로그인" }, void 0, false

            ) }, void 0, false
          )] }, void 0, true
        ),


        _jsxDEV("div", { className: "text-center pt-4 sm:pt-6 border-t border-gray-400", children:
          _jsxDEV("p", { className: "text-[14px] sm:text-[15px] text-gray-500 font-medium", children: ["아직 SoSo 회원이 아니신가요?",
            ' ',
            _jsxDEV(Link, { to: "/signup", children:
              _jsxDEV("button", { className: "font-extrabold text-[#0D6B50] hover:underline transition-all underline-offset-4 ml-1.5", children: "회원가입" }, void 0, false

              ) }, void 0, false
            )] }, void 0, true
          ) }, void 0, false
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default LoginPage;