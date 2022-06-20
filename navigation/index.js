import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Home from '../screens/Home';
import Quiz  from '../screens/Quiz';
import Result from '../screens/Result';
import ScoreTable from '../screens/ScoreTable';
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
      <Stack.Navigator initialRouteName='Home' >
        <Stack.Screen name="Home"
          component={Home}//componentler tanımsız mı  
          options={{ headerShown: false }} />
        <Stack.Screen name="Quiz"
          component={Quiz}
          options={{ headerShown: false }} />
        <Stack.Screen name="Result"
          component={Result}
          options={{ headerShown: false }} />
          <Stack.Screen name="ScoreTable"
            component={ScoreTable}
            options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default MyStack