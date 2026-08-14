import React from 'react';
import GroupBuyPage from '../features/groupbuy/GroupBuyPage';
import GroupBuyDeliveryPage from '../features/groupbuy/GroupBuyDeliveryPage';
import GroupBuyDetailPage from '../features/groupbuy/GroupBuyDetailPage';
import GroupBuyInfoPage from '../features/groupbuy/GroupBuyInfoPage';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const groupBuyRoutes = [
{
  path: '/group-buy',
  element: _jsxDEV(GroupBuyPage, {}, void 0, false)
},
{
  path: '/group-buy/:seq',
  element: _jsxDEV(GroupBuyDetailPage, {}, void 0, false)
},
{
  path: '/group-buy/:seq/info',
  element: _jsxDEV(GroupBuyInfoPage, {}, void 0, false)
},
{
  path: '/group-buy/:seq/delivery',
  element: _jsxDEV(GroupBuyDeliveryPage, {}, void 0, false)
}];


export default groupBuyRoutes;