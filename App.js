import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './Screens/Welcome';
import LogIn from './Screens/LogIn';
import SignUp from './Screens/SignUp';
import HomeScreen from './Screens/HomeScreen';
import AddTripScreen from './Screens/AddTripScreen';
import TripExpenseScreen from './Screens/TripExpenseScreen';
import AddExpense from './Screens/AddExpense';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "HomeScreen" : "Welcome"}
      screenOptions={{
        headerShown: false,
      }}>
      {!isAuthenticated ? (
        // Auth Stack
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      ) : (
        // App Stack
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AddTripScreen" component={AddTripScreen} />
          <Stack.Screen name="TripExpenseScreen" component={TripExpenseScreen} />
          <Stack.Screen name="AddExpense" component={AddExpense} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;