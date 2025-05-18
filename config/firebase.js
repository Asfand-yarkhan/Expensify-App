import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { initializeApp } from '@react-native-firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs0aXTvu-ADiXLY8dOEiz0FrJhsmfeLeY",
  authDomain: "expensify-app11.firebaseapp.com",
  projectId: "expensify-app11",
  storageBucket: "expensify-app11.firebasestorage.app",
  messagingSenderId: "242243923510",
  appId: "1:242243923510:android:b5ed130757b2f06d3db297"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const firestoreInstance = firestore();
const authInstance = auth();
const storageInstance = storage();

// Export Firebase services
export { authInstance as auth, firestoreInstance as firestore, storageInstance as storage };
export default app; 