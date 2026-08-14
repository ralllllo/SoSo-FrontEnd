import { useState } from 'react';
import { checkIdApi, checkNicknameApi, checkEmailApi, signUpApi, checkBusinessApi } from '../../../apis/memberApi';
import { useNavigate } from 'react-router-dom';






const REGEX = {
  ID: /^[a-zA-Z0-9]{6,20}$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
  PHONE: /^010-\d{4}-\d{4}$/,
  SSN_FRONT: /^\d{6}$/,
  SSN_BACK: /^[1-4]\d{6}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

export const useSignUp = () => {
  const [formData, setFormData] = useState({
    userType: 'BUSINESS',
    userId: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    name: '',
    phone: '',
    ssnFront: '',
    ssnBack: '',
    email: '',
    bizNo: '',
    ceoName: '',
    openDate: '',
    corpName: '',
    zipCode: '',
    address: '',
    detailAddress: ''
  });

  const [errors, setErrors] = useState({});
  const [apiStatus, setApiStatus] = useState({
    userIdChecked: false,
    nicknameChecked: false,
    emailChecked: false,
    bizVerified: false
  });

  const [images, setImages] = useState({ exterior: null, interior: null });
  const [previews, setPreviews] = useState({ exterior: null, interior: null });
  const [terms, setTerms] = useState({
    all: false,
    service: false,
    privacy: false,
    marketing: false
  });

  const navi = useNavigate();




  const validateField = (name, value, currentFormData = formData) => {
    let error = '';
    switch (name) {
      case 'userId':
        if (!REGEX.ID.test(value)) error = '영문, 숫자 조합 6~20자로 입력해주세요.';
        break;
      case 'password':
        if (!REGEX.PASSWORD.test(value)) error = '8자 이상, 영문+숫자+특수문자 조합이어야 합니다.';
        break;
      case 'confirmPassword':
        if (value !== currentFormData.password) error = '비밀번호가 일치하지 않습니다.';
        break;
      case 'phone':
        if (!REGEX.PHONE.test(value)) error = '010-XXXX-XXXX 형식으로 입력해주세요.';
        break;
      case 'ssnFront':
        if (!REGEX.SSN_FRONT.test(value)) error = '생년월일 6자리를 입력해주세요.';
        break;
      case 'ssnBack':
        if (!REGEX.SSN_BACK.test(value)) error = '뒷자리 형식이 올바르지 않습니다.';
        break;
      case 'email':
        if (!REGEX.EMAIL.test(value)) error = '올바른 이메일 형식이 아닙니다.';
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };




  const handleChange = (e) => {
    const { name, value } = e.target;


    if ((name === 'ssnFront' || name === 'ssnBack') && !/^\d*$/.test(value)) return;
    if (name === 'ssnFront' && value.length > 6) return;
    if (name === 'ssnBack' && value.length > 7) return;

    let finalValue = value;
    if (name === 'phone') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      finalValue = numbersOnly;
      if (numbersOnly.length > 3 && numbersOnly.length <= 7) {
        finalValue = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
      } else if (numbersOnly.length > 7) {
        finalValue = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
      }
    }

    const nextFormData = { ...formData, [name]: finalValue };
    setFormData(nextFormData);


    if (['userId', 'nickname', 'email'].includes(name)) {
      setApiStatus((prev) => ({ ...prev, [`${name}Checked`]: false }));
    }

    validateField(name, finalValue, nextFormData);
  };




  const checkDuplicate = async (field) => {
    if (errors[field] || !formData[field]) {
      alert('올바른 값을 입력한 후 중복확인을 해주세요.');
      return;
    }

    try {
      let response;
      if (field === 'userId') response = await checkIdApi(formData.userId);else
      if (field === 'nickname') response = await checkNicknameApi(formData.nickname);else
      if (field === 'email') response = await checkEmailApi(formData.email);

      if (response && !response.isDuplicated) {
        setApiStatus((prev) => ({ ...prev, [`${field}Checked`]: true }));
        alert(response.message);
      } else {
        setApiStatus((prev) => ({ ...prev, [`${field}Checked`]: false }));
        alert(response?.message || '이미 사용 중입니다.');
      }
    } catch (error) {
      console.error(`${field} 중복 확인 오류:`, error);
      alert('중복 확인 중 오류가 발생했습니다.');
    }
  };




  const verifyBusiness = async () => {
    const { bizNo, openDate, ceoName, corpName } = formData;

    if (!bizNo || !openDate || !ceoName || !corpName) {
      alert('사업자 정보를 모두 입력해 주세요.');
      return;
    }

    try {

      const formattedDate = openDate.replace(/-/g, '');

      const message = await checkBusinessApi(bizNo, formattedDate, ceoName, corpName);

      setApiStatus((prev) => ({ ...prev, bizVerified: true }));
      alert(message || '사업자 인증이 완료되었습니다.');
    } catch (error) {
      console.error('사업자 인증 오류:', error);
      setApiStatus((prev) => ({ ...prev, bizVerified: false }));
      const errorStr = error.response?.data;


      if (errorStr.message === "DUPLICATED_BIZ_NO") {
        alert("🚨 이미 등록된 사업자 번호입니다. 기존 계정으로 로그인하시거나 관리자에게 문의해 주세요.");
      } else {
        alert(errorStr || "사업자 정보가 국세청 기록과 일치하지 않습니다.");
      }
    }
  };




  const searchAddress = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setFormData((prev) => ({ ...prev, zipCode: data.zonecode, address: data.roadAddress }));
      }
    }).open();
  };




  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) return alert('10MB 이하 파일만 가능합니다.');
    if (!['image/jpeg', 'image/png'].includes(file.type)) return alert('JPG/PNG 파일만 가능합니다.');


    if (previews[type]) {
      URL.revokeObjectURL(previews[type]);
    }

    const previewUrl = URL.createObjectURL(file);
    setImages((prev) => ({ ...prev, [type]: file }));
    setPreviews((prev) => ({ ...prev, [type]: previewUrl }));
  };




  const handleTermsChange = (name) => {
    if (name === 'all') {
      const nextVal = !terms.all;
      setTerms({ all: nextVal, service: nextVal, privacy: nextVal, marketing: nextVal });
    } else {
      setTerms((prev) => {
        const next = { ...prev, [name]: !prev[name] };
        next.all = next.service && next.privacy && next.marketing;
        return next;
      });
    }
  };




  const handleSubmit = async (e) => {

    e?.preventDefault();


    if (!apiStatus.userIdChecked || !apiStatus.nicknameChecked || !apiStatus.emailChecked) {
      return alert('아이디, 닉네임, 이메일 중복 확인을 모두 완료해주세요.');
    }

    if (!apiStatus.bizVerified) {
      return alert('사업자 인증을 완료해주세요.');
    }

    if (!terms.service || !terms.privacy) {
      return alert('필수 약관에 동의해주세요.');
    }

    if (!images.exterior || !images.interior) {
      return alert('매장 내부 및 외부 사진을 모두 첨부해주세요.');
    }

    try {
      const result = await signUpApi(formData, images.exterior, images.interior);
      if (result.status === 'success') {
        alert(result.message);
        navi("/");
      } else {
        alert(result.message || '회원가입 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      const errorMsg = error.response?.data?.message || '회원가입 요청 중 오류가 발생했습니다.';
      alert(errorMsg);
    }
  };

  return {
    formData, errors, apiStatus, images, previews, terms,
    handleChange, checkDuplicate, verifyBusiness, searchAddress,
    handleFileChange, handleTermsChange, handleSubmit
  };
};