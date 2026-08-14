import React, { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useNotificationStore from '../store/notificationStore';
import authStore from '../store/authStore';
import { getRecentNotifications } from '../apis/stockApi';
import { toast } from 'react-toastify';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";





const useNotificationSocket = () => {
  const selectedStoreSeq = authStore((state) => state.selectedStoreSeq);
  const { setNotifications, addNotification } = useNotificationStore();

  const stompClient = useRef(null);
  const subscriptionRef = useRef(null);


  useEffect(() => {
    if (!selectedStoreSeq) return;


    const fetchRecentAlarms = async () => {
      try {
        const data = await getRecentNotifications(selectedStoreSeq);
        setNotifications(data || []);
      } catch (err) {
        console.error('최근 알림 로드 실패:', err);
      }
    };
    fetchRecentAlarms();


    if (!stompClient.current) {
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:80';
      const socket = new SockJS(`${baseURL}/ws`, null, {
        transports: ['websocket']
      });
      stompClient.current = new Client({
        webSocketFactory: () => socket,
        debug: (str) => {

        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
      });

      stompClient.current.onConnect = (frame) => {

        subscribeToStoreTopic(selectedStoreSeq);
      };

      stompClient.current.onStompError = (frame) => {
        console.error('STOMP Broker Error: ' + frame.headers['message']);
      };

      stompClient.current.activate();
    } else if (stompClient.current.connected) {

      subscribeToStoreTopic(selectedStoreSeq);
    }

    return () => {

    };
  }, [selectedStoreSeq]);


  const subscribeToStoreTopic = (storeSeq) => {
    if (!stompClient.current || !stompClient.current.connected) return;


    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }


    const topic = `/sub/store/${storeSeq}/notifications`;
    subscriptionRef.current = stompClient.current.subscribe(topic, (message) => {
      try {
        const notification = JSON.parse(message.body);


        addNotification(notification);


        toast.info(
          _jsxDEV("div", { children: [
            _jsxDEV("div", { className: "font-bold text-sm mb-1", children: notification.title }, void 0, false),
            _jsxDEV("div", { className: "text-xs leading-relaxed", children: notification.message }, void 0, false)] }, void 0, true
          ),
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          }
        );
      } catch (e) {
        console.error("알림 메시지 파싱 에러:", e);
      }
    });
  };


  useEffect(() => {
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
        stompClient.current = null;
      }
    };
  }, []);

  return stompClient.current;
};

export default useNotificationSocket;