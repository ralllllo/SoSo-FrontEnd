import { Navigate } from 'react-router-dom';
import LookupLayout from '../components/layout/LookupLayout';
import StockLookupPage from '../features/lookup/StockLookupPage';
import OrderLookupPage from '../features/lookup/OrderLookupPage';
import GroupOrderLookupPage from '../features/lookup/GroupOrderLookupPage';
import BusinessLogPage from '../features/lookup/BusinessLogPage';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const lookupRoutes = [
{
  path: '/lookup',
  element: _jsxDEV(LookupLayout, {}, void 0, false),
  children: [
  {
    index: true,
    element: _jsxDEV(Navigate, { to: "/lookup/stock", replace: true }, void 0, false)
  },
  {
    path: 'stock',
    element: _jsxDEV(StockLookupPage, {}, void 0, false)
  },
  {
    path: 'orders',
    element: _jsxDEV(OrderLookupPage, {}, void 0, false)
  },
  {
    path: 'group-orders',
    element: _jsxDEV(GroupOrderLookupPage, {}, void 0, false)
  },
  {
    path: 'business-logs',
    element: _jsxDEV(BusinessLogPage, {}, void 0, false)
  }]

}];


export default lookupRoutes;