import AccountManagementPage from '../features/account/AccountManagementPage';
import AccountRegistrationPage from '../features/account/AccountRegistrationPage';
import AccountListPage from '../features/account/AccountListPage';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const accountRoutes = [
{
  path: '/account/management',
  element: _jsxDEV(AccountManagementPage, {}, void 0, false)
},
{
  path: '/account/register',
  element: _jsxDEV(AccountRegistrationPage, {}, void 0, false)
},
{
  path: '/account/list',
  element: _jsxDEV(AccountListPage, {}, void 0, false)
}];


export default accountRoutes;