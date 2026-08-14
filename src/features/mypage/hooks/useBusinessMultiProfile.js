import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerMultiProfileApi, checkBusinessApi } from '../../../apis/memberApi';






export const useBusinessMultiProfile = () => {
  const navigate = useNavigate();



  const [formData, setFormData] = useState({
    b_nm: '',
    b_no: '',
    p_nm: '',
    start_dt: '',
    zipcode: '',
    address1: '',
    address2: '',
    exteriorImg: null,
    interiorImg: null,
    exteriorPreview: null,
    interiorPreview: null
  });


  const [isBizVerified, setIsBizVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));


    if (name === 'b_no' || name === 'p_nm' || name === 'start_dt' || name === 'b_nm') {
      setIsBizVerified(false);
    }
  };





  const handleVerifyBusiness = async () => {
    const { b_no, start_dt, b_nm, p_nm } = formData;

    if (!b_no || !start_dt || !b_nm || !p_nm) {
      alert('상호명, 사업자 번호, 대표자명, 오픈일자를 모두 입력한 후 인증해 주세요.');
      return;
    }

    try {

      const formattedDate = start_dt.replace(/-/g, '');



      const response = await checkBusinessApi(b_no, formattedDate, p_nm, b_nm, true);

      if (response) {
        setIsBizVerified(true);
        alert('사업자 인증이 완료되었습니다.');
      } else {
        alert('사업자 정보가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('인증 오류:', error);
      const errorStr = error.response?.data;
      if (errorStr === "DUPLICATED_BIZ_NO") {
        alert("이미 등록된 사업자 번호입니다.");
      } else {
        alert(errorStr || "인증 중 오류가 발생했습니다.");
      }
    }
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

        let fullAddress = data.roadAddress || data.jibunAddress;

        setFormData((prev) => ({
          ...prev,
          zipcode: data.zonecode,
          address1: fullAddress
        }));
      }
    }).open();
  };




  const handleSubmit = async (e) => {
    if (e) e.preventDefault();


    if (!formData.b_nm || !formData.b_no || !formData.address1 || !formData.start_dt) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }


    if (!isBizVerified) {
      alert('사업자 번호 인증이 필요합니다.');
      return;
    }

    setIsSubmitting(true);
    try {
      const registerData = {
        b_nm: formData.b_nm,
        b_no: formData.b_no,
        p_nm: formData.p_nm,
        zipcode: formData.zipcode,
        address1: formData.address1,
        address2: formData.address2,

        start_dt: formData.start_dt.replace(/-/g, '')
      };


      const result = await registerMultiProfileApi(
        registerData,
        formData.exteriorImg,
        formData.interiorImg
      );

      if (result && result.status === 'success') {
        alert('새로운 매장이 성공적으로 등록되었습니다.');
        navigate('/business-mypage');
      } else {
        alert(result?.message || '매장 등록 중 오류가 발생했습니다.');
      }
    } catch (err) {
      console.error('등록 중 오류 발생:', err);
      alert('등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isBizVerified,
    isSubmitting,
    handleChange,
    handleFileChange,
    handleRemovePhoto,
    handleAddressSearch,
    handleVerifyBusiness,
    handleSubmit
  };
};