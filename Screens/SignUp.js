import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Backbutton from '../components/Backbutton';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {login} from '../store/slices/authSlice';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cnic, setCnic] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    if (email && password && confirmPassword && cnic && phoneNumber) {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match!');
        return;
      }
      if (cnic.length !== 13) {
        Alert.alert('Error', 'CNIC must be 13 digits!');
        return;
      }
      if (phoneNumber.length !== 11) {
        Alert.alert('Error', 'Phone number must be 11 digits!');
        return;
      }

      try {
        setLoading(true);
        // Create user with email and password
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        
        // Add additional user data to Firestore
        await firestore().collection('users').doc(userCredential.user.uid).set({
          email: email,
          cnic: cnic,
          phoneNumber: phoneNumber,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

        // Update Redux state
        dispatch(login({
          uid: userCredential.user.uid,
          email: email,
          cnic: cnic,
          phoneNumber: phoneNumber,
        }));

        Alert.alert('Success', 'Account created successfully!');
        // Navigation will be handled automatically by the App.js conditional rendering
      } catch (error) {
        let errorMessage = 'An error occurred during sign up';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already registered';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak';
        }
        Alert.alert('Error', errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Error', 'Please fill in all the required fields!');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Backbutton />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Create Account</Text>
          
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/signin.jpg')}
              style={styles.image}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={value => setEmail(value)}
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />

            <Text style={styles.label}>CNIC Number</Text>
            <TextInput
              value={cnic}
              onChangeText={value => setCnic(value)}
              style={styles.input}
              placeholder="Enter your CNIC (13 digits)"
              placeholderTextColor="#666"
              keyboardType="numeric"
              maxLength={13}
              editable={!loading}
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              value={phoneNumber}
              onChangeText={value => setPhoneNumber(value)}
              style={styles.input}
              placeholder="Enter your phone number (11 digits)"
              placeholderTextColor="#666"
              keyboardType="phone-pad"
              maxLength={11}
              editable={!loading}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={value => setPassword(value)}
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#666"
              secureTextEntry
              autoCapitalize="none"
              editable={!loading}
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={value => setConfirmPassword(value)}
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#666"
              secureTextEntry
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40, // Add padding at bottom for better scrolling
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3949ab',
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    color: '#000000',
  },
  button: {
    backgroundColor: '#3949ab',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#9fa8da',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
});