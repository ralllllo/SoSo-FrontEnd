import { create } from 'zustand';





const useNotificationStore = create((set) => ({
  notifications: [],


  setNotifications: (list) => set({ notifications: list || [] }),


  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications]
  })),


  markAsRead: (notificationSeq) => set((state) => ({
    notifications: state.notifications.map((n) =>
    n.notificationSeq === notificationSeq ? { ...n, isRead: 'Y' } : n
    )
  }))
}));

export default useNotificationStore;