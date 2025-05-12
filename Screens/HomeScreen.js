import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Emptylist from '../components/Emptylist';
import {useNavigation} from '@react-navigation/native';

const items = [
  {id: '1', place: 'Gujrat', country: 'Pakistan'},
  {id: '2', place: 'London Eye', country: 'England'},
  {id: '3', place: 'Washington DC', country: 'America'},
  {id: '4', place: 'New York', country: 'America'},
  {id: '5', place: 'Thailand', country: 'America'},
  {id: '6', place: 'Hungry', country: 'Europe'},
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
        <TouchableOpacity onPress={() => navigation.navigate('AddTripScreen')}>
          <Text style={styles.buttonText2}>Add Trip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={items}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Emptylist message={'You have recorded no Trip yet'} />
        }
        columnWrapperStyle={{justifyContent: 'space-between'}}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.tripCard}
            onPress={() =>
              navigation.navigate('TripExpenseScreen', {
                id: item.id,
                place: item.place,
                country: item.country,
              })
            }>
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
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a237e',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3949ab',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e8eaf6',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8eaf6',
    borderRadius: 150,
    marginTop: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
    elevation: 9,
  },
  mainImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#ffffff',
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
  listContent: {
    paddingBottom: 30,
  },
  tripCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 15,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e8eaf6',
  },
  placeText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1a237e',
    marginBottom: 4,
  },
  countryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});

export default HomeScreen;
