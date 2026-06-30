import { create } from 'zustand';

// 1. return 값이 jsx인 함수는 use를 붙이지 않는다.
// 2. jsx를 return 하지 않으면서 내부적으로 useState, useEffect 같은 (내장 hook함수-use가 붙어있는 기능들)
// 코드를 사용한다면 마찬가지로 use를 붙여준다.

// 로그인, 로그아웃 및 매장 전환 기능 관리
const authStore = create(set => ({
    token: null, // XSS 방어를 위해 localStorage나 sessionStorage에 저장하지 않고 클로저(메모리)에만 보관
    user_seq: sessionStorage.getItem("user_seq") || null,
    user_type: sessionStorage.getItem("user_type") || null,
    user_nickname: sessionStorage.getItem("user_nickname") || null,
    bizname: sessionStorage.getItem("bizname") || null,
    
    // 🏪 [멀티 프로필] 현재 선택된 매장 번호 (기본값 null이면 백엔드에서 첫 번째 매장을 반환함)
    selectedStoreSeq: sessionStorage.getItem("selectedStoreSeq") || null,

    // 새 AccessToken만 갱신하기 위한 함수 (Silent Refresh용)
    setToken: (newToken) => {
        set({ token: newToken });
    },

    login: (result) => {
        // token은 브라우저 스토리지에 저장하지 않습니다.
        sessionStorage.setItem("user_seq", result.user_seq);
        sessionStorage.setItem("user_type", result.user_type);
        sessionStorage.setItem("user_nickname", result.user_nickname);
        // useLogin.js에서 bizname으로 넘겨주므로 result.bizname을 사용합니다.
        sessionStorage.setItem("bizname", result.bizname);
        sessionStorage.setItem("selectedStoreSeq", result.selectedStoreSeq);
        
        set({
            token: result.token,
            user_seq: result.user_seq,
            user_type: result.user_type,
            user_nickname: result.user_nickname,
            bizname: result.bizname,
            selectedStoreSeq: result.selectedStoreSeq
        });
    },

    /**
     * 🔄 매장 전환 함수
     * 프로필 스위처에서 매장을 클릭하면 이 함수를 호출하여 전역 상태를 업데이트합니다.
     */
    setSelectedStore: (storeSeq, companyName) => {
        if (storeSeq) {
            sessionStorage.setItem("selectedStoreSeq", storeSeq);
            sessionStorage.setItem("bizname", companyName); // 선택된 매장명으로 헤더 표시 변경
        } else {
            sessionStorage.removeItem("selectedStoreSeq");
        }
        
        set({ 
            selectedStoreSeq: storeSeq,
            bizname: companyName
        });
    },

    logout: async () => {
        try {
            // 순환 참조(Circular Dependency) 방지를 위해 동적으로 임포트
            const { logoutApi } = await import('../apis/loginApi');
            await logoutApi(); // 1. 백엔드 세션(Redis) 및 Refresh Token 쿠키 삭제 요청
        } catch (error) {
            console.error("서버 로그아웃 처리 중 에러 (무시가능):", error);
        } finally {
            // 2. 프론트엔드 토큰 및 사용자 정보 초기화
            sessionStorage.removeItem("user_seq");
            sessionStorage.removeItem("user_type");
            sessionStorage.removeItem("user_nickname");
            sessionStorage.removeItem("bizname");
            sessionStorage.removeItem("selectedStoreSeq");

            set({
                token: null,
                user_seq: null,
                user_type: null,
                user_nickname: null,
                bizname: null,
                selectedStoreSeq: null,
            });
        }
    }
}));

export default authStore;