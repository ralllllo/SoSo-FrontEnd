import { useState, useEffect } from 'react';





export const useTransfer = () => {

  const [isLoading, setIsLoading] = useState(false);






  const formatCurrency = (value) => {

    return `${Number(value || 0).toLocaleString()}원`;
  };


  useEffect(() => {

    setIsLoading(true);


    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);


    return () => clearTimeout(timer);
  }, []);

  return {

    isLoading,


    formatCurrency
  };
};