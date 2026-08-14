import { useState } from 'react';





export const usePartnerSmartNotification = () => {
  const [settings, setSettings] = useState({
    pushEnabled: true,
    orderAlert: true,
    chatAlert: true,
    stockAlert: false,
    marketingAlert: false,
    nightAlert: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {

      await new Promise((resolve) => setTimeout(resolve, 800));
      alert('알림 설정이 저장되었습니다.');
    } catch (err) {
      alert('저장 중 오류가 발생했습니다.');
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