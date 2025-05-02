import { StyleSheet, Text, View } from 'react-native'
import{NavigationContainer} from '@react-navigation/native'
import{createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from './Screens/HomeScreen' 
import LogIn from './Screens/LogIn'

const Stack = createNativeStackNavigator();
const App = () => {
  console.log('App component rendered');
  
  return (
    <NavigationContainer>
     <Stack.Navigator>
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}} />
      <Stack.Screen name='LogIn' component={LogIn} options={{headerShown:false}} />
     </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
const styles = StyleSheet.create({
  
})