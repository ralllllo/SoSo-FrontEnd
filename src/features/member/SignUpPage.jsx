import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from './hooks/useSignUp';
import logo from '../../assets/soso로고.png';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    formData, errors, apiStatus, images, previews, terms,
    handleChange, checkDuplicate, verifyBusiness, searchAddress,
    handleFileChange, handleTermsChange, handleSubmit
  } = useSignUp();

  const sectionStyle = "bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4";
  const labelStyle = "block text-sm font-bold text-gray-700 mb-1";
  const inputStyle = "w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#1D9E75] outline-none transition-all";
  const btnActionStyle = "px-4 py-2 bg-[#1D9E75] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors whitespace-nowrap";
  const errorStyle = "text-xs text-red-500 mt-1";

  return (
    _jsxDEV("div", { className: "min-h-screen bg-gray-50 py-12 px-4", children:
      _jsxDEV("div", { className: "max-w-2xl mx-auto space-y-8", children: [

        _jsxDEV("div", {
          className: "flex items-center justify-center gap-1 cursor-pointer group mb-4",
          onClick: () => navigate('/'), children: [

          _jsxDEV("img", {
            src: logo,
            alt: "SoSo Logo",
            className: "w-12 h-12 object-contain relative top-[5px] group-hover:scale-105 transition-transform" }, void 0, false
          ),
          _jsxDEV("div", { className: "text-[40px] font-black text-[#1d9e75] tracking-tighter leading-none", children: "SoSo" }, void 0, false

          )] }, void 0, true
        ),

        _jsxDEV("div", { className: "space-y-6", children: [

          _jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
            _jsxDEV("button", {
              type: "button",
              onClick: () => handleChange({ target: { name: 'userType', value: 'BUSINESS' } }),
              className: `p-4 rounded-xl border-2 transition-all text-center space-y-2 ${
              formData.userType === 'BUSINESS' ?
              'border-[#1D9E75] bg-[#1D9E75]/5 text-[#1D9E75]' :
              'border-gray-200 bg-white text-gray-400 hover:border-gray-300'}`, children: [


              _jsxDEV("div", { className: "text-2xl", children: "🏢" }, void 0, false),
              _jsxDEV("div", { className: "font-bold", children: "사업자 회원" }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("button", {
              type: "button",
              onClick: () => handleChange({ target: { name: 'userType', value: 'PARTNER' } }),
              className: `p-4 rounded-xl border-2 transition-all text-center space-y-2 ${
              formData.userType === 'PARTNER' ?
              'border-[#1D9E75] bg-[#1D9E75]/5 text-[#1D9E75]' :
              'border-gray-200 bg-white text-gray-400 hover:border-gray-300'}`, children: [


              _jsxDEV("div", { className: "text-2xl", children: "🤝" }, void 0, false),
              _jsxDEV("div", { className: "font-bold", children: "거래처 회원" }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ),


          _jsxDEV("section", { className: sectionStyle, children: [
            _jsxDEV("h2", { className: "text-lg font-bold text-gray-800 border-b pb-2", children: "계정 정보" }, void 0, false),
            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: labelStyle, children: "아이디" }, void 0, false),
              _jsxDEV("div", { className: "flex gap-2", children: [
                _jsxDEV("input", { name: "userId", value: formData.userId, onChange: handleChange, className: inputStyle, placeholder: "영문, 숫자 6~20자" }, void 0, false),
                _jsxDEV("button", { type: "button", onClick: () => checkDuplicate('userId'), className: btnActionStyle, children: "중복확인" }, void 0, false)] }, void 0, true
              ),
              errors.userId && _jsxDEV("p", { className: errorStyle, children: errors.userId }, void 0, false)] }, void 0, true
            ),

            _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: labelStyle, children: "비밀번호" }, void 0, false),
                _jsxDEV("input", { type: "password", name: "password", value: formData.password, onChange: handleChange, className: inputStyle, placeholder: "영문+숫자+특수문자 8자↑" }, void 0, false),
                errors.password && _jsxDEV("p", { className: errorStyle, children: errors.password }, void 0, false)] }, void 0, true
              ),
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: labelStyle, children: "비밀번호 재확인" }, void 0, false),
                _jsxDEV("input", { type: "password", name: "confirmPassword", value: formData.confirmPassword, onChange: handleChange, className: inputStyle }, void 0, false),
                errors.confirmPassword && _jsxDEV("p", { className: errorStyle, children: errors.confirmPassword }, void 0, false)] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ),


          _jsxDEV("section", { className: sectionStyle, children: [
            _jsxDEV("h2", { className: "text-lg font-bold text-gray-800 border-b pb-2", children: "인적 사항" }, void 0, false),
            _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: labelStyle, children: "이름 (실명)" }, void 0, false),
                _jsxDEV("input", { name: "name", value: formData.name, onChange: handleChange, className: inputStyle }, void 0, false)] }, void 0, true
              ),
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: labelStyle, children: "닉네임" }, void 0, false),
                _jsxDEV("div", { className: "flex gap-2", children: [
                  _jsxDEV("input", { name: "nickname", value: formData.nickname, onChange: handleChange, className: inputStyle }, void 0, false),
                  _jsxDEV("button", { type: "button", onClick: () => checkDuplicate('nickname'), className: btnActionStyle, children: "중복확인" }, void 0, false)] }, void 0, true
                )] }, void 0, true
              )] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: labelStyle, children: "휴대전화" }, void 0, false),
              _jsxDEV("input", { name: "phone", value: formData.phone, onChange: handleChange, className: inputStyle, placeholder: "010-XXXX-XXXX" }, void 0, false),
              errors.phone && _jsxDEV("p", { className: errorStyle, children: errors.phone }, void 0, false)] }, void 0, true
            ),

            _jsxDEV("div", { children: [
              _jsxDEV("label", { className: labelStyle, children: "주민등록번호" }, void 0, false),
              _jsxDEV("div", { className: "flex items-center gap-2", children: [
                _jsxDEV("input", { name: "ssnFront", value: formData.ssnFront, onChange: handleChange, className: inputStyle, placeholder: "앞 6자리", maxLength: 6 }, void 0, false),
                _jsxDEV("span", { className: "text-gray-400", children: "-" }, void 0, false),
                _jsxDEV("input", { type: "password", name: "ssnBack", value: formData.ssnBack, onChange: handleChange, className: inputStyle, placeholder: "뒤 7자리", maxLength: 7 }, void 0, false)] }, void 0, true
              ),
              (errors.ssnFront || errors.ssnBack) && _jsxDEV("p", { className: errorStyle, children: errors.ssnFront || errors.ssnBack }, void 0, false)] }, void 0, true
            ),

            _jsxDEV("div", { className: "relative", children: [
              _jsxDEV("label", { className: labelStyle, children: "이메일" }, void 0, false),
              _jsxDEV("div", { className: "flex gap-2", children: [
                _jsxDEV("input", { name: "email", value: formData.email, onChange: handleChange, className: inputStyle, placeholder: "example@gmail.com" }, void 0, false),
                _jsxDEV("button", { type: "button", onClick: () => checkDuplicate('email'), className: btnActionStyle, children: "중복확인" }, void 0, false)] }, void 0, true
              ),

              errors.email && _jsxDEV("p", { className: errorStyle, children: errors.email }, void 0, false)] }, void 0, true
            )] }, void 0, true
          ),


          _jsxDEV("section", { className: sectionStyle, children: [
            _jsxDEV("h2", { className: "text-lg font-bold text-gray-800 border-b pb-2", children:
              formData.userType === 'BUSINESS' ? '사업자 정보 확인' : '거래처 정보 확인' }, void 0, false
            ),
            _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: labelStyle, children: "사업자번호" }, void 0, false),
                _jsxDEV("input", { name: "bizNo", value: formData.bizNo, onChange: handleChange, className: inputStyle, placeholder: "000-00-00000" }, void 0, false)] }, void 0, true
              ),
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: labelStyle, children: "대표자명" }, void 0, false),
                _jsxDEV("input", { name: "ceoName", value: formData.ceoName, onChange: handleChange, className: inputStyle }, void 0, false)] }, void 0, true
              ),
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: labelStyle, children: "개업일자" }, void 0, false),
                _jsxDEV("input", { type: "date", name: "openDate", value: formData.openDate, onChange: handleChange, className: inputStyle }, void 0, false)] }, void 0, true
              ),
              _jsxDEV("div", { children: [
                _jsxDEV("label", { className: labelStyle, children: "상호명" }, void 0, false),
                _jsxDEV("input", { name: "corpName", value: formData.corpName, onChange: handleChange, className: inputStyle }, void 0, false)] }, void 0, true
              )] }, void 0, true
            ),
            _jsxDEV("button", { type: "button", onClick: verifyBusiness, className: `w-full py-3 rounded-lg font-bold transition-all ${apiStatus.bizVerified ? 'bg-green-50 text-[#1D9E75] border border-[#1D9E75]/20' : 'bg-[#1D9E75] text-white hover:opacity-90'}`, children:
              apiStatus.bizVerified ? formData.userType === 'BUSINESS' ? '사업자 인증 완료 ✓' : '거래처 인증 완료 ✓' : '국세청 사업자 진위 확인' }, void 0, false
            )] }, void 0, true
          ),


          _jsxDEV("section", { className: sectionStyle, children: [
            _jsxDEV("h2", { className: "text-lg font-bold text-gray-800 border-b pb-2", children:
              formData.userType === 'BUSINESS' ? '가게 상세 정보' : '영업소 상세 정보' }, void 0, false
            ),
            _jsxDEV("div", { className: "space-y-2", children: [
              _jsxDEV("div", { className: "flex gap-2", children: [
                _jsxDEV("input", { name: "zipCode", value: formData.zipCode, readOnly: true, className: `${inputStyle} bg-gray-100`, placeholder: "우편번호" }, void 0, false),
                _jsxDEV("button", { type: "button", onClick: searchAddress, className: btnActionStyle, children: "주소검색" }, void 0, false)] }, void 0, true
              ),
              _jsxDEV("input", { name: "address", value: formData.address, readOnly: true, className: `${inputStyle} bg-gray-100`, placeholder: "도로명 주소" }, void 0, false),
              _jsxDEV("input", { name: "detailAddress", value: formData.detailAddress, onChange: handleChange, className: inputStyle, placeholder: "상세주소 입력" }, void 0, false)] }, void 0, true
            ),

            _jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4", children: [
              _jsxDEV("div", { className: "space-y-1", children: [
                _jsxDEV("span", { className: "text-xs font-bold text-gray-500", children: [
                  formData.userType === 'BUSINESS' ? '가게 외부 사진' : '영업소 전경 사진', " ", _jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false)] }, void 0, true
                ),
                _jsxDEV("div", { className: "relative border-2 border-dashed border-gray-200 rounded-lg h-40 flex items-center justify-center overflow-hidden hover:bg-gray-50 transition-all", children: [
                  _jsxDEV("input", { type: "file", onChange: (e) => handleFileChange(e, 'exterior'), className: "absolute inset-0 opacity-0 cursor-pointer z-10", accept: "image/jpeg,image/png" }, void 0, false),
                  previews.exterior ?
                  _jsxDEV("img", { src: previews.exterior, alt: "Exterior Preview", className: "w-full h-full object-cover" }, void 0, false) :

                  _jsxDEV("div", { className: "text-center", children: [
                    _jsxDEV("div", { className: "text-2xl mb-1", children: "📸" }, void 0, false),
                    _jsxDEV("span", { className: "text-xs text-[#1D9E75] font-medium", children: "파일 선택 (JPG/PNG)" }, void 0, false)] }, void 0, true
                  )] }, void 0, true

                )] }, void 0, true
              ),
              _jsxDEV("div", { className: "space-y-1", children: [
                _jsxDEV("span", { className: "text-xs font-bold text-gray-500", children: [
                  formData.userType === 'BUSINESS' ? '가게 내부 사진' : '영업소 내부 사진', " ", _jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false)] }, void 0, true
                ),
                _jsxDEV("div", { className: "relative border-2 border-dashed border-gray-200 rounded-lg h-40 flex items-center justify-center overflow-hidden hover:bg-gray-50 transition-all", children: [
                  _jsxDEV("input", { type: "file", onChange: (e) => handleFileChange(e, 'interior'), className: "absolute inset-0 opacity-0 cursor-pointer z-10", accept: "image/jpeg,image/png" }, void 0, false),
                  previews.interior ?
                  _jsxDEV("img", { src: previews.interior, alt: "Interior Preview", className: "w-full h-full object-cover" }, void 0, false) :

                  _jsxDEV("div", { className: "text-center", children: [
                    _jsxDEV("div", { className: "text-2xl mb-1", children: "📸" }, void 0, false),
                    _jsxDEV("span", { className: "text-xs text-[#1D9E75] font-medium", children: "파일 선택 (JPG/PNG)" }, void 0, false)] }, void 0, true
                  )] }, void 0, true

                )] }, void 0, true
              )] }, void 0, true
            )] }, void 0, true
          ),


          _jsxDEV("section", { className: "bg-white p-6 rounded-xl border border-gray-100 shadow-sm", children: [
            _jsxDEV("div", { className: "flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg", children: [
              _jsxDEV("input", { type: "checkbox", checked: terms.all, onChange: () => handleTermsChange('all'), id: "all", className: "w-5 h-5 accent-[#1D9E75] cursor-pointer" }, void 0, false),
              _jsxDEV("label", { htmlFor: "all", className: "font-bold text-gray-800 cursor-pointer", children: "전체 약관에 동의합니다" }, void 0, false)] }, void 0, true
            ),
            _jsxDEV("div", { className: "space-y-3 px-3", children:
              [
              { id: 'service', label: '[필수] 서비스 이용약관 동의' },
              { id: 'privacy', label: '[필수] 개인정보 수집 및 이용 동의' },
              { id: 'marketing', label: '[선택] 마케팅 정보 활용 동의' }].
              map((term) =>
              _jsxDEV("div", { className: "flex justify-between items-center text-sm", children: [
                _jsxDEV("div", { className: "flex items-center gap-2", children: [
                  _jsxDEV("input", { type: "checkbox", checked: terms[term.id], onChange: () => handleTermsChange(term.id), id: term.id, className: "accent-[#1D9E75]" }, void 0, false),
                  _jsxDEV("label", { htmlFor: term.id, className: "text-gray-600", children: term.label }, void 0, false)] }, void 0, true
                ),
                _jsxDEV("button", { type: "button", className: "text-gray-400 underline text-xs", children: "보기" }, void 0, false)] }, term.id, true
              )
              ) }, void 0, false
            )] }, void 0, true
          ),

          _jsxDEV("button", {
            type: "button",
            onClick: handleSubmit,
            disabled:
            !terms.service ||
            !terms.privacy ||
            !apiStatus.bizVerified ||
            !apiStatus.userIdChecked ||
            !apiStatus.nicknameChecked ||
            !apiStatus.emailChecked ||
            !images.exterior ||
            !images.interior,

            className: "w-full py-4 bg-[#1D9E75] text-white rounded-xl text-lg font-bold hover:opacity-90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg", children:

            formData.userType === 'BUSINESS' ? '사업자 회원가입' : '거래처 회원가입' }, void 0, false
          )] }, void 0, true
        )] }, void 0, true
      ) }, void 0, false
    ));

};

export default SignUpPage;