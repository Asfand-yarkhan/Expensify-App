import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ExpenseCard = ({item, onDelete}) => {
  const handleDelete = () => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore()
                .collection('expenses')
                .doc(item.id)
                .delete();
              
              // Call the onDelete callback to refresh the list
              if (onDelete) {
                onDelete();
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to delete expense');
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.amount}>${item.amount}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 5,
  },
  amount: {
    fontSize: 16,
    color: '#3949ab',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff5252',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24,
  },
});

export default ExpenseCard;
