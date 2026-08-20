import OrderRouteWrapper from '../features/order/OrderRouteWrapper';
import GroupOrderList from '../features/order/GroupOrderList';
import OrderApplyPage from '../features/order/OrderApplyPage';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const orderRoutes = [
{
  path: '/orders',
  element: _jsxDEV(OrderRouteWrapper, {}, void 0, false)
},
{
  path: '/orders/new',
  element: _jsxDEV(OrderApplyPage, {}, void 0, false)
}];








export default orderRoutes;