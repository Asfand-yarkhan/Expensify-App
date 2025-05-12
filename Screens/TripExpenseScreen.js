import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Emptylist from '../components/Emptylist';
import {useNavigation, useRoute} from '@react-navigation/native';
import Backbutton from '../components/Backbutton';
import ExpenseCard from '../components/ExpenseCard';

const items = [
  {
    id: 1,
    title: 'ate sandwich',
    amount: 44,
    category: 'food',
  },
  {
    id: 2,
    title: 'bought a jacket',
    amount: 50,
    category: 'shopping',
  },
  {
    id: 3,
    title: 'watched a movie',
    amount: 100,
    category: 'entertainment',
  },
];

const TripExpenseScreen = props => {
  const navigation = useNavigation();
  const {id, place, country} = props.route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Backbutton />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.heading}>{place}</Text>
        <Text>{country}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/travel.jpeg')}
          style={styles.mainImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.tripsHeader}>
        <Text style={styles.heading2}>Expenses</Text>
        <TouchableOpacity>
          <Text
            style={styles.buttonText2}
            onPress={() => navigation.navigate('AddExpense')}>
            Add Expenses
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={items}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Emptylist message={'You have added no Expense yet'} />
        }
        keyExtractor={item => item.id}
        renderItem={({item}) => <ExpenseCard item={item} />}
      />
    </SafeAreaView>
  );
};

export default TripExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a237e',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  listContent: {
    paddingVertical: 20,
    gap: 15,
  },
  tripsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  buttonText2: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#3949ab',
  },
});
