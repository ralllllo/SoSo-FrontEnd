




import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useNotificationSocket from './hooks/useNotificationSocket';
import useAuthStore from './store/authStore';import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";

function App() {

  useNotificationSocket();

  const silentRefresh = useAuthStore((state) => state.silentRefresh);
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);

  useEffect(() => {

    silentRefresh();
  }, [silentRefresh]);



  if (!isAuthLoaded) {
    return null;
  }


  return (
    _jsxDEV(_Fragment, { children: [
      _jsxDEV(AppRoutes, {}, void 0, false),
      _jsxDEV(ToastContainer, {}, void 0, false)] }, void 0, true
    ));

}

export default App;