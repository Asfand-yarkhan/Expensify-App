import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Emptylist = (message) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/empty.jpg')} />
      <Text style={styles.text}>{message}No trips yet!</Text>
    </View>
  );
};

export default Emptylist;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius:20
  },
  text: {
    fontSize: 16,
    color: 'dark',
  },
});
