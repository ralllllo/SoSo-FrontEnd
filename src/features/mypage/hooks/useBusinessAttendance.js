import { useState, useEffect, useCallback } from 'react';
import authStore from '../../../store/authStore';
import {
  getEmployeeList,
  registerEmployee,
  checkInEmployee,
  checkOutEmployee } from
'../../../apis/employeeApi';





export const useBusinessAttendance = () => {
  const selectedStoreSeq = authStore((state) => state.selectedStoreSeq);
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchStaffList = useCallback(async () => {
    if (!selectedStoreSeq) return;
    setIsLoading(true);
    try {
      const data = await getEmployeeList(selectedStoreSeq);
      setStaffList(data || []);
    } catch (err) {
      console.error('직원 목록 로드 실패:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedStoreSeq]);


  useEffect(() => {
    fetchStaffList();
  }, [fetchStaffList]);


  const handleRegisterStaff = async (formData) => {
    if (!selectedStoreSeq) return;
    try {
      const payload = {
        businessSeq: selectedStoreSeq,
        empName: formData.empName,
        phone: formData.phone,
        workStartTime: formData.workStartTime,
        workEndTime: formData.workEndTime
      };
      await registerEmployee(payload);
      alert('직원이 등록되었습니다.');
      await fetchStaffList();
      return true;
    } catch (err) {
      alert(err.response?.data || '직원 등록 중 오류가 발생했습니다.');
      return false;
    }
  };


  const handleCheckIn = async (employeeSeq) => {
    try {
      await checkInEmployee(employeeSeq);
      alert('출근 처리가 완료되었습니다.');
      await fetchStaffList();
    } catch (err) {
      alert(err.response?.data || '출근 처리 중 오류가 발생했습니다.');
    }
  };


  const handleCheckOut = async (employeeSeq) => {
    try {
      await checkOutEmployee(employeeSeq);
      alert('퇴근 처리가 완료되었습니다.');
      await fetchStaffList();
    } catch (err) {
      alert(err.response?.data || '퇴근 처리 중 오류가 발생했습니다.');
    }
  };

  return {
    staffList,
    isLoading,
    fetchStaffList,
    handleRegisterStaff,
    handleCheckIn,
    handleCheckOut
  };
};