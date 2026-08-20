import { useState, useEffect, useCallback } from 'react';
import authStore from '../../../store/authStore';
import { getNotificationSettingsApi, updateNotificationSettingsApi } from '../../../apis/memberApi';





export const useBusinessSmartNotification = () => {
  const { selectedStoreSeq } = authStore();
  const [settings, setSettings] = useState({
    pushEnabled: true,
    orderAlert: true,
    chatAlert: true,
    stockAlert: true,
    marketingAlert: false,
    nightAlert: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);


  const parseSettings = useCallback((data) => {
    const findSetting = (type) => {
      const s = data.settings?.find((item) => item.notificationType === type && item.channelType === 'WEB');
      return s ? s.isEnabled === 'Y' : true;
    };

    const hasAnyActive = data.alertStockYn === 'Y' || data.alertOrderYn === 'Y';

    return {
      pushEnabled: hasAnyActive,
      orderAlert: data.alertOrderYn === 'Y' && findSetting('ORDER_STATUS'),
      stockAlert: data.alertStockYn === 'Y' && findSetting('STOCK_SHORTAGE'),
      chatAlert: findSetting('CHAT'),
      marketingAlert: findSetting('MARKETING'),
      nightAlert: findSetting('NIGHT_RESTRICTION')
    };
  }, []);


  useEffect(() => {
    if (!selectedStoreSeq) return;

    const loadSettings = async () => {
      try {
        const data = await getNotificationSettingsApi(selectedStoreSeq);
        setSettings(parseSettings(data));
      } catch (err) {
        console.error('알림 설정을 로드하는데 실패했습니다.', err);
      }
    };

    loadSettings();
  }, [selectedStoreSeq, parseSettings]);


  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };


  const handleSave = async () => {
    if (!selectedStoreSeq) {
      alert('선택된 매장이 없습니다.');
      return;
    }

    setIsSubmitting(true);
    try {

      const isPushEnabled = settings.pushEnabled;
      const alertStockYn = isPushEnabled && settings.stockAlert ? 'Y' : 'N';
      const alertExpiryYn = isPushEnabled && settings.stockAlert ? 'Y' : 'N';
      const alertOrderYn = isPushEnabled && settings.orderAlert ? 'Y' : 'N';

      const settingsList = [
      { notificationType: 'STOCK_SHORTAGE', channelType: 'WEB', isEnabled: alertStockYn },
      { notificationType: 'EXPIRY_IMMINENT', channelType: 'WEB', isEnabled: alertExpiryYn },
      { notificationType: 'ORDER_STATUS', channelType: 'WEB', isEnabled: alertOrderYn },
      { notificationType: 'CHAT', channelType: 'WEB', isEnabled: isPushEnabled && settings.chatAlert ? 'Y' : 'N' },
      { notificationType: 'MARKETING', channelType: 'WEB', isEnabled: isPushEnabled && settings.marketingAlert ? 'Y' : 'N' },
      { notificationType: 'NIGHT_RESTRICTION', channelType: 'WEB', isEnabled: isPushEnabled && settings.nightAlert ? 'Y' : 'N' }];


      const requestBody = {
        alertStockYn,
        alertExpiryYn,
        alertOrderYn,
        settings: settingsList
      };

      await updateNotificationSettingsApi(selectedStoreSeq, requestBody);
      alert('스마트 알림 설정이 안전하게 저장되었습니다.');
    } catch (err) {
      console.error('알림 설정 저장 실패:', err);
      alert('설정 저장 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    settings,
    isSubmitting,
    toggleSetting,
    handleSave
  };
};