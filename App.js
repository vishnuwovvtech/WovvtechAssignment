import React, { Component } from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {Container, Text} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import List from './screen/listdata';
import Data from './screen/parsedata';
const stack = createStackNavigator();


export default class App extends Component {
    render() {
      return (
        <>
        <NavigationContainer>
         <stack.Navigator>
           <stack.Screen name="Post List" component={List}/>
          <stack.Screen name="Data" component={Data}/>
         </stack.Navigator>
        </NavigationContainer>
        </>
      )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  flexbox: {
    flex: 1, 
  }
})
