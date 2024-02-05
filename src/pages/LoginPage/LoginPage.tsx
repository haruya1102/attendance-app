// LoginPage.tsx
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Linkコンポーネントをインポート
import { signIn } from '../../firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignInCompleted, setIsSignInCompleted] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      console.log('サインイン成功');
      setIsSignInCompleted(true); // サインインが完了したらフラグをセット
    } catch (error) {
      console.error(error);
    }
  };

  // サインインが完了したらリダイレクト
  if (isSignInCompleted) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">サインイン</button>
      </form>
      {/* サインインページへのリンク */}
      <p>アカウントをお持ちでない場合は<Link to="/sign-up">こちら</Link>から新規アカウントを作成できます。</p>
    </div>
  );
};

export default LoginPage;
