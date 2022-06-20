import React from 'react';
import { View ,Text, StyleSheet } from 'react-native';

const Header = ({title}) => {
  return (
    <View style={[styles.header,{elevation:10}]}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width:'100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
      },
      headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},

})

export default Header;
