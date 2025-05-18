import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Emptylist from '../components/Emptylist';
import {useNavigation, useRoute, useFocusEffect} from '@react-navigation/native';
import Backbutton from '../components/Backbutton';
import ExpenseCard from '../components/ExpenseCard';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const TripExpenseScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const {id, place, country} = route.params;
  const user = useSelector(state => state.auth.user);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const expensesSnapshot = await firestore()
        .collection('expenses')
        .where('tripId', '==', id)
        .where('userId', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get();

      const expensesData = expensesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(expensesData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  // Refresh expenses when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [id, user.uid])
  );

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Backbutton />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.heading}>{place}</Text>
        <Text style={styles.subheading}>{country}</Text>
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
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddExpense', {tripId: id})}
        >
          <Text style={styles.buttonText2}>Add Expenses</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3949ab" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={expenses}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          ListEmptyComponent={
            <Emptylist message={'You have added no Expense yet'} />
          }
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ExpenseCard 
              item={item} 
              onDelete={fetchExpenses}
            />
          )}
        />
      )}
    </ScrollView>
  );
};

export default TripExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
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
  subheading: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
});
