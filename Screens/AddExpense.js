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
    categoriesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 10,
    },
    categoryBubble: {
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    selectedCategory: {
      backgroundColor: 'lightgreen',
      borderColor: 'lightgreen',
    },
    categoryText: {
      fontSize: 14,
      color: '#333',
    },
    selectedCategoryText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  