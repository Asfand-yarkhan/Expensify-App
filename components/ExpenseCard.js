import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ExpenseCard = ({item}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title1}>{item.title}</Text>
        <Text>{item.category}</Text>
      </View>
      <View>
        <Text>${item.amount}</Text>
      </View>
    </View>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
  },
  title1: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
