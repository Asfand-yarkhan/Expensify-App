import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { initializeApp } from '@react-native-firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR50mgVPUmrUX-zEk1z10obwvrIrMymXw",
  authDomain: "expensify-app11.firebaseapp.com",
  projectId: "expensify-app11",
  storageBucket: "expensify-app11.firebasestorage.app",
  messagingSenderId: "242243923510",
  appId: "1:242243923510:web:be1e39793f6764773db297"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export { auth, firestore, storage };
export default app; 