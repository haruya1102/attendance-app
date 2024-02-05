// Registration.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Registration = () => {
  const [fullName, setFullName] = useState('');
  const [kanaName, setKanaName] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async () => {
    if (!fullName || !kanaName) {
      alert("全てのフィールドを入力してください。");
      return;
    }

    try {
      await addDoc(collection(db, "users"), {
        fullName,
        kanaName,
        timestamps: [],
      });
      alert("社員登録が完了しました。");
      navigate('/');
    } catch (error) {
      alert("登録に失敗しました。");
      console.error("登録エラー: ", error);
    }
  };

  return (
    <div>
      <h1>社員登録</h1>
      <input
        type="text"
        placeholder="氏名"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="text"
        placeholder="ふりがな"
        value={kanaName}
        onChange={(e) => setKanaName(e.target.value)}
      />
      <button onClick={handleRegistration}>登録</button>
    </div>
  );
};

export default Registration;
