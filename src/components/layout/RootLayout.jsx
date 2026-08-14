import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






const RootLayout = () => {
  const location = useLocation();


  const getActiveMenu = () => {
    const path = location.pathname;
    if (path.startsWith('/orders') || path.startsWith('/group-orders')) return '발주 관리';
    if (path.startsWith('/account')) return '거래처 관리';
    if (path.startsWith('/community')) return '커뮤니티';
    if (path.startsWith('/lookup')) return '조회/기록';
    if (path.startsWith('/support')) return '고객지원';

    return '홈';
  };


  const hideLayout = ['/login', '/signup'].includes(location.pathname);

  if (hideLayout) {
    return _jsxDEV(Outlet, {}, void 0, false);
  }

  return (
    _jsxDEV("div", { className: "flex flex-col min-h-screen", children: [
      _jsxDEV(MainHeader, { activeMenu: getActiveMenu() }, void 0, false),
      _jsxDEV("main", { className: "flex-1", children:
        _jsxDEV(Outlet, {}, void 0, false) }, void 0, false
      ),
      _jsxDEV(MainFooter, {}, void 0, false)] }, void 0, true
    ));

};

export default RootLayout;