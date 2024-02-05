import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

interface User {
  id: string;
  fullName: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

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
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-xl font-semibold mb-4">社員一覧</h2>
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4">
        {users.map(user => (
          <div key={user.id} className="flex justify-between items-center border-b border-gray-200 py-2">
            <span className="text-lg">{user.fullName}</span>
            <div>
              <button
                onClick={() => navigate(`/edit/${user.id}`)}
                className="bg-blue-500 text-white p-2 rounded-lg text-sm hover:bg-blue-600 transition duration-300 ease-in-out mr-2"
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white p-2 rounded-lg text-sm hover:bg-red-600 transition duration-300 ease-in-out"
              >
                削除
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-gray-500 text-white p-2 rounded-lg text-sm hover:bg-gray-600 transition duration-300 ease-in-out w-full"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  );
};

export default UserList;
