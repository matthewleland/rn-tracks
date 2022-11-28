import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'

const SigninScreen = ({ navigation }) => {
  return (
    <>
      <Text>SigninScreen</Text>
      <Button
        title='go to signup'
        onPress={() => navigation.navigate('Signup')}
      />
      <Button
        title='go to main'
        onPress={() => navigation.navigate('mainFlow')}
      />
    </>
  )
}

const styles = StyleSheet.create({})

export default SigninScreen
