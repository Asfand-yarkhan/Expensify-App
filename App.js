import { StyleSheet, Text, View } from 'react-native'
import{NavigationContainer} from '@react-navigation/native'
import{createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from './Screens/HomeScreen' 
import LogIn from './Screens/LogIn'
import AddTripScreen from './Screens/AddTripScreen'
import TripExpenseScreen from './Screens/TripExpenseScreen'
import AddExpense from './Screens/AddExpense'
import Welcome from './Screens/Welcome'
import SignUp from './Screens/SignUp'

const Stack = createNativeStackNavigator();
const App = () => {
  console.log('App component rendered');
  
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='Welcome'>
     <Stack.Screen name='Welcome' component={Welcome} options={{headerShown:false}} />
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}} />
      <Stack.Screen name='LogIn' component={LogIn} options={{headerShown:false}} />
      <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}} />

      <Stack.Screen name='AddTripScreen' component={AddTripScreen} options={{headerShown:false}} />
      <Stack.Screen name='TripExpenseScreen' component={TripExpenseScreen} options={{headerShown:false}} />
      <Stack.Screen name='AddExpense' component={AddExpense} options={{headerShown:false}} />
     </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
const styles = StyleSheet.create({
  
})