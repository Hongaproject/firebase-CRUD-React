import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxXkBJdWDHo-rFspZKP6k5jEB0wfiTOHI",
  authDomain: "x-coding-96693.firebaseapp.com",
  projectId: "x-coding-96693",
  storageBucket: "x-coding-96693.appspot.com",
  messagingSenderId: "729927639411",
  appId: "1:729927639411:web:99ba1d80ff900b58222506"
};

const app = initializeApp(firebaseConfig); 

export const auth = getAuth(app); // app에 대한 인증 서비스를 사용려고 함. 