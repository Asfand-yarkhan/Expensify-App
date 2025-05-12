import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Backbutton from '../components/Backbutton';
import {TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LogIn = () => {
  const [email, setemail] = useState('');
  const [Password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSignin = () => {
    if (email && Password) {
      navigation.navigate('HomeScreen');
    } else {
      //error message
    }
  };

  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.header}>
        <Backbutton />
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.heading}>Sign In</Text>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image style={styles.Image} source={require('../assets/signin.jpg')} />
      </View>

      <View>
        <Text style={styles.Text}>Email : </Text>
        <TextInput
          value={email}
          onChangeText={value => setemail(value)}
          placeholder="Enter your email"
          placeholderTextColor="#666"
          style={styles.Input}
        />
        <Text style={styles.Text}>Password :</Text>
        <TextInput
          value={Password}
          onChangeText={value => setPassword(value)}
          style={styles.Input}
          secureTextEntry={true}
          placeholder="Enter your password"
          placeholderTextColor="#666"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.forgetContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={styles.forgetText}>Forget Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleSignin()}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
    marginBottom: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a237e',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  Image: {
    marginTop: 10,
    width: 200,
    height: 200,
    borderRadius: 40,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  Text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3949ab',
    marginTop: 15,
    marginLeft: 5,
  },
  Input: {
    borderRadius: 15,
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    color: '#000000',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 40,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#3949ab',
    paddingVertical: 16,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 1,
  },
  forgetContainer: {
    alignItems: 'flex-end',
    paddingRight: 10,
    marginTop: 5,
  },
  forgetText: {
    color: '#3949ab',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
