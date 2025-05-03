import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {ChevronLeftIcon} from 'react-native-heroicons/outline'

const Backbutton = () => {
  return (
    <TouchableOpacity>
        <ChevronLeftIcon size='30'/>
    </TouchableOpacity>
  )
}

export default Backbutton

const styles = StyleSheet.create({})