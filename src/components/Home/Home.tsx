import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';
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

  // 'fetchUsers' 関数を独立させ、useEffect内および他の場所から呼び出せるようにする
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersArray: User[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const timestamps = data.timestamps ? data.timestamps.map((t: any) => ({
        type: t.type,
        timestamp: t.timestamp.toDate() // Firestore TimestampをDateに変換
      })) : [];
      return {
        id: doc.id,
        fullName: data.fullName,
        timestamps
      };
    });
    setUsers(usersArray);
  };

  useEffect(() => {
    fetchUsers();
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
    <div>
        <h1>社員の出勤・退勤記録</h1>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">社員を選択してください</option>
        {users.map(user => (
            <option key={user.id} value={user.id}>{user.fullName}</option>
        ))}
        </select>
        <button onClick={() => handleAttendance('定時出勤')}>出勤</button>
        <button onClick={() => handleAttendance('定時退勤')}>退勤</button>
        <button onClick={() => handleAttendance('早出出勤')}>早出出勤</button>
        <button onClick={() => handleAttendance('残業退勤')}>残業退勤</button>
        <button onClick={() => handleAttendance('休憩開始')}>休憩開始</button>
        <button onClick={() => handleAttendance('休憩終了')}>休憩終了</button>
        {selectedUser && users.find(user => user.id === selectedUser) && (
        <RecordList timestamps={users.find(user => user.id === selectedUser)!.timestamps} />
        )}
        <Link to="/registration">新規登録</Link>
        <Link to="/users">ユーザー一覧を見る</Link>
    </div>
  );
};

export default Home;