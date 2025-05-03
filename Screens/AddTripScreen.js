import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import Backbutton from '../components/Backbutton';

const AddTripScreen = () => {
  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.header}>
        <Backbutton />
        <Text style={styles.heading}>Add Trip</Text>
      </View>
      <View>
        {/* Add more form fields here */}
      </View>
    </SafeAreaView>
  );
};

export default AddTripScreen;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 80, 
    paddingBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
  },
});
