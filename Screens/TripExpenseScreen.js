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
import {useNavigation,useRoute} from '@react-navigation/native';
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

const TripExpenseScreen = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, place, country } = route.params;
  //const { id = 0, place = 'Unknown', country = 'Unknown' } = route.params || {};

  

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
          <Text style={styles.buttonText2}>Add Expenses</Text>
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
        renderItem={({item}) => <ExpenseCard  item={item}/>}
      />
    </SafeAreaView>
  );
};

export default TripExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    color: 'black',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  mainImage: {
    width: '100%',
    height: 180,
    borderRadius: 15,
  },
  listContent: {
    paddingVertical: 20,
    gap: 10,
  },
  tripsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  heading2: {
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    color: 'black',
  },
  buttonText2: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
});
