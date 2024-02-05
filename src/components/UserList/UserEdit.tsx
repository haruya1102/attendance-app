import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const UserEdit: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // パラメーターの型を具体化
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (userId) { // userIdがundefinedでないことを確認
      const fetchUser = async () => {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setFullName(userDoc.data().fullName);
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) { // ここでもuserIdがundefinedでないことを確認
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { fullName });
      navigate('/users'); // ユーザー一覧に戻る
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        フルネーム:
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </label>
      <button type="submit">更新</button>
    </form>
  );
};

export default UserEdit;
