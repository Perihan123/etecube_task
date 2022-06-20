import React from 'react'
import { Image } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import success from '../assets/icons/tick.png'
import error from '../assets/icons/remove.png'

const AlertDialog = ({visible,setVisible,correct}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={()=>setVisible(false)}>
        <Dialog.Content style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Image 
            source={correct ? success : error}
          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  )
}

export default AlertDialog