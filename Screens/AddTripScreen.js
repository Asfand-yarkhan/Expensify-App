import { StyleSheet, Text, View, SafeAreaView , Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Backbutton from '../components/Backbutton';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddTripScreen = () => {
  const [place,setplace] = useState('');
  const [country,setcountry] = useState('');

  const navigation = useNavigation();

  const handleAddTrip = () =>{
    if(place && country)
    {
      navigation.navigate('HomeScreen');
    }else{
      //error message
    }
  }

  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.header}>
        <Backbutton />
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.heading}>Add Trip</Text>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image style={styles.Image} source={require('../assets/empty.jpg')} />
      </View>

      <View>
        <Text style={styles.Text}>Where on Earth?</Text>
        <TextInput value={place} onChangeText={value=>setplace(value)} style={styles.Input} />
        <Text style={styles.Text}>Which Country:</Text>
        <TextInput value={country} onChangeText={value=>setcountry(value)} style={styles.Input} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={()=>handleAddTrip()}>
          <Text style={styles.buttonText}>Add Trip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddTripScreen;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
  },
  Image: {
    marginTop: 5,
    width: 200,
    height: 200,
    borderRadius: 40,
    elevation: 5,
  },
  Text: {
    fontSize: 18,
    fontWeight: '100',
    color: 'black',
    marginTop: 10,
  },
  Input: {
    borderRadius: 9,
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'lightgreen',
    paddingVertical: 15,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
