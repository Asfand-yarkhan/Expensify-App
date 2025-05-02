import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native'; 
import { FlatList } from 'react-native';

const items = [
    {
      id: 1,
      place: 'Gujrat',
      country: 'Pakistan',
    },
    {
      id: 2,
      place: 'London Eye',
      country: 'England',
    },
    {
      id: 3,
      place: 'Washington dc',
      country: 'America',
    },
    {
      id: 4,
      place: 'New york',
      country: 'America',
    }
  ];
  

const HomeScreen = () => {
    return (
  <View style={styles.container}>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
   <Text style={styles.heading}>Expensify</Text>
   <TouchableOpacity>
    <Text style={styles.buttonText}>Logout</Text>    
   </TouchableOpacity>
   </View>
   <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'skyblue',borderRadius:50, marginTop:10}}>
    <Image source={require('../assets/travel.jpeg')} style={{width:250,height:250}}></Image>
   </View>
   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
   <Text style={styles.heading2}>Recent Trips</Text>
   <TouchableOpacity>
    <Text style={styles.buttonText2}>Add Trip</Text>    
   </TouchableOpacity>
   </View>
   <View>
    <FlatList
    data = {items}
    numColumns={2}
    showsVerticalScrollIndicator={false}
columnWrapperStyle={{
    justifyContent:'space-between',
}}
    keyExtractor={item=>item.id}
    renderItem={({item})=>{
        return(
            <TouchableOpacity style={{backgroundColor:'lightgrey',borderRadius:15,margin:15,padding:30}}>
                <Image source={require('../assets/travel.jpeg')} style={{width:70,height:70}}></Image>
                <Text>{item.place}</Text>
                <Text>{item.country}</Text>
            </TouchableOpacity>
        )
    }}
    ></FlatList>
   </View>
  </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    heading:{
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily:'Times New Roman',
        color: 'black',
        marginLeft:10,
        marginTop:20
    },
    buttonText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        padding:10,
        borderRadius:20,
        borderWidth:1,
        borderColor:'black',
        marginRight:10,
        marginTop:20
    },
    heading2:{
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily:'Times New Roman',
        color: 'black',
        marginLeft:10,
        marginTop:15
    },
    buttonText2:{
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        padding:10,
        borderRadius:20,
        borderWidth:1,
        borderColor:'black',
        marginRight:10,
        marginTop:10
    },
});

export default HomeScreen;
