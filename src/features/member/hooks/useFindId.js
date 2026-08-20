import { useState } from 'react';
import { findIdApi, checkCodeApi } from '../../../apis/loginApi';





export const useFindId = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });


  const [errors, setErrors] = useState({
    name: '',
    email: '',
    verificationCode: ''
  });


  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isFound, setIsFound] = useState(false);
  const [foundId, setFoundId] = useState('');





  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };





  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
    if (errors.verificationCode) {
      setErrors((prev) => ({ ...prev, verificationCode: '' }));
    }
  };





  const handleFindIdClick = async () => {
    let newErrors = { name: '', email: '', verificationCode: '' };
    let hasError = false;

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }


    try {
      const resp = await findIdApi({
        name: formData.name,
        email: formData.email
      });

      alert(resp.data);

      setIsVerifying(true);

    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      } else {
        alert('서버 연결에 실패했습니다.');
      }
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
      const resp = await checkCodeApi({
        email: formData.email,
        code: verificationCode
      });

      if (resp.data) {
        alert('인증되었습니다.');
        setFoundId(resp.data);
        setIsFound(true);
        setIsVerifying(false);
      } else {
        setErrors((prev) => ({
          ...prev,
          verificationCode: '인증번호가 일치하지 않습니다.'
        }));
      }
    } catch (error) {
      console.error('인증번호 확인 오류:', error);

      if (error.response) {
        setErrors((prev) => ({
          ...prev,
          verificationCode: error.response.data
        }));
      } else {
        alert('인증번호 확인 중 오류가 발생했습니다.');
      }
    }
  };

  return {
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
  };
};