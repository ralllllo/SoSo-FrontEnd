




import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import mainRoutes from './mainRoutes';
import RootLayout from '../components/layout/RootLayout';
import memberRoutes from './memberRoutes';
import mypageRoutes from './mypageRoutes';
import stockRoutes from './stockRoutes';
import orderRoutes from './orders';
import settlementRoutes from './settlementRoutes';
import communityRoutes from './communityRoutes';
import accountRoutes from './accountRoutes';
import groupBuyRoutes from './groupBuyRoutes';
import supportRoutes from './supportRoutes';
import lookupRoutes from './lookupRoutes';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






const router = createBrowserRouter([
{
  path: '/',
  element: _jsxDEV(RootLayout, {}, void 0, false),
  children: [
  ...mainRoutes,
  ...memberRoutes,

  ...mypageRoutes,
  ...stockRoutes,
  ...orderRoutes,
  ...settlementRoutes,
  ...communityRoutes,
  ...accountRoutes,
  ...groupBuyRoutes,
  ...supportRoutes,
  ...lookupRoutes]

}]
);

function AppRoutes() {
  return _jsxDEV(RouterProvider, { router: router }, void 0, false);
}

export default AppRoutes;