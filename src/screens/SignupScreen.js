import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'

const SignupScreen = ({ navigation }) => {
  return (
    <>
      <Text>SignupScreen</Text>
      <Button
        title='go to signin'
        onPress={() => navigation.navigate('Signin')}
      />
    </>
  )
}

const styles = StyleSheet.create({})

export default SignupScreen
