import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import Emptylist from '../components/Emptylist';   
import { useNavigation } from '@react-navigation/native';

const items = [
  { id: '1', place: 'Gujrat', country: 'Pakistan' },
  { id: '2', place: 'London Eye', country: 'England' },
  { id: '3', place: 'Washington DC', country: 'America' },
  { id: '4', place: 'New York', country: 'America' },
  { id: '5', place: 'Thailand', country: 'America' },
  { id: '6', place: 'Hungry', country: 'Europe' },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.heading}>Expensify</Text>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/travel.jpeg')}
          style={styles.mainImage}
        />
      </View>

      <View style={styles.tripsHeader}>
        <Text style={styles.heading2}>Recent Trips</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('AddTripScreen')}>
          <Text style={styles.buttonText2}>Add Trip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={items}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Emptylist message={"You have recorded no Trip yet"}/>}        
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.tripCard} onPress={()=>navigation.navigate('TripExpenseScreen', {
            id: item.id,
            place: item.place,
            country: item.country,
          })}>
            <Image
              source={require('../assets/travel.jpeg')}
              style={styles.cardImage}
            />
            <Text style={styles.placeText}>{item.place}</Text>
            <Text style={styles.countryText}>{item.country}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    color: 'black',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    borderRadius: 150,
    marginTop: 20,
    padding: 20,
  },
  mainImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
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
  listContent: {
    paddingBottom: 30,
  },
  tripCard: {
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    padding: 15,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  placeText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  countryText: {
    fontSize: 14,
    color: 'grey',
  },
});

export default HomeScreen;
