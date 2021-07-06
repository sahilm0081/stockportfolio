import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyASn_H9oHKPTNGBPGq8ELzsVeemYKzDcxo",
  authDomain: "portfolio-f4dc0.firebaseapp.com",
  databaseURL:
    "https://portfolio-f4dc0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolio-f4dc0",
  storageBucket: "portfolio-f4dc0.appspot.com",
  messagingSenderId: "6187837040",
  appId: "1:6187837040:web:97be01ac59d9d833f4b6b5",
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
