import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {DataTable} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScoreTable = () => {
  const [scores, setScores] = useState([]);
  const fetchStorage = async () => {
    let getAllScores = await AsyncStorage.getItem('allScores');
    if (getAllScores) {
      getAllScores = await JSON.parse(getAllScores);
      console.log(getAllScores);
      setScores(getAllScores);
    }
  };

  useEffect(() => {
    fetchStorage();
  }, []);

  const _renderItem = ({item}) => {
    return (
      <DataTable.Row>
        <DataTable.Cell>{item.level}</DataTable.Cell>
        <DataTable.Cell textStyle={{width:'100%',fontSize:10}} ><Text>{item.category}</Text></DataTable.Cell>
        <DataTable.Cell numeric>{item.score}</DataTable.Cell>
      </DataTable.Row>
    );
  };

  if (scores.length < 1) return <Text>Loading...</Text>;
  return (
    <View style={{flex: 1, backgroundColor: '#FFF', padding: 10}}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Level</DataTable.Title>
          <DataTable.Title >Category</DataTable.Title>
          <DataTable.Title numeric>Score</DataTable.Title>
        </DataTable.Header>

        <FlatList data={scores} renderItem={_renderItem} />
      </DataTable>
    </View>
  );
};

export default ScoreTable;
