import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // 認証状態のロード中に表示するコンテンツ
  }

  if (error) {
    return <div>Error: {error.message}</div>; // エラーがあった場合に表示
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        {/* 以下、必要に応じて他のルートを追加 */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} /> {/* 未定義のパスへのアクセスを処理 */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
