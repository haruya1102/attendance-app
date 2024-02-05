import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import RecordList from './RecordList';

interface Timestamp {
  type: '出勤' | '退勤';
  timestamp: Date;
}

interface User {
  id: string;
  fullName: string;
  timestamps: Timestamp[];
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersArray: User[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const timestamps = data.timestamps ? data.timestamps.map((t: any) => ({
        type: t.type,
        timestamp: t.timestamp.toDate()
      })) : [];
      return {
        id: doc.id,
        fullName: data.fullName,
        timestamps
      };
    });
    setUsers(usersArray);
  };

  const updateCurrentDateTime = () => {
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    setCurrentDateTime(formattedDateTime);
  };

  useEffect(() => {
    fetchUsers();
    updateCurrentDateTime();

    const intervalId = setInterval(updateCurrentDateTime, 1000); // 1秒ごとに更新

    return () => clearInterval(intervalId);
  }, []);

    const handleAttendance = async (type: '定時出勤' | '定時退勤' | '早出出勤' | '残業退勤' | '休憩開始' | '休憩終了') => {
    if (!selectedUser) {
        alert("ユーザーを選択してください。");
        return;
    }

    const userDocRef = doc(db, "users", selectedUser);
    try {
        const selectedUsr = users.find(user => user.id === selectedUser);
        const newTimestamp = { type, timestamp: new Date() };
        
        await updateDoc(userDocRef, {
        timestamps: selectedUsr?.timestamps ? [...selectedUsr.timestamps, newTimestamp] : [newTimestamp],
        });

        await fetchUsers();

    } catch (error) {
        alert("記録に失敗しました。");
        console.error("記録エラー: ", error);
    }
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <button
        onClick={() => navigate('/registration')}
        className="mb-4 bg-blue-500 text-white font-medium text-lg p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out w-full max-w-xs"
      >
        新規登録
      </button>
      <div className="text-center mb-8">
        <p className="text-2xl font-semibold mb-2">現在時刻</p>
        <p className="text-4xl font-bold text-gray-800">{currentDateTime}</p>
      </div>
      <div className="w-full max-w-md mb-4">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">社員を選択してください</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.fullName}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button
            onClick={() => handleAttendance('定時出勤')}
            className="bg-blue-500 text-white p-4 rounded-lg text-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
        定時出勤
        </button>
        <button
            onClick={() => handleAttendance('定時退勤')}
            className="bg-red-500 text-white p-4 rounded-lg text-lg hover:bg-red-600 transition duration-300 ease-in-out"
        >
        定時退勤
        </button>
        <button
            onClick={() => handleAttendance('早出出勤')}
            className="bg-green-500 text-white p-4 rounded-lg text-lg hover:bg-green-600 transition duration-300 ease-in-out"
        >
        早出出勤
        </button>
        <button
            onClick={() => handleAttendance('残業退勤')}
            className="bg-yellow-500 text-white p-4 rounded-lg text-lg hover:bg-yellow-600 transition duration-300 ease-in-out"
        >
        残業退勤
        </button>
        <button
            onClick={() => handleAttendance('休憩開始')}
            className="bg-purple-500 text-white p-4 rounded-lg text-lg hover:bg-purple-600 transition duration-300 ease-in-out"
        >
        休憩開始
        </button>
        <button
            onClick={() => handleAttendance('休憩終了')}
            className="bg-pink-500 text-white p-4 rounded-lg text-lg hover:bg-pink-600 transition duration-300 ease-in-out"
        >
        休憩終了
        </button>
      </div>
      {selectedUser && (
        <RecordList timestamps={users.find((user) => user.id === selectedUser)?.timestamps || []} />
      )}
      <button
        onClick={() => navigate('/users')}
        className="mt-4 bg-gray-500 text-white font-medium text-lg p-3 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out w-full max-w-xs"
      >
        社員一覧
      </button>
    </div>
  );
};

export default Home;
