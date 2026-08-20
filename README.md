# Soso Frontend

소상공인을 위한 통합 경량화 ERP 솔루션,
Soso(소소) 프로젝트의 프론트엔드 레포지토리입니다.

##  Live Demo

 **[Soso Live Demo](https://emsemsdl.shop/)**

###  테스트 계정

| 권한 구분 | 아이디(ID) | 비밀번호(PW) |
| :--- | :--- | :--- | 
| 👤 사업자(Business) | `kakao123` | `a1234!@#$` |
| 👤 거래처(Partner) | `test111` | `a1234!@#$` |

##  Tech Stack

- **Core**: React 19, Vite
- **Routing**: React Router DOM (v7)
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4
- **Network**: Axios
- **Real-time / WebSocket**: StompJS, SockJS
- **Payments**: Portone Browser SDK
- **Charts**: Chart.js, react-chartjs-2

##  Project Structure

본 프로젝트는 도메인별로 분리하는 모듈화된 아키텍처 입니다.

```
src/
├── apis/        # API 통신 관련 함수 (Axios 인스턴스 등)
├── assets/      # 이미지, 폰트 등 정적 리소스
├── components/  # 재사용 가능한 공통 UI 컴포넌트
├── features/    # 도메인별 주요 페이지 및 컴포넌트 (main, member, mypage 등)
├── hooks/       # Custom React Hooks
├── routes/      # 도메인별 라우트 설정 (AppRoutes.jsx에서 최종 병합)
└── store/       # Zustand 전역 상태 관리
```

##  Architecture & Rules

### 1. 라우팅 (Routing)
* **모듈화**: 각 도메인의 라우트(예: `memberRoutes.jsx`, `mypageRoutes.jsx`)는 별도로 관리합니다.
* **조립 (Assembly)**: 모든 도메인별 라우트는 오직 `src/routes/AppRoutes.jsx` 한 곳에서만 불러와 조립(`...mainRoutes`)합니다. 이를 통해 라우팅 구조를 파악하기 쉽게 만들고 병합 충돌을 방지합니다.

### 2. 컴포넌트 (Components vs Features)
* **`components/`**: 여러 도메인에서 공통적으로 쓰이는 범용 UI 컴포넌트(버튼, 모달, 레이아웃 등)를 위치시킵니다.
* **`features/`**: 특정 도메인(예: 회원가입, 재고관리 등)에 종속된 비즈니스 로직과 페이지 컴포넌트들을 위치시킵니다.


##  Getting Started

### Prerequisites
- Node.js (v18 이상 권장)

### Clone the repository and move to the directory
```bash
   git clone <repository-url>
   cd soso
```

###  Environment Variables (.env)

프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 아래 환경변수를 설정해 주세요.

```bash
cp .env.example .env
```

### Installation

```bash
# 1. 패키지 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev
```

### Build

```bash
# 프로덕션 빌드 생성
npm run build
```
