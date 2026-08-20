import { useState } from 'react';
import {
  findPasswordSendCodeApi,
  resetPasswordApi,
  checkPasswordCodeApi } from
'../../../apis/loginApi';





export const useFindPassword = () => {

  const [formData, setFormData] = useState({
    userId: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  });


  const [errors, setErrors] = useState({
    userId: '',
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });


  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isResetStep, setIsResetStep] = useState(false);





  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };





  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);

    if (errors.verificationCode) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: ''
      }));
    }
  };





  const handleSendCodeClick = async () => {
    const newErrors = {
      userId: '',
      email: '',
      verificationCode: '',
      newPassword: '',
      confirmPassword: ''
    };

    let hasError = false;

    if (!formData.userId.trim()) {
      newErrors.userId = '아이디를 입력해주세요.';
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
      hasError = true;
    }

    if (hasError) {
      setErrors((prev) => ({
        ...prev,
        ...newErrors
      }));
      return;
    }

    try {
      const resp = await findPasswordSendCodeApi({
        id: formData.userId,
        email: formData.email
      });

      alert(resp.data || '인증번호가 이메일로 전송되었습니다.');
      setIsVerifying(true);
    } catch (error) {
      console.error('비밀번호 찾기 인증번호 발송 오류:', error);
      alert(error.response?.data || '일치하는 회원 정보가 없습니다.');
    }
  };





  const handleVerifyConfirm = async () => {
    if (!verificationCode.trim()) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: '인증번호를 입력해주세요.'
      }));
      return;
    }

    try {
      await checkPasswordCodeApi({
        email: formData.email,
        code: verificationCode.trim()
      });

      alert('인증되었습니다.');
      setIsResetStep(true);
      setIsVerifying(false);
    } catch (error) {
      console.error('비밀번호 찾기 인증번호 확인 오류:', error);

      setErrors((prev) => ({
        ...prev,
        verificationCode:
        error.response?.data || '인증번호가 일치하지 않습니다.'
      }));
    }
  };





  const handleResetPasswordSubmit = async () => {
    const newErrors = {
      userId: '',
      email: '',
      verificationCode: '',
      newPassword: '',
      confirmPassword: ''
    };

    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    let hasError = false;

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요.';
      hasError = true;
    } else if (!regex.test(formData.newPassword)) {
      newErrors.newPassword = '8자 이상, 영문+숫자+특수문자 조합이어야 합니다.';
      hasError = true;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
      hasError = true;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      hasError = true;
    } else if (!regex.test(formData.confirmPassword)) {
      newErrors.confirmPassword = '8자 이상, 영문+숫자+특수문자 조합이어야 합니다.';
    } else
    {
      newErrors.confirmPassword = '비밀번호가 일치합니다.';
    }

    if (hasError) {
      setErrors((prev) => ({
        ...prev,
        ...newErrors
      }));
      return false;
    }

    try {
      await resetPasswordApi({
        id: formData.userId,
        email: formData.email,
        newPassword: formData.newPassword
      });

      alert('비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다.');
      return true;
    } catch (error) {
      console.error('비밀번호 재설정 오류:', error);
      alert(error.response?.data || '비밀번호 변경에 실패했습니다.');
      return false;
    }
  };

  return {
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
  };
};