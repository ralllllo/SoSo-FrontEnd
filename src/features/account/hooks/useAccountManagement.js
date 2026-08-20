import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPartnerItems, getPartnerDetail } from '../../../apis/accountApi';





export const useAccountManagement = () => {
  const [searchParams] = useSearchParams();
  const partnerSeq = searchParams.get('partnerSeq');

  const [items, setItems] = useState([]);
  const [partnerDetail, setPartnerDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const parsedSeq = parseInt(partnerSeq);


      if (!partnerSeq || isNaN(parsedSeq)) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {

        const [itemsData, detailData] = await Promise.all([
        getPartnerItems(parsedSeq),
        getPartnerDetail(parsedSeq)]
        );


        if (detailData) {
          setPartnerDetail({
            name: detailData.companyName,
            ceo: detailData.ceoName,
            bizNum: detailData.bizNumber ? detailData.bizNumber.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3') : '',
            address: `${detailData.address1} ${detailData.address2 || ''}`.trim(),
            phone: detailData.phone || '등록된 번호 없음',
            email: detailData.email || '등록된 이메일 없음'
          });
        }


        const formattedItems = itemsData.results.map((item) => ({
          id: item.itemSeq,
          name: item.itemName,
          unit: item.spec,
          price: `${item.unitPrice.toLocaleString()}원`,
          category: item.categoryName,
          status: '판매중',
          image: item.itemImage
        }));
        setItems(formattedItems);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [partnerSeq]);

  return { items, partnerDetail, isLoading };
};