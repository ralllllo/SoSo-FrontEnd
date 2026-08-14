import React from 'react';
import OrderPage from './OrderPage';
import PartnerOrderPage from './PartnerOrderPage';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

const OrderRouteWrapper = () => {
  const userType = sessionStorage.getItem('user_type');

  if (userType === 'PARTNER' || userType === 'Partner') {
    return _jsxDEV(PartnerOrderPage, {}, void 0, false);
  }

  return _jsxDEV(OrderPage, {}, void 0, false);
};

export default OrderRouteWrapper;