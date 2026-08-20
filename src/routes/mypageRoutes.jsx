import BusinessMyPage from '../features/mypage/BusinessMyPage';
import BusinessWithdrawalPage from '../features/mypage/BusinessWithdrawalPage';
import BusinessAttendancePage from '../features/mypage/BusinessAttendancePage';
import PartnerInfoPage from '../features/mypage/PartnerInfoPage';
import PartnerEditProfilePage from '../features/mypage/PartnerEditProfilePage';
import PartnerWithdrawalPage from '../features/mypage/PartnerWithdrawalPage';
import PartnerSmartNotificationPage from '../features/mypage/PartnerSmartNotificationPage';
import BusinessSmartNotificationPage from '../features/mypage/BusinessSmartNotificationPage';

import BusinessUpdateMyPage from '../features/mypage/BusinessUpdateMyPage';
import BusinessMultiProfile from '../features/mypage/BusinessMultiProfile';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const mypageRoutes = [
{
  path: 'business-update-mypage',
  element: _jsxDEV(BusinessUpdateMyPage, {}, void 0, false)
},
{
  path: 'business-multiprofile',
  element: _jsxDEV(BusinessMultiProfile, {}, void 0, false)
},
{
  path: 'business-mypage',
  element: _jsxDEV(BusinessMyPage, {}, void 0, false)
},
{
  path: 'business-notification',
  element: _jsxDEV(BusinessSmartNotificationPage, {}, void 0, false)
},
{
  path: 'business-withdrawal',
  element: _jsxDEV(BusinessWithdrawalPage, {}, void 0, false)
},
{
  path: 'business-attendance',
  element: _jsxDEV(BusinessAttendancePage, {}, void 0, false)
},
{
  path: 'partner-info',
  element: _jsxDEV(PartnerInfoPage, {}, void 0, false)
},
{
  path: 'partner-edit',
  element: _jsxDEV(PartnerEditProfilePage, {}, void 0, false)
},
{
  path: 'partner-withdrawal',
  element: _jsxDEV(PartnerWithdrawalPage, {}, void 0, false)
},
{
  path: 'partner-notification',
  element: _jsxDEV(PartnerSmartNotificationPage, {}, void 0, false)
}];


export default mypageRoutes;