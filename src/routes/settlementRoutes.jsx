import SettlementPage from '../features/payment/SettlementPage';
import TransferManagementPage from '../features/payment/TransferManagementPage';
import ExpenseCategoryPage from '../features/payment/ExpenseCategoryPage';
import CollectionManagementPage from '../features/payment/CollectionManagementPage';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const settlementRoutes = [
{
  path: '/settlement',
  element: _jsxDEV(SettlementPage, {}, void 0, false)
},
{
  path: '/transfer-management',
  element: _jsxDEV(TransferManagementPage, {}, void 0, false)
},
{
  path: '/expense-category',
  element: _jsxDEV(ExpenseCategoryPage, {}, void 0, false)
},
{
  path: '/collection-management',
  element: _jsxDEV(CollectionManagementPage, {}, void 0, false)
}];


export default settlementRoutes;