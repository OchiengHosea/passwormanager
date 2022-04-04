import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

class Passwords extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <View style={styles.container}>
          <Text>
            Your Passwords
          </Text>
        </View>
    )
  }
}

class AddPassword extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <View style={styles.container}>
          <Text>
            New Password
          </Text>
        </View>
    )
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name={"Passwords"}
                component={Passwords}
                options={{title:"My passwords"}}
                />

            <Stack.Screen
                name={"Add Password"}
                component={AddPassword}
                options={{title:"Add password"}}
            />
          </Stack.Navigator>
        </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
