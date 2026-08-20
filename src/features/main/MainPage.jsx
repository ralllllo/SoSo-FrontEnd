




import { useState, useEffect } from 'react';
import GuestMain from './GuestMain';
import BusinessMain from './BusinessMain';
import PartnerMain from './PartnerMain';
import authStore from '../../store/authStore';import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

function MainPage() {

  const userTypeFromStore = authStore((state) => state.user_type);


  const [role, setRole] = useState('guest');


  useEffect(() => {
    if (userTypeFromStore) {


      setRole(userTypeFromStore.toLowerCase());
    } else {

      setRole('guest');
    }
  }, [userTypeFromStore]);


  if (role === 'business') {
    return _jsxDEV(BusinessMain, { setRole: setRole }, void 0, false);
  }

  if (role === 'partner') {
    return _jsxDEV(PartnerMain, { setRole: setRole }, void 0, false);
  }


  return _jsxDEV(GuestMain, { setRole: setRole }, void 0, false);
}

export default MainPage;