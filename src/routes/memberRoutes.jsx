import LoginPage from '../features/member/LoginPage';
import FindIdPage from '../features/member/FindIdPage';
import FindPasswordPage from '../features/member/FindPasswordPage';
import SignUpPage from '../features/member/SignUpPage';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const memberRoutes = [
{
  path: '/login',
  element:
  _jsxDEV("publicRoute", { children:
    _jsxDEV(LoginPage, {}, void 0, false) }, void 0, false
  )
},
{
  path: '/find-id',
  element:
  _jsxDEV("publicRoute", { children:
    _jsxDEV(FindIdPage, {}, void 0, false) }, void 0, false
  )
},
{
  path: '/find-password',
  element:
  _jsxDEV("publicRoute", { children:
    _jsxDEV(FindPasswordPage, {}, void 0, false) }, void 0, false
  )
},
{
  path: 'signup',
  element: _jsxDEV(SignUpPage, {}, void 0, false)
}];


export default memberRoutes;