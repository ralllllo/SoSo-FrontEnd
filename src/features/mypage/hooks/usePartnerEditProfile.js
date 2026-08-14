import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPartnerProfileApi, updatePartnerProfileApi, changePasswordApi } from '../../../apis/memberApi';
import authStore from '../../../store/authStore';




const REGEX = {
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
  PHONE: /^010-\d{4}-\d{4}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};





export const usePartnerEditProfile = () => {
  const navigate = useNavigate();
  const { logout } = authStore();


  const [formData, setFormData] = useState({
    nickname: '',
    phone: '',
    email: '',
    bizNumber: '',
    companyName: '',
    representativeName: '',
    openingDate: '',
    zonecode: '',
    address1: '',
    address2: '',
    exteriorImg: null,
    interiorImg: null,
    exteriorPreview: null,
    interiorPreview: null
  });


  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });


  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const result = await getPartnerProfileApi();

        const sysNamesArray = result?.storeSysNames ? result.storeSysNames.split(',') : [];
        const storeImg1 = sysNamesArray[0] ?
        `https://storage.googleapis.com/study_jcr/${sysNamesArray[0]}` :
        null;
        const storeImg2 = sysNamesArray[1] ?
        `https://storage.googleapis.com/study_jcr/${sysNamesArray[1]}` :
        null;

        setFormData((prev) => ({
          ...prev,
          nickname: result.nickname,
          phone: result.phone,
          email: result.email,
          bizNumber: result.bizNumber,
          companyName: result.companyName,
          representativeName: result.repName || result.ceoName,
          openingDate: result.openingDate,
          zonecode: result.zonecode,
          address1: result.address1,
          address2: result.address2,
          exteriorPreview: storeImg1,
          interiorPreview: storeImg2
        }));
      } catch (err) {
        console.error('초기 데이터 로드 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);




  const validateField = (name, value) => {
    let error = '';
    if (name === 'phone' && value && !REGEX.PHONE.test(value)) {
      error = '010-XXXX-XXXX 형식으로 입력해주세요.';
    } else if (name === 'email' && value && !REGEX.EMAIL.test(value)) {
      error = '올바른 이메일 형식이 아닙니다.';
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validatePasswordField = (name, value, currentPasswordForm = passwordForm) => {
    let error = '';
    if (name === 'newPassword' && value && !REGEX.PASSWORD.test(value)) {
      error = '8자 이상, 영문+숫자+특수문자 조합이어야 합니다.';
    } else if (name === 'confirmPassword' && value !== currentPasswordForm.newPassword) {
      error = '비밀번호가 일치하지 않습니다.';
    }
    setPasswordErrors((prev) => ({ ...prev, [name]: error }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

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

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    validateField(name, finalValue);
  };


  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    const nextForm = { ...passwordForm, [name]: value };
    setPasswordForm(nextForm);
    validatePasswordField(name, value, nextForm);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [`${type}Img`]: file,
          [`${type}Preview`]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (type) => {
    setFormData((prev) => ({
      ...prev,
      [`${type}Img`]: null,
      [`${type}Preview`]: null
    }));
  };

  const handleAddressSearch = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert('주소 검색 서비스를 이용할 수 없습니다.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        setFormData((prev) => ({
          ...prev,
          zonecode: data.zonecode,
          address1: data.roadAddress
        }));
      }
    }).open();
  };


  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.nickname || !formData.phone || !formData.email) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }


    if (errors.phone || errors.email) {
      alert('입력 형식이 올바르지 않은 항목이 있습니다.');
      return;
    }

    setIsSubmitting(true);
    try {
      const updateData = {
        nickname: formData.nickname,
        phone: formData.phone,
        email: formData.email,
        zonecode: formData.zonecode,
        address1: formData.address1,
        address2: formData.address2
      };

      const result = await updatePartnerProfileApi(
        updateData,
        formData.exteriorImg,
        formData.interiorImg
      );

      if (result && result.status === 'success') {
        alert('업체 정보가 성공적으로 수정되었습니다.');
        navigate('/partner-info');
      } else if (result && (result.status === 'duplNickname' || result.status === 'duplEmail')) {
        alert(result.message);
      } else {
        alert(result?.message || '알 수 없는 응답이 반환되었습니다.');
      }
    } catch (err) {
      console.error('저장 중 오류 발생:', err);
      alert('저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const handlePasswordSubmit = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('비밀번호 정보를 모두 입력해주세요.');
      return false;
    }


    if (passwordErrors.newPassword || passwordErrors.confirmPassword) {
      alert('비밀번호 형식이 올바르지 않거나 일치하지 않습니다.');
      return false;
    }

    setIsPasswordSubmitting(true);
    try {
      const result = await changePasswordApi({ currentPassword, newPassword });
      if (result && result.status === 'success') {
        alert('비밀번호가 성공적으로 변경되었습니다. 안전한 이용을 위해 다시 로그인해 주세요.');
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordErrors({});


        logout();
        navigate('/login');

        return true;
      } else if (result && (result.status === 'isNotPw' || result.status === 'difPw' || result.status === 'fail')) {
        alert(result.message);
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordErrors({});
        return false;
      }
    } catch (err) {
      console.error('비밀번호 변경 실패:', err);
      alert(err.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  return {
    formData,
    passwordForm,
    errors,
    passwordErrors,
    isLoading,
    isSubmitting,
    isPasswordSubmitting,
    handleChange,
    handlePasswordChange,
    handleFileChange,
    handleRemovePhoto,
    handleAddressSearch,
    handleSubmit,
    handlePasswordSubmit,
    setFormData
  };
};