import React from 'react';
import { useNavigate } from 'react-router-dom';
import useNotificationStore from '../../../store/notificationStore';
import authStore from '../../../store/authStore';
import { markNotificationAsRead } from '../../../apis/stockApi';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";






const MainNotificationSession = () => {
  const { notifications, markAsRead } = useNotificationStore();
  const userType = authStore((state) => state.user_type);
  const navigate = useNavigate();


  const handleNotificationClick = async (noti) => {
    try {

      if (noti.isRead === 'N') {
        await markNotificationAsRead(noti.notificationSeq);
        markAsRead(noti.notificationSeq);
      }


      const isPartner = userType === 'PARTNER';

      if (noti.type === 'SAFETY_LACK' || noti.type === 'EXPIRY_IMMINENT') {
        navigate(isPartner ? '/lookup/stock' : '/stock');
      } else if (noti.type === 'NEW_GROUPBUY') {
        navigate('/community');
      } else if (noti.type === 'NEW_ORDER') {
        navigate(isPartner ? '/lookup/orders' : '/orders');
      } else if (noti.type === 'LATE_PAYMENT') {
        navigate(isPartner ? '/lookup/business-logs' : '/business-mypage');
      }
    } catch (err) {
      console.error('알림 읽음 처리 및 이동 중 오류:', err);
    }
  };



  const filteredNotifications = notifications.filter((noti) => {

    if (userType === 'PARTNER') {

      return ['NEW_ORDER', 'SAFETY_LACK', 'LATE_PAYMENT'].includes(noti.type);
    }

    return true;
  });


  const getTypeStyles = (type) => {
    const isPartner = userType === 'PARTNER';

    switch (type) {
      case 'SAFETY_LACK':
        return {
          icon: '⚠️',
          bgClass: 'bg-red-50 hover:bg-red-100 border-red-200',
          textColor: 'text-red-800',
          badgeText: '안전 재고'
        };
      case 'EXPIRY_IMMINENT':
        return {
          icon: '⏰',
          bgClass: 'bg-amber-50 hover:bg-amber-100 border-amber-200',
          textColor: 'text-amber-800',
          badgeText: '임박 재고'
        };
      case 'NEW_GROUPBUY':
        return {
          icon: '📢',
          bgClass: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
          textColor: 'text-blue-800',
          badgeText: '공동 구매'
        };
      case 'NEW_ORDER':
        return {
          icon: '📦',
          bgClass: 'bg-violet-50 hover:bg-violet-100 border-violet-200',
          textColor: 'text-violet-800',
          badgeText: isPartner ? '신규 발주서' : '신규 주문'
        };
      case 'LATE_PAYMENT':
        return {
          icon: '💸',
          bgClass: 'bg-rose-50 hover:bg-rose-100 border-rose-200',
          textColor: 'text-rose-800',
          badgeText: isPartner ? '업장 미수금' : '미수금 연체'
        };
      default:
        return {
          icon: '🔔',
          bgClass: 'bg-gray-50 hover:bg-gray-100 border-gray-200',
          textColor: 'text-gray-800',
          badgeText: '알림'
        };
    }
  };

  return (
    _jsxDEV("div", { className: "bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex flex-col h-full", children: [
      _jsxDEV("div", { className: "flex justify-between items-center mb-4", children: [
        _jsxDEV("h3", { className: "text-lg font-bold text-gray-800 flex items-center gap-2", children: [
          _jsxDEV("span", { children: "🔔" }, void 0, false), " 최근 3일간의 실시간 알림"] }, void 0, true
        ),
        _jsxDEV("span", { className: "text-xs text-gray-500 font-medium", children: "최근 발생 이슈 리스트" }, void 0, false

        )] }, void 0, true
      ),
      filteredNotifications.length === 0 ?
      _jsxDEV("div", { className: "flex flex-col items-center justify-center py-12 text-gray-400 gap-2 flex-grow", children: [
        _jsxDEV("span", { className: "text-3xl", children: "🕊️" }, void 0, false),
        _jsxDEV("p", { className: "text-sm font-medium", children: "최근 3일간 발생한 특이사항이 없습니다." }, void 0, false)] }, void 0, true
      ) :


      _jsxDEV("div", { className: "flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin flex-grow", children:
        filteredNotifications.map((noti) => {
          const styles = getTypeStyles(noti.type);
          const isRead = noti.isRead === 'Y';
          const formattedTime = new Date(noti.createdAt).toLocaleString('ko-KR', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            _jsxDEV("div", {

              onClick: () => handleNotificationClick(noti),
              className: `flex gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
              isRead ? 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-80' : styles.bgClass}`, children: [


              _jsxDEV("div", { className: "text-2xl flex items-center justify-center select-none", children:
                styles.icon }, void 0, false
              ),
              _jsxDEV("div", { className: "flex-1 min-w-0", children: [
                _jsxDEV("div", { className: "flex justify-between items-center mb-1", children: [
                  _jsxDEV("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isRead ? 'bg-gray-200 text-gray-600' : 'bg-white shadow-sm'} ${
                    styles.textColor}`, children:
                    styles.badgeText }, void 0, false
                  ),
                  _jsxDEV("span", { className: "text-[10px] text-gray-400 font-light", children: formattedTime }, void 0, false)] }, void 0, true
                ),
                _jsxDEV("h4", { className: `text-xs font-bold truncate ${isRead ? 'text-gray-600' : 'text-gray-800'}`, children:
                  noti.title }, void 0, false
                ),
                _jsxDEV("p", { className: "text-[11px] text-gray-500 line-clamp-2 mt-0.5 leading-relaxed", children:
                  noti.message }, void 0, false
                )] }, void 0, true
              )] }, noti.notificationSeq, true
            ));

        }) }, void 0, false
      )] }, void 0, true

    ));

};

export default MainNotificationSession;