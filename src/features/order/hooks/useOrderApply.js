import { useState, useEffect } from 'react';
import { items as getSupplierItems, identityCheck, orderForm, suppliers as getSupplierList } from '../../../apis/orderApi';
import { useNavigate } from 'react-router-dom';





export const useOrderApply = () => {

  const [orderInfo, setOrderInfo] = useState({
    orderDate: new Date().toISOString().split('T')[0],
    supplier: '',
    manager: '',
    companyName: '',
    deliveryDate: '',
    paymentMethod: '',
    zonecode: '',
    address1: '',
    address2: '',
    totalAmount: '',
    orderMemo: '',
    deliveryAddress: '',
    deliveryNotes: ''
  });

  const navi = useNavigate();


  const identityInfoCheck = async () => {
    try {
      const storeSeq = Number(JSON.parse(localStorage.getItem('soso-auth-storage'))?.state?.selectedStoreSeq);

      if (!storeSeq) {
        return;
      }

      const data = await identityCheck(storeSeq);

      const companyName =
      data.companyName ||
      data.company_name ||
      data.storeName ||
      data.store_name ||
      '';

      const zoneCode =
      data.zoneCode ||
      data.zonecode ||
      data.zone_code ||
      '';

      const address1 = data.address1 || '';
      const address2 = data.address2 || '';

      const fullAddress =
      zoneCode || address1 ?
      `(${zoneCode}) ${address1} ${address2}` :
      '';

      setOrderInfo((prev) => ({
        ...prev,
        companyName,
        manager: companyName,
        zonecode: zoneCode,
        address1,
        address2,
        deliveryAddress: fullAddress
      }));
    } catch (error) {
      console.error('사업자명/주소 조회 실패:', error);
    }
  };




  const [items, setItems] = useState([
  {
    id: 1,
    itemSeq: '',
    itemName: '',
    categorySeq: '',
    categoryName: '',
    unitPrice: 0,
    quantity: 0,
    totalPrice: 0,
    supplyValue: 0,
    tax: 0,
    total: 0,
    spec: ''
  }]
  );


  const [supplierItems, setSupplierItems] = useState([]);

  const supplierItemsCheck = async () => {
    try {
      const data = await getSupplierItems('');

      const list = Array.isArray(data) ?
      data :
      data.results || data.list || data.data || [];

      setSupplierItems(list);
    } catch (error) {
      console.error('거래처 품목 목록 조회 실패:', error);
      alert('거래처 품목 목록 조회에 실패했습니다.');
      setSupplierItems([]);
    }
  };

  const [supplierList, setSupplierList] = useState([]);

  const supplierListCheck = async () => {
    try {
      const storeSeq = Number(JSON.parse(localStorage.getItem('soso-auth-storage'))?.state?.selectedStoreSeq);

      if (!storeSeq) {
        return;
      }

      const data = await getSupplierList(storeSeq);

      const rawList = Array.isArray(data) ?
      data :
      data.results || data.list || data.data || [];

      const list = rawList.map((supplier) => ({
        relationSeq: supplier.relationSeq ?? supplier.relation_seq,
        storeSeq:
        supplier.partnerSeq ??
        supplier.partner_seq ??
        supplier.storeSeq ??
        supplier.store_seq,
        userSeq: supplier.userSeq ?? supplier.user_seq,
        companyName:
        supplier.companyName ??
        supplier.company_name ??
        supplier.partnerName ??
        supplier.partner_name ??
        supplier.partnerCompanyName ??
        supplier.partner_company_name,
        ceoName: supplier.ceoName ?? supplier.ceo_name,
        bizNumber: supplier.bizNumber ?? supplier.biz_number,
        memo: supplier.memo ?? '',
        address1: supplier.address1 ?? '',
        address2: supplier.address2 ?? '',
        zonecode: supplier.zonecode ?? supplier.zoneCode ?? ''
      }));

      setSupplierList(list);
    } catch (error) {
      console.error('공급업체 목록 조회 실패:', error);
      setSupplierList([]);
    }
  };

  useEffect(() => {
    identityInfoCheck();
    supplierItemsCheck();
    supplierListCheck();
  }, []);




  const selectedSupplier = supplierList.find((supplier) =>
  String(supplier.storeSeq) === String(orderInfo.supplier)
  );

  const filteredSupplierItems = orderInfo.supplier ?
  supplierItems.filter((item) =>
  String(
    item.storeSeq ??
    item.store_seq ??
    item.partnerSeq ??
    item.partner_seq
  ) === String(orderInfo.supplier)
  ) :
  [];


  const addSelectedItem = (selectedItem) => {

    const exists = items.find((item) => item.itemSeq === selectedItem.itemSeq);
    if (exists) {
      handleItemChange(exists.id, 'quantity', exists.quantity + 1);
      return;
    }

    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newItem = {
      id: newId,
      itemSeq: selectedItem.itemSeq,
      itemName: selectedItem.itemName,
      categorySeq: selectedItem.categorySeq,
      categoryName: selectedItem.categoryName,
      spec: selectedItem.spec,
      quantity: 1,
      unitPrice: selectedItem.unitPrice,
      supplyValue: selectedItem.unitPrice,
      tax: Math.floor(selectedItem.unitPrice * 0.1),
      total: Math.floor(selectedItem.unitPrice * 1.1),
      linkedStockSeq: selectedItem.linkedStockSeq || null,
      linkedStockName: selectedItem.linkedStockName || null
    };


    if (items.length === 1 && !items[0].itemName) {
      setItems([newItem]);
    } else {
      setItems([...items, newItem]);
    }
  };


  const handleItemChange = (id, field, value) => {
    setItems((prevItems) => prevItems.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };


        if (field === 'quantity' || field === 'unitPrice') {
          const rawValue = Number(value);
          const validatedValue = Math.max(0, rawValue);
          updatedItem[field] = validatedValue;

          const qty = field === 'quantity' ? validatedValue : Number(item.quantity || 0);
          const prc = field === 'unitPrice' ? validatedValue : Number(item.unitPrice || 0);

          updatedItem.supplyValue = qty * prc;
          updatedItem.tax = Math.floor(updatedItem.supplyValue * 0.1);
          updatedItem.total = updatedItem.supplyValue + updatedItem.tax;
        }
        return updatedItem;
      }
      return item;
    }));
  };


  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;

    setItems([
    ...items,
    {
      id: newId,
      itemSeq: '',
      itemName: '',
      categorySeq: '',
      categoryName: '',
      spec: '',
      quantity: 0,
      unitPrice: 0,
      supplyValue: 0,
      tax: 0,
      total: 0
    }]
    );
  };


  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };


  const handleInfoChange = (field, value) => {
    setOrderInfo((prev) => ({ ...prev, [field]: value }));
  };


  const totalSummary = items.reduce((acc, item) => ({
    supplyValue: acc.supplyValue + Number(item.supplyValue || 0),
    tax: acc.tax + Number(item.tax || 0),
    total: acc.total + Number(item.total || 0)
  }), { supplyValue: 0, tax: 0, total: 0 });



  const handleSubmit = async () => {

    try {
      if (!orderInfo.supplier) {
        alert('공급업체를 선택해주세요.');
        return;
      }
      if (items.length === 0 || items.some((item) => !item.itemName || item.quantity <= 0)) {
        alert('발주할 품목을 선택하고 수량을 정확히 입력해주세요.');
        return;
      }

      if (orderInfo.paymentMethod !== '카드결제') {
        alert('결제 방식을 선택해주세요.');
        return;
      }

      const orderData = {
        buyerSeq: Number(JSON.parse(localStorage.getItem('soso-auth-storage'))?.state?.selectedStoreSeq),
        sellerSeq: Number(orderInfo.supplier),
        totalAmount: totalSummary.total,
        orderMemo: orderInfo.deliveryNotes,
        zonecode: orderInfo.zonecode,
        address1: orderInfo.address1,
        address2: orderInfo.address2,

        items: items.map((item) => ({
          itemSeq: item.itemSeq,
          itemName: item.itemName,
          categoryName: item.categoryName,
          quantity: item.quantity,
          spec: item.spec,
          unitPrice: item.unitPrice,
          totalPrice: Number(item.unitPrice || 0) * Number(item.quantity || 0)
        }))
      };


      const result = await orderForm(orderData);


      alert('발주 신청이 완료되었습니다.');

      return true;
    } catch (error) {
      console.error('발주 신청 실패:', error);
      alert('발주 신청 중 오류가 발생했습니다.');
      return false;
    }
  };


  return {
    orderInfo,
    items,
    totalSummary,
    supplierItems,
    suppliers: supplierList,
    filteredSupplierItems,
    handleInfoChange,
    handleItemChange,
    addItem,
    addSelectedItem,
    removeItem,
    handleSubmit
  };
};