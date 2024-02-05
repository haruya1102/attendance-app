import React from 'react';
import { signOutUser } from '../../firebase/auth';
import TimeRecords from '../../components/TimeRecord/TimeRecords';

const Dashboard = () => {
  const handleLogout = async () => {
    try {
      await signOutUser();
      console.log('ログアウト成功');
      // ログアウト成功後のリダイレクト処理
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>ログアウト</button>
      <TimeRecords />
    </div>
  );
};

export default Dashboard;
