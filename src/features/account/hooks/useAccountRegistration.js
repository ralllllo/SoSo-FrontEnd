import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPartners, registerPartnerAccount } from '../../../apis/accountApi';
import authStore from '../../../store/authStore';





export const useAccountRegistration = () => {
  const navigate = useNavigate();
  const { user_seq, selectedStoreSeq } = authStore();


  const [searchTerm, setSearchTerm] = useState('');
  const [allPartners, setAllPartners] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [memo, setMemo] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);


  useEffect(() => {
    const fetchAllPartners = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPartners();
        const formattedResults = data.results.map((item) => ({
          seq: item.storeSeq,
          name: item.companyName,
          bizNum: item.bizNumber ? item.bizNumber.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3') : '',
          ceo: item.ceoName,
          address: `${item.address1} ${item.address2 || ''}`.trim()
        }));
        setAllPartners(formattedResults);
        setSearchResults(formattedResults);
      } catch (error) {
        console.error('전체 거래처 목록 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPartners();
  }, []);


  const handleSearch = () => {
    if (searchTerm.trim().length === 0) {
      setSearchResults(allPartners);
      return;
    }

    const filtered = allPartners.filter((partner) =>
    partner.name && partner.name.includes(searchTerm) ||
    partner.bizNum && partner.bizNum.replace(/-/g, '').includes(searchTerm.replace(/-/g, ''))
    );
    setSearchResults(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleOpenModal = (partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPartner(null);
    setMemo('');
  };

  const handleConfirmRegistration = async () => {
    if (!selectedPartner) return;

    const businessSeq = selectedStoreSeq || user_seq;

    if (!businessSeq) {
      alert('로그인 정보가 유효하지 않습니다.');
      return;
    }

    setIsRegistering(true);
    try {
      const result = await registerPartnerAccount({
        businessSeq: parseInt(businessSeq),
        partnerSeq: selectedPartner.seq,
        memo: memo
      });

      if (result.status === 'success') {
        alert(result.message);
        navigate('/account/list');
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('등록 중 오류가 발생했습니다.');
    } finally {
      setIsRegistering(false);
      handleCloseModal();
    }
  };

  const resetSearch = () => {
    setSearchTerm('');
    setSearchResults(allPartners);
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    isModalOpen,
    memo,
    setMemo,
    selectedPartner,
    isRegistering,
    handleSearch,
    handleKeyDown,
    handleOpenModal,
    handleCloseModal,
    handleConfirmRegistration,
    resetSearch
  };
};