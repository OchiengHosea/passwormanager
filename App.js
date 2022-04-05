import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {Component, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

class Passwords extends Component {
  constructor(props) {
    super(props);
    this.state = {
        passwords: {}
    }
  }

    async storeData(key, value){
        let data;
        try {
            data = JSON.stringify(value);
        } catch (e) {
            data = value.toString();
        }
        await AsyncStorage.setItem(key, data);
    }

    getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if(value !== null) {
                try {
                    return JSON.parse(value);
                } catch (e) {
                    return value;
                }
            }
        } catch(e) {
            // error reading value
        }
    }

    async componentDidMount() {
      const myPasswords = await this.getData("passwords");
      this.setState({passwords:myPasswords});
        console.log(myPasswords);
    }

    async componentDidUpdate(prevProps, prevState) {
        const myPasswords = await this.getData("passwords");
        this.setState({passwords:myPasswords});
    }

    viewPassword(key) {
      alert(this.state.passwords[key]);
    }

    async deletePassword(key){
      const passes = this.state.passwords;
      delete passes[key];
      await this.storeData("passwords", passes);
      this.setState({passwords:passes});
    }

    render() {
      const {passwords} = this.state
        return(
            <View style={styles.containerPasswords}>
              <Text style={[styles.title, {marginBottom: 25}]}>
                  {passwords ? `${Object.keys(passwords).length} Passwords` : 'You have no saved passwords' }
              </Text>

                <View style={styles.containerCenter}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {this.props.navigation.navigate("AddPassword")}}>
                        <Text style={styles.buttonLabel}>Add Password</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    {Object.keys(passwords).map((key, i) =>
                        <View key={i} style={styles.passwordEntryContainer}>
                            <View style={{width:'50%'}}>
                                <Text style={styles.passwordEntry}>{i+1} . {key}</Text>
                            </View>

                            <View style={[styles.passActionWrapper,{width:'50%'}]}>
                                <Text style={styles.passActionItem}>****</Text>
                                <TouchableOpacity style={styles.passActionItem} onPress={() => this.viewPassword(key)}>
                                    <Text>View</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.passActionItem} onPress={() => this.deletePassword(key)}>
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        )
      }
}

export class AddPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
        siteName: "",
        password: ""
    }
  }

    getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if(value !== null) {
                try {
                    return JSON.parse(value);
                } catch (e) {
                    return value;
                }
            }
            return null;
        } catch(e) {
            // error reading value
            return null
        }
    }

    async storeData(key, value){
        let data;
        try {
            data = JSON.stringify(value);
        } catch (e) {
            data = value.toString();
        }
        await AsyncStorage.setItem(key, data);
    }

     savePassword = async () => {
        let passwords = await this.getData("passwords");
        if (passwords === null) passwords = {};
        passwords[this.state.siteName] = this.state.password;
        await this.storeData("passwords", passwords);
        setTimeout(() => {
            this.props.navigation.goBack();
        }, 1000);
    }

  render() {
    return(
        <View style={styles.container}>
          <Text style={styles.title}>
            Save New Password
          </Text>

            <TextInput
                style={styles.input}
                onChangeText={(val) => this.state.siteName = val}
                placeholder="Name of site"
            />

            <TextInput
                style={styles.input}
                onChangeText={(val) => this.state.password = val}
                placeholder="Site Password"
            />

            <View style={styles.containerCenter}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.savePassword}>
                    <Text style={styles.buttonLabel}>Add</Text>
                </TouchableOpacity>
            </View>

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
                name={"AddPassword"}
                component={AddPassword}
                options={{title:"Add password"}}
            />
          </Stack.Navigator>
        </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
    containerCenter: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

    containerPasswords: {
        flex: 1,
        backgroundColor: '#fff',
        paddingStart: 15,
        paddingEnd: 15
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        width: "75%"
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: "rgba(110,87,215,0.71)",
        alignSelf: "flex-start",
        marginHorizontal: "1%",
        marginBottom: 6,
        textAlign: "center",
        fontSize: 20,
        minWidth: "20%"
    },

    buttonLabel: {
        fontSize: 12,
        fontWeight: "500",
        color: "#fff",
        textAlign: "center",
    },

    title: {
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 30,
        fontSize: 20,
        color: "grey"
    },

    passwordEntryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        backgroundColor: "#eae9e9",
        borderRadius: 10,
        elevation: 2,
        marginTop: 6
    },

    passwordEntry: {
        padding: 15
    },

    passActionWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },

    passActionItem: {
        margin: 15
    }
});
