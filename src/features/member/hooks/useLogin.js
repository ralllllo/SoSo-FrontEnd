import { useState } from 'react';
import { loginApi } from '../../../apis/loginApi';
import { useNavigate } from 'react-router-dom';
import authStore from "../../../store/authStore";






export const useLogin = () => {

  const navigate = useNavigate();


  const [loginType, setLoginType] = useState('business');


  const login = authStore((state) => state.login);


  const [formData, setFormData] = useState({
    user_id: '',
    password: ''
  });


  const [errors, setErrors] = useState({
    id: '',
    password: ''
  });


  const [options, setOptions] = useState({
    rememberMe: false
  });





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





  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    setOptions((prev) => ({
      ...prev,
      [name]: checked
    }));
  };





  const handleLoginSubmit = (e) => {
    e?.preventDefault();

    let newErrors = { id: '', password: '' };
    let hasError = false;


    if (!formData.user_id.trim()) {
      newErrors.user_id = '아이디를 입력해주세요.';
      hasError = true;
    }


    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }


    const requestUserType = loginType === 'business' ? 'BUSINESS' : 'PARTNER';

    loginApi({
      id: formData.user_id,
      pw: formData.password,
      user_type: requestUserType
    }).
    then((resp) => {


      if (resp.data.status === 'isWithDraw') {
        alert("탈퇴한 회원입니다. 고객센터에 문의해주세요.");
        setFormData({
          user_id: '',
          password: ''
        });
        return;
      }

      const token = resp.data.token;
      const user_type = resp.data.user_type;
      const user_seq = resp.data.user_seq;
      const user_nickname = resp.data.user_nickname;
      const bizname = resp.data.company_name;
      const selectedStoreSeq = resp.data.selectedStoreSeq;

      if (!token) {
        alert("로그인 정보가 올바르지 않거나 권한이 없습니다.");
        return;
      }


      login({
        token: token,
        user_seq: user_seq,
        user_type: user_type,
        user_nickname: user_nickname,
        bizname: bizname,
        selectedStoreSeq: selectedStoreSeq
      });


      alert("로그인에 성공했습니다!");
      navigate("/");
    }).
    catch((error) => {
      console.error("로그인 실패:", error);

      if (error.response && error.response.status === 401) {
        alert("회원 유형과 계정 정보가 일치하지 않습니다.");
      } else {
        alert("로그인 중 오류가 발생했습니다.");
      }
    });
  };

  return {
    loginType,
    setLoginType,
    formData,
    errors,
    options,
    handleInputChange,
    handleOptionChange,
    handleLoginSubmit
  };
};