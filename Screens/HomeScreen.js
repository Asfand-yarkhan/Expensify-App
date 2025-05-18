import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Emptylist from '../components/Emptylist';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../store/slices/authSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const tripsSnapshot = await firestore()
        .collection('trips')
        .where('userId', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get();

      const tripsData = tripsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrips(tripsData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load trips');
    } finally {
      setLoading(false);
    }
  };

  // Refresh trips when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchTrips();
    }, [user.uid])
  );

  const handleLogout = async () => {
    try {
      await auth().signOut();
      dispatch(logout());
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const renderTripCard = ({item}) => (
    <TouchableOpacity
      style={styles.tripCard}
      onPress={() => navigation.navigate('TripExpenseScreen', {
        id: item.id,
        place: item.place,
        country: item.country,
      })}>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            'Delete Trip',
            'Are you sure you want to delete this trip?',
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
                    // Delete all expenses associated with this trip first
                    const expensesSnapshot = await firestore()
                      .collection('expenses')
                      .where('tripId', '==', item.id)
                      .get();
                    
                    const deletePromises = expensesSnapshot.docs.map(doc => 
                      doc.ref.delete()
                    );
                    await Promise.all(deletePromises);

                    // Then delete the trip
                    await firestore()
                      .collection('trips')
                      .doc(item.id)
                      .delete();
                    
                    // Refresh the trips list
                    fetchTrips();
                  } catch (error) {
                    Alert.alert('Error', 'Failed to delete trip');
                  }
                },
              },
            ],
          );
        }}>
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
      <Image source={require('../assets/trip.jpg')} style={styles.cardImage} />
      <Text style={styles.placeText}>{item.place}</Text>
      <Text style={styles.countryText}>{item.country}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.heading}>Expensify</Text>
        <TouchableOpacity onPress={handleLogout}>
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
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTripScreen')}
        >
          <Text style={styles.buttonText2}>Add Trip</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3949ab" />
        </View>
      ) : (
        <FlatList
          data={trips}
          renderItem={renderTripCard}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Emptylist message="No trips added yet. Add your first trip!" />
          }
          scrollEnabled={false}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
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
  addButton: {
    backgroundColor: '#3949ab',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText2: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  listContent: {
    paddingBottom: 30,
    gap: 15,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
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
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
});

export default HomeScreen;
