import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, { useEffect } from 'react';
import Title from '../components/Title';
import resultimage from '../assets/images/result.png';
import failimage from '../assets/images/failscore.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Result = ({navigation, route}) => {
  const {score} = route.params;

  return (
    <View style={styles.container}>
      <Title titleText="RESULTS" />
      <Text style={styles.scoreText}>{score}</Text>

      <View style={styles.bannerContainer}>
        {score < 60 ? (
          <Image
            style={styles.banner}
            resizeMode="contain"
            source={failimage}
          />
        ) : (
          <Image
            style={styles.banner}
            resizeMode="contain"
            source={resultimage}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('ScoreTable')}
        style={styles.button}>
        <Text style={styles.buttonText}>All Scores</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.button}>
        <Text style={styles.buttonText}>Go To Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
    backgroundColor: '#FFF',
  },
  banner: {
    height: 300,
    width: 300,
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    width: '100%',
    backgroundColor: '#D7A5B1',
    padding: 20,
    borderRadius: 16,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: '800',
    alignSelf: 'center',
  },
});
