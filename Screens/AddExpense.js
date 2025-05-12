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
  import { categories } from '../constants';
  
  const AddExpense = () => {
    const [title, settitle] = useState('');
    const [amount, setamount] = useState('');
    const [category, setcategory] = useState('');

  
    const navigation = useNavigation();
  
    const handleAddExpense = () => {
      if (title && amount && category) {
        navigation.goBack();
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
          <Text style={styles.heading}>Add Expense</Text>
        </View>
  
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={styles.Image} source={require('../assets/trip.jpg')} />
        </View>
  
        <View>
          <Text style={styles.Text}>For what ?(items):</Text>
          <TextInput
            value={title}
            onChangeText={value => settitle(value)}
            style={styles.Input}
          />
          <Text style={styles.Text}>How Much?$:</Text>
          <TextInput
            value={amount}
            onChangeText={value => setamount(value)}
            style={styles.Input}
          />
        </View>

        <View>
          <Text style={styles.Text}>Select Category:</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((cat, index) => (
              <TouchableOpacity
                style={[
                  styles.categoryBubble,
                  category === cat.title && styles.selectedCategory,
                ]}
                onPress={() => setcategory(cat.title)}
                key={cat.title}>
                <Text style={[
                  styles.categoryText,
                  category === cat.title && styles.selectedCategoryText
                ]}>{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleAddExpense()}>
            <Text style={styles.buttonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default AddExpense;
  
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
    categoriesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 10,
      marginBottom: 20,
    },
    categoryBubble: {
      backgroundColor: '#e8eaf6',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#c5cae9',
    },
    selectedCategory: {
      backgroundColor: '#3949ab',
      borderColor: '#3949ab',
    },
    categoryText: {
      fontSize: 14,
      color: '#3949ab',
      fontWeight: '500',
    },
    selectedCategoryText: {
      color: '#ffffff',
      fontWeight: '600',
    },
  });
  