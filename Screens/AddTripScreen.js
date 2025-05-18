import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Backbutton from '../components/Backbutton';
import {TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const AddTripScreen = () => {
  const [place, setplace] = useState('');
  const [country, setcountry] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);

  const handleAddTrip = async () => {
    if (!place || !country) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const tripData = {
        place,
        country,
        userId: user.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore().collection('trips').add(tripData);
      Alert.alert('Success', 'Trip added successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container1}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Backbutton />
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.heading}>Add Trip</Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={styles.Image} source={require('../assets/empty.jpg')} />
        </View>

        <View>
          <Text style={styles.Text}>Where on Earth?</Text>
          <TextInput
            value={place}
            onChangeText={value => setplace(value)}
            style={styles.Input}
            placeholder="Enter place name"
            placeholderTextColor="#666"
            editable={!loading}
          />
          <Text style={styles.Text}>Which Country:</Text>
          <TextInput
            value={country}
            onChangeText={value => setcountry(value)}
            style={styles.Input}
            placeholder="Enter country name"
            placeholderTextColor="#666"
            editable={!loading}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleAddTrip}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Adding...' : 'Add Trip'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddTripScreen;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  Image: {
    marginTop: 20,
    width: 200,
    height: 200,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ffffff',
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
    fontSize: 16,
    color: '#000000',
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
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 1,
  },
  buttonDisabled: {
    backgroundColor: '#9fa8da',
  },
});
