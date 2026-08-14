import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';





const useAuthStore = create(
  persist(
    (set, get) => ({

      token: null,
      isAuthLoaded: false,


      user_seq: null,
      user_type: null,
      user_nickname: null,
      bizname: null,
      selectedStoreSeq: null,


      setToken: (newToken) => {
        set({ token: newToken });
      },

      login: (result) => {
        set({
          token: result.token,
          user_seq: result.user_seq,
          user_type: result.user_type,
          user_nickname: result.user_nickname,
          bizname: result.bizname,
          selectedStoreSeq: result.selectedStoreSeq
        });
      },




      setSelectedStore: (storeSeq, companyName) => {
        set({
          selectedStoreSeq: storeSeq,
          bizname: companyName
        });
      },

      logout: async () => {



        localStorage.removeItem("storeSeq");
        localStorage.removeItem("storeName");


        localStorage.removeItem("soso-auth-storage");

        set({
          token: null,
          user_seq: null,
          user_type: null,
          user_nickname: null,
          bizname: null,
          selectedStoreSeq: null
        });


        try {
          const { logoutApi } = await import('../apis/loginApi');
          await logoutApi();
        } catch (error) {
          console.error("서버 로그아웃 처리 중 에러 (무시가능):", error);
        }
      },





      silentRefresh: async () => {
        try {
          const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:80';
          const response = await axios.post(
            `${baseURL}/auth/reissue`,
            {},
            { withCredentials: true }
          );
          const result = response.data;



          set({
            token: result.token,
            user_seq: result.user_seq || get().user_seq,
            user_type: result.user_type || get().user_type,
            user_nickname: result.user_nickname || get().user_nickname,
            isAuthLoaded: true
          });

          return true;
        } catch (error) {

          set({ isAuthLoaded: true, token: null });
          return false;
        }
      }
    }),
    {
      name: 'soso-auth-storage',

      partialize: (state) => ({
        user_seq: state.user_seq,
        user_type: state.user_type,
        user_nickname: state.user_nickname,
        selectedStoreSeq: state.selectedStoreSeq,
        bizname: state.bizname
      })
    }
  )
);

export default useAuthStore;