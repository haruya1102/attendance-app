// auth.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './config'; // Firebaseの設定をインポート

// 新規アカウント作成
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('新規アカウント作成成功', user);
    // 新規アカウント作成成功後の処理
  } catch (error) {
    console.error('新規アカウント作成エラー', error);
    // 新規アカウント作成エラー時の処理
  }
};

// サインイン
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('サインイン成功', user);
    // サインイン成功後の処理
  } catch (error) {
    console.error('サインインエラー', error);
    // サインインエラー時の処理
  }
};

// ログアウト
const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('ログアウト成功');
    // ログアウト成功後の処理
  } catch (error) {
    console.error('ログアウトエラー', error);
    // ログアウトエラー時の処理
  }
};

// ユーザーの状態を監視
const observeAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export { signUp, signIn, signOutUser, observeAuthState };
