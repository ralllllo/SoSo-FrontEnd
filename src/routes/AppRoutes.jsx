/**
 * @file AppRoutes.jsx
 * @description 애플리케이션의 최상위 라우팅 프로바이더 설정입니다.
 * 도메인별 라우트 파일들을 모아서 하나의 브라우저 라우터 객체로 조립합니다.
 */
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
import lookupRoutes from './lookupRoutes';

/**
 * @file AppRoutes.jsx
 * @description 최상위 라우터 조립소 (아키텍처 규칙 1, 2번 준수)
 */

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      ...mainRoutes,
      ...memberRoutes, // /member, /signup 등의 경로가 루트 하위에 조립됨
      // 도메인별 라우트 장부 조립
      ...mypageRoutes,
      ...stockRoutes,
      ...orderRoutes,
      ...settlementRoutes,
      ...communityRoutes,
      ...accountRoutes,
      ...groupBuyRoutes,
      ...supportRoutes,
      ...lookupRoutes,
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
