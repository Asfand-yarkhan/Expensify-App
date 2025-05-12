import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/travel.jpeg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Expensify</Text>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('LogIn')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={()=>navigation.navigate('LogIn')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    height: '50%',
    width: '100%',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: '#3949ab',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '85%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signUpButton: {
    backgroundColor: '#00acc1',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
})