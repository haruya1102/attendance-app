import { db } from './config'; // Firebaseの設定をインポート

// 出退勤記録を保存する関数
export const saveAttendanceRecord = async (userId, record) => {
  try {
    const docRef = await db.collection('attendanceRecords').add({
      userId,
      ...record,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("記録保存エラー: ", error);
    throw error;
  }
};

// 特定ユーザーの出退勤記録を取得する関数
export const getAttendanceRecordsByUser = async (userId) => {
  try {
    const querySnapshot = await db.collection('attendanceRecords')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .get();
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("記録取得エラー: ", error);
    throw error;
  }
};
