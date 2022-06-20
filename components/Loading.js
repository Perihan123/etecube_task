import React from 'react'
import { Image, View } from 'react-native'
import img from '../assets/images/loading.png'
const Loading = () => {
  return (
    <View style={{flex:1,backgroundColor:'#FFF',justifyContent:'center',alignItems:'center'}}>
        <Image 
            source={img}
        />
    </View>
  )
}

export default Loading