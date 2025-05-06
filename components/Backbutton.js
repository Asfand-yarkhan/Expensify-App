import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const Backbutton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.goBack()}>
        <ChevronLeftIcon size='30'/>
    </TouchableOpacity>
  )
}

export default Backbutton

const styles = StyleSheet.create({})