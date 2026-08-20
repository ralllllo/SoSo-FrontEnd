import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFindPassword } from './hooks/useFindPassword';import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";






const FindPasswordPage = () => {
  const navigate = useNavigate();


  const {
    formData,
    errors,
    isVerifying,
    verificationCode,
    isResetStep,
    handleInputChange,
    handleVerificationCodeChange,
    handleSendCodeClick,
    handleVerifyConfirm,
    handleResetPasswordSubmit
  } = useFindPassword();


  const onResetSubmit = async () => {
    const result = await handleResetPasswordSubmit();

    if (result) {
      navigate('/login');
    }
  };

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
            _jsxDEV("h1", { className: "text-[40px] font-black leading-none tracking-tight", style: { color: '#1D9E75' }, children: "SoSo" }, void 0, false

            )] }, void 0, true
          ),

          _jsxDEV("h2", { className: "mt-4 text-[24px] font-extrabold text-gray-900", children:
            isResetStep ? '비밀번호 재설정' : '비밀번호 찾기' }, void 0, false
          ),

          _jsxDEV("p", { className: "mt-2 w-full max-w-none text-[13px] sm:text-[15px] text-gray-500 font-medium text-center break-keep leading-relaxed", children:
            isResetStep ?
            '새롭게 사용할 비밀번호를 입력해주세요.' :

            _jsxDEV(_Fragment, { children: [
              _jsxDEV("span", { className: "whitespace-nowrap", children: "가입하신 아이디와 이메일을 입력하시면" }, void 0, false),
              _jsxDEV("br", {}, void 0, false),
              _jsxDEV("span", { children: "비밀번호를 재설정할 수 있습니다." }, void 0, false)] }, void 0, true
            ) }, void 0, false

          )] }, void 0, true
        ),

        !isResetStep ?

        _jsxDEV("div", { className: "space-y-6 pt-0", children: [

          _jsxDEV("div", { children: [
            _jsxDEV("label", { htmlFor: "userId", className: "block text-sm font-bold text-gray-700 mb-2 ml-1", children: "아이디" }, void 0, false

            ),
            _jsxDEV("input", {
              id: "userId",
              name: "userId",
              type: "text",
              value: formData.userId,
              onChange: handleInputChange,
              disabled: isVerifying,
              className: `block w-full px-5 py-3 rounded-2xl border outline-none transition-all ${
              isVerifying ?
              'bg-gray-100 text-gray-400 border-gray-200' :
              errors.userId ?
              'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-400 bg-gray-50' :
              'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent'}`,

              placeholder: "아이디를 입력하세요" }, void 0, false
            ),
            errors.userId &&
            _jsxDEV("p", { className: "mt-1.5 ml-1 text-[12px] font-semibold text-red-500 animate-in fade-in slide-in-from-top-1", children:
              errors.userId }, void 0, false
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
              className: `block w-full px-5 py-3 rounded-2xl border outline-none transition-all ${
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


          _jsxDEV("div", { className: "pt-2", children:
            _jsxDEV("button", {
              onClick: handleSendCodeClick,
              className: "w-full flex justify-center py-2 px-4 border border-transparent text-ml font-black rounded-2xl text-white shadow-lg transition-all transform active:scale-[0.98]",
              style: { backgroundColor: '#1D9E75' },
              onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#158A64',
              onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#1D9E75', children:

              isVerifying ? '인증번호 재발송' : '비밀번호 찾기' }, void 0, false
            ) }, void 0, false
          ),


          isVerifying &&
          _jsxDEV("div", { className: "w-full space-y-3 pt-3 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-500", children:
            _jsxDEV("div", { className: "w-full bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100", children: [
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
              onClick: () => navigate('/login'),
              className: "text-[15px] font-bold text-[#0D6B50] hover:underline underline-offset-4 transition-all", children:
              "로그인 화면으로 돌아가기" }, void 0, false

            ) }, void 0, false
          )] }, void 0, true
        ) :


        _jsxDEV("div", { className: "space-y-6 pt-0 animate-in fade-in slide-in-from-right-4 duration-500", children: [

          _jsxDEV("div", { children: [
            _jsxDEV("label", { htmlFor: "newPassword", className: "block text-sm font-bold text-gray-700 mb-2 ml-1", children: "새 비밀번호" }, void 0, false

            ),
            _jsxDEV("input", {
              id: "newPassword",
              name: "newPassword",
              type: "password",
              value: formData.newPassword,
              onChange: handleInputChange,
              className: `block w-full px-5 py-3 rounded-2xl border outline-none transition-all ${
              errors.newPassword ?
              'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-400 bg-gray-50' :
              'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent'}`,

              placeholder: "새 비밀번호 8자 이상, 영문+숫자+특수문자" }, void 0, false
            ),
            errors.newPassword &&
            _jsxDEV("p", { className: "mt-1.5 ml-1 text-[12px] font-semibold text-red-500 animate-in fade-in slide-in-from-top-1", children:
              errors.newPassword }, void 0, false
            )] }, void 0, true

          ),


          _jsxDEV("div", { children: [
            _jsxDEV("label", { htmlFor: "confirmPassword", className: "block text-sm font-bold text-gray-700 mb-2 ml-1", children: "비밀번호 확인" }, void 0, false

            ),
            _jsxDEV("input", {
              id: "confirmPassword",
              name: "confirmPassword",
              type: "password",
              value: formData.confirmPassword,
              onChange: handleInputChange,
              className: `block w-full px-5 py-3 rounded-2xl border outline-none transition-all ${
              errors.confirmPassword ?
              'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-400 bg-gray-50' :
              'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent'}`,

              placeholder: "비밀번호를 한 번 더 입력하세요" }, void 0, false
            ),
            errors.confirmPassword &&
            _jsxDEV("p", { className: "mt-1.5 ml-1 text-[12px] font-semibold text-red-500 animate-in fade-in slide-in-from-top-1", children:
              errors.confirmPassword }, void 0, false
            )] }, void 0, true

          ),


          _jsxDEV("div", { className: "pt-2", children:
            _jsxDEV("button", {
              onClick: onResetSubmit,
              className: "w-full flex justify-center py-2 px-4 border border-transparent text-ml font-black rounded-2xl text-white shadow-lg transition-all transform active:scale-[0.98]",
              style: { backgroundColor: '#1D9E75' },
              onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#158A64',
              onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#1D9E75', children:
              "비밀번호 저장 및 로그인" }, void 0, false

            ) }, void 0, false
          ),

          _jsxDEV("p", { className: "text-center text-[13px] text-gray-400 font-medium", children: "비밀번호 변경 후 자동으로 로그인 페이지로 이동합니다." }, void 0, false

          )] }, void 0, true
        )] }, void 0, true

      ) }, void 0, false
    ));

};

export default FindPasswordPage;