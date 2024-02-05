import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Registration = () => {
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async () => {
    if (!fullName) {
      alert("氏名を入力してください。");
      return;
    }

    try {
      await addDoc(collection(db, "users"), {
        fullName,
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4">
        <h1 className="text-xl font-semibold mb-4">社員登録</h1>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">氏名</label>
          <input
            id="fullName"
            type="text"
            placeholder="氏名"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleRegistration}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          登録
        </button>
      </div>
    </div>
  );
};

export default Registration;
