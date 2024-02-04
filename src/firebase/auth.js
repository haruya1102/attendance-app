import { auth } from './config'; // Firebaseの設定をインポート

// ユーザーをログインさせる関数
export const signIn = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error("ログインエラー: ", error);
    throw error;
  }
};

// ユーザーをログアウトさせる関数
export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("ログアウトエラー: ", error);
    throw error;
  }
};

// ユーザーの認証状態を監視する関数
export const onAuthStateChanged = (callback) => {
  auth.onAuthStateChanged(user => {
    callback(user);
  });
};
