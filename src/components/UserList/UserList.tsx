import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

interface User {
  id: string;
  fullName: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        fullName: doc.data().fullName as string,
      }));
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    await deleteDoc(doc(db, "users", userId));
    setUsers(users.filter(user => user.id !== userId)); // UIを更新
  };

  return (
    <div>
      <h2>ユーザー一覧</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.fullName}
            <button onClick={() => handleDelete(user.id)}>削除</button>
            <Link to={`/edit/${user.id}`}>編集</Link>
          </li>
        ))}
      </ul>
      <Link to="/">ホームに戻る</Link>
    </div>
  );
};

export default UserList;
