import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import MyStack from './navigation/index';
import {Provider} from 'react-native-paper';
const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
  },
});
